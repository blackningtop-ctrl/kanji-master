import { create } from 'zustand';
import { SRSCard, ReviewGrade, SRSStats } from '../types/srs';
import { reviewCard, createSRSCard, isDue } from '../engine/srs';
import { db, schema } from '../db/client';
import { eq, lte, and, sql } from 'drizzle-orm';

interface StudyState {
  // 현재 세션
  dueCards: SRSCard[];
  currentCardIndex: number;
  todayNewCount: number;
  todayReviewCount: number;
  isLoading: boolean;

  // 통계
  stats: SRSStats;
  streakDays: number;

  // 액션
  loadDueCards: () => Promise<void>;
  answerCard: (grade: ReviewGrade) => Promise<void>;
  addKanjiToStudy: (kanjiId: number) => Promise<void>;
  loadStats: () => Promise<void>;
  getCurrentCard: () => SRSCard | null;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  dueCards: [],
  currentCardIndex: 0,
  todayNewCount: 0,
  todayReviewCount: 0,
  isLoading: false,
  stats: { newCount: 0, learningCount: 0, reviewCount: 0, masteredCount: 0, dueCount: 0 },
  streakDays: 0,

  loadDueCards: async () => {
    set({ isLoading: true });
    try {
      const now = Date.now();
      const rows = await db
        .select()
        .from(schema.srsCards)
        .where(lte(schema.srsCards.nextReviewAt, now))
        .limit(50);

      const cards: SRSCard[] = rows.map((r) => ({
        id: r.id,
        kanjiId: r.kanjiId,
        state: r.state as SRSCard['state'],
        easeFactor: r.easeFactor,
        interval: r.interval,
        repetitions: r.repetitions,
        nextReviewAt: r.nextReviewAt,
        lastReviewedAt: r.lastReviewedAt,
        lapses: r.lapses,
      }));

      set({ dueCards: cards, currentCardIndex: 0, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  answerCard: async (grade: ReviewGrade) => {
    const { dueCards, currentCardIndex, todayReviewCount } = get();
    const card = dueCards[currentCardIndex];
    if (!card) return;

    const updated = reviewCard(card, grade);

    // DB 업데이트
    await db
      .update(schema.srsCards)
      .set({
        state: updated.state,
        easeFactor: updated.easeFactor,
        interval: updated.interval,
        repetitions: updated.repetitions,
        nextReviewAt: updated.nextReviewAt,
        lastReviewedAt: updated.lastReviewedAt,
        lapses: updated.lapses,
      })
      .where(eq(schema.srsCards.id, card.id));

    // 복습 기록 저장
    await db.insert(schema.reviewHistory).values({
      kanjiId: card.kanjiId,
      quizType: 'kanji-to-reading',
      correct: grade !== 'again',
      responseTimeMs: 0,
      reviewedAt: Date.now(),
    });

    set({
      currentCardIndex: currentCardIndex + 1,
      todayReviewCount: todayReviewCount + 1,
    });
  },

  addKanjiToStudy: async (kanjiId: number) => {
    const newCard = createSRSCard(kanjiId);
    await db.insert(schema.srsCards).values({
      kanjiId: newCard.kanjiId,
      state: newCard.state,
      easeFactor: newCard.easeFactor,
      interval: newCard.interval,
      repetitions: newCard.repetitions,
      nextReviewAt: newCard.nextReviewAt,
      lastReviewedAt: newCard.lastReviewedAt,
      lapses: newCard.lapses,
    });
  },

  loadStats: async () => {
    const now = Date.now();

    const countByState = await db
      .select({
        state: schema.srsCards.state,
        count: sql<number>`count(*)`,
      })
      .from(schema.srsCards)
      .groupBy(schema.srsCards.state);

    const dueResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.srsCards)
      .where(lte(schema.srsCards.nextReviewAt, now));

    const statsMap: Record<string, number> = {};
    for (const row of countByState) {
      statsMap[row.state] = row.count;
    }

    set({
      stats: {
        newCount: statsMap['new'] ?? 0,
        learningCount: statsMap['learning'] ?? 0,
        reviewCount: statsMap['review'] ?? 0,
        masteredCount: statsMap['mastered'] ?? 0,
        dueCount: dueResult[0]?.count ?? 0,
      },
    });
  },

  getCurrentCard: () => {
    const { dueCards, currentCardIndex } = get();
    return dueCards[currentCardIndex] ?? null;
  },
}));
