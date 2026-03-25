import { db, schema } from './client';
import { sql } from 'drizzle-orm';
import { allKanjiData } from '../data/kanji';
import { RADICAL_DATA } from '../data/radicals';

/**
 * 한자 + 부수 + 어휘 + 니모닉 시드 데이터를 DB에 삽입합니다.
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

  // 부수 데이터 삽입
  for (const r of RADICAL_DATA) {
    await db.insert(schema.radicals).values({
      id: r.id,
      character: r.character,
      meaning: r.meaning,
      meaningEn: r.meaningEn,
      strokeCount: r.strokeCount,
      kangxiNumber: r.kangxiNumber,
      nameJa: r.nameJa,
      position: r.position,
    });
  }

  // 한자 데이터 삽입 (batch for performance)
  const BATCH_SIZE = 50;
  for (let i = 0; i < allKanjiData.length; i += BATCH_SIZE) {
    const batch = allKanjiData.slice(i, i + BATCH_SIZE);
    await db.insert(schema.kanji).values(
      batch.map((k) => ({
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
      })),
    );
  }

  // 어휘 데이터 삽입 (동적 임포트)
  try {
    const { VOCABULARY_DATA } = require('../data/vocabulary');
    if (VOCABULARY_DATA?.length > 0) {
      for (let i = 0; i < VOCABULARY_DATA.length; i += BATCH_SIZE) {
        const batch = VOCABULARY_DATA.slice(i, i + BATCH_SIZE);
        await db.insert(schema.vocabulary).values(
          batch.map((v: any) => ({
            kanjiId: v.kanjiId,
            word: v.word,
            reading: v.reading,
            meaning: v.meaning,
            meaningKo: v.meaningKo,
            meaningEn: v.meaningEn,
            exampleSentence: v.exampleSentence,
            exampleMeaning: v.exampleMeaning,
            furigana: v.furigana,
            jlptLevel: v.jlptLevel,
          })),
        );
      }
    }
  } catch {}

  // 니모닉 데이터 삽입 (동적 임포트)
  try {
    const { MNEMONIC_DATA } = require('../data/mnemonics');
    if (MNEMONIC_DATA?.length > 0) {
      for (let i = 0; i < MNEMONIC_DATA.length; i += BATCH_SIZE) {
        const batch = MNEMONIC_DATA.slice(i, i + BATCH_SIZE);
        await db.insert(schema.mnemonics).values(
          batch.map((m: any) => ({
            kanjiId: m.kanjiId,
            language: m.language,
            story: m.story,
            isDefault: m.isDefault,
            authorId: m.authorId,
          })),
        );
      }
    }
  } catch {}

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
