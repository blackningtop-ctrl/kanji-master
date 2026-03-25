import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Card } from '../ui/Card';
import { db, schema } from '../../db/client';
import { eq, and } from 'drizzle-orm';

interface MnemonicCardProps {
  kanjiId: number;
  character: string;
}

interface Mnemonic {
  id: number;
  language: string;
  story: string;
  isDefault: boolean;
}

const LANG_LABELS: Record<string, string> = {
  ja: '🇯🇵 日本語',
  ko: '🇰🇷 한국어',
  en: '🇬🇧 English',
};

export function MnemonicCard({ kanjiId, character }: MnemonicCardProps) {
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);
  const [selectedLang, setSelectedLang] = useState('ja');
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [hasCustom, setHasCustom] = useState(false);

  useEffect(() => {
    loadMnemonics();
  }, [kanjiId]);

  async function loadMnemonics() {
    const rows = await db
      .select()
      .from(schema.mnemonics)
      .where(eq(schema.mnemonics.kanjiId, kanjiId));

    setMnemonics(rows.map((r) => ({
      id: r.id,
      language: r.language,
      story: r.story,
      isDefault: r.isDefault,
    })));

    // Check for custom mnemonic
    const custom = rows.find((r) => !r.isDefault);
    if (custom) {
      setHasCustom(true);
      setCustomText(custom.story);
    }
  }

  const currentMnemonic = mnemonics.find(
    (m) => m.language === selectedLang && m.isDefault
  );

  async function saveCustomMnemonic() {
    if (!customText.trim()) return;

    if (hasCustom) {
      const custom = mnemonics.find((m) => !m.isDefault);
      if (custom) {
        await db
          .update(schema.mnemonics)
          .set({ story: customText.trim() })
          .where(eq(schema.mnemonics.id, custom.id));
      }
    } else {
      await db.insert(schema.mnemonics).values({
        kanjiId,
        language: selectedLang,
        story: customText.trim(),
        isDefault: false,
        authorId: 'user',
      });
    }

    setIsEditing(false);
    setHasCustom(true);
    loadMnemonics();
  }

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>覚え方</Text>
        <View style={styles.langTabs}>
          {['ja', 'ko', 'en'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.langTab, selectedLang === lang && styles.langTabActive]}
              onPress={() => setSelectedLang(lang)}
            >
              <Text style={[styles.langTabText, selectedLang === lang && styles.langTabTextActive]}>
                {lang.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Default mnemonic */}
      {currentMnemonic ? (
        <View style={styles.storyBox}>
          <Text style={styles.storyText}>{currentMnemonic.story}</Text>
          <Text style={styles.storyLabel}>デフォルト</Text>
        </View>
      ) : (
        <Text style={styles.emptyText}>
          この言語のニモニックはまだありません
        </Text>
      )}

      {/* Custom mnemonic */}
      {isEditing ? (
        <View style={styles.editBox}>
          <TextInput
            style={styles.editInput}
            value={customText}
            onChangeText={setCustomText}
            placeholder={`「${character}」の覚え方を書いてみよう...`}
            placeholderTextColor={colors.textLight}
            multiline
            maxLength={200}
          />
          <View style={styles.editActions}>
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveCustomMnemonic}>
              <Text style={styles.saveText}>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.addButtonText}>
            {hasCustom ? '✏️ カスタム編集' : '➕ 自分の覚え方を追加'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Show custom if exists */}
      {hasCustom && !isEditing && (
        <View style={[styles.storyBox, styles.customBox]}>
          <Text style={styles.storyText}>{customText}</Text>
          <Text style={styles.storyLabel}>カスタム</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  title: { ...typography.h3, color: colors.text },
  langTabs: { flexDirection: 'row', gap: spacing.xs },
  langTab: {
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs,
    borderRadius: radius.sm, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
  },
  langTabActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  langTabText: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  langTabTextActive: { color: '#fff' },
  storyBox: {
    backgroundColor: colors.background, padding: spacing.md,
    borderRadius: radius.md, marginBottom: spacing.sm,
  },
  customBox: { backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A' },
  storyText: { ...typography.body, color: colors.text, lineHeight: 24 },
  storyLabel: { ...typography.caption, color: colors.textLight, marginTop: spacing.xs },
  emptyText: { ...typography.bodySmall, color: colors.textLight, paddingVertical: spacing.md },
  editBox: { marginTop: spacing.sm },
  editInput: {
    ...typography.body, color: colors.text,
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
    minHeight: 80, textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row', justifyContent: 'flex-end',
    gap: spacing.md, marginTop: spacing.sm,
  },
  cancelText: { ...typography.label, color: colors.textSecondary },
  saveButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.md },
  saveText: { ...typography.label, color: '#fff' },
  addButton: {
    marginTop: spacing.sm, padding: spacing.md,
    backgroundColor: colors.secondary + '10', borderRadius: radius.md,
    alignItems: 'center', borderWidth: 1, borderColor: colors.secondary + '30',
    borderStyle: 'dashed',
  },
  addButtonText: { ...typography.label, color: colors.secondary },
});
