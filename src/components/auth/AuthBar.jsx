import { useState } from 'react'
import { useClerk } from '@clerk/clerk-react'
import SignInCard from './SignInCard'

/** Small persistent status line — never a wall. Shown at the top of PathHome and YouTab. */
export default function AuthBar({ session }) {
  const [showCard, setShowCard] = useState(false)
  const { signOut } = useClerk()

  if (session) {
    return (
      <div style={styles.row}>
        <span style={styles.text}>Signed in as {session.user.email}</span>
        <button onClick={() => signOut()} style={styles.link}>Sign out</button>
      </div>
    )
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.row}>
        <span style={styles.text}>Trying it out — progress saves once you sign in</span>
        <button onClick={() => setShowCard(s => !s)} style={styles.link}>
          {showCard ? 'Hide' : 'Sign in'}
        </button>
      </div>
      {showCard && <SignInCard variant="nudge" onDismiss={() => setShowCard(false)} />}
    </div>
  )
}

const styles = {
  wrap: { marginBottom: 8 },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 12,
    color: 'var(--ink-soft)',
  },
  link: {
    border: 'none',
    background: 'none',
    color: 'var(--terracotta-deep)',
    fontSize: 12,
    fontWeight: 600,
    padding: 0,
  },
}
