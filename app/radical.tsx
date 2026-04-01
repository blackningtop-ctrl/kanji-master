import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius, shadow } from '../src/theme/spacing';
import { Card } from '../src/components/ui/Card';
import { KanjiText } from '../src/components/ui/KanjiText';
import { db, schema } from '../src/db/client';
import { eq, sql } from 'drizzle-orm';
import { useI18n } from '../src/i18n';

interface RadicalInfo {
  id: number;
  character: string;
  meaning: string;
  meaningEn: string;
  strokeCount: number;
  nameJa: string;
  position: string | null;
  kanjiList: { id: number; character: string }[];
}

export default function RadicalScreen() {
  const { kanjiId } = useLocalSearchParams<{ kanjiId?: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useI18n();

  useEffect(() => { navigation.setOptions({ title: t('radical.title') }); }, [t]);
  const [radical, setRadical] = useState<RadicalInfo | null>(null);
  const [allRadicals, setAllRadicals] = useState<{ id: number; character: string; meaning: string; count: number }[]>([]);
  const [mode, setMode] = useState<'detail' | 'browse'>(kanjiId ? 'detail' : 'browse');
  const [decomposed, setDecomposed] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (kanjiId) {
      loadRadicalForKanji(Number(kanjiId));
    } else {
      loadAllRadicals();
    }
  }, [kanjiId]);

  async function loadRadicalForKanji(id: number) {
    const kanjiRows = await db.select().from(schema.kanji).where(eq(schema.kanji.id, id));
    if (kanjiRows.length === 0) return;
    const kanji = kanjiRows[0];

    const radicalRows = await db.select().from(schema.radicals).where(eq(schema.radicals.id, kanji.radicalId));
    if (radicalRows.length === 0) return;
    const rad = radicalRows[0];

    // Find all kanji with the same radical
    const relatedKanji = await db
      .select({ id: schema.kanji.id, character: schema.kanji.character })
      .from(schema.kanji)
      .where(eq(schema.kanji.radicalId, rad.id))
      .limit(30);

    setRadical({
      ...rad,
      kanjiList: relatedKanji,
    });
  }

  async function loadAllRadicals() {
    const rows = await db
      .select({
        id: schema.radicals.id,
        character: schema.radicals.character,
        meaning: schema.radicals.meaning,
        count: sql<number>`(SELECT count(*) FROM kanji WHERE radical_id = radicals.id)`,
      })
      .from(schema.radicals)
      .orderBy(schema.radicals.strokeCount)
      .limit(100);

    setAllRadicals(rows);
  }

  function playDecomposeAnimation() {
    setDecomposed(true);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }

  // Browse mode: show all radicals
  if (mode === 'browse') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('radical.title')}</Text>
          <Text style={styles.subtitle}>214部首</Text>
        </View>
        <FlatList
          data={allRadicals}
          numColumns={5}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.radicalGrid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.radicalCell}
              onPress={() => {
                setMode('detail');
                loadRadicalDetail(item.id);
              }}
            >
              <Text style={styles.radicalChar}>{item.character}</Text>
              <Text style={styles.radicalMeaning} numberOfLines={1}>{item.meaning}</Text>
              <Text style={styles.radicalCount}>{item.count}{t('home.chars')}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  async function loadRadicalDetail(radId: number) {
    const radicalRows = await db.select().from(schema.radicals).where(eq(schema.radicals.id, radId));
    if (radicalRows.length === 0) return;
    const rad = radicalRows[0];

    const relatedKanji = await db
      .select({ id: schema.kanji.id, character: schema.kanji.character })
      .from(schema.kanji)
      .where(eq(schema.kanji.radicalId, rad.id))
      .limit(30);

    setRadical({ ...rad, kanjiList: relatedKanji });
  }

  if (!radical) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  // Detail mode
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Radical display */}
      <View style={styles.radicalHeader}>
        <TouchableOpacity onPress={playDecomposeAnimation}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Text style={styles.bigRadical}>{radical.character}</Text>
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.radicalName}>{radical.nameJa}</Text>
        <Text style={styles.radicalInfo}>
          {radical.meaning} ({radical.meaningEn}) ・ {radical.strokeCount}画
        </Text>
        {radical.position && (
          <View style={styles.positionBadge}>
            <Text style={styles.positionText}>
              {positionLabel(radical.position)}
            </Text>
          </View>
        )}
      </View>

      {/* Decomposition animation hint */}
      <Card style={styles.decomposeCard}>
        <Text style={styles.sectionTitle}>部首の役割</Text>
        <Text style={styles.bodyText}>
          {radical.position
            ? `この部首「${radical.character}」は漢字の${positionLabel(radical.position)}に位置し、${radical.meaning}に関する意味を表します。`
            : `この部首「${radical.character}」は${radical.meaning}に関する意味を持ちます。`}
        </Text>
        <TouchableOpacity style={styles.animButton} onPress={playDecomposeAnimation}>
          <Text style={styles.animButtonText}>{t('radical.animation')}</Text>
        </TouchableOpacity>
      </Card>

      {/* Related kanji */}
      <Card>
        <Text style={styles.sectionTitle}>
          {t('radical.relatedKanji')} ({radical.kanjiList.length}{t('home.chars')})
        </Text>
        <View style={styles.kanjiFlow}>
          {radical.kanjiList.map((k) => (
            <TouchableOpacity
              key={k.id}
              style={styles.kanjiChip}
              onPress={() => router.push(`/kanji/${k.id}`)}
            >
              <KanjiText size="grid">{k.character}</KanjiText>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Back to browse */}
      {!kanjiId && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => { setMode('browse'); setRadical(null); }}
        >
          <Text style={styles.backButtonText}>{t('radical.title')}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function positionLabel(pos: string): string {
  const labels: Record<string, string> = {
    hen: '偏（左側）',
    tsukuri: '旁（右側）',
    kanmuri: '冠（上部）',
    ashi: '脚（下部）',
    tare: '垂（左上から左下）',
    nyou: '繞（左下から右下）',
    kamae: '構（囲み）',
  };
  return labels[pos] ?? pos;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxxl },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { ...typography.body, color: colors.textSecondary },
  header: { padding: spacing.lg, paddingBottom: 0 },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary },
  // Radical browse grid
  radicalGrid: { padding: spacing.sm },
  radicalCell: {
    flex: 1, aspectRatio: 0.9, margin: spacing.xs,
    backgroundColor: colors.surface, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', padding: spacing.xs, ...shadow.sm,
  },
  radicalChar: { fontFamily: 'NotoSerifJP', fontSize: 28, color: colors.secondary },
  radicalMeaning: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  radicalCount: { ...typography.caption, color: colors.textLight, fontSize: 10 },
  // Radical detail
  radicalHeader: { alignItems: 'center', paddingVertical: spacing.xl },
  bigRadical: { fontFamily: 'NotoSerifJP', fontSize: 96, color: colors.secondary },
  radicalName: { ...typography.h2, color: colors.text, marginTop: spacing.md },
  radicalInfo: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  positionBadge: {
    marginTop: spacing.md, backgroundColor: colors.secondary, paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs, borderRadius: radius.full,
  },
  positionText: { ...typography.caption, color: '#fff' },
  decomposeCard: {},
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  bodyText: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  animButton: {
    marginTop: spacing.md, padding: spacing.md, backgroundColor: colors.secondary + '10',
    borderRadius: radius.md, alignItems: 'center',
  },
  animButtonText: { ...typography.label, color: colors.secondary },
  kanjiFlow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  kanjiChip: {
    width: 48, height: 48, backgroundColor: colors.surface, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  backButton: { padding: spacing.lg, alignItems: 'center' },
  backButtonText: { ...typography.label, color: colors.primary },
});
