import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

type KanjiSize = 'huge' | 'large' | 'medium' | 'small' | 'grid';

interface KanjiTextProps {
  children: string;
  size?: KanjiSize;
  color?: string;
  style?: TextStyle;
}

const SIZE_MAP: Record<KanjiSize, TextStyle> = {
  huge: typography.kanjiHuge,
  large: typography.kanjiLarge,
  medium: typography.kanjiMedium,
  small: typography.kanjiSmall,
  grid: typography.kanjiGrid,
};

export function KanjiText({
  children,
  size = 'large',
  color = colors.text,
  style,
}: KanjiTextProps) {
  return (
    <Text style={[SIZE_MAP[size], { color }, style]}>
      {children}
    </Text>
  );
}

interface FuriganaTextProps {
  kanji: string;
  reading: string;
  style?: TextStyle;
}

export function FuriganaText({ kanji, reading, style }: FuriganaTextProps) {
  return (
    <Text style={[styles.furiganaWrapper, style]}>
      <Text style={styles.furigana}>{reading}{'\n'}</Text>
      <Text style={styles.kanjiInline}>{kanji}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  furiganaWrapper: {
    textAlign: 'center',
  },
  furigana: {
    ...typography.furigana,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  kanjiInline: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
});
