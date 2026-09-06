// Guards the practice-exam content itself, mirroring dataIntegrity.test.js
// for CHAPTERS_BY_LEVEL: every level must have the required number of
// sets, every set's questions must have unique ids and valid shapes for
// their type, and no id may collide across levels (exam results are keyed
// by exam.id alone — see saveExamResult in supabase.js — so a collision
// would silently merge two different learners' unrelated scores).
import { describe, it, expect } from 'vitest'
import { EXAMS_BY_LEVEL, EXAM_DIFFICULTY_LABELS } from '../data/examsByLevel'

const MIN_SETS_PER_LEVEL = 6

for (const [level, sets] of Object.entries(EXAMS_BY_LEVEL)) {
  describe(`${level} practice exams`, () => {
    it(`has at least ${MIN_SETS_PER_LEVEL} sets`, () => {
      expect(sets.length).toBeGreaterThanOrEqual(MIN_SETS_PER_LEVEL)
    })

    it('has unique set ids', () => {
      const ids = sets.map(s => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('covers a distinct difficulty label per set, in the standard order', () => {
      const labels = sets.map(s => s.difficulty)
      expect(labels).toEqual(EXAM_DIFFICULTY_LABELS.slice(0, sets.length))
    })

    it('gives every set at least one question of each auto-gradable type', () => {
      for (const set of sets) {
        const types = new Set(set.questions.map(q => q.type))
        expect(types.has('reading')).toBe(true)
        expect(types.has('listening')).toBe(true)
        expect(types.has('writing')).toBe(true)
      }
    })

    it('has unique question ids within each set', () => {
      for (const set of sets) {
        const ids = set.questions.map(q => q.id)
        expect(new Set(ids).size).toBe(ids.length)
      }
    })

    it('gives every question a non-empty pronunciation guide', () => {
      for (const set of sets) {
        for (const q of set.questions) {
          expect(typeof q.pronunciation).toBe('string')
          expect(q.pronunciation.trim().length).toBeGreaterThan(0)
        }
      }
    })

    it('reading/listening questions have a valid answerIndex', () => {
      for (const set of sets) {
        for (const q of set.questions) {
          if (q.type !== 'reading' && q.type !== 'listening') continue
          expect(q.answerIndex).toBeGreaterThanOrEqual(0)
          expect(q.answerIndex).toBeLessThan(q.options.length)
        }
      }
    })

    it('writing questions have at least one accepted answer', () => {
      for (const set of sets) {
        for (const q of set.questions) {
          if (q.type !== 'writing') continue
          expect(Array.isArray(q.accepted)).toBe(true)
          expect(q.accepted.length).toBeGreaterThan(0)
        }
      }
    })
  })
}

describe('exam set ids are globally unique across levels', () => {
  it('no set id is reused across CEFR levels', () => {
    const allIds = Object.values(EXAMS_BY_LEVEL).flatMap(sets => sets.map(s => s.id))
    expect(new Set(allIds).size).toBe(allIds.length)
  })
})
