import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSignIn, useSignUp, useClerk } from '@clerk/clerk-react'

/**
 * Passwordless sign-in via Clerk, shown inline wherever it's needed —
 * never a full-screen wall. Two contexts:
 *  - variant="nudge": a soft prompt right after the learner's first win
 *    ("you got that — save it").
 *  - variant="gate": they've used their one free chapter for this module
 *    and are trying to start a second one.
 *
 * The flow is one form for both new and returning learners: email -> a
 * 6-digit code arrives (Clerk sends and rate-limits this itself, reliably)
 * -> typed straight back in here. Nobody leaves the app or opens an email
 * client. Under the hood this tries sign-in first and falls back to
 * sign-up the moment Clerk says the email doesn't have an account yet —
 * the learner never has to know or choose which one they needed.
 */
export default function SignInCard({ variant = 'nudge', moduleLabel, onDismiss }) {
  const { isLoaded: signInLoaded, signIn } = useSignIn()
  const { isLoaded: signUpLoaded, signUp } = useSignUp()
  const { setActive } = useClerk()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [flow, setFlow] = useState(null) // 'signIn' | 'signUp' — which one has the pending verification
  const [step, setStep] = useState('email') // email | sending | code | verifying
  const [error, setError] = useState('')
  const codeInputRef = useRef(null)
  // React state updates aren't synchronous, so a fast double-submit (Enter
  // key plus a near-simultaneous click, or a slow network prompting a
  // second tap) can fire handleSendCode/handleVerify twice before `step`
  // re-renders to a disabled state. These refs are checked and set
  // immediately, in the same tick, so a duplicate call is dropped before it
  // ever reaches Clerk — no race window.
  const sendingRef = useRef(false)
  const verifyingRef = useRef(false)
  const [googleBusy, setGoogleBusy] = useState(false)

  const handleGoogle = async () => {
    if (!signInLoaded || googleBusy) return
    setGoogleBusy(true)
    setError('')
    try {
      // OAuth can't happen inline — Google itself owns that screen — so this
      // is the one moment the app hands off to a real redirect. Clerk sends
      // the browser to /sso-callback when Google's done (handled in
      // App.jsx), then on to redirectUrlComplete once the session exists.
      // A single call covers both sign-in and sign-up: Clerk creates the
      // account automatically if this Google identity is new.
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (err) {
      setError(err?.errors?.[0]?.message || "Couldn't start Google sign-in — try again.")
      setGoogleBusy(false)
    }
  }

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!email.trim() || !signInLoaded || !signUpLoaded || sendingRef.current) return
    sendingRef.current = true
    setError('')
    setStep('sending')

    try {
      const attempt = await signIn.create({ identifier: email.trim() })
      const emailFactor = attempt.supportedFirstFactors?.find(f => f.strategy === 'email_code')
      if (!emailFactor) throw new Error('no-email-code-factor')
      await signIn.prepareFirstFactor({ strategy: 'email_code', emailAddressId: emailFactor.emailAddressId })
      setFlow('signIn')
      setStep('code')
      setTimeout(() => codeInputRef.current?.focus(), 50)
    } catch (err) {
      const notFound = err?.errors?.some(e => e.code === 'form_identifier_not_found')
      if (!notFound) {
        setError(err?.errors?.[0]?.message || "Couldn't send that code — check the address and try again.")
        setStep('email')
        return
      }
      // No account for this email yet — start one, same form, same code step.
      try {
        await signUp.create({ emailAddress: email.trim() })
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        setFlow('signUp')
        setStep('code')
        setTimeout(() => codeInputRef.current?.focus(), 50)
      } catch (err2) {
        setError(err2?.errors?.[0]?.message || "Couldn't send that code — check the address and try again.")
        setStep('email')
      }
    } finally {
      sendingRef.current = false
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (code.trim().length < 6 || verifyingRef.current) return
    verifyingRef.current = true
    setStep('verifying')
    setError('')

    // Whichever resource (signUp or signIn) is carrying this verification —
    // Clerk keeps it updated in place, so if a session already landed on it
    // (e.g. a duplicate submit's earlier twin already completed things a
    // moment ago) that shows up here even before we make our own attempt.
    const resource = flow === 'signUp' ? signUp : signIn

    try {
      if (resource?.createdSessionId) {
        await setActive({ session: resource.createdSessionId })
        return
      }

      const result = flow === 'signUp'
        ? await signUp.attemptEmailAddressVerification({ code: code.trim() })
        : await signIn.attemptFirstFactor({ strategy: 'email_code', code: code.trim() })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        // Clerk's session updates reactively from here — App.jsx picks up
        // the signed-in user and this card unmounts on its own.
      } else {
        setError("That code didn't match — check it and try again.")
        setStep('code')
      }
    } catch (err) {
      const alreadyVerified = err?.errors?.some(er => er.code === 'verification_already_verified')
      if (alreadyVerified && resource?.createdSessionId) {
        // The code was genuinely accepted (likely by an earlier, near-
        // simultaneous submit of the same code) — just missed grabbing the
        // session then. It's sitting on the resource now; use it.
        await setActive({ session: resource.createdSessionId })
      } else if (alreadyVerified) {
        // Verified, but no session came back with it (rare — e.g. the tab
        // that completed it is no longer this one). Safest recovery is a
        // fresh attempt rather than a confusing stuck state.
        setError("That code was already used. Try 'Use a different email' to send a fresh one, or reload and sign in again.")
        setStep('code')
      } else {
        setError(err?.errors?.[0]?.message || "That code didn't match — check it and try again.")
        setStep('code')
      }
    } finally {
      verifyingRef.current = false
    }
  }

  const heading = variant === 'gate'
    ? `You've used your free ${moduleLabel || ''} chapter`
    : 'Nice — want to keep that?'
  const body = variant === 'gate'
    ? 'Create a free account to unlock every chapter and keep your progress saved across devices.'
    : 'Sign up free and this progress is saved — no password, just a quick code.'

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={styles.card}>
      {step === 'email' || step === 'sending' ? (
        <>
          <p style={styles.heading}>{heading}</p>
          <p style={styles.body}>{body}</p>

          <button type="button" onClick={handleGoogle} disabled={googleBusy} style={styles.googleBtn}>
            <GoogleIcon />
            {googleBusy ? 'Opening Google…' : 'Continue with Google'}
          </button>
          <div style={styles.divider}><span style={styles.dividerLine} /><span style={styles.dividerText}>or</span><span style={styles.dividerLine} /></div>

          <form onSubmit={handleSendCode} style={styles.form}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              autoFocus
              style={styles.input}
            />
            <button type="submit" disabled={step === 'sending'} style={styles.button}>
              {step === 'sending' ? 'Sending…' : 'Send code'}
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
        </>
      ) : (
        <>
          <p style={styles.heading}>Enter the code we sent</p>
          <p style={styles.body}>A 6-digit code just went to <strong>{email}</strong> — no need to leave this tab.</p>
          <form onSubmit={handleVerify} style={styles.form}>
            <input
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              style={{ ...styles.input, ...styles.codeInput }}
            />
            <button type="submit" disabled={step === 'verifying' || code.length < 6} style={styles.button}>
              {step === 'verifying' ? 'Checking…' : 'Verify'}
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          <button type="button" onClick={() => { setStep('email'); setCode(''); setError(''); setFlow(null) }} style={styles.dismiss}>
            Use a different email
          </button>
        </>
      )}
      {onDismiss && variant === 'nudge' && (
        <button onClick={onDismiss} style={styles.dismiss}>Not now</button>
      )}
    </motion.div>
  )
}

// Google's own multi-color "G" mark — inline so no external asset/CDN load.
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.87 2.69-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.95v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.96 10.71A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.28-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.04l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.96l3.01 2.33C4.67 5.16 6.66 3.58 9 3.58z" />
    </svg>
  )
}

const styles = {
  googleBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    border: '1px solid var(--line)',
    background: 'var(--white)',
    color: 'var(--ink)',
    borderRadius: 999,
    padding: '10px 16px',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 14,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    margin: '0 0 14px',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'var(--line)',
  },
  dividerText: {
    fontSize: 11,
    color: 'var(--ink-soft)',
  },
  card: {
    marginTop: 16,
    padding: '18px 18px 16px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--cream-deep)',
    border: '1px solid var(--line)',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    color: 'var(--ink)',
    margin: '0 0 4px',
  },
  body: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    margin: '0 0 14px',
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    gap: 8,
  },
  input: {
    flex: 1,
    border: '1px solid var(--line)',
    borderRadius: 999,
    padding: '10px 14px',
    fontSize: 13,
    background: 'var(--white)',
    color: 'var(--ink)',
  },
  codeInput: {
    letterSpacing: '0.3em',
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'center',
  },
  button: {
    border: 'none',
    background: 'var(--ink)',
    color: 'var(--cream)',
    borderRadius: 999,
    padding: '10px 18px',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  error: {
    fontSize: 12,
    color: 'var(--terracotta-deep)',
    margin: '8px 0 0',
  },
  dismiss: {
    border: 'none',
    background: 'none',
    color: 'var(--ink-soft)',
    fontSize: 12,
    marginTop: 10,
    padding: 0,
  },
}
