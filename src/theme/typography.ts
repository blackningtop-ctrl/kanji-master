import { Platform, TextStyle } from 'react-native';

const kanjiFont = 'NotoSerifJP';
const uiFont = 'NotoSansJP';
const monoFont = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

export const typography = {
  // Kanji display — Noto Serif JP (明朝体)
  kanjiHuge: {
    fontFamily: kanjiFont,
    fontSize: 120,
    lineHeight: 140,
  } as TextStyle,
  kanjiLarge: {
    fontFamily: kanjiFont,
    fontSize: 72,
    lineHeight: 88,
  } as TextStyle,
  kanjiMedium: {
    fontFamily: kanjiFont,
    fontSize: 48,
    lineHeight: 60,
  } as TextStyle,
  kanjiSmall: {
    fontFamily: kanjiFont,
    fontSize: 32,
    lineHeight: 40,
  } as TextStyle,
  kanjiGrid: {
    fontFamily: kanjiFont,
    fontSize: 28,
    lineHeight: 36,
  } as TextStyle,

  // UI text — Noto Sans JP (ゴシック)
  h1: {
    fontFamily: uiFont,
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  } as TextStyle,
  h2: {
    fontFamily: uiFont,
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  } as TextStyle,
  h3: {
    fontFamily: uiFont,
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  } as TextStyle,
  body: {
    fontFamily: uiFont,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  bodySmall: {
    fontFamily: uiFont,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  caption: {
    fontFamily: uiFont,
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  label: {
    fontFamily: uiFont,
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  } as TextStyle,
  button: {
    fontFamily: uiFont,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  } as TextStyle,

  // Reading annotations (furigana)
  furigana: {
    fontFamily: uiFont,
    fontSize: 10,
    lineHeight: 14,
  } as TextStyle,

  // Monospace (numbers, codes)
  mono: {
    fontFamily: monoFont,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
} as const;
