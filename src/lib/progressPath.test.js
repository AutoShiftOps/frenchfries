import { describe, it, expect } from 'vitest'
import { computeModulePct, computeModuleCounts, buildLevelLadder, currentLevelId, CEFR_LEVELS, MODULES } from './progressPath'

const chapters = [
  { id: 'c1', phrases: [{ id: 'p1' }, { id: 'p2' }] },
  { id: 'c2', phrases: [{ id: 'p1' }, { id: 'p2' }] },
]

// Distinct chapter ids from `chapters` above — a real A2 level would
// never reuse A1's chapter ids, and neither should this fixture, or
// "completing A1" and "completing A2" collide on the same progress keys.
const chaptersLevel2 = [
  { id: 'c3', phrases: [{ id: 'p1' }, { id: 'p2' }] },
  { id: 'c4', phrases: [{ id: 'p1' }, { id: 'p2' }] },
]

describe('computeModuleCounts', () => {
  it('returns {done: 0, total} with no progress at all', () => {
    expect(computeModuleCounts(null, 'speaking', chapters)).toEqual({ done: 0, total: 4 })
  })

  it('counts completed phrases across every chapter in the module', () => {
    const progress = { completed_phrases: { 'speaking:c1:p1': true, 'speaking:c2:p2': true } }
    expect(computeModuleCounts(progress, 'speaking', chapters)).toEqual({ done: 2, total: 4 })
  })
})

describe('computeModulePct', () => {
  it('is 0 with no progress at all', () => {
    expect(computeModulePct(null, 'speaking', chapters)).toBe(0)
  })

  it('is 0.5 when half the phrases are completed', () => {
    const progress = { completed_phrases: { 'speaking:c1:p1': true, 'speaking:c1:p2': true } }
    expect(computeModulePct(progress, 'speaking', chapters)).toBe(0.5)
  })

  it('is 1 when every phrase across every chapter is completed', () => {
    const progress = {
      completed_phrases: {
        'speaking:c1:p1': true, 'speaking:c1:p2': true,
        'speaking:c2:p1': true, 'speaking:c2:p2': true,
      },
    }
    expect(computeModulePct(progress, 'speaking', chapters)).toBe(1)
  })

  it('ignores another module\'s completions (namespacing)', () => {
    const progress = { completed_phrases: { 'reading:c1:p1': true } }
    expect(computeModulePct(progress, 'speaking', chapters)).toBe(0)
  })
})

describe('buildLevelLadder', () => {
  const chaptersByModule = Object.fromEntries(MODULES.map(m => [m, chapters]))
  const chaptersByLevel = { A1: chaptersByModule }

  const completeAll = (module, chs) => {
    const out = {}
    for (const ch of chs) for (const p of ch.phrases) out[`${module}:${ch.id}:${p.id}`] = true
    return out
  }
  const a1CompletePhrases = Object.assign({}, ...MODULES.map(m => completeAll(m, chapters)))

  it('includes every CEFR level in order', () => {
    const ladder = buildLevelLadder(null, chaptersByLevel)
    expect(ladder.map(l => l.id)).toEqual(CEFR_LEVELS)
  })

  it('marks A1 as current with 0 progress when nothing is completed', () => {
    const ladder = buildLevelLadder(null, chaptersByLevel)
    const a1 = ladder.find(l => l.id === 'A1')
    expect(a1.status).toBe('current')
    expect(a1.pct).toBe(0)
  })

  it('marks every level after A1 as locked with reason "no-content" when nothing is built for it', () => {
    const ladder = buildLevelLadder(null, chaptersByLevel)
    for (const level of ladder.filter(l => l.id !== 'A1')) {
      expect(level.status).toBe('locked')
      expect(level.reason).toBe('no-content')
      expect(level.modulePcts).toBeNull()
    }
  })

  it('marks A1 complete once every module hits 100%', () => {
    const ladder = buildLevelLadder({ completed_phrases: a1CompletePhrases }, chaptersByLevel)
    const a1 = ladder.find(l => l.id === 'A1')
    expect(a1.status).toBe('complete')
    expect(a1.pct).toBe(1)
  })

  const chaptersByModuleLevel2 = Object.fromEntries(MODULES.map(m => [m, chaptersLevel2]))

  it('locks A2 with reason "prior-incomplete" when A2 has content but A1 is not yet finished', () => {
    const withA2 = { A1: chaptersByModule, A2: chaptersByModuleLevel2 }
    const ladder = buildLevelLadder(null, withA2)
    const a2 = ladder.find(l => l.id === 'A2')
    expect(a2.status).toBe('locked')
    expect(a2.reason).toBe('prior-incomplete')
  })

  it('unlocks A2 as current once A1 is finished and A2 content exists', () => {
    const withA2 = { A1: chaptersByModule, A2: chaptersByModuleLevel2 }
    const ladder = buildLevelLadder({ completed_phrases: a1CompletePhrases }, withA2)
    const a1 = ladder.find(l => l.id === 'A1')
    const a2 = ladder.find(l => l.id === 'A2')
    expect(a1.status).toBe('complete')
    expect(a2.status).toBe('current')
    expect(a2.pct).toBe(0)
  })
})

describe('currentLevelId', () => {
  it('returns the level flagged current', () => {
    const ladder = [
      { id: 'A1', status: 'complete' },
      { id: 'A2', status: 'current' },
      { id: 'B1', status: 'locked' },
    ]
    expect(currentLevelId(ladder)).toBe('A2')
  })

  it('falls back to the first level if none is current', () => {
    const ladder = [{ id: 'A1', status: 'locked' }]
    expect(currentLevelId(ladder)).toBe('A1')
  })
})
