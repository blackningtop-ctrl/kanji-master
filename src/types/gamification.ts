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
  nameKo: string;
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

const LEVEL_TITLES_KO = ['입문자', '초심자', '학습자', '중급자', '상급자', '달인', '명인', '사범', '박사', '선인', '한자마스터'];
const LEVEL_TITLES_JA = ['入門者', '初心者', '学習者', '中級者', '上級者', '達人', '名人', '師範', '博士', '仙人', '漢字マスター'];

export function getLevelTitle(level: number, lang: 'ko' | 'ja' = 'ko'): string {
  const titles = lang === 'ko' ? LEVEL_TITLES_KO : LEVEL_TITLES_JA;
  if (level <= 5) return titles[0];
  if (level <= 10) return titles[1];
  if (level <= 20) return titles[2];
  if (level <= 30) return titles[3];
  if (level <= 40) return titles[4];
  if (level <= 50) return titles[5];
  if (level <= 60) return titles[6];
  if (level <= 70) return titles[7];
  if (level <= 80) return titles[8];
  if (level <= 90) return titles[9];
  return titles[10];
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
  { id: 'grade1_master', name: '1st Grade Master', nameJa: '1年生マスター', nameKo: '1학년 마스터', description: '1학년 한자 80자 전체 마스터', icon: '🎓', condition: { type: 'grade_master', grade: 1 } },
  { id: 'grade2_master', name: '2nd Grade Master', nameJa: '2年生マスター', nameKo: '2학년 마스터', description: '2학년 한자 160자 전체 마스터', icon: '🎓', condition: { type: 'grade_master', grade: 2 } },
  { id: 'grade3_master', name: '3rd Grade Master', nameJa: '3年生マスター', nameKo: '3학년 마스터', description: '3학년 한자 200자 전체 마스터', icon: '🎓', condition: { type: 'grade_master', grade: 3 } },
  { id: 'grade4_master', name: '4th Grade Master', nameJa: '4年生マスター', nameKo: '4학년 마스터', description: '4학년 한자 202자 전체 마스터', icon: '🎓', condition: { type: 'grade_master', grade: 4 } },
  { id: 'grade5_master', name: '5th Grade Master', nameJa: '5年生マスター', nameKo: '5학년 마스터', description: '5학년 한자 193자 전체 마스터', icon: '🎓', condition: { type: 'grade_master', grade: 5 } },
  { id: 'grade6_master', name: '6th Grade Master', nameJa: '6年生マスター', nameKo: '6학년 마스터', description: '6학년 한자 191자 전체 마스터', icon: '🎓', condition: { type: 'grade_master', grade: 6 } },

  // Streak
  { id: 'streak_7', name: 'One Week', nameJa: '一週間連続', nameKo: '7일 연속', description: '7일 연속 학습', icon: '🔥', condition: { type: 'streak', days: 7 } },
  { id: 'streak_30', name: 'One Month', nameJa: '一ヶ月連続', nameKo: '30일 연속', description: '30일 연속 학습', icon: '🔥', condition: { type: 'streak', days: 30 } },
  { id: 'streak_100', name: 'Century', nameJa: '百日連続', nameKo: '100일 연속', description: '100일 연속 학습', icon: '💎', condition: { type: 'streak', days: 100 } },

  // Total mastered
  { id: 'master_100', name: 'First Hundred', nameJa: '百字達成', nameKo: '100자 달성', description: '100자 마스터', icon: '⭐', condition: { type: 'total_mastered', count: 100 } },
  { id: 'master_500', name: 'Halfway', nameJa: '五百字達成', nameKo: '500자 달성', description: '500자 마스터', icon: '🌟', condition: { type: 'total_mastered', count: 500 } },
  { id: 'master_1026', name: 'Complete', nameJa: '全字マスター', nameKo: '전체 마스터', description: '교육한자 1026자 전체 마스터', icon: '👑', condition: { type: 'total_mastered', count: 1026 } },

  // Quiz accuracy
  { id: 'accuracy_90', name: 'Sharp Eye', nameJa: '鋭い目', nameKo: '날카로운 눈', description: '정답률 90% 이상 (50문제 이상)', icon: '🎯', condition: { type: 'quiz_accuracy', percent: 90, minQuizzes: 50 } },

  // Speed
  { id: 'speed_king', name: 'Speed King', nameJa: 'スピード王', nameKo: '스피드 왕', description: '평균 응답시간 2초 이하 (30문제 이상)', icon: '⚡', condition: { type: 'speed_king', avgMs: 2000, minQuizzes: 30 } },
];
