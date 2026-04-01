import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { KanjiText } from '../../src/components/ui/KanjiText';
import { GRADE_INFO } from '../../src/types/kanji';
import { db, schema } from '../../src/db/client';
import { eq, and, inArray } from 'drizzle-orm';
import { useI18n } from '../../src/i18n';

type StatusFilter = 'all' | 'new' | 'learning' | 'mastered';

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'new', label: '미학습' },
  { key: 'learning', label: '학습중' },
  { key: 'mastered', label: '마스터' },
];

const STATUS_DOT_COLORS: Record<string, string> = {
  none: '#9CA3AF',     // gray — 미학습
  new: '#9CA3AF',
  learning: '#EAB308', // yellow — 학습중
  review: '#EAB308',
  mastered: '#22C55E', // green — 마스터
};

interface KanjiRow {
  id: number;
  character: string;
  meaningsKo: string;
  onReadings: string;
  kunReadings: string;
}

interface KanjiWithStatus extends KanjiRow {
  srsState: string; // 'none' | 'new' | 'learning' | 'review' | 'mastered'
}

export default function LearnScreen() {
  const router = useRouter();
  const { grade: gradeParam } = useLocalSearchParams<{ grade?: string }>();
  const [selectedGrade, setSelectedGrade] = useState(Number(gradeParam) || 1);
  const [kanjiList, setKanjiList] = useState<KanjiWithStatus[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const { t } = useI18n();

  useEffect(() => {
    loadKanji(selectedGrade);
  }, [selectedGrade]);

  async function loadKanji(grade: number) {
    const rows: KanjiRow[] = await db
      .select({
        id: schema.kanji.id,
        character: schema.kanji.character,
        meaningsKo: schema.kanji.meaningsKo,
        onReadings: schema.kanji.onReadings,
        kunReadings: schema.kanji.kunReadings,
      })
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, grade));

    // Load SRS states for these kanji
    const kanjiIds = rows.map((r) => r.id);
    let srsMap: Record<number, string> = {};
    if (kanjiIds.length > 0) {
      try {
        const srsRows = await db
          .select({
            kanjiId: schema.srsCards.kanjiId,
            state: schema.srsCards.state,
          })
          .from(schema.srsCards);
        for (const sr of srsRows) {
          srsMap[sr.kanjiId] = sr.state;
        }
      } catch {
        // DB may not be ready
      }
    }

    const withStatus: KanjiWithStatus[] = rows.map((r) => ({
      ...r,
      srsState: srsMap[r.id] ?? 'none',
    }));

    setKanjiList(withStatus);
  }

  const filteredList = kanjiList.filter((k) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'new') return k.srsState === 'none' || k.srsState === 'new';
    if (statusFilter === 'learning') return k.srsState === 'learning' || k.srsState === 'review';
    if (statusFilter === 'mastered') return k.srsState === 'mastered';
    return true;
  });

  const renderKanjiCell = useCallback(({ item }: { item: KanjiWithStatus }) => {
    let koreanMeaning = '';
    try {
      const parsed = JSON.parse(item.meaningsKo);
      koreanMeaning = parsed[0] ?? '';
    } catch {
      koreanMeaning = '';
    }
    const dotColor = STATUS_DOT_COLORS[item.srsState] ?? STATUS_DOT_COLORS.none;

    return (
      <TouchableOpacity
        style={styles.kanjiCell}
        onPress={() => router.push(`/kanji/${item.id}`)}
      >
        <View style={styles.dotContainer}>
          <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
        </View>
        <KanjiText size="grid">{item.character}</KanjiText>
        <Text style={styles.kanjiMeaning} numberOfLines={1}>
          {koreanMeaning}
        </Text>
      </TouchableOpacity>
    );
  }, [router]);

  return (
    <View style={styles.container}>
      {/* 단계 선택 탭 */}
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
              {g.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 필터 칩 */}
      <View style={styles.filterRow}>
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.filterChip,
              statusFilter === f.key && styles.filterChipActive,
            ]}
            onPress={() => setStatusFilter(f.key)}
          >
            <Text
              style={[
                styles.filterChipText,
                statusFilter === f.key && styles.filterChipTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 한자 그리드 */}
      {filteredList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            해당 조건의 한자가 없습니다
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredList}
          numColumns={5}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.grid}
          renderItem={renderKanjiCell}
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
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  gradeTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  grid: {
    padding: spacing.sm,
  },
  kanjiCell: {
    flex: 1,
    aspectRatio: 0.85,
    margin: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  dotContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  kanjiMeaning: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 2,
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
