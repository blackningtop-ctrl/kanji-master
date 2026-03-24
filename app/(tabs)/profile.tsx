import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { useStudyStore } from '../../src/stores/useStudyStore';

export default function ProfileScreen() {
  const { stats } = useStudyStore();
  const totalKanji = stats.newCount + stats.learningCount + stats.reviewCount + stats.masteredCount;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 프로필 헤더 */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>学</Text>
        </View>
        <Text style={styles.name}>学習者</Text>
        <Text style={styles.levelText}>レベル 1</Text>
      </View>

      {/* XP 프로그레스 */}
      <Card>
        <Text style={styles.cardTitle}>経験値</Text>
        <ProgressBar
          progress={0}
          color={colors.accent}
          showLabel
          label="0 / 100 XP"
        />
      </Card>

      {/* 학습 통계 */}
      <Card>
        <Text style={styles.cardTitle}>学習統計</Text>
        <View style={styles.statsGrid}>
          <StatItem label="総漢字" value={`${totalKanji}`} />
          <StatItem label="マスター" value={`${stats.masteredCount}`} />
          <StatItem label="学習中" value={`${stats.learningCount}`} />
          <StatItem label="正答率" value="--%" />
        </View>
      </Card>

      {/* 한자 도감 진도 */}
      <Card>
        <Text style={styles.cardTitle}>漢字図鑑</Text>
        <ProgressBar
          progress={totalKanji > 0 ? stats.masteredCount / 1026 : 0}
          color={colors.primary}
          showLabel
          label={`${stats.masteredCount} / 1,026 字`}
        />
      </Card>

      {/* 배지 영역 */}
      <Card>
        <Text style={styles.cardTitle}>バッジ</Text>
        <Text style={styles.emptyBadge}>まだバッジがありません</Text>
      </Card>
    </ScrollView>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  name: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.md,
  },
  levelText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyBadge: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
