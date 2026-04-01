import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius, shadow } from '../src/theme/spacing';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { GRADE_INFO } from '../src/types/kanji';
import { db, schema } from '../src/db/client';
import { eq, and, sql } from 'drizzle-orm';
import { useI18n } from '../src/i18n';

const { width: SCREEN_W } = Dimensions.get('window');
const CELL_SIZE = (SCREEN_W - spacing.lg * 2 - spacing.xs * 8) / 8;

interface CollectionKanji {
  id: number;
  character: string;
  state: 'locked' | 'new' | 'learning' | 'review' | 'mastered';
}

export default function CollectionScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [kanjiList, setKanjiList] = useState<CollectionKanji[]>([]);
  const [stats, setStats] = useState({ total: 0, mastered: 0, learning: 0 });
  const { t } = useI18n();

  useEffect(() => { navigation.setOptions({ title: t('collection.title') }); }, [t]);

  useEffect(() => {
    loadCollection(selectedGrade);
  }, [selectedGrade]);

  async function loadCollection(grade: number) {
    const kanjiRows = await db
      .select({ id: schema.kanji.id, character: schema.kanji.character })
      .from(schema.kanji)
      .where(eq(schema.kanji.grade, grade));

    const srsRows = await db
      .select({ kanjiId: schema.srsCards.kanjiId, state: schema.srsCards.state })
      .from(schema.srsCards);

    const srsMap = new Map(srsRows.map((r: any) => [r.kanjiId, r.state]));

    const list: CollectionKanji[] = kanjiRows.map((k: any) => ({
      id: k.id,
      character: k.character,
      state: (srsMap.get(k.id) as CollectionKanji['state']) ?? 'locked',
    }));

    const mastered = list.filter((k) => k.state === 'mastered').length;
    const learning = list.filter((k) => k.state !== 'locked').length;

    setKanjiList(list);
    setStats({ total: list.length, mastered, learning });
  }

  const stateColors: Record<string, string> = {
    locked: colors.border,
    new: colors.srsNew,
    learning: colors.srsLearning,
    review: colors.srsReview,
    mastered: colors.srsMastered,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('collection.title')}</Text>
        <Text style={styles.subtitle}>
          {stats.mastered}/{stats.total} {t('collection.mastered')}
        </Text>
      </View>

      {/* Grade tabs */}
      <View style={styles.gradeSelector}>
        {GRADE_INFO.map((g) => (
          <TouchableOpacity
            key={g.grade}
            style={[styles.gradeTab, selectedGrade === g.grade && { backgroundColor: g.color }]}
            onPress={() => setSelectedGrade(g.grade)}
          >
            <Text style={[styles.gradeTabText, selectedGrade === g.grade && { color: '#fff' }]}>
              {g.grade}{t('learn.grade')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <ProgressBar
          progress={stats.total > 0 ? stats.mastered / stats.total : 0}
          color={GRADE_INFO[selectedGrade - 1]?.color ?? colors.primary}
          height={8}
          showLabel
          label={`${stats.learning}${t('home.chars')} ${t('collection.learning')} / ${stats.mastered}${t('home.chars')} ${t('collection.mastered')}`}
        />
        <View style={styles.legend}>
          <LegendItem color={colors.border} label={t('collection.locked')} />
          <LegendItem color={colors.srsLearning} label={t('collection.learning')} />
          <LegendItem color={colors.srsReview} label={t('collection.review')} />
          <LegendItem color={colors.srsMastered} label={t('collection.mastered')} />
        </View>
      </View>

      {/* Kanji grid */}
      <FlatList
        data={kanjiList}
        numColumns={8}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cell, { borderColor: stateColors[item.state] || colors.border }]}
            onPress={() => router.push(`/kanji/${item.id}`)}
          >
            <Text
              style={[
                styles.cellText,
                item.state === 'locked' && styles.cellTextLocked,
                item.state === 'mastered' && styles.cellTextMastered,
              ]}
            >
              {item.character}
            </Text>
            {item.state === 'mastered' && <Text style={styles.starBadge}>⭐</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, paddingBottom: 0 },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  gradeSelector: { flexDirection: 'row', padding: spacing.sm, gap: spacing.xs },
  gradeTab: {
    flex: 1, paddingVertical: spacing.sm, borderRadius: radius.md,
    alignItems: 'center', backgroundColor: colors.surface, ...shadow.sm,
  },
  gradeTabText: { ...typography.label, color: colors.textSecondary },
  progressSection: { padding: spacing.lg, gap: spacing.md },
  legend: { flexDirection: 'row', justifyContent: 'space-around' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { ...typography.caption, color: colors.textSecondary },
  grid: { paddingHorizontal: spacing.sm },
  cell: {
    width: CELL_SIZE, height: CELL_SIZE, margin: spacing.xs / 2,
    backgroundColor: colors.surface, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, position: 'relative',
  },
  cellText: { fontFamily: 'NotoSerifJP', fontSize: 18, color: colors.text },
  cellTextLocked: { opacity: 0.3 },
  cellTextMastered: { color: colors.accent },
  starBadge: { position: 'absolute', top: -4, right: -4, fontSize: 10 },
});
