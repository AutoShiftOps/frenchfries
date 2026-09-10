import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import AuthBar from './auth/AuthBar'
import { loadProgress } from '../lib/supabase'
import {
  buildLevelLadder, currentLevelId, computeModuleCounts,
  MODULES, PR_MILESTONE_LEVEL,
} from '../lib/progressPath'
import { findContinueTarget } from '../lib/continueTarget'
import { CHAPTERS_BY_LEVEL } from '../data/chaptersByLevel'

const MODULE_LABEL = { speaking: 'Speaking', reading: 'Reading', listening: 'Listening', writing: 'Writing' }

// The path canvas is a fixed design width, and the SVG below is drawn at
// that exact pixel size (never "100%" + viewBox scaling) — that scaling
// is what was pulling the drawn line away from the node circles sitting
// on top of it, since a scaled SVG and unscaled absolutely-positioned
// divs don't move together. Fixed 1:1 coordinates for both means a node
// is always exactly where its bit of trail ends, on every screen.
const PATH_WIDTH = 320
const PATH_HEIGHT = 720

// Six CEFR checkpoints, current level at the top down to the
// aspirational destination near the bottom — the reverse of the
// original top-down "climb toward the summit" ordering, flipped so the
// path reads in the same direction as the rest of the page: the "today"
// card right above it already puts your current level and next action
// first, so the path continuing top-to-bottom from "where you are" to
// "where you're headed" reads as one continuous line instead of
// doubling back. Static because the ladder's shape never changes, only
// which one is "current" does. y starts at 60, not 0, so a label
// sitting above the topmost node still has clearance instead of
// clipping off the top of the canvas.
const NODE_POS = [
  { x: 210, y: 60 },   // A1
  { x: 110, y: 150 },  // A2
  { x: 210, y: 240 },  // B1
  { x: 110, y: 330 },  // B2 — milestone, given more visual room
  { x: 210, y: 420 },  // C1
  { x: 110, y: 510 },  // C2
]

// A smooth vertical S-curve between each consecutive pair of nodes —
// control points sit at the curve's own midpoint, so it always leaves
// and arrives at a node dead-center, whatever the coordinates above are.
function curveBetween(p0, p1) {
  const midY = (p0.y + p1.y) / 2
  return `M${p0.x},${p0.y} C${p0.x},${midY} ${p1.x},${midY} ${p1.x},${p1.y}`
}
const SEGMENTS = NODE_POS.slice(0, -1).map((p, i) => curveBetween(p, NODE_POS[i + 1]))

function ModuleIcon({ id, color, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (id === 'speaking') return <svg {...common}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>
  if (id === 'reading') return <svg {...common}><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z" /><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" /></svg>
  if (id === 'listening') return <svg {...common}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2.5" y="14" width="5" height="7" rx="2" /><rect x="16.5" y="14" width="5" height="7" rx="2" /></svg>
  return <svg {...common}><path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19z" /><path d="M13 7l4 4" /></svg>
}

function FlagIcon({ color, size = 22, filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21V4" /><path d="M6 4h11l-3 4 3 4H6" />
    </svg>
  )
}

/**
 * The home screen, remapped from a 4-tile grid to a visible journey:
 * one destination that never scrolls out of view, one "you are here"
 * position, and the day's modules living inside that position rather
 * than beside it as equal-weight siblings. The trail itself carries the
 * story — lit and solid behind you, faint and dashed ahead — so the
 * single current node isn't doing all the work alone.
 */
export default function PathHome({ onSelectSkill, session }) {
  const [progress, setProgress] = useState(null)

  useEffect(() => { loadProgress(session).then(setProgress) }, [session])

  const ladder = useMemo(() => buildLevelLadder(progress, CHAPTERS_BY_LEVEL), [progress])
  const currentId = currentLevelId(ladder)
  const currentIndex = ladder.findIndex(l => l.id === currentId)
  const nextId = ladder[currentIndex + 1]?.id ?? null
  // Module chips and the "continue" target are always for the CURRENT
  // level's content — once A1 is finished and A2 becomes current, tapping
  // a module here opens that module's A2 chapters, not A1's.
  const currentLevelChapters = CHAPTERS_BY_LEVEL[currentId] || {}
  const continueTarget = useMemo(() => findContinueTarget(progress, currentLevelChapters), [progress, currentId])

  const moduleCounts = useMemo(() => {
    const out = {}
    for (const m of MODULES) out[m] = computeModuleCounts(progress, m, currentLevelChapters[m] || [])
    return out
  }, [progress, currentId])

  // Render top (current position) to bottom (aspirational, C2) — the
  // ladder itself is already ordered A1→C2, so no reversal needed here
  // (NODE_POS above is what was flipped).
  const displayLevels = useMemo(() => ladder, [ladder])
  const currentDisplayIndex = displayLevels.findIndex(l => l.id === currentId)
  const currentPos = NODE_POS[currentDisplayIndex] ?? NODE_POS[NODE_POS.length - 1]

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.wordmark}>FrenchFry</span>
      </div>

      <AuthBar session={session} />

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={styles.destinationCard}
      >
        <FlagIcon color="var(--gold)" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={styles.destinationEyebrow}>Your destination</span>
          <span style={styles.destinationTitle}>Conversational, PR&#8209;ready French</span>
        </div>
        <span style={styles.clbBadge}>&asymp; {ladder.find(l => l.id === PR_MILESTONE_LEVEL)?.clb}</span>
      </motion.div>

      {/* The actionable part of this screen — moved above the path
          graphic on purpose. The S-curve below is tall (a fixed 720px
          canvas so nodes and the drawn trail always line up), so on a
          normal screen its "you are here" node and the module chips
          used to sit below the fold — a learner landing on the app saw
          only the destination card and an empty-looking curve until
          they scrolled. This card is reachable with zero scrolling; the
          path below is now purely the "journey so far" visual. */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        style={styles.todayCard}
      >
        <p style={styles.todayEyebrow}>{currentId} &middot; today</p>
        <div style={styles.moduleRow}>
          {MODULES.map(m => {
            const { done, total } = moduleCounts[m]
            const isTarget = continueTarget?.module === m
            return (
              <button key={m} onClick={() => onSelectSkill(m)} style={styles.moduleChipWrap}>
                <div style={{ ...styles.moduleChip, ...(isTarget ? styles.moduleChipActive : {}) }}>
                  <ModuleIcon id={m} color={isTarget ? 'var(--cream)' : 'var(--ink)'} />
                </div>
                <span style={styles.moduleLabel}>{MODULE_LABEL[m]}</span>
                <span style={styles.moduleCount}>{done}/{total}</span>
              </button>
            )
          })}
        </div>

        {continueTarget ? (
          <button onClick={() => onSelectSkill(continueTarget.module)} style={styles.ctaBtn}>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
              <span style={styles.ctaEyebrow}>Continue &middot; {MODULE_LABEL[continueTarget.module]}</span>
              <span style={styles.ctaTitle}>{continueTarget.chapterTitle}</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        ) : (
          <p style={styles.allDone}>Every {currentId} chapter is done — beautiful work. The next level unlocks here as soon as it's built.</p>
        )}
      </motion.div>

      <div style={styles.pathArea}>
        {/* A soft, static glow anchored on the current position — depth
            cue, not motion, so it reads as "you're lit up here" rather
            than a drifting background. */}
        <div style={{ ...styles.pathGlow, left: currentPos.x, top: currentPos.y }} />

        <svg width={PATH_WIDTH} height={PATH_HEIGHT} viewBox={`0 0 ${PATH_WIDTH} ${PATH_HEIGHT}`} style={styles.pathSvg}>
          {SEGMENTS.map((d, i) => {
            // Segment i runs from node i (higher up the canvas, earlier
            // in the ladder — now the "already walked" side since
            // current sits at the top) down to node i+1. Lit when the
            // upper node is complete or current, i.e. the trail is solid
            // from A1 down through wherever you currently stand, and
            // dashed for everything still ahead below that.
            const upperLevel = displayLevels[i]
            const lit = upperLevel && (upperLevel.status === 'complete' || upperLevel.status === 'current')
            return (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={lit ? 'var(--terracotta)' : 'var(--line)'}
                strokeWidth={lit ? 5 : 3.5}
                strokeLinecap="round"
                strokeDasharray={lit ? undefined : '1 13'}
                opacity={lit ? 0.9 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: lit ? 0.9 : 1 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
              />
            )
          })}
        </svg>

        {displayLevels.map((level, i) => {
          const pos = NODE_POS[i]
          const isCurrent = level.id === currentId
          const isNext = level.id === nextId
          const isMilestone = level.id === PR_MILESTONE_LEVEL

          if (isCurrent) {
            // Framer-motion takes ownership of the CSS `transform` property
            // on any element it animates scale/x/y on — a plain
            // `transform: 'translate(-50%,-50%)'` string passed through
            // `style` gets silently dropped the moment `animate` includes
            // scale or y, leaving the element positioned by its top-left
            // corner instead of centered (this was the "path seems broken
            // and misaligned" bug: the node visually detached from the
            // curve's start point). Fix: keep the centering transform on a
            // plain, unanimated wrapper div — exactly the split the
            // locked/milestone nodes below already use — and let the
            // motion element itself own only the animation.
            return (
              <div key={level.id}>
                <div style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)' }}>
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                    style={styles.nodeCurrent}
                  >
                    <div style={styles.nodeCurrentInner}>
                      <span style={styles.nodeCurrentLabel}>{level.id}</span>
                    </div>
                  </motion.div>
                </div>
                <div style={{ position: 'absolute', left: pos.x, top: pos.y + 58, transform: 'translateX(-50%)' }}>
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    style={styles.hereBadge}
                  >
                    &#9679;&nbsp; You are here
                  </motion.span>
                </div>
              </div>
            )
          }

          if (isMilestone) {
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
              >
                <div style={{ ...styles.nodeMilestoneGlow, left: pos.x, top: pos.y }} />
                <div style={{ ...styles.nodeMilestone, left: pos.x, top: pos.y }}>
                  <FlagIcon color="var(--gold)" size={20} filled />
                </div>
                <span style={{ ...styles.milestoneLabel, left: pos.x, top: pos.y + 34 }}>
                  {level.id} &middot; Express Entry bonus
                </span>
              </motion.div>
            )
          }

          const size = isNext ? 44 : 32
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
            >
              <div
                style={{
                  ...styles.nodeLocked,
                  left: pos.x, top: pos.y,
                  width: size, height: size,
                  ...(isNext ? styles.nodeNext : {}),
                }}
              >
                <ModuleIcon id="speaking" size={isNext ? 17 : 13} color={isNext ? '#8a6d3f' : 'var(--ink-soft)'} />
              </div>
              <span style={{
                ...styles.nodeLabel,
                left: pos.x,
                top: pos.y - (isNext ? 42 : 36),
                color: isNext ? '#8a6d3f' : 'var(--ink-soft)',
              }}>
                {isNext ? `${level.id} · next` : level.id}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '24px 20px 20px',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 4,
  },
  wordmark: {
    fontFamily: 'var(--font-display)',
    fontStyle: 'italic',
    fontWeight: 600,
    fontSize: 20,
    color: 'var(--terracotta-deep)',
  },
  destinationCard: {
    marginTop: 14,
    background: 'var(--cream-deep)',
    borderRadius: 'var(--radius-md)',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  destinationEyebrow: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
  },
  destinationTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 14.5,
    fontWeight: 500,
    color: 'var(--ink)',
  },
  clbBadge: {
    marginLeft: 'auto',
    flexShrink: 0,
    fontSize: 10.5,
    fontWeight: 700,
    color: 'var(--cream)',
    background: 'var(--gold)',
    borderRadius: 999,
    padding: '4px 9px',
  },
  todayCard: {
    marginTop: 14,
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 16px 14px',
  },
  todayEyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--ink-soft)',
    margin: '0 0 12px',
  },
  moduleRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 16,
  },
  pathArea: {
    position: 'relative',
    marginTop: 4,
    width: PATH_WIDTH,
    height: PATH_HEIGHT,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pathGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    marginLeft: -160,
    marginTop: -160,
    borderRadius: '50%',
    background: 'radial-gradient(circle, color-mix(in srgb, var(--terracotta) 26%, transparent) 0%, transparent 68%)',
    pointerEvents: 'none',
  },
  pathSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  nodeCurrent: {
    // No position/left/top/transform here — framer-motion owns this
    // element's transform (it animates scale), so centering now lives on
    // the plain wrapper div in the render method instead. See the
    // comment at the isCurrent branch above.
    width: 78,
    height: 78,
    borderRadius: '50%',
    background: 'linear-gradient(155deg, var(--terracotta-deep), var(--terracotta))',
    boxShadow: '0 0 0 8px color-mix(in srgb, var(--terracotta) 22%, transparent), 0 12px 28px -8px color-mix(in srgb, var(--terracotta) 70%, transparent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCurrentInner: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCurrentLabel: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 20,
    color: 'var(--cream)',
  },
  hereBadge: {
    // No position/left/top/transform here — same reason as nodeCurrent
    // above (framer-motion animates opacity/y on this element, so it
    // owns transform); centering lives on the wrapper div instead.
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--terracotta-deep)',
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 999,
    padding: '3px 10px',
    whiteSpace: 'nowrap',
  },
  moduleChipWrap: {
    border: 'none',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    width: 78,
  },
  moduleChip: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: 'var(--white)',
    border: '1.5px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleChipActive: {
    background: 'var(--terracotta)',
    border: 'none',
    boxShadow: '0 4px 10px -3px color-mix(in srgb, var(--terracotta) 60%, transparent)',
  },
  moduleLabel: {
    fontSize: 9.5,
    fontWeight: 700,
    color: 'var(--ink)',
  },
  moduleCount: {
    fontSize: 8.5,
    color: 'var(--ink-soft)',
  },
  nodeLocked: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    borderRadius: '50%',
    border: '2px solid var(--line)',
    background: 'var(--cream)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeNext: {
    border: '2.5px solid #c9a97a',
    background: 'var(--cream-deep)',
  },
  nodeMilestone: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    width: 52,
    height: 52,
    borderRadius: '50%',
    background: 'linear-gradient(155deg, var(--cream-deep), var(--cream))',
    border: '2px solid var(--gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeMilestoneGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    marginLeft: -50,
    marginTop: -50,
    borderRadius: '50%',
    background: 'radial-gradient(circle, color-mix(in srgb, var(--gold) 30%, transparent) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  milestoneLabel: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 700,
    color: 'var(--gold)',
    whiteSpace: 'nowrap',
  },
  nodeLabel: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  ctaBtn: {
    width: '100%',
    border: 'none',
    borderRadius: 999,
    background: 'var(--ink)',
    color: 'var(--cream)',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaEyebrow: {
    fontSize: 9.5,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 15,
    fontWeight: 500,
  },
  allDone: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    textAlign: 'center',
    marginTop: 8,
  },
}
