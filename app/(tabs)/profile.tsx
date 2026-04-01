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
      {/* Profile header — level + XP bar */}
      <View style={styles.header}>
        <Text style={styles.levelText}>{level.title} · Lv.{level.level}</Text>
        <ProgressBar
          progress={level.xpForNext > 0 ? level.xp / level.xpForNext : 0}
          color={colors.accent}
          height={6}
          showLabel
          label={`${level.xp} / ${level.xpForNext} ${t('challenge.studyPoints')}`}
        />
      </View>

      {/* Quick stats — 4 text cards, no emojis */}
      <View style={styles.quickStats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{streakDays}{t('home.days')}</Text>
          <Text style={styles.statLabel}>{t('profile.streak')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalMastered}{t('home.chars')}</Text>
          <Text style={styles.statLabel}>{t('profile.master')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{accuracy}%</Text>
          <Text style={styles.statLabel}>{t('profile.accuracy')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalReviews}</Text>
          <Text style={styles.statLabel}>{t('profile.reviewCount')}</Text>
        </View>
      </View>

      {/* Grade progress */}
      <Card>
        <Text style={styles.sectionTitle}>{t('profile.gradeMastery')}</Text>
        {collectionStats.map((s, i) => (
          <View key={s.grade} style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>{GRADE_INFO[i]?.label ?? `${s.grade}${t('learn.grade')}`}</Text>
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

      {/* Milestones — text list */}
      <Card>
        <Text style={styles.sectionTitle}>{t('profile.milestones')}</Text>
        {ALL_BADGES.map((badge) => {
          const unlocked = badges.some((b) => b.id === badge.id);
          const badgeName = language === 'ko' ? badge.nameKo : badge.nameJa;
          return (
            <View key={badge.id} style={styles.milestoneRow}>
              <Text style={[styles.milestoneStatus, !unlocked && styles.milestoneLocked]}>
                {unlocked ? '\u2713' : '\u2014'}
              </Text>
              <Text style={[styles.milestoneName, !unlocked && styles.milestoneNameLocked]}>
                {badgeName}{!unlocked ? ` (${language === 'ko' ? '\uBBF8\uB2EC\uC131' : '\u672A\u9054\u6210'})` : ''}
              </Text>
            </View>
          );
        })}
      </Card>

      {/* Weak kanji — neutral styling */}
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
                <Text style={styles.weakCount}>{k.errorCount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      )}

      {/* Navigation links */}
      <Card>
        <TouchableOpacity style={styles.navRow} onPress={() => router.push('/radical')}>
          <Text style={styles.navLabel}>{t('profile.radicals')}</Text>
          <Text style={styles.navArrow}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navRow, styles.navRowLast]} onPress={() => router.push('/settings')}>
          <Text style={styles.navLabel}>{t('profile.settings')}</Text>
          <Text style={styles.navArrow}>{'>'}</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxxl },

  // Header
  header: { gap: spacing.sm },
  levelText: { ...typography.h2, color: colors.text },

  // Quick stats
  quickStats: { flexDirection: 'row', gap: spacing.sm },
  statCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center', ...shadow.sm,
  },
  statValue: { ...typography.h3, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  // Sections
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },

  // Grade progress
  gradeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  gradeLabel: { ...typography.caption, color: colors.text, width: 90 },
  gradeCount: { ...typography.caption, color: colors.textSecondary, width: 55, textAlign: 'right' },
  collectionLink: { marginTop: spacing.md, alignItems: 'center' },
  collectionLinkText: { ...typography.label, color: colors.primary },

  // Milestones
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  milestoneStatus: { ...typography.body, color: colors.text, fontWeight: '700', width: 20, textAlign: 'center' },
  milestoneLocked: { color: colors.textLight },
  milestoneName: { ...typography.body, color: colors.text, flex: 1 },
  milestoneNameLocked: { color: colors.textSecondary },

  // Weak kanji — neutral colors
  weakGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  weakCell: {
    width: 50, height: 60, backgroundColor: colors.surface, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center', ...shadow.sm,
  },
  weakKanji: { fontFamily: 'NotoSerifJP', fontSize: 22, color: colors.text },
  weakCount: { ...typography.caption, color: colors.textSecondary, fontSize: 10 },

  // Navigation links
  navRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  navRowLast: { borderBottomWidth: 0 },
  navLabel: { ...typography.body, color: colors.text },
  navArrow: { ...typography.body, color: colors.textLight, fontSize: 18 },
});
