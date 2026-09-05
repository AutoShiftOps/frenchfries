import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { buildLevelLadder, currentLevelId, CEFR_LEVELS, MODULES, PR_MILESTONE_LEVEL } from '../lib/progressPath'
import { CHAPTERS_BY_LEVEL } from '../data/chaptersByLevel'

const MODULE_LABEL = { speaking: 'Speaking', reading: 'Reading', listening: 'Listening', writing: 'Writing' }

/**
 * The rider-and-elephant path: a visible ladder from "just arrived" to a
 * Canadian-benchmark destination, so a first-time visitor sees the whole
 * shape of the journey and exactly where they stand on it right now.
 * Goal toggle changes framing/copy only — the ladder itself never changes.
 */
export default function ProgressMap({ progress }) {
  const [goal, setGoal] = useState('general') // 'general' | 'pr'

  const ladder = useMemo(() => buildLevelLadder(progress, CHAPTERS_BY_LEVEL), [progress])
  const currentId = currentLevelId(ladder)

  return (
    <div style={styles.wrap}>
      <div style={styles.headRow}>
        <div>
          <p style={styles.eyebrow}>Your path</p>
          <p style={styles.heading}>
            {goal === 'pr'
              ? `From here to a Canadian PR-ready French level`
              : `From here to real conversational French`}
          </p>
        </div>
        <div style={styles.toggle}>
          <button
            onClick={() => setGoal('general')}
            style={{ ...styles.toggleBtn, ...(goal === 'general' ? styles.toggleActive : {}) }}
          >
            Learning for myself
          </button>
          <button
            onClick={() => setGoal('pr')}
            style={{ ...styles.toggleBtn, ...(goal === 'pr' ? styles.toggleActive : {}) }}
          >
            Canadian PR track
          </button>
        </div>
      </div>

      <div style={styles.ladder}>
        {ladder.map((lv, i) => {
          const isCurrent = lv.id === currentId
          const isMilestone = goal === 'pr' && lv.id === PR_MILESTONE_LEVEL
          const previousLevelId = CEFR_LEVELS[i - 1]
          return (
            <div key={lv.id} style={styles.rung}>
              <div style={styles.rungLeft}>
                <div
                  style={{
                    ...styles.dot,
                    ...(lv.status === 'complete' ? styles.dotComplete : {}),
                    ...(isCurrent ? styles.dotCurrent : {}),
                  }}
                />
                {lv.id !== 'C2' && <div style={styles.connector} />}
              </div>

              <div style={styles.rungBody}>
                <div style={styles.rungTop}>
                  <span style={{ ...styles.levelId, ...(isCurrent ? { color: 'var(--terracotta-deep)' } : {}) }}>
                    {lv.id}
                  </span>
                  <span style={styles.clb}>≈ {lv.clb}</span>
                  {isCurrent && <span style={styles.here}>You are here</span>}
                  {isMilestone && <span style={styles.milestone}>Express Entry French bonus threshold</span>}
                </div>

                {lv.status === 'locked' ? (
                  <p style={styles.locked}>
                    {lv.reason === 'no-content'
                      ? "Content for this level isn't built yet."
                      : `Unlocks once ${previousLevelId} is finished.`}
                  </p>
                ) : (
                  <div style={styles.moduleGrid}>
                    {MODULES.map(m => (
                      <div key={m} style={styles.moduleRow}>
                        <span style={styles.moduleLabel}>{MODULE_LABEL[m]}</span>
                        <div style={styles.moduleTrack}>
                          <div style={{ ...styles.moduleFill, width: `${(lv.modulePcts[m] * 100).toFixed(0)}%` }} />
                        </div>
                        <span style={styles.modulePct}>{Math.round(lv.modulePcts[m] * 100)}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p style={styles.disclaimer}>
        Levels are self-study progress, cross-walked to CLB/NCLC as an approximate guide — not an
        official assessment. Canadian PR French points come from your actual TEF Canada or TCF Canada result.
      </p>
    </div>
  )
}

const styles = {
  wrap: {
    marginTop: 40,
    paddingTop: 32,
    borderTop: '1px solid var(--line)',
  },
  headRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 28,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--terracotta-deep)',
    margin: '0 0 4px',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    color: 'var(--ink)',
    margin: 0,
    maxWidth: 380,
  },
  toggle: {
    display: 'flex',
    gap: 6,
    background: 'var(--cream-deep)',
    borderRadius: 999,
    padding: 4,
  },
  toggleBtn: {
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-soft)',
    fontSize: 12,
    fontWeight: 600,
    padding: '8px 14px',
    borderRadius: 999,
    whiteSpace: 'nowrap',
  },
  toggleActive: {
    background: 'var(--white)',
    color: 'var(--ink)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
  },
  ladder: {
    display: 'flex',
    flexDirection: 'column',
  },
  rung: {
    display: 'flex',
    gap: 16,
  },
  rungLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: 'var(--line)',
    flexShrink: 0,
  },
  dotCurrent: {
    background: 'var(--terracotta)',
    boxShadow: '0 0 0 4px color-mix(in srgb, var(--terracotta) 20%, transparent)',
  },
  dotComplete: {
    background: 'var(--sage-deep)',
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 40,
    background: 'var(--line)',
    marginTop: 2,
  },
  rungBody: {
    flex: 1,
    paddingBottom: 24,
  },
  rungTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  levelId: {
    fontFamily: 'var(--font-display)',
    fontSize: 17,
    fontWeight: 600,
    color: 'var(--ink)',
  },
  clb: {
    fontSize: 12,
    color: 'var(--ink-soft)',
  },
  here: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--terracotta-deep)',
    background: 'color-mix(in srgb, var(--terracotta) 12%, var(--white))',
    padding: '3px 8px',
    borderRadius: 999,
  },
  milestone: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.02em',
    color: 'var(--gold)',
  },
  moduleGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    maxWidth: 360,
  },
  moduleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  moduleLabel: {
    fontSize: 11,
    color: 'var(--ink-soft)',
    width: 62,
    flexShrink: 0,
  },
  moduleTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    background: 'var(--line)',
    overflow: 'hidden',
  },
  moduleFill: {
    height: '100%',
    borderRadius: 2,
    background: 'var(--terracotta)',
  },
  modulePct: {
    fontSize: 11,
    color: 'var(--ink-soft)',
    width: 32,
    textAlign: 'right',
    flexShrink: 0,
  },
  locked: {
    fontSize: 12,
    color: 'var(--ink-soft)',
    margin: 0,
  },
  disclaimer: {
    fontSize: 11,
    color: 'var(--ink-soft)',
    lineHeight: 1.5,
    marginTop: 4,
    maxWidth: 520,
  },
}
