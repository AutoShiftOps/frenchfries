// Picks what the Home path screen's "Continue" CTA points at: the first
// module (in speaking → reading → listening → writing order, matching the
// app's existing "start with Speaking" guidance) that still has an
// unfinished chapter, and the first unfinished chapter within it. Pure and
// framework-free so it's unit-testable without mounting PathHome.
import { MODULES } from './progressPath'

/**
 * Which phrase/item index to open a chapter on: the first one not yet
 * completed, so re-opening a chapter you're partway through (shown as
 * e.g. "1/5" in the chapter list) resumes right after your last completed
 * one instead of restarting at the beginning every time. Falls back to
 * the last index if every phrase is already done (nothing left to land
 * on but the end), or 0 for an empty/unloaded chapter.
 */
export function resumeIndexForChapter(progress, module, chapter) {
  const completed = progress?.completed_phrases || {}
  const phrases = chapter?.phrases || []
  const firstUnfinished = phrases.findIndex(p => !completed[`${module}:${chapter.id}:${p.id}`])
  if (firstUnfinished === -1) return Math.max(phrases.length - 1, 0)
  return firstUnfinished
}

export function findContinueTarget(progress, chaptersByModule) {
  const completed = progress?.completed_phrases || {}

  for (const module of MODULES) {
    const chapters = chaptersByModule[module] || []
    for (const chapter of chapters) {
      const allDone = chapter.phrases.every(p => completed[`${module}:${chapter.id}:${p.id}`])
      if (!allDone) {
        return { module, chapterId: chapter.id, chapterTitle: chapter.title }
      }
    }
  }

  return null // every chapter in every module is complete
}
