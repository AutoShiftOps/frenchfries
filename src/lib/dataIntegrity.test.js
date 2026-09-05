// Guards the content itself: every module's data must have unique
// chapter/phrase ids (ChapterList and progress namespacing both rely on
// this) and, per the "pronunciation guide" feature, every item must carry
// a non-empty `pronunciation` string. Runs over every level in
// CHAPTERS_BY_LEVEL, so adding a real B1 later gets these checks for free.
import { describe, it, expect } from 'vitest'
import { CHAPTERS_BY_LEVEL } from '../data/chaptersByLevel'
import { MODULES } from './progressPath'

for (const [level, chaptersByModule] of Object.entries(CHAPTERS_BY_LEVEL)) {
  for (const [module, chapters] of Object.entries(chaptersByModule)) {
    describe(`${level} ${module} chapter data`, () => {
      it('has at least one chapter, each with at least one phrase', () => {
        expect(chapters.length).toBeGreaterThan(0)
        for (const ch of chapters) {
          expect(ch.phrases.length).toBeGreaterThan(0)
        }
      })

      it('has unique chapter ids', () => {
        const ids = chapters.map(c => c.id)
        expect(new Set(ids).size).toBe(ids.length)
      })

      it('has unique phrase ids within each chapter', () => {
        for (const ch of chapters) {
          const ids = ch.phrases.map(p => p.id)
          expect(new Set(ids).size).toBe(ids.length)
        }
      })

      it('gives every phrase a non-empty pronunciation guide', () => {
        for (const ch of chapters) {
          for (const p of ch.phrases) {
            expect(typeof p.pronunciation).toBe('string')
            expect(p.pronunciation.trim().length).toBeGreaterThan(0)
          }
        }
      })

      if (module === 'writing') {
        it('gives every prompt at least one accepted answer', () => {
          for (const ch of chapters) {
            for (const p of ch.phrases) {
              expect(Array.isArray(p.accepted)).toBe(true)
              expect(p.accepted.length).toBeGreaterThan(0)
            }
          }
        })
      }

      if (module === 'reading' || module === 'listening') {
        it('answerIndex always points at a real option', () => {
          for (const ch of chapters) {
            for (const p of ch.phrases) {
              expect(p.answerIndex).toBeGreaterThanOrEqual(0)
              expect(p.answerIndex).toBeLessThan(p.options.length)
            }
          }
        })
      }
    })
  }
}

describe('chapter ids are globally unique per module across levels', () => {
  // completed_phrases is namespaced `${module}:${chapterId}:${phraseId}` —
  // no level in the key — so two levels reusing a chapter id for the same
  // module would silently merge their progress. This is what would catch
  // that before it ever reaches production.
  for (const module of MODULES) {
    it(`${module}: no chapter id is reused across CEFR levels`, () => {
      const allIds = []
      for (const chaptersByModule of Object.values(CHAPTERS_BY_LEVEL)) {
        for (const ch of chaptersByModule[module] || []) allIds.push(ch.id)
      }
      expect(new Set(allIds).size).toBe(allIds.length)
    })
  }
})
