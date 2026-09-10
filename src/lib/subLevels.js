// Sub-level gating within one CEFR level — inspired by Alliance
// Française's own course structure (A1.1/A1.2/A1.3, etc.), scoped down
// to a fixed 3 sub-levels per level rather than matching their exact
// (uneven, 3-to-8-per-level) counts, since FrenchFry's existing chapter
// content splits cleanly into thirds without needing new material.
//
// Gating philosophy matches buildLevelLadder's, one tier finer: a
// sub-level unlocks only once the PREVIOUS sub-level is 100% complete
// across every module, not per-module independently — so a learner
// can't race ahead in Speaking while Writing sits untouched. Chapters
// are grouped by their position in each module's existing chapter
// array (first third → sub-level 1, etc.), so nothing about the
// chapter data itself needs to change.
import { computeModulePct } from './progressPath'

export const SUB_LEVELS_PER_LEVEL = 3

/** Split a chapter array into `n` nearly-equal contiguous groups, in order. */
export function chunkChapters(chapters, n = SUB_LEVELS_PER_LEVEL) {
  const groups = Array.from({ length: n }, () => [])
  if (!chapters || chapters.length === 0) return groups
  chapters.forEach((ch, i) => {
    const bucket = Math.min(n - 1, Math.floor((i * n) / chapters.length))
    groups[bucket].push(ch)
  })
  return groups
}

/**
 * The sub-level ladder for ONE main CEFR level's chapter set
 * ({ [module]: chapters }, i.e. one entry of CHAPTERS_BY_LEVEL). Returns
 * `n` entries in order, each { index, pct, status }, status being
 * 'locked' | 'current' | 'complete' — same shape/spirit as
 * buildLevelLadder's per-level entries, just for sub-levels instead of
 * whole CEFR levels.
 */
export function buildSubLevelLadder(progress, chaptersByModule, n = SUB_LEVELS_PER_LEVEL) {
  const modules = Object.keys(chaptersByModule || {})
  const grouped = {}
  for (const m of modules) grouped[m] = chunkChapters(chaptersByModule[m] || [], n)

  let priorComplete = true
  const out = []
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (const m of modules) {
      sum += computeModulePct(progress, m, grouped[m][i] || [])
    }
    const pct = modules.length > 0 ? sum / modules.length : 0
    const complete = pct >= 1
    const status = !priorComplete ? 'locked' : (complete ? 'complete' : 'current')
    out.push({ index: i, pct, status })
    priorComplete = complete
  }
  return out
}

/** Index (0-based) of the sub-level a learner should be shown as "current". */
export function currentSubLevelIndex(subLadder) {
  const current = subLadder.find(s => s.status === 'current')
  if (current) return current.index
  // Every sub-level complete (or the ladder is empty) — treat the last
  // one as "unlocked" so nothing in a finished level renders as locked.
  return subLadder.length - 1
}

/**
 * Annotates one module's chapter list with `locked` + `subLevel` (1-based,
 * for display) based on the sub-level ladder for that CEFR level. Pure —
 * doesn't mutate the input chapters.
 */
export function annotateChaptersWithSubLevel(chapters, unlockedIndex, n = SUB_LEVELS_PER_LEVEL) {
  const groups = chunkChapters(chapters, n)
  return chapters.map(ch => {
    const bucket = groups.findIndex(g => g.some(c => c.id === ch.id))
    return { ...ch, subLevel: bucket + 1, locked: bucket > unlockedIndex }
  })
}
