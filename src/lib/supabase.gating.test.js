// @vitest-environment jsdom
//
// Covers the anonymous "glimpse" gating and progress-namespacing helpers
// from supabase.js — the pure/localStorage-backed logic, not the actual
// network calls to Supabase (those need a live project and are exercised
// by the manual test checklist instead).
import { describe, it, expect, beforeEach } from 'vitest'
import { canStartChapter, recordChapterStart, completedForModule } from './supabase'

beforeEach(() => {
  localStorage.clear()
})

describe('canStartChapter (anonymous glimpse: one chapter per module)', () => {
  it('always allows a signed-in session, regardless of what was started', () => {
    const session = { user: { id: 'user-1' } }
    recordChapterStart(null, 'reading', 'greetings')
    expect(canStartChapter(session, 'reading', 'ordering')).toBe(true)
  })

  it('allows the first chapter an anonymous learner picks in a module', () => {
    expect(canStartChapter(null, 'reading', 'greetings')).toBe(true)
  })

  it('keeps allowing the same chapter once recorded', () => {
    recordChapterStart(null, 'reading', 'greetings')
    expect(canStartChapter(null, 'reading', 'greetings')).toBe(true)
  })

  it('blocks a second, different chapter in the same module', () => {
    recordChapterStart(null, 'reading', 'greetings')
    expect(canStartChapter(null, 'reading', 'ordering')).toBe(false)
  })

  it('does not block a different module', () => {
    recordChapterStart(null, 'reading', 'greetings')
    expect(canStartChapter(null, 'listening', 'ordering')).toBe(true)
  })

  it('only ever records the first chapter picked per module', () => {
    recordChapterStart(null, 'writing', 'greetings')
    recordChapterStart(null, 'writing', 'ordering') // should be a no-op — slot already taken
    expect(canStartChapter(null, 'writing', 'greetings')).toBe(true)
    expect(canStartChapter(null, 'writing', 'ordering')).toBe(false)
  })
})

describe('completedForModule', () => {
  it('returns an empty object for null progress', () => {
    expect(completedForModule(null, 'speaking')).toEqual({})
  })

  it('strips the module prefix and only returns that module\'s keys', () => {
    const progress = {
      completed_phrases: {
        'speaking:greetings:p1': true,
        'reading:greetings:r1': true,
        'speaking:ordering:p2': true,
      },
    }
    expect(completedForModule(progress, 'speaking')).toEqual({
      'greetings:p1': true,
      'ordering:p2': true,
    })
  })
})
