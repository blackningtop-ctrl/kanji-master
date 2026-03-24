/**
 * SM-2 기반 SRS (Spaced Repetition System) 엔진
 *
 * 에빙하우스 망각곡선에 기반하여 최적의 복습 시점을 계산합니다.
 * 정답 시 간격 확장, 오답 시 간격 초기화.
 */

import {
  SRSCard,
  SRSState,
  ReviewQuality,
  ReviewGrade,
  REVIEW_GRADE_TO_QUALITY,
  DEFAULT_EASE_FACTOR,
  MIN_EASE_FACTOR,
} from '../types/srs';

const DAY_MS = 24 * 60 * 60 * 1000;

/** SM-2 알고리즘으로 다음 복습 간격 및 ease factor 계산 */
export function computeNextReview(
  card: SRSCard,
  quality: ReviewQuality,
): { interval: number; easeFactor: number; state: SRSState; repetitions: number; lapses: number } {
  let { easeFactor, interval, repetitions, lapses } = card;

  // 오답 (quality < 3): 간격 초기화
  if (quality < 3) {
    return {
      interval: 1,
      easeFactor: Math.max(MIN_EASE_FACTOR, easeFactor - 0.2),
      state: 'learning',
      repetitions: 0,
      lapses: lapses + 1,
    };
  }

  // 정답: SM-2 공식으로 ease factor 업데이트
  const newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const clampedEF = Math.max(MIN_EASE_FACTOR, newEF);

  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 3;
  } else {
    newInterval = Math.round(interval * clampedEF);
  }

  // 마스터 판정: 30일 이상 간격이면 마스터
  const newState: SRSState = newInterval >= 30 ? 'mastered' : 'review';

  return {
    interval: newInterval,
    easeFactor: clampedEF,
    state: newState,
    repetitions: repetitions + 1,
    lapses,
  };
}

/** ReviewGrade 버튼으로부터 카드 업데이트 */
export function reviewCard(card: SRSCard, grade: ReviewGrade): SRSCard {
  const quality = REVIEW_GRADE_TO_QUALITY[grade];
  const result = computeNextReview(card, quality);
  const now = Date.now();

  return {
    ...card,
    state: result.state,
    easeFactor: result.easeFactor,
    interval: result.interval,
    repetitions: result.repetitions,
    lapses: result.lapses,
    lastReviewedAt: now,
    nextReviewAt: now + result.interval * DAY_MS,
  };
}

/** 새 SRS 카드 생성 */
export function createSRSCard(kanjiId: number): Omit<SRSCard, 'id'> {
  return {
    kanjiId,
    state: 'new',
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewAt: Date.now(),
    lastReviewedAt: null,
    lapses: 0,
  };
}

/** 복습이 필요한 카드인지 확인 */
export function isDue(card: SRSCard): boolean {
  return card.nextReviewAt <= Date.now();
}

/** 각 ReviewGrade 선택 시 예상 다음 복습일 미리보기 */
export function previewIntervals(card: SRSCard): Record<ReviewGrade, string> {
  const grades: ReviewGrade[] = ['again', 'hard', 'good', 'easy'];
  const result = {} as Record<ReviewGrade, string>;

  for (const grade of grades) {
    const quality = REVIEW_GRADE_TO_QUALITY[grade];
    const { interval } = computeNextReview(card, quality);
    result[grade] = formatInterval(interval);
  }

  return result;
}

/** 간격(일)을 사람이 읽기 좋은 형태로 변환 */
export function formatInterval(days: number): string {
  if (days < 1) return '< 1日';
  if (days === 1) return '1日';
  if (days < 7) return `${days}日`;
  if (days < 30) return `${Math.round(days / 7)}週`;
  if (days < 365) return `${Math.round(days / 30)}ヶ月`;
  return `${(days / 365).toFixed(1)}年`;
}
