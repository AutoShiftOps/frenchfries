import { describe, it, expect } from 'vitest'
import { findContinueTarget, resumeIndexForChapter } from './continueTarget'

const chaptersByModule = {
  speaking: [
    { id: 'greetings', title: 'Greetings', phrases: [{ id: 'p1' }, { id: 'p2' }] },
    { id: 'ordering', title: 'Ordering', phrases: [{ id: 'p1' }, { id: 'p2' }] },
  ],
  reading: [
    { id: 'greetings', title: 'Greetings (reading)', phrases: [{ id: 'r1' }] },
  ],
  listening: [
    { id: 'greetings', title: 'Greetings (listening)', phrases: [{ id: 'l1' }] },
  ],
  writing: [
    { id: 'greetings', title: 'Greetings (writing)', phrases: [{ id: 'w1' }] },
  ],
}

describe('findContinueTarget', () => {
  it('with no progress at all, targets the first speaking chapter', () => {
    const target = findContinueTarget(null, chaptersByModule)
    expect(target).toEqual({ module: 'speaking', chapterId: 'greetings', chapterTitle: 'Greetings' })
  })

  it('moves to the next incomplete chapter within the same module', () => {
    const progress = {
      completed_phrases: {
        'speaking:greetings:p1': true,
        'speaking:greetings:p2': true,
      },
    }
    const target = findContinueTarget(progress, chaptersByModule)
    expect(target).toEqual({ module: 'speaking', chapterId: 'ordering', chapterTitle: 'Ordering' })
  })

  it('moves to the next module once speaking is fully complete', () => {
    const progress = {
      completed_phrases: {
        'speaking:greetings:p1': true,
        'speaking:greetings:p2': true,
        'speaking:ordering:p1': true,
        'speaking:ordering:p2': true,
      },
    }
    const target = findContinueTarget(progress, chaptersByModule)
    expect(target).toEqual({ module: 'reading', chapterId: 'greetings', chapterTitle: 'Greetings (reading)' })
  })

  it('returns null once every module is fully complete', () => {
    const progress = {
      completed_phrases: {
        'speaking:greetings:p1': true,
        'speaking:greetings:p2': true,
        'speaking:ordering:p1': true,
        'speaking:ordering:p2': true,
        'reading:greetings:r1': true,
        'listening:greetings:l1': true,
        'writing:greetings:w1': true,
      },
    }
    expect(findContinueTarget(progress, chaptersByModule)).toBeNull()
  })

  it('is unaffected by a module with no chapters at all', () => {
    const target = findContinueTarget(null, { ...chaptersByModule, speaking: [] })
    expect(target.module).toBe('reading')
  })
})

describe('resumeIndexForChapter', () => {
  const chapter = { id: 'greetings', phrases: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }] }

  it('with no progress, resumes at the first phrase', () => {
    expect(resumeIndexForChapter(null, 'speaking', chapter)).toBe(0)
  })

  it('resumes right after the last completed phrase, not from the start', () => {
    const progress = { completed_phrases: { 'speaking:greetings:p1': true } }
    expect(resumeIndexForChapter(progress, 'speaking', chapter)).toBe(1)
  })

  it('skips multiple completed phrases to land on the first unfinished one', () => {
    const progress = {
      completed_phrases: { 'speaking:greetings:p1': true, 'speaking:greetings:p2': true },
    }
    expect(resumeIndexForChapter(progress, 'speaking', chapter)).toBe(2)
  })

  it('lands on the last phrase once the whole chapter is complete', () => {
    const progress = {
      completed_phrases: {
        'speaking:greetings:p1': true,
        'speaking:greetings:p2': true,
        'speaking:greetings:p3': true,
      },
    }
    expect(resumeIndexForChapter(progress, 'speaking', chapter)).toBe(2)
  })

  it('is scoped by module — progress in another module does not count', () => {
    const progress = { completed_phrases: { 'reading:greetings:p1': true } }
    expect(resumeIndexForChapter(progress, 'speaking', chapter)).toBe(0)
  })
})
