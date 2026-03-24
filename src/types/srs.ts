export type SRSState = 'new' | 'learning' | 'review' | 'mastered';

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

/** User-facing review buttons mapped to SM-2 quality grades */
export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export const REVIEW_GRADE_TO_QUALITY: Record<ReviewGrade, ReviewQuality> = {
  again: 1,
  hard: 2,
  good: 3,
  easy: 5,
};

export interface SRSCard {
  id: number;
  kanjiId: number;
  state: SRSState;
  easeFactor: number;
  interval: number;       // days
  repetitions: number;
  nextReviewAt: number;   // timestamp ms
  lastReviewedAt: number | null;
  lapses: number;
}

export interface ReviewResult {
  cardId: number;
  quality: ReviewQuality;
  intervalBefore: number;
  intervalAfter: number;
  easeFactorBefore: number;
  easeFactorAfter: number;
  reviewedAt: number;
}

export interface SRSStats {
  newCount: number;
  learningCount: number;
  reviewCount: number;
  masteredCount: number;
  dueCount: number;
}

export const DEFAULT_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;
export const DEFAULT_DAILY_NEW_LIMIT = 5;
export const MIN_DAILY_NEW_LIMIT = 3;
export const MAX_DAILY_NEW_LIMIT = 15;

/** Interval ladder targets (days) */
export const INTERVAL_LADDER = [1, 3, 7, 14, 30, 90] as const;
