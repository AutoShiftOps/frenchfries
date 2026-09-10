import { useState, useEffect, useMemo, useCallback } from 'react'
import { CHAPTERS_BY_LEVEL } from '../data/chaptersByLevel'
import { buildLevelLadder, currentLevelId, computeModuleCounts, MODULES, CLB_CROSSWALK } from '../lib/progressPath'
import { loadProgress, loadLeaderboard } from '../lib/supabase'
import { onProgressChange } from '../lib/progressBus'

const MODULE_LABEL = { speaking: 'Speaking', reading: 'Reading', listening: 'Listening', writing: 'Writing' }

// Wide-desktop-only right rail (≥1280px — see .app-summary in index.css).
// A quick-glance dashboard: where you stand right now plus who's ahead of
// you, so the extra width next to the main column earns its keep instead
// of sitting empty. Loads its own progress/leaderboard data rather than
// threading it down from App.jsx, since this is the only place that needs
// both at once and it's a small, infrequent read either way.
//
// This rail sits outside App.jsx's per-tab conditional rendering (see
// progressBus.js), so it mounts once for the whole session — without
// subscribing to progress changes it would only ever show whatever was
// true when the page first loaded, never a phrase just completed in
// Speaking a moment ago.
export default function SummaryPanel({ session }) {
  const [progress, setProgress] = useState(null)
  const [top, setTop] = useState(null)

  const refresh = useCallback(() => {
    loadProgress(session).then(setProgress)
    loadLeaderboard(3).then(setTop)
  }, [session])

  useEffect(() => {
    refresh()
    return onProgressChange(refresh)
  }, [refresh])

  const ladder = useMemo(() => buildLevelLadder(progress, CHAPTERS_BY_LEVEL), [progress])
  const levelId = currentLevelId(ladder)
  const chaptersByModule = CHAPTERS_BY_LEVEL[levelId] || {}
  const myId = session?.user?.id

  return (
    <aside className="app-summary" style={styles.wrap}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>Your level</p>
        <p style={styles.level}>{levelId}</p>
        <p style={styles.clb}>≈ {CLB_CROSSWALK[levelId]}</p>
      </div>

      <div style={styles.card}>
        <p style={styles.eyebrow}>This level's progress</p>
        {MODULES.map(m => {
          const { done, total } = computeModuleCounts(progress, m, chaptersByModule[m] || [])
          const pct = total > 0 ? done / total : 0
          return (
            <div key={m} style={styles.moduleRow}>
              <span style={styles.moduleLabel}>{MODULE_LABEL[m]}</span>
              <div style={styles.track}>
                <div style={{ ...styles.trackFill, width: `${pct * 100}%` }} />
              </div>
              <span style={styles.moduleCount}>{done}/{total}</span>
            </div>
          )
        })}
      </div>

      <div style={styles.card}>
        <p style={styles.eyebrow}>Leaderboard</p>
        {top === null && <p style={styles.status}>Loading…</p>}
        {top?.length === 0 && <p style={styles.status}>No one yet — be the first.</p>}
        {top && top.length > 0 && (
          <div style={styles.miniList}>
            {top.map((row, i) => (
              <div key={row.user_id} style={styles.miniRow}>
                <span style={styles.miniRank}>{i + 1}</span>
                <span style={styles.miniName}>{row.display_name}{row.user_id === myId ? ' (you)' : ''}</span>
                <span style={styles.miniCount}>{row.total_completed}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

const styles = {
  wrap: {
    // No `display` here on purpose — see the matching note in
    // Sidebar.jsx: .app-summary in index.css owns display (none by
    // default, flex only at >=1280px).
    flexDirection: 'column',
    gap: 16,
    padding: '28px 16px',
    height: '100dvh',
    overflowY: 'auto',
  },
  card: {
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-md)',
    padding: 16,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--ink-soft)',
    margin: '0 0 10px',
  },
  level: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 600,
    color: 'var(--terracotta)',
    margin: 0,
  },
  clb: {
    fontSize: 12,
    color: 'var(--ink-soft)',
    margin: '2px 0 0',
  },
  moduleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  moduleLabel: {
    fontSize: 12,
    color: 'var(--ink-soft)',
    width: 62,
    flexShrink: 0,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    background: 'var(--line)',
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
    background: 'var(--sage-deep)',
  },
  moduleCount: {
    fontSize: 11,
    color: 'var(--ink-soft)',
    width: 30,
    textAlign: 'right',
    flexShrink: 0,
  },
  status: {
    fontSize: 12,
    color: 'var(--ink-soft)',
    margin: 0,
  },
  miniList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  miniRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  miniRank: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--ink-soft)',
    width: 14,
  },
  miniName: {
    fontSize: 12,
    color: 'var(--ink)',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  miniCount: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--terracotta-deep)',
  },
}
