import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { KanjiText } from '../../src/components/ui/KanjiText';
import { GRADE_INFO } from '../../src/types/kanji';
import { db, schema } from '../../src/db/client';
import { eq } from 'drizzle-orm';
import { useI18n } from '../../src/i18n';

interface KanjiRow {
  id: number;
  character: string;
  meaningsJa: string;
  onReadings: string;
  kunReadings: string;
}

export default function LearnScreen() {
  const router = useRouter();
  const { grade: gradeParam } = useLocalSearchParams<{ grade?: string }>();
  const [selectedGrade, setSelectedGrade] = useState(Number(gradeParam) || 1);
  const [kanjiList, setKanjiList] = useState<KanjiRow[]>([]);
  const { t } = useI18n();

  useEffect(() => {
    loadKanji(selectedGrade);
  }, [selectedGrade]);

  async function loadKanji(grade: number) {
    const rows = await db
      .select({
        id: schema.kanji.id,
        character: schema.kanji.character,
        meaningsJa: schema.kanji.meaningsJa,
        onReadings: schema.kanji.onReadings,
        kunReadings: schema.kanji.kunReadings,
      })
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, grade));
    setKanjiList(rows);
  }

  return (
    <View style={styles.container}>
      {/* 학년 선택 탭 */}
      <View style={styles.gradeSelector}>
        {GRADE_INFO.map((g) => (
          <TouchableOpacity
            key={g.grade}
            style={[
              styles.gradeTab,
              selectedGrade === g.grade && { backgroundColor: g.color },
            ]}
            onPress={() => setSelectedGrade(g.grade)}
          >
            <Text
              style={[
                styles.gradeTabText,
                selectedGrade === g.grade && styles.gradeTabTextActive,
              ]}
            >
              {g.grade}{t('learn.grade')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 한자 그리드 */}
      {kanjiList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            まだ漢字データがありません{'\n'}
            データを読み込んでください
          </Text>
        </View>
      ) : (
        <FlatList
          data={kanjiList}
          numColumns={5}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.kanjiCell}
              onPress={() => router.push(`/kanji/${item.id}`)}
            >
              <KanjiText size="grid">{item.character}</KanjiText>
              <Text style={styles.kanjiReading} numberOfLines={1}>
                {JSON.parse(item.onReadings)[0] ?? ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradeSelector: {
    flexDirection: 'row',
    padding: spacing.sm,
    gap: spacing.xs,
  },
  gradeTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
    ...shadow.sm,
  },
  gradeTabText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  gradeTabTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    padding: spacing.sm,
  },
  kanjiCell: {
    flex: 1,
    aspectRatio: 1,
    margin: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  kanjiReading: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
