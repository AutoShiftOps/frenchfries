// Phase 2 — the CEFR ladder + approximate Canadian-benchmark crosswalk.
// Pure, framework-free functions so the math is unit-testable without
// mounting any component.
//
// The CLB numbers are a widely-cited APPROXIMATE crosswalk between CEFR
// and Canada's CLB/NCLC scale, not an official equivalence — IRCC scores
// Express Entry French ability from actual TEF Canada / TCF Canada results,
// not from this app. Every place this ladder is shown must carry that
// disclaimer; the value here is "know where you roughly stand and what's
// next," not a certified score.

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const CLB_CROSSWALK = {
  A1: 'CLB 1–2',
  A2: 'CLB 3–4',
  B1: 'CLB 5–6',
  B2: 'CLB 7–8',
  C1: 'CLB 9',
  C2: 'CLB 10+',
}

// CLB 7 is the commonly-cited Express Entry French-bonus threshold
// (French/English bilingual points) — surfaced only under the PR framing.
export const PR_MILESTONE_LEVEL = 'B2'

export const MODULES = ['speaking', 'reading', 'listening', 'writing']

/** Raw {done, total} phrase counts for one module, given its chapter set. */
export function computeModuleCounts(progress, module, chapters) {
  const completed = progress?.completed_phrases || {}
  let total = 0
  let done = 0
  for (const ch of chapters) {
    for (const p of ch.phrases) {
      total += 1
      if (completed[`${module}:${ch.id}:${p.id}`]) done += 1
    }
  }
  return { done, total }
}

/** Fraction (0–1) of one module's phrases completed, given its chapter set. */
export function computeModulePct(progress, module, chapters) {
  const { done, total } = computeModuleCounts(progress, module, chapters)
  return total > 0 ? done / total : 0
}

/**
 * Builds the full ladder for display, given a { [levelId]: { [module]:
 * chapters } } map of what content actually exists (see
 * src/data/chaptersByLevel.js). A level is:
 *  - 'locked' with reason 'no-content' if nothing's been built for it yet
 *  - 'locked' with reason 'prior-incomplete' if it exists but an earlier
 *    level still isn't finished — levels unlock in order
 *  - 'current' if it's the first not-yet-finished level with real content
 *  - 'complete' once every module in it hits 100%
 * This used to hard-code "only A1 is real"; now any level present in
 * chaptersByLevel behaves the same way, so a real A2/B1/etc. just works.
 */
export function buildLevelLadder(progress, chaptersByLevel) {
  let priorComplete = true

  return CEFR_LEVELS.map((level) => {
    const chaptersByModule = chaptersByLevel[level]

    if (!chaptersByModule) {
      priorComplete = false
      return { id: level, clb: CLB_CROSSWALK[level], status: 'locked', reason: 'no-content', pct: 0, modulePcts: null }
    }

    if (!priorComplete) {
      return { id: level, clb: CLB_CROSSWALK[level], status: 'locked', reason: 'prior-incomplete', pct: 0, modulePcts: null }
    }

    const modulePcts = {}
    let total = 0
    for (const m of MODULES) {
      const chapters = chaptersByModule[m] || []
      modulePcts[m] = computeModulePct(progress, m, chapters)
      total += modulePcts[m]
    }
    const pct = MODULES.length > 0 ? total / MODULES.length : 0
    const complete = pct >= 1
    priorComplete = complete

    return { id: level, clb: CLB_CROSSWALK[level], status: complete ? 'complete' : 'current', pct, modulePcts }
  })
}

/** id of the level the learner should be shown as "you are here". */
export function currentLevelId(ladder) {
  const current = ladder.find(l => l.status === 'current')
  return current ? current.id : ladder[0]?.id
}
