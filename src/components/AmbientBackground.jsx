// A quiet backdrop: soft, static color fields that lean gently toward the
// cursor. No looping scale/rotate animation — on a dark theme a color field
// that keeps pulsing reads as "the background is moving", which is
// distracting rather than alive. The only motion here is a subtle, damped
// response to where the person's attention already is.
//
// Fixed, behind everything, non-interactive (pointer-events: none).

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const BLOBS = [
  { color: 'var(--terracotta)', size: 560, top: '-12%', left: '-10%', parallax: 8 },
  { color: 'var(--gold)', size: 460, top: '58%', left: '80%', parallax: -6 },
  { color: 'var(--sage)', size: 480, top: '82%', left: '2%', parallax: 6 },
]

export default function AmbientBackground() {
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // Slow, heavily damped spring — the field settles rather than chases,
  // so it never reads as continuous background motion.
  const smoothX = useSpring(mouseX, { stiffness: 18, damping: 26 })
  const smoothY = useSpring(mouseY, { stiffness: 18, damping: 26 })

  useEffect(() => {
    if (reduceMotion) return
    const onMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduceMotion, mouseX, mouseY])

  return (
    <div style={styles.frame} aria-hidden>
      {BLOBS.map((b, i) => (
        <Blob key={i} blob={b} mouseX={smoothX} mouseY={smoothY} />
      ))}
      <div style={styles.grain} />
    </div>
  )
}

function Blob({ blob, mouseX, mouseY }) {
  const x = useTransformParallax(mouseX, blob.parallax)
  const y = useTransformParallax(mouseY, blob.parallax)

  return (
    <motion.div
      style={{
        ...styles.blob,
        width: blob.size,
        height: blob.size,
        top: blob.top,
        left: blob.left,
        background: blob.color,
        x,
        y,
      }}
    />
  )
}

// Small helper: derive a parallax-scaled motion value without re-creating
// a transformer on every render.
function useTransformParallax(source, factor) {
  const output = useMotionValue(0)
  useEffect(() => {
    const unsub = source.on('change', v => output.set(v * factor))
    return unsub
  }, [source, factor, output])
  return output
}

const styles = {
  frame: {
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    zIndex: -1,
    pointerEvents: 'none',
  },
  blob: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(90px)',
    opacity: 0.14,
  },
  grain: {
    position: 'absolute',
    inset: 0,
    opacity: 0.035,
    mixBlendMode: 'multiply',
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  },
}
