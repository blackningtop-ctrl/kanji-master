import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { KanjiText } from '../../src/components/ui/KanjiText';
import { Card } from '../../src/components/ui/Card';
import { Badge, SRSBadge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';
import { StrokeOrderViewer } from '../../src/components/kanji/StrokeOrderViewer';
import { MnemonicCard } from '../../src/components/kanji/MnemonicCard';
import * as Speech from 'expo-speech';
import { db, schema } from '../../src/db/client';
import { eq } from 'drizzle-orm';
import { useStudyStore } from '../../src/stores/useStudyStore';
import { useI18n } from '../../src/i18n';

function speakJapanese(text: string) {
  Speech.speak(text, { language: 'ja-JP', rate: 0.8 });
}

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
  const navigation = useNavigation();
  const { addKanjiToStudy } = useStudyStore();
  const { t } = useI18n();

  useEffect(() => {
    navigation.setOptions({ title: t('kanji.detail') });
  }, [t]);

  const [kanji, setKanji] = useState<KanjiDetail | null>(null);
  const [vocab, setVocab] = useState<VocabItem[]>([]);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [strokePaths, setStrokePaths] = useState<string[]>([]);
  const [radicalChar, setRadicalChar] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

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
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. 한자 + 배지 */}
      <View style={styles.kanjiHeader}>
        <KanjiText size="huge">{kanji.character}</KanjiText>
        <View style={styles.badges}>
          <Badge label={`${kanji.grade}단계`} color={colors.secondary} />
          <Badge label={`${kanji.strokeCount}획`} color={colors.textSecondary} />
          {kanji.jlptLevel && <Badge label={`N${kanji.jlptLevel}`} color={colors.info} />}
        </View>
      </View>

      {/* 2. 한국어 뜻 (가장 먼저, 크게) */}
      <Card>
        <Text style={styles.sectionTitle}>한국어 뜻</Text>
        <Text style={styles.meaningKoPrimary}>{kanji.meaningsKo.join(', ')}</Text>
      </Card>

      {/* 3. 일본어 / 영어 뜻 (작게) */}
      <Card>
        <Text style={styles.sectionTitle}>일본어 / 영어 뜻</Text>
        <Text style={styles.meaningSecondary}>JP: {kanji.meaningsJa.join(', ')}</Text>
        <Text style={styles.meaningSecondary}>EN: {kanji.meaningsEn.join(', ')}</Text>
      </Card>

      {/* 4. 읽기 섹션 */}
      <Card>
        <Text style={styles.sectionTitle}>읽기</Text>
        <View style={styles.readingRow}>
          <View style={styles.readingBlock}>
            <Text style={styles.readingLabel}>음독 (ON)</Text>
            <View style={styles.readingValueRow}>
              <Text style={styles.readingValue}>{kanji.onReadings.join(' / ')}</Text>
              <TouchableOpacity
                style={styles.ttsButton}
                onPress={() => speakJapanese(kanji.onReadings[0] ?? kanji.character)}
              >
                <Text style={styles.ttsButtonText}>TTS</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.readingBlock}>
            <Text style={styles.readingLabel}>훈독 (KUN)</Text>
            <View style={styles.readingValueRow}>
              <Text style={styles.readingValue}>{kanji.kunReadings.join(' / ')}</Text>
              <TouchableOpacity
                style={styles.ttsButton}
                onPress={() => speakJapanese(kanji.kunReadings[0]?.replace(/-/g, '') ?? kanji.character)}
              >
                <Text style={styles.ttsButtonText}>TTS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>

      {/* 5. 필순 애니메이션 */}
      {strokePaths.length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>필순</Text>
          <View style={{ alignItems: 'center' }}>
            <StrokeOrderViewer paths={strokePaths} size={240} />
          </View>
        </Card>
      )}

      {/* 6. 관련 숙어 + 예문 */}
      {vocab.length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>관련 숙어 / 예문</Text>
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

      {/* 7. 부수 정보 */}
      {radicalChar ? (
        <TouchableOpacity onPress={() => router.push(`/radical?kanjiId=${kanji.id}`)}>
          <Card style={styles.radicalCard}>
            <Text style={styles.sectionTitle}>부수</Text>
            <View style={styles.radicalRow}>
              <Text style={styles.radicalChar}>{radicalChar}</Text>
              <Text style={styles.radicalHint}>부수 상세 보기</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ) : null}

      {/* 8. 기억법 */}
      <MnemonicCard kanjiId={kanji.id} character={kanji.character} />

      {/* 9. 학습 큐에 추가 버튼 */}
      <Button
        title={isAdded ? '학습 큐에 추가됨' : '학습 큐에 추가'}
        onPress={async () => {
          if (isAdded) return;
          await addKanjiToStudy(kanji.id);
          setIsAdded(true);
        }}
        style={{...styles.studyButton, ...(isAdded ? styles.studyButtonAdded : {})}}
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
  meaningKoPrimary: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 32,
  },
  meaningSecondary: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
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
  readingValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  readingValue: {
    ...typography.h3,
    color: colors.primary,
    flex: 1,
  },
  ttsButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ttsButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
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
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  studyButton: {
    marginTop: spacing.md,
  },
  studyButtonAdded: {
    backgroundColor: colors.success,
    opacity: 0.8,
  },
});
