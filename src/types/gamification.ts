export interface UserLevel {
  level: number;
  xp: number;
  xpForNext: number;
  title: string;
}

export interface Badge {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  icon: string;
  condition: BadgeCondition;
  unlockedAt: number | null;
}

export type BadgeCondition =
  | { type: 'grade_master'; grade: number }
  | { type: 'streak'; days: number }
  | { type: 'total_mastered'; count: number }
  | { type: 'quiz_accuracy'; percent: number; minQuizzes: number }
  | { type: 'speed_king'; avgMs: number; minQuizzes: number }
  | { type: 'radical_master'; count: number }
  | { type: 'writing_master'; count: number; minScore: number };

/** XP required per level: level N requires N*100 total XP */
export function xpForLevel(level: number): number {
  return level * 100;
}

export function getLevelFromXP(xp: number): UserLevel {
  let level = 1;
  let cumulative = 0;
  while (cumulative + xpForLevel(level) <= xp) {
    cumulative += xpForLevel(level);
    level++;
    if (level > 100) break;
  }
  return {
    level,
    xp: xp - cumulative,
    xpForNext: xpForLevel(level),
    title: getLevelTitle(level),
  };
}

export function getLevelTitle(level: number): string {
  if (level <= 5) return '入門者';
  if (level <= 10) return '初心者';
  if (level <= 20) return '学習者';
  if (level <= 30) return '中級者';
  if (level <= 40) return '上級者';
  if (level <= 50) return '達人';
  if (level <= 60) return '名人';
  if (level <= 70) return '師範';
  if (level <= 80) return '博士';
  if (level <= 90) return '仙人';
  return '漢字マスター';
}

/** XP rewards for various actions */
export const XP_REWARDS = {
  quizCorrect: 10,
  quizPerfect: 5,        // bonus for perfect session
  writingComplete: 15,
  writingPerfect: 10,    // bonus for 90+ score
  newKanjiLearned: 20,
  dailyGoalMet: 30,
  streakBonus: 10,       // per consecutive day
  bossChallengeClear: 100,
} as const;

/** Badge definitions */
export const ALL_BADGES: Omit<Badge, 'unlockedAt'>[] = [
  // Grade mastery
  { id: 'grade1_master', name: '1st Grade Master', nameJa: '1年生マスター', description: '1年生の漢字80字をすべてマスター', icon: '🎓', condition: { type: 'grade_master', grade: 1 } },
  { id: 'grade2_master', name: '2nd Grade Master', nameJa: '2年生マスター', description: '2年生の漢字160字をすべてマスター', icon: '🎓', condition: { type: 'grade_master', grade: 2 } },
  { id: 'grade3_master', name: '3rd Grade Master', nameJa: '3年生マスター', description: '3年生の漢字200字をすべてマスター', icon: '🎓', condition: { type: 'grade_master', grade: 3 } },
  { id: 'grade4_master', name: '4th Grade Master', nameJa: '4年生マスター', description: '4年生の漢字202字をすべてマスター', icon: '🎓', condition: { type: 'grade_master', grade: 4 } },
  { id: 'grade5_master', name: '5th Grade Master', nameJa: '5年生マスター', description: '5年生の漢字193字をすべてマスター', icon: '🎓', condition: { type: 'grade_master', grade: 5 } },
  { id: 'grade6_master', name: '6th Grade Master', nameJa: '6年生マスター', description: '6年生の漢字191字をすべてマスター', icon: '🎓', condition: { type: 'grade_master', grade: 6 } },

  // Streak
  { id: 'streak_7', name: 'One Week', nameJa: '一週間連続', description: '7日間連続で学習', icon: '🔥', condition: { type: 'streak', days: 7 } },
  { id: 'streak_30', name: 'One Month', nameJa: '一ヶ月連続', description: '30日間連続で学習', icon: '🔥', condition: { type: 'streak', days: 30 } },
  { id: 'streak_100', name: 'Century', nameJa: '百日連続', description: '100日間連続で学習', icon: '💎', condition: { type: 'streak', days: 100 } },

  // Total mastered
  { id: 'master_100', name: 'First Hundred', nameJa: '百字達成', description: '100字をマスター', icon: '⭐', condition: { type: 'total_mastered', count: 100 } },
  { id: 'master_500', name: 'Halfway', nameJa: '五百字達成', description: '500字をマスター', icon: '🌟', condition: { type: 'total_mastered', count: 500 } },
  { id: 'master_1026', name: 'Complete', nameJa: '全字マスター', description: '教育漢字1026字をすべてマスター', icon: '👑', condition: { type: 'total_mastered', count: 1026 } },

  // Quiz accuracy
  { id: 'accuracy_90', name: 'Sharp Eye', nameJa: '鋭い目', description: '正答率90%以上（50問以上）', icon: '🎯', condition: { type: 'quiz_accuracy', percent: 90, minQuizzes: 50 } },

  // Speed
  { id: 'speed_king', name: 'Speed King', nameJa: 'スピード王', description: '平均解答時間2秒以下（30問以上）', icon: '⚡', condition: { type: 'speed_king', avgMs: 2000, minQuizzes: 30 } },
];
