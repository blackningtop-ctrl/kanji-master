import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius, shadow } from '../../src/theme/spacing';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { useGameStore } from '../../src/stores/useGameStore';
import { ALL_BADGES } from '../../src/types/gamification';
import { GRADE_INFO } from '../../src/types/kanji';
import { db, schema } from '../../src/db/client';
import { sql, eq, desc } from 'drizzle-orm';
import { useI18n } from '../../src/i18n';

interface WeakKanji {
  character: string;
  kanjiId: number;
  errorCount: number;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { level, totalXp, streakDays, badges, loadProfile, getCollectionStats, checkBadges } = useGameStore();
  const { t, language } = useI18n();
  const [collectionStats, setCollectionStats] = useState<{ grade: number; total: number; mastered: number }[]>([]);
  const [weakKanji, setWeakKanji] = useState<WeakKanji[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    loadProfile();
    loadData();
    checkBadges();
  }, []);

  async function loadData() {
    const stats = await getCollectionStats();
    setCollectionStats(stats);

    // Load weak kanji (most errors)
    try {
      const weakRows = await db
        .select({
          kanjiId: schema.reviewHistory.kanjiId,
          character: schema.kanji.character,
          errorCount: sql<number>`sum(case when ${schema.reviewHistory.correct} = 0 then 1 else 0 end)`,
        })
        .from(schema.reviewHistory)
        .innerJoin(schema.kanji, eq(schema.reviewHistory.kanjiId, schema.kanji.id))
        .groupBy(schema.reviewHistory.kanjiId, schema.kanji.character)
        .orderBy(desc(sql`sum(case when ${schema.reviewHistory.correct} = 0 then 1 else 0 end)`))
        .limit(20);

      setWeakKanji(weakRows.map((r: any) => ({
        character: r.character,
        kanjiId: r.kanjiId,
        errorCount: r.errorCount,
      })));
    } catch {}

    // Total reviews & accuracy
    try {
      const reviewStats = await db
        .select({
          total: sql<number>`count(*)`,
          correct: sql<number>`sum(case when ${schema.reviewHistory.correct} = 1 then 1 else 0 end)`,
        })
        .from(schema.reviewHistory);

      if (reviewStats[0]) {
        setTotalReviews(reviewStats[0].total);
        setAccuracy(reviewStats[0].total > 0
          ? Math.round((reviewStats[0].correct / reviewStats[0].total) * 100)
          : 0);
      }
    } catch {}
  }

  const totalMastered = collectionStats.reduce((sum, s) => sum + s.mastered, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.levelBadge}>Lv.{level.level} {level.title}</Text>
          <ProgressBar
            progress={level.xpForNext > 0 ? level.xp / level.xpForNext : 0}
            color={colors.accent}
            height={6}
            showLabel
            label={`${level.xp} / ${level.xpForNext} XP`}
          />
        </View>
      </View>

      {/* Quick stats */}
      <View style={styles.quickStats}>
        <QuickStat label={t('profile.streak')} value={`${streakDays}${t('home.days')}`} emoji="🔥" />
        <QuickStat label={t('profile.master')} value={`${totalMastered}${t('home.chars')}`} emoji="⭐" />
        <QuickStat label={t('profile.accuracy')} value={`${accuracy}%`} emoji="🎯" />
        <QuickStat label={t('profile.reviewCount')} value={`${totalReviews}`} emoji="📊" />
      </View>

      {/* Grade progress */}
      <Card>
        <Text style={styles.sectionTitle}>{t('profile.gradeMastery')}</Text>
        {collectionStats.map((s, i) => (
          <View key={s.grade} style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>{s.grade}{t('learn.grade')}</Text>
            <ProgressBar
              progress={s.total > 0 ? s.mastered / s.total : 0}
              color={GRADE_INFO[i]?.color ?? colors.primary}
              height={8}
              style={{ flex: 1, marginHorizontal: spacing.sm }}
            />
            <Text style={styles.gradeCount}>{s.mastered}/{s.total}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.collectionLink}
          onPress={() => router.push('/collection')}
        >
          <Text style={styles.collectionLinkText}>{t('profile.collection')}</Text>
        </TouchableOpacity>
      </Card>

      {/* Badges */}
      <Card>
        <Text style={styles.sectionTitle}>{t('profile.badges')}</Text>
        <View style={styles.badgeGrid}>
          {ALL_BADGES.map((badge) => {
            const unlocked = badges.some((b) => b.id === badge.id);
            return (
              <View key={badge.id} style={[styles.badgeItem, !unlocked && styles.badgeLocked]}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName} numberOfLines={1}>{language === 'ko' ? badge.nameKo : badge.nameJa}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* Weak kanji */}
      {weakKanji.length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>{t('profile.weakKanji')}</Text>
          <View style={styles.weakGrid}>
            {weakKanji.map((k) => (
              <TouchableOpacity
                key={k.kanjiId}
                style={styles.weakCell}
                onPress={() => router.push(`/kanji/${k.kanjiId}`)}
              >
                <Text style={styles.weakKanji}>{k.character}</Text>
                <Text style={styles.weakCount}>✕{k.errorCount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      )}

      {/* Navigation links */}
      <Card>
        <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/radical')}>
          <Text style={styles.settingLabel}>📚 {t('profile.radicals')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]} onPress={() => router.push('/settings')}>
          <Text style={styles.settingLabel}>⚙️ {t('profile.settings')}</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

function QuickStat({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxxl },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  avatarCircle: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', ...shadow.md,
  },
  avatarEmoji: { fontSize: 32 },
  profileInfo: { flex: 1 },
  levelBadge: { ...typography.h3, color: colors.accent, marginBottom: spacing.sm },
  quickStats: { flexDirection: 'row', gap: spacing.sm },
  statCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center', ...shadow.sm,
  },
  statEmoji: { fontSize: 20, marginBottom: spacing.xs },
  statValue: { ...typography.h3, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  gradeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  gradeLabel: { ...typography.label, color: colors.text, width: 50 },
  gradeCount: { ...typography.caption, color: colors.textSecondary, width: 55, textAlign: 'right' },
  collectionLink: { marginTop: spacing.md, alignItems: 'center' },
  collectionLinkText: { ...typography.label, color: colors.primary },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  badgeItem: {
    width: '22%', alignItems: 'center', padding: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.md, ...shadow.sm,
  },
  badgeLocked: { opacity: 0.3 },
  badgeIcon: { fontSize: 24 },
  badgeName: { ...typography.caption, color: colors.textSecondary, marginTop: 2, textAlign: 'center' },
  weakGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  weakCell: {
    width: 50, height: 60, backgroundColor: '#FEE2E2', borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  weakKanji: { fontFamily: 'NotoSerifJP', fontSize: 22, color: colors.error },
  weakCount: { ...typography.caption, color: colors.error, fontSize: 10 },
  settingRow: { paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  settingLabel: { ...typography.body, color: colors.text },
});
