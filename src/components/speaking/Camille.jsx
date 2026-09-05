// Camille — the speaking companion.
//
// A real illustrated figure (head, hair, shoulders, a proper face with
// irises and eyebrows) instead of a geometric shape — the goal is someone
// sitting across from you, not a mascot. She breathes at idle, blinks,
// perks up and pulses sound-rings *scaled to your actual mic volume* while
// listening, opens her mouth in sync with her own TTS playback while
// speaking, glances around while genuinely considering what she heard, and
// throws confetti when you nail a phrase. Four graduated reactions, not a
// binary good/bad.
//
// Future iteration: swap the flat SVG face for one with true viseme
// mouth-shapes driven by TTS phoneme timing (Azure returns word/viseme
// boundaries in the TTS response — see api/tts.js for where to extend).

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const STATES = {
  idle:        { ring: 'var(--terracotta)' },
  listening:   { ring: 'var(--gold)' },
  speaking:    { ring: 'var(--gold)' },
  thinking:    { ring: 'var(--sage)' },
  encouraging: { ring: 'var(--sage-deep)' },
  thoughtful:  { ring: 'var(--gold)' },
  gentle:      { ring: 'var(--terracotta)' },
  celebrating: { ring: 'var(--terracotta-deep)' },
}

const AVATAR_MOTION = {
  idle:        { scale: 1,    rotate: 0 },
  listening:   { scale: 1.04, rotate: 0 },
  speaking:    { scale: 1.04, rotate: 0 },
  thinking:    { scale: 0.99, rotate: 0 },
  encouraging: { scale: 1.02, rotate: [0, -2, 2, 0] },
  thoughtful:  { scale: 0.98, rotate: -1.5 },
  gentle:      { scale: 0.97, rotate: -3 },
  celebrating: { scale: 1.05, rotate: 0 },
}

const CONFETTI_COLORS = ['var(--terracotta)', 'var(--gold)', 'var(--sage)', 'var(--sage-deep)', 'var(--terracotta-deep)']

const spring = { type: 'spring', stiffness: 260, damping: 16 }
const softSpring = { type: 'spring', stiffness: 180, damping: 20 }

/** Reveals text word-by-word at roughly speaking pace. */
function useTypewriter(text, active) {
  const [shown, setShown] = useState(text)
  useEffect(() => {
    if (!active || !text) {
      setShown(text)
      return
    }
    const words = text.split(' ')
    setShown('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(words.slice(0, i).join(' '))
      if (i >= words.length) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])
  return shown
}

export default function Camille({ state = 'idle', message, level = 0 }) {
  const s = STATES[state] || STATES.idle
  const motionTarget = AVATAR_MOTION[state] || AVATAR_MOTION.idle
  const reduceMotion = useReducedMotion()
  const [blink, setBlink] = useState(false)
  const [burstId, setBurstId] = useState(0)
  const prevState = useRef(state)
  const shownMessage = useTypewriter(message, !reduceMotion)

  const smoothLevel = useSpring(level, { stiffness: 300, damping: 30 })
  useEffect(() => { smoothLevel.set(level) }, [level, smoothLevel])
  const mouthRy = useTransform(smoothLevel, [0, 1], [2, 11])
  const ringBoost = useTransform(smoothLevel, [0, 1], [1, 1.3])

  useEffect(() => {
    if (reduceMotion || state === 'thinking' || state === 'thoughtful') return
    let timeout
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 140)
        scheduleBlink()
      }, 2200 + Math.random() * 2400)
    }
    scheduleBlink()
    return () => clearTimeout(timeout)
  }, [state, reduceMotion])

  useEffect(() => {
    if (state === 'celebrating' && prevState.current !== 'celebrating') {
      setBurstId(id => id + 1)
    }
    prevState.current = state
  }, [state])

  const isVoiceActive = state === 'listening' || state === 'speaking'
  const isConsidering = state === 'thinking' || state === 'thoughtful'

  return (
    <div style={styles.wrap}>
      <div style={styles.stage}>
        <motion.div
          aria-hidden
          style={{ ...styles.glow, background: s.ring }}
          animate={{ opacity: state === 'idle' ? [0.16, 0.28, 0.16] : 0.28 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 2.6, repeat: state === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
        />

        {isVoiceActive && !reduceMotion && (
          <>
            {[0, 0.4, 0.8].map(delay => (
              <motion.div
                key={delay}
                aria-hidden
                style={{ ...styles.ring, borderColor: s.ring, scale: ringBoost }}
                initial={{ opacity: 0.5 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay }}
              />
            ))}
          </>
        )}

        <AnimatePresence>
          {isConsidering && (
            <motion.div
              style={styles.thoughtBubble}
              initial={{ opacity: 0, scale: 0.5, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 6 }}
              transition={spring}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  style={styles.thoughtDot}
                  animate={reduceMotion ? {} : { y: [0, -4, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={styles.avatar}
          animate={{
            ...motionTarget,
            filter: `drop-shadow(0 6px 18px ${colorMix(s.ring)})`,
          }}
          transition={reduceMotion ? { duration: 0.1 } : state === 'encouraging' ? { ...spring, rotate: { duration: 0.6, ease: 'easeInOut' } } : spring}
        >
          <AnimatePresence mode="wait">
            <motion.svg
              key={state}
              viewBox="0 0 200 220"
              width={128}
              height={141}
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? {} : { scale: 0.92, opacity: 0 }}
              transition={spring}
            >
              <Figure state={state} blink={blink} mouthRy={mouthRy} reduceMotion={reduceMotion} />
            </motion.svg>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {burstId > 0 && state === 'celebrating' && (
            <Confetti key={burstId} reduceMotion={reduceMotion} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            style={styles.message}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -6 }}
            transition={softSpring}
          >
            {shownMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---- The figure ----------------------------------------------------------
// A head-and-shoulders illustration built from layered shapes: hair (back),
// garment/shoulders, neck, head, hair (front/bangs), then facial features.
// Coordinates assume a 200x220 viewBox with the head centered around
// (100, 90).

function Figure({ state, blink, mouthRy, reduceMotion }) {
  return (
    <g>
      {/* Hair — back layer (volume + length behind the shoulders) */}
      <path
        d="M 60 72 Q 44 22 100 18 Q 156 22 140 72
           Q 150 130 137 205 L 118 205
           Q 126 130 120 92 Q 116 56 100 56
           Q 84 56 80 92 Q 74 130 82 205 L 63 205
           Q 50 130 60 72 Z"
        fill="var(--hair)"
      />

      {/* Garment / shoulders */}
      <path
        d="M 58 220 Q 53 162 78 149 Q 90 141 100 141 Q 110 141 122 149
           Q 147 162 142 220 Z"
        fill="var(--garment)"
      />

      {/* Neck */}
      <rect x="86" y="122" width="28" height="30" rx="8" fill="var(--skin-shade)" />

      {/* Head */}
      <ellipse cx="100" cy="90" rx="41" ry="46" fill="var(--skin)" />

      {/* Hair — front fringe */}
      <path
        d="M 61 68 Q 100 30 139 68 Q 138 46 100 42 Q 62 46 61 68 Z"
        fill="var(--hair)"
      />

      {/* Blush */}
      <ellipse cx="69" cy="103" rx="9" ry="5.5" fill="var(--blush)" opacity="0.4" />
      <ellipse cx="131" cy="103" rx="9" ry="5.5" fill="var(--blush)" opacity="0.4" />

      {/* Nose */}
      <path d="M 100 94 Q 96 106 100 110 Q 103 111 106 109" stroke="var(--skin-shade)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <Face state={state} blink={blink} mouthRy={mouthRy} reduceMotion={reduceMotion} />
    </g>
  )
}

/** Small line-pair eyebrow. angle>0 furrows inward, angle<0 lifts (alert/warm). */
function Brow({ side, y = 68, angle = 0 }) {
  const cx = side === 'left' ? 82 : 118
  const rot = side === 'left' ? angle : -angle
  return (
    <motion.line
      x1={cx - 13} y1={y} x2={cx + 13} y2={y}
      stroke="var(--hair-shade)" strokeWidth="4.5" strokeLinecap="round"
      style={{ transformOrigin: `${cx}px ${y}px` }}
      animate={{ rotate: rot, y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    />
  )
}

/** Eye: sclera + iris + pupil + highlight + lash line, with gaze direction. */
function Eye({ cx, cy = 88, blink, narrow, pupil = [0, 0], drift }) {
  const scaleY = blink ? 0.06 : narrow ? 0.5 : 1
  return (
    <motion.g style={{ transformOrigin: `${cx}px ${cy}px` }} animate={{ scaleY }} transition={{ duration: 0.1 }}>
      <ellipse cx={cx} cy={cy} rx="11" ry="8" fill="var(--paper)" />
      <motion.g
        animate={drift ? { x: [-2, 2, -2] } : { x: pupil[0], y: pupil[1] }}
        transition={drift ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : { type: 'spring', stiffness: 200, damping: 20 }}
      >
        <circle cx={cx} cy={cy} r="5" fill="var(--iris)" />
        <circle cx={cx} cy={cy} r="2.3" fill="var(--ink)" />
        <circle cx={cx - 1.6} cy={cy - 1.8} r="1" fill="var(--paper)" />
      </motion.g>
      <path d={`M ${cx - 11} ${cy - 6} Q ${cx} ${cy - 12} ${cx + 11} ${cy - 6}`} stroke="var(--hair-shade)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </motion.g>
  )
}

function Face({ state, blink, mouthRy, reduceMotion }) {
  const lips = 'var(--lips)'

  if (state === 'celebrating') {
    return (
      <g>
        <path d="M 71 84 Q 82 72 93 84" stroke="var(--hair-shade)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 107 84 Q 118 72 129 84" stroke="var(--hair-shade)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 78 118 Q 100 144 122 118 Q 100 130 78 118 Z" fill={lips} />
        <path d="M 84 120 Q 100 128 116 120 Q 100 124 84 120 Z" fill="var(--paper)" />
      </g>
    )
  }

  if (state === 'thinking') {
    return (
      <g>
        <Brow side="left" y={68} angle={16} />
        <Brow side="right" y={68} angle={16} />
        <Eye cx={82} blink={false} narrow drift={!reduceMotion} />
        <Eye cx={118} blink={false} narrow drift={!reduceMotion} />
        <path d="M 90 120 Q 100 117 110 120" stroke={lips} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    )
  }

  if (state === 'thoughtful') {
    return (
      <g>
        <Brow side="left" y={67} angle={10} />
        <Brow side="right" y={67} angle={10} />
        <Eye cx={82} blink={blink} narrow pupil={[-1.4, 0]} />
        <Eye cx={118} blink={blink} narrow pupil={[-1.4, 0]} />
        <path d="M 87 119 Q 100 124 113 119" stroke={lips} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    )
  }

  if (state === 'gentle') {
    return (
      <g>
        <Brow side="left" y={67} angle={-12} />
        <Brow side="right" y={67} angle={-12} />
        <Eye cx={82} blink={blink} pupil={[0, 1]} />
        <Eye cx={118} blink={blink} pupil={[0, 1]} />
        <path d="M 89 121 Q 100 125 111 121" stroke={lips} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    )
  }

  if (state === 'encouraging') {
    return (
      <g>
        <Brow side="left" y={65} angle={-4} />
        <Brow side="right" y={65} angle={-4} />
        <Eye cx={82} blink={blink} />
        <Eye cx={118} blink={blink} />
        <path d="M 82 116 Q 100 132 118 116" stroke={lips} strokeWidth="5.5" strokeLinecap="round" fill="none" />
      </g>
    )
  }

  if (state === 'listening' || state === 'speaking') {
    return (
      <g>
        <Brow side="left" y={64} angle={-6} />
        <Brow side="right" y={64} angle={-6} />
        <Eye cx={82} blink={blink} pupil={[0, -0.6]} />
        <Eye cx={118} blink={blink} pupil={[0, -0.6]} />
        <motion.ellipse cx="100" cy="120" rx="9" ry={mouthRy} fill={lips} />
      </g>
    )
  }

  // idle
  return (
    <g>
      <Brow side="left" y={67} angle={0} />
      <Brow side="right" y={67} angle={0} />
      <Eye cx={82} blink={blink} />
      <Eye cx={118} blink={blink} />
      <path d="M 84 116 Q 100 128 116 116" stroke={lips} strokeWidth="5.5" strokeLinecap="round" fill="none" />
    </g>
  )
}

function Confetti({ reduceMotion }) {
  const pieces = useRef(
    Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4
      const dist = 50 + Math.random() * 34
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist * 0.7 - 10,
        rotate: (Math.random() - 0.5) * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.08,
      }
    })
  ).current

  if (reduceMotion) return null

  return (
    <>
      {pieces.map(p => (
        <motion.span
          key={p.id}
          aria-hidden
          style={{ ...styles.confetti, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1, rotate: p.rotate }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: p.delay }}
        />
      ))}
    </>
  )
}

function colorMix(cssVar) {
  return `color-mix(in srgb, ${cssVar} 40%, transparent)`
}

// ---- styles -------------------------------------------------------------

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    padding: '20px 20px 28px',
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--line)',
  },
  stage: {
    position: 'relative',
    width: 128,
    height: 141,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    inset: -20,
    borderRadius: '50%',
    filter: 'blur(16px)',
  },
  ring: {
    position: 'absolute',
    inset: 6,
    borderRadius: '50%',
    border: '2px solid',
  },
  avatar: {
    position: 'relative',
    width: 128,
    height: 141,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thoughtBubble: {
    position: 'absolute',
    top: -10,
    right: -10,
    display: 'flex',
    gap: 3,
    alignItems: 'center',
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 999,
    padding: '6px 8px',
    zIndex: 2,
  },
  thoughtDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--sage-deep)',
    display: 'inline-block',
  },
  confetti: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 6,
    height: 10,
    borderRadius: 2,
    zIndex: 3,
  },
  message: {
    fontSize: 15,
    color: 'var(--ink)',
    textAlign: 'center',
    margin: 0,
    maxWidth: 340,
    lineHeight: 1.5,
    minHeight: '1.5em',
  },
}
