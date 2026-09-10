import { describe, it, expect } from 'vitest'
import { chunkChapters, buildSubLevelLadder, currentSubLevelIndex, annotateChaptersWithSubLevel } from './subLevels'

const chapter = (id, phraseCount) => ({
  id,
  title: id,
  phrases: Array.from({ length: phraseCount }, (_, i) => ({ id: `${id}-p${i}` })),
})

// 6 chapters per module, so chunking into 3 sub-levels is exactly even
// (2 chapters each) — keeps the fixtures below easy to reason about.
const chaptersByModule = {
  speaking: [chapter('s1', 1), chapter('s2', 1), chapter('s3', 1), chapter('s4', 1), chapter('s5', 1), chapter('s6', 1)],
  reading: [chapter('r1', 1), chapter('r2', 1), chapter('r3', 1), chapter('r4', 1), chapter('r5', 1), chapter('r6', 1)],
  listening: [chapter('l1', 1), chapter('l2', 1), chapter('l3', 1), chapter('l4', 1), chapter('l5', 1), chapter('l6', 1)],
  writing: [chapter('w1', 1), chapter('w2', 1), chapter('w3', 1), chapter('w4', 1), chapter('w5', 1), chapter('w6', 1)],
}

function completedFlags(pairs) {
  const out = {}
  for (const [module, chapterId, phraseId] of pairs) out[`${module}:${chapterId}:${phraseId}`] = true
  return { completed_phrases: out }
}

describe('chunkChapters', () => {
  it('splits an even list into equal contiguous groups', () => {
    const groups = chunkChapters(chaptersByModule.speaking, 3)
    expect(groups.map(g => g.map(c => c.id))).toEqual([
      ['s1', 's2'], ['s3', 's4'], ['s5', 's6'],
    ])
  })

  it('handles a count that does not divide evenly without dropping chapters', () => {
    const chapters = [chapter('a'), chapter('b'), chapter('c'), chapter('d'), chapter('e')]
    const groups = chunkChapters(chapters, 3)
    expect(groups.flat().map(c => c.id)).toEqual(['a', 'b', 'c', 'd', 'e'])
    expect(groups.every(g => g.length > 0)).toBe(true)
  })

  it('returns n empty groups for an empty chapter list', () => {
    expect(chunkChapters([], 3)).toEqual([[], [], []])
  })
})

describe('buildSubLevelLadder', () => {
  it('with no progress, only the first sub-level is current — the rest are locked', () => {
    const ladder = buildSubLevelLadder(null, chaptersByModule)
    expect(ladder.map(s => s.status)).toEqual(['current', 'locked', 'locked'])
  })

  it('does not unlock sub-level 2 until EVERY module finishes sub-level 1', () => {
    // Speaking and reading finish their first-third chapters, but
    // listening and writing don't — sub-level 2 must stay locked.
    const progress = completedFlags([
      ['speaking', 's1', 's1-p0'], ['speaking', 's2', 's2-p0'],
      ['reading', 'r1', 'r1-p0'], ['reading', 'r2', 'r2-p0'],
    ])
    const ladder = buildSubLevelLadder(progress, chaptersByModule)
    expect(ladder[0].status).toBe('current')
    expect(ladder[1].status).toBe('locked')
  })

  it('unlocks sub-level 2 once all four modules finish sub-level 1', () => {
    const progress = completedFlags([
      ['speaking', 's1', 's1-p0'], ['speaking', 's2', 's2-p0'],
      ['reading', 'r1', 'r1-p0'], ['reading', 'r2', 'r2-p0'],
      ['listening', 'l1', 'l1-p0'], ['listening', 'l2', 'l2-p0'],
      ['writing', 'w1', 'w1-p0'], ['writing', 'w2', 'w2-p0'],
    ])
    const ladder = buildSubLevelLadder(progress, chaptersByModule)
    expect(ladder[0].status).toBe('complete')
    expect(ladder[1].status).toBe('current')
    expect(ladder[2].status).toBe('locked')
  })
})

describe('currentSubLevelIndex', () => {
  it('returns the index of the current sub-level', () => {
    const ladder = buildSubLevelLadder(null, chaptersByModule)
    expect(currentSubLevelIndex(ladder)).toBe(0)
  })

  it('returns the last index once every sub-level is complete', () => {
    const allDone = completedFlags(
      Object.entries(chaptersByModule).flatMap(([module, chapters]) =>
        chapters.flatMap(ch => ch.phrases.map(p => [module, ch.id, p.id]))
      )
    )
    const ladder = buildSubLevelLadder(allDone, chaptersByModule)
    expect(currentSubLevelIndex(ladder)).toBe(2)
  })
})

describe('annotateChaptersWithSubLevel', () => {
  it('locks chapters beyond the unlocked sub-level', () => {
    const annotated = annotateChaptersWithSubLevel(chaptersByModule.speaking, 0)
    expect(annotated.map(c => ({ id: c.id, subLevel: c.subLevel, locked: c.locked }))).toEqual([
      { id: 's1', subLevel: 1, locked: false },
      { id: 's2', subLevel: 1, locked: false },
      { id: 's3', subLevel: 2, locked: true },
      { id: 's4', subLevel: 2, locked: true },
      { id: 's5', subLevel: 3, locked: true },
      { id: 's6', subLevel: 3, locked: true },
    ])
  })

  it('unlocks everything once the unlocked index reaches the last sub-level', () => {
    const annotated = annotateChaptersWithSubLevel(chaptersByModule.speaking, 2)
    expect(annotated.every(c => !c.locked)).toBe(true)
  })
})
