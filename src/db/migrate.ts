import { sql } from 'drizzle-orm';
import { db } from './client';

/**
 * 앱 시작 시 실행되는 DB 마이그레이션.
 * drizzle-kit push 대신 수동 SQL로 테이블 생성 (Expo 환경).
 */
export async function runMigrations() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS kanji (
      id INTEGER PRIMARY KEY,
      character TEXT NOT NULL,
      grade INTEGER NOT NULL,
      stroke_count INTEGER NOT NULL,
      jlpt_level INTEGER,
      kanken_level INTEGER,
      frequency_rank INTEGER,
      meanings_ja TEXT NOT NULL DEFAULT '[]',
      meanings_ko TEXT NOT NULL DEFAULT '[]',
      meanings_en TEXT NOT NULL DEFAULT '[]',
      on_readings TEXT NOT NULL DEFAULT '[]',
      kun_readings TEXT NOT NULL DEFAULT '[]',
      radical_id INTEGER NOT NULL,
      component_radical_ids TEXT NOT NULL DEFAULT '[]',
      tags TEXT NOT NULL DEFAULT '[]',
      similar_kanji TEXT NOT NULL DEFAULT '[]',
      antonym_kanji TEXT NOT NULL DEFAULT '[]'
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS radicals (
      id INTEGER PRIMARY KEY,
      character TEXT NOT NULL,
      meaning TEXT NOT NULL,
      meaning_en TEXT NOT NULL,
      stroke_count INTEGER NOT NULL,
      kangxi_number INTEGER NOT NULL,
      name_ja TEXT NOT NULL,
      position TEXT
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji_id INTEGER NOT NULL,
      word TEXT NOT NULL,
      reading TEXT NOT NULL,
      meaning TEXT NOT NULL,
      meaning_ko TEXT NOT NULL,
      meaning_en TEXT NOT NULL,
      example_sentence TEXT,
      example_meaning TEXT,
      furigana TEXT,
      jlpt_level INTEGER
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS mnemonics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji_id INTEGER NOT NULL,
      language TEXT NOT NULL,
      story TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 1,
      author_id TEXT
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS stroke_data (
      kanji_id INTEGER PRIMARY KEY,
      paths TEXT NOT NULL,
      stroke_types TEXT NOT NULL,
      view_box TEXT NOT NULL
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS srs_cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji_id INTEGER NOT NULL UNIQUE,
      state TEXT NOT NULL DEFAULT 'new',
      ease_factor REAL NOT NULL DEFAULT 2.5,
      interval INTEGER NOT NULL DEFAULT 0,
      repetitions INTEGER NOT NULL DEFAULT 0,
      next_review_at INTEGER NOT NULL,
      last_reviewed_at INTEGER,
      lapses INTEGER NOT NULL DEFAULT 0
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS review_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji_id INTEGER NOT NULL,
      quiz_type TEXT NOT NULL,
      correct INTEGER NOT NULL,
      response_time_ms INTEGER NOT NULL,
      reviewed_at INTEGER NOT NULL
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT NOT NULL DEFAULT '学習者',
      level INTEGER NOT NULL DEFAULT 1,
      xp INTEGER NOT NULL DEFAULT 0,
      current_grade INTEGER NOT NULL DEFAULT 1,
      daily_new_limit INTEGER NOT NULL DEFAULT 5,
      daily_goal_minutes INTEGER NOT NULL DEFAULT 10,
      streak_days INTEGER NOT NULL DEFAULT 0,
      last_study_date TEXT,
      language TEXT NOT NULL DEFAULT 'ko',
      created_at INTEGER NOT NULL
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS daily_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      new_learned INTEGER NOT NULL DEFAULT 0,
      reviewed INTEGER NOT NULL DEFAULT 0,
      correct_count INTEGER NOT NULL DEFAULT 0,
      total_count INTEGER NOT NULL DEFAULT 0,
      study_time_ms INTEGER NOT NULL DEFAULT 0,
      xp_earned INTEGER NOT NULL DEFAULT 0
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS unlocked_badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      badge_id TEXT NOT NULL UNIQUE,
      unlocked_at INTEGER NOT NULL
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS writing_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      stroke_order INTEGER NOT NULL,
      form_accuracy INTEGER NOT NULL,
      balance INTEGER NOT NULL,
      grade TEXT NOT NULL,
      scored_at INTEGER NOT NULL
    )
  `);

  // 인덱스
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_kanji_grade ON kanji(grade)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_vocabulary_kanji ON vocabulary(kanji_id)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_mnemonics_kanji ON mnemonics(kanji_id)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_srs_cards_state ON srs_cards(state)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_srs_cards_next_review ON srs_cards(next_review_at)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_review_history_kanji ON review_history(kanji_id)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date)`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS idx_writing_scores_kanji ON writing_scores(kanji_id)`);
}
