import { create } from 'zustand';
import { getLevelFromXP, UserLevel, XP_REWARDS, ALL_BADGES, Badge } from '../types/gamification';
import { db, schema } from '../db/client';
import { eq, sql, and } from 'drizzle-orm';

interface GameState {
  level: UserLevel;
  totalXp: number;
  badges: Badge[];
  streakDays: number;
  todayStudied: boolean;

  loadProfile: () => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  updateStreak: () => Promise<void>;
  checkBadges: () => Promise<Badge[]>;
  getCollectionStats: () => Promise<{ grade: number; total: number; mastered: number }[]>;
}

export const useGameStore = create<GameState>((set, get) => ({
  level: { level: 1, xp: 0, xpForNext: 100, title: '入門者' },
  totalXp: 0,
  badges: [],
  streakDays: 0,
  todayStudied: false,

  loadProfile: async () => {
    const rows = await db.select().from(schema.userProfile).limit(1);
    if (rows.length === 0) {
      await db.insert(schema.userProfile).values({
        createdAt: Date.now(),
      });
      return;
    }
    const profile = rows[0];
    const level = getLevelFromXP(profile.xp);
    set({
      level,
      totalXp: profile.xp,
      streakDays: profile.streakDays,
    });
  },

  addXP: async (amount: number) => {
    const { totalXp } = get();
    const newXp = totalXp + amount;
    const newLevel = getLevelFromXP(newXp);

    await db
      .update(schema.userProfile)
      .set({ xp: newXp, level: newLevel.level })
      .where(eq(schema.userProfile.id, 1));

    set({ totalXp: newXp, level: newLevel });
  },

  updateStreak: async () => {
    const today = new Date().toISOString().split('T')[0];
    const rows = await db.select().from(schema.userProfile).limit(1);
    if (rows.length === 0) return;

    const profile = rows[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let newStreak = profile.streakDays;
    if (profile.lastStudyDate === today) {
      // Already studied today
      set({ todayStudied: true });
      return;
    } else if (profile.lastStudyDate === yesterday) {
      newStreak += 1;
    } else if (profile.lastStudyDate !== today) {
      newStreak = 1;
    }

    await db
      .update(schema.userProfile)
      .set({
        streakDays: newStreak,
        lastStudyDate: today,
      })
      .where(eq(schema.userProfile.id, 1));

    set({ streakDays: newStreak, todayStudied: true });

    // Streak XP bonus
    const { addXP } = get();
    await addXP(XP_REWARDS.streakBonus);
  },

  checkBadges: async () => {
    const newlyUnlocked: Badge[] = [];

    // Load already unlocked badges
    const existing = await db.select().from(schema.unlockedBadges);
    const unlockedIds = new Set(existing.map((b: { badgeId: string }) => b.badgeId));

    // Gather stats for condition checks
    const masteredByGrade: Record<number, number> = {};
    for (let g = 1; g <= 6; g++) {
      const rows = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.srsCards)
        .innerJoin(schema.kanji, eq(schema.srsCards.kanjiId, schema.kanji.id))
        .where(and(eq(schema.kanji.grade, g), eq(schema.srsCards.state, 'mastered')));
      masteredByGrade[g] = rows[0]?.count ?? 0;
    }
    const totalMastered = Object.values(masteredByGrade).reduce((a, b) => a + b, 0);

    const gradeTotal: Record<number, number> = { 1: 80, 2: 160, 3: 200, 4: 202, 5: 193, 6: 191 };

    const { streakDays } = get();

    // Review stats for accuracy & speed
    const reviewStats = await db
      .select({
        total: sql<number>`count(*)`,
        correct: sql<number>`sum(case when ${schema.reviewHistory.correct} = 1 then 1 else 0 end)`,
        avgTime: sql<number>`avg(${schema.reviewHistory.responseTimeMs})`,
      })
      .from(schema.reviewHistory);
    const totalReviews = reviewStats[0]?.total ?? 0;
    const totalCorrect = reviewStats[0]?.correct ?? 0;
    const avgTimeMs = reviewStats[0]?.avgTime ?? 9999;
    const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

    for (const badge of ALL_BADGES) {
      if (unlockedIds.has(badge.id)) continue;

      let met = false;
      const c = badge.condition;
      switch (c.type) {
        case 'grade_master':
          met = masteredByGrade[c.grade] >= (gradeTotal[c.grade] ?? 999);
          break;
        case 'streak':
          met = streakDays >= c.days;
          break;
        case 'total_mastered':
          met = totalMastered >= c.count;
          break;
        case 'quiz_accuracy':
          met = totalReviews >= c.minQuizzes && accuracy >= c.percent;
          break;
        case 'speed_king':
          met = totalReviews >= c.minQuizzes && avgTimeMs <= c.avgMs;
          break;
      }

      if (met) {
        const now = Date.now();
        await db.insert(schema.unlockedBadges).values({ badgeId: badge.id, unlockedAt: now });
        newlyUnlocked.push({ ...badge, unlockedAt: now });
      }
    }

    // Reload all unlocked badges
    const allUnlocked = await db.select().from(schema.unlockedBadges);
    const badges: Badge[] = ALL_BADGES.map((b) => {
      const found = allUnlocked.find((u: { badgeId: string; unlockedAt: number }) => u.badgeId === b.id);
      return { ...b, unlockedAt: found?.unlockedAt ?? null };
    }).filter((b) => b.unlockedAt !== null);

    set({ badges });
    return newlyUnlocked;
  },

  getCollectionStats: async () => {
    const results: { grade: number; total: number; mastered: number }[] = [];

    for (let grade = 1; grade <= 6; grade++) {
      const totalRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.kanji)
        .where(eq(schema.kanji.grade, grade));

      const masteredRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.srsCards)
        .innerJoin(schema.kanji, eq(schema.srsCards.kanjiId, schema.kanji.id))
        .where(and(eq(schema.kanji.grade, grade), eq(schema.srsCards.state, 'mastered')));

      results.push({
        grade,
        total: totalRows[0]?.count ?? 0,
        mastered: masteredRows[0]?.count ?? 0,
      });
    }

    return results;
  },
}));
