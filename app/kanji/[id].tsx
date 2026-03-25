import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { KanjiText } from '../../src/components/ui/KanjiText';
import { Card } from '../../src/components/ui/Card';
import { Badge, SRSBadge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';
import { StrokeOrderViewer } from '../../src/components/kanji/StrokeOrderViewer';
import { MnemonicCard } from '../../src/components/kanji/MnemonicCard';
import { db, schema } from '../../src/db/client';
import { eq } from 'drizzle-orm';
import { useStudyStore } from '../../src/stores/useStudyStore';

interface KanjiDetail {
  id: number;
  character: string;
  grade: number;
  strokeCount: number;
  radicalId: number;
  meaningsJa: string[];
  meaningsKo: string[];
  meaningsEn: string[];
  onReadings: string[];
  kunReadings: string[];
  jlptLevel: number | null;
  kankenLevel: number | null;
}

interface VocabItem {
  word: string;
  reading: string;
  meaning: string;
  exampleSentence: string | null;
}

export default function KanjiDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addKanjiToStudy } = useStudyStore();
  const [kanji, setKanji] = useState<KanjiDetail | null>(null);
  const [vocab, setVocab] = useState<VocabItem[]>([]);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [strokePaths, setStrokePaths] = useState<string[]>([]);
  const [radicalChar, setRadicalChar] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    loadKanjiDetail(Number(id));
  }, [id]);

  async function loadKanjiDetail(kanjiId: number) {
    const rows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, kanjiId));
    if (rows.length === 0) return;

    const row = rows[0];
    setKanji({
      id: row.id,
      character: row.character,
      grade: row.grade,
      strokeCount: row.strokeCount,
      radicalId: row.radicalId,
      meaningsJa: JSON.parse(row.meaningsJa),
      meaningsKo: JSON.parse(row.meaningsKo),
      meaningsEn: JSON.parse(row.meaningsEn),
      onReadings: JSON.parse(row.onReadings),
      kunReadings: JSON.parse(row.kunReadings),
      jlptLevel: row.jlptLevel,
      kankenLevel: row.kankenLevel,
    });

    // 필순 데이터 로드
    const strokeRows = await db
      .select()
      .from(schema.strokeData)
      .where(eq(schema.strokeData.kanjiId, kanjiId));
    if (strokeRows.length > 0) {
      setStrokePaths(JSON.parse(strokeRows[0].paths));
    }

    // 부수 로드
    const radicalRows = await db
      .select()
      .from(schema.radicals)
      .where(eq(schema.radicals.id, row.radicalId));
    if (radicalRows.length > 0) {
      setRadicalChar(radicalRows[0].character);
    }

    // 어휘 로드
    const vocabRows = await db
      .select()
      .from(schema.vocabulary)
      .where(eq(schema.vocabulary.kanjiId, kanjiId));
    setVocab(vocabRows.map((v: any) => ({
      word: v.word,
      reading: v.reading,
      meaning: v.meaning,
      exampleSentence: v.exampleSentence,
    })));

    // 니모닉 로드
    const mnemonicRows = await db
      .select()
      .from(schema.mnemonics)
      .where(eq(schema.mnemonics.kanjiId, kanjiId));
    if (mnemonicRows.length > 0) {
      setMnemonic(mnemonicRows[0].story);
    }
  }

  if (!kanji) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 메인 한자 표시 */}
      <View style={styles.kanjiHeader}>
        <KanjiText size="huge">{kanji.character}</KanjiText>
        <View style={styles.badges}>
          <Badge label={`${kanji.grade}年生`} color={colors.secondary} />
          <Badge label={`${kanji.strokeCount}画`} color={colors.textSecondary} />
          {kanji.jlptLevel && <Badge label={`N${kanji.jlptLevel}`} color={colors.info} />}
        </View>
      </View>

      {/* 읽기 */}
      <Card>
        <Text style={styles.sectionTitle}>読み方</Text>
        <View style={styles.readingRow}>
          <View style={styles.readingBlock}>
            <Text style={styles.readingLabel}>音読み</Text>
            <Text style={styles.readingValue}>{kanji.onReadings.join('・')}</Text>
          </View>
          <View style={styles.readingBlock}>
            <Text style={styles.readingLabel}>訓読み</Text>
            <Text style={styles.readingValue}>{kanji.kunReadings.join('・')}</Text>
          </View>
        </View>
      </Card>

      {/* 의미 */}
      <Card>
        <Text style={styles.sectionTitle}>意味</Text>
        <Text style={styles.meaningText}>🇯🇵 {kanji.meaningsJa.join('、')}</Text>
        <Text style={styles.meaningText}>🇰🇷 {kanji.meaningsKo.join(', ')}</Text>
        <Text style={styles.meaningText}>🇬🇧 {kanji.meaningsEn.join(', ')}</Text>
      </Card>

      {/* 필순 애니메이션 */}
      {strokePaths.length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>筆順</Text>
          <View style={{ alignItems: 'center' }}>
            <StrokeOrderViewer paths={strokePaths} size={240} />
          </View>
        </Card>
      )}

      {/* 부수 분해 */}
      {radicalChar ? (
        <TouchableOpacity onPress={() => router.push(`/radical?kanjiId=${kanji.id}`)}>
          <Card style={styles.radicalCard}>
            <Text style={styles.sectionTitle}>部首</Text>
            <View style={styles.radicalRow}>
              <Text style={styles.radicalChar}>{radicalChar}</Text>
              <Text style={styles.radicalHint}>タップして部首の詳細を見る →</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ) : null}

      {/* 니모닉 */}
      <MnemonicCard kanjiId={kanji.id} character={kanji.character} />

      {/* 어휘 */}
      {vocab.length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>熟語・単語</Text>
          {vocab.map((v, i) => (
            <View key={i} style={styles.vocabItem}>
              <View style={styles.vocabHeader}>
                <Text style={styles.vocabWord}>{v.word}</Text>
                <Text style={styles.vocabReading}>{v.reading}</Text>
              </View>
              <Text style={styles.vocabMeaning}>{v.meaning}</Text>
              {v.exampleSentence && (
                <Text style={styles.vocabExample}>{v.exampleSentence}</Text>
              )}
            </View>
          ))}
        </Card>
      )}

      {/* 학습 시작 버튼 */}
      <Button
        title="学習を始める"
        onPress={async () => {
          await addKanjiToStudy(kanji.id);
          router.back();
        }}
        style={styles.studyButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  kanjiHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  readingRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  readingBlock: {
    flex: 1,
  },
  readingLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  readingValue: {
    ...typography.h3,
    color: colors.primary,
  },
  meaningText: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  mnemonicText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 26,
  },
  radicalCard: {},
  radicalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  radicalChar: {
    fontFamily: 'NotoSerifJP',
    fontSize: 40,
    color: colors.secondary,
  },
  radicalHint: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  vocabItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  vocabHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  vocabWord: {
    ...typography.h3,
    color: colors.text,
  },
  vocabReading: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  vocabMeaning: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  vocabExample: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  studyButton: {
    marginTop: spacing.md,
  },
});
