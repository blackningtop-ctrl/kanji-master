import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { SRSState } from '../../types/srs';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export function Badge({
  label,
  color = colors.primary,
  textColor = '#FFFFFF',
  style,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const SRS_BADGE_CONFIG: Record<SRSState, { label: string; color: string }> = {
  new: { label: '新規', color: colors.srsNew },
  learning: { label: '学習中', color: colors.srsLearning },
  review: { label: '復習', color: colors.srsReview },
  mastered: { label: 'マスター', color: colors.srsMastered },
};

export function SRSBadge({ state, style }: { state: SRSState; style?: ViewStyle }) {
  const config = SRS_BADGE_CONFIG[state];
  return <Badge label={config.label} color={config.color} style={style} />;
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
});
