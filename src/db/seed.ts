import { db, schema } from './client';
import { sql } from 'drizzle-orm';
import { allKanjiData } from '../data/kanji';

/**
 * 한자 시드 데이터를 DB에 삽입합니다.
 * 이미 데이터가 있으면 스킵합니다.
 */
export async function seedDatabase() {
  // 이미 데이터가 있는지 확인
  const existing = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.kanji);

  if (existing[0]?.count > 0) {
    return; // 이미 시드됨
  }

  // 한자 데이터 삽입
  for (const k of allKanjiData) {
    await db.insert(schema.kanji).values({
      id: k.id,
      character: k.character,
      grade: k.grade,
      strokeCount: k.strokeCount,
      jlptLevel: k.jlptLevel ?? null,
      kankenLevel: k.kankenLevel ?? null,
      frequencyRank: k.frequencyRank ?? null,
      meaningsJa: JSON.stringify(k.meanings.ja),
      meaningsKo: JSON.stringify(k.meanings.ko),
      meaningsEn: JSON.stringify(k.meanings.en),
      onReadings: JSON.stringify(k.onReadings),
      kunReadings: JSON.stringify(k.kunReadings),
      radicalId: k.radicalId,
      componentRadicalIds: JSON.stringify(k.componentRadicalIds),
      tags: JSON.stringify(k.tags),
      similarKanji: JSON.stringify(k.similarKanji),
      antonymKanji: JSON.stringify(k.antonymKanji),
    });
  }

  // 기본 유저 프로필 생성
  await db.insert(schema.userProfile).values({
    id: 1,
    name: '学習者',
    level: 1,
    xp: 0,
    currentGrade: 1,
    dailyNewLimit: 5,
    dailyGoalMinutes: 10,
    streakDays: 0,
    language: 'ko',
    createdAt: Date.now(),
  });
}
