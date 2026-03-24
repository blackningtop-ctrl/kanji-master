import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// ─── 한자 마스터 데이터 ───
export const kanji = sqliteTable('kanji', {
  id: integer('id').primaryKey(),
  character: text('character').notNull(),
  grade: integer('grade').notNull(),          // 1-6
  strokeCount: integer('stroke_count').notNull(),
  jlptLevel: integer('jlpt_level'),
  kankenLevel: integer('kanken_level'),
  frequencyRank: integer('frequency_rank'),
  meaningsJa: text('meanings_ja').notNull(),   // JSON array
  meaningsKo: text('meanings_ko').notNull(),
  meaningsEn: text('meanings_en').notNull(),
  onReadings: text('on_readings').notNull(),   // JSON array
  kunReadings: text('kun_readings').notNull(),
  radicalId: integer('radical_id').notNull(),
  componentRadicalIds: text('component_radical_ids').notNull(), // JSON array
  tags: text('tags').notNull(),                // JSON array
  similarKanji: text('similar_kanji').notNull(),
  antonymKanji: text('antonym_kanji').notNull(),
});

// ─── 부수 데이터 ───
export const radicals = sqliteTable('radicals', {
  id: integer('id').primaryKey(),
  character: text('character').notNull(),
  meaning: text('meaning').notNull(),
  meaningEn: text('meaning_en').notNull(),
  strokeCount: integer('stroke_count').notNull(),
  kangxiNumber: integer('kangxi_number').notNull(),
  nameJa: text('name_ja').notNull(),
  position: text('position'),
});

// ─── 어휘 (숙어) ───
export const vocabulary = sqliteTable('vocabulary', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  kanjiId: integer('kanji_id').notNull(),
  word: text('word').notNull(),
  reading: text('reading').notNull(),
  meaning: text('meaning').notNull(),
  meaningKo: text('meaning_ko').notNull(),
  meaningEn: text('meaning_en').notNull(),
  exampleSentence: text('example_sentence'),
  exampleMeaning: text('example_meaning'),
  furigana: text('furigana'),
  jlptLevel: integer('jlpt_level'),
});

// ─── 니모닉 (기억술) ───
export const mnemonics = sqliteTable('mnemonics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  kanjiId: integer('kanji_id').notNull(),
  language: text('language').notNull(),         // 'ja' | 'ko' | 'en'
  story: text('story').notNull(),
  isDefault: integer('is_default', { mode: 'boolean' }).notNull().default(true),
  authorId: text('author_id'),
});

// ─── 필순 데이터 ───
export const strokeData = sqliteTable('stroke_data', {
  kanjiId: integer('kanji_id').primaryKey(),
  paths: text('paths').notNull(),              // JSON array of SVG paths
  strokeTypes: text('stroke_types').notNull(), // JSON array
  viewBox: text('view_box').notNull(),
});

// ─── SRS 카드 ───
export const srsCards = sqliteTable('srs_cards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  kanjiId: integer('kanji_id').notNull().unique(),
  state: text('state').notNull().default('new'),   // 'new' | 'learning' | 'review' | 'mastered'
  easeFactor: real('ease_factor').notNull().default(2.5),
  interval: integer('interval').notNull().default(0),
  repetitions: integer('repetitions').notNull().default(0),
  nextReviewAt: integer('next_review_at').notNull(),
  lastReviewedAt: integer('last_reviewed_at'),
  lapses: integer('lapses').notNull().default(0),
});

// ─── 복습 기록 ───
export const reviewHistory = sqliteTable('review_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  kanjiId: integer('kanji_id').notNull(),
  quizType: text('quiz_type').notNull(),
  correct: integer('correct', { mode: 'boolean' }).notNull(),
  responseTimeMs: integer('response_time_ms').notNull(),
  reviewedAt: integer('reviewed_at').notNull(),
});

// ─── 사용자 프로필 ───
export const userProfile = sqliteTable('user_profile', {
  id: integer('id').primaryKey().default(1),
  name: text('name').notNull().default('学習者'),
  level: integer('level').notNull().default(1),
  xp: integer('xp').notNull().default(0),
  currentGrade: integer('current_grade').notNull().default(1),
  dailyNewLimit: integer('daily_new_limit').notNull().default(5),
  dailyGoalMinutes: integer('daily_goal_minutes').notNull().default(10),
  streakDays: integer('streak_days').notNull().default(0),
  lastStudyDate: text('last_study_date'),
  language: text('language').notNull().default('ko'),  // UI language
  createdAt: integer('created_at').notNull(),
});

// ─── 일별 학습 통계 ───
export const dailyStats = sqliteTable('daily_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull().unique(),      // YYYY-MM-DD
  newLearned: integer('new_learned').notNull().default(0),
  reviewed: integer('reviewed').notNull().default(0),
  correctCount: integer('correct_count').notNull().default(0),
  totalCount: integer('total_count').notNull().default(0),
  studyTimeMs: integer('study_time_ms').notNull().default(0),
  xpEarned: integer('xp_earned').notNull().default(0),
});
