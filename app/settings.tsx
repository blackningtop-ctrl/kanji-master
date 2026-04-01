import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { Card } from '../src/components/ui/Card';
import { db, schema } from '../src/db/client';
import { eq } from 'drizzle-orm';
import { scheduleReviewReminder, cancelReviewReminders } from '../src/services/notifications';
import { useThemeStore, ThemeMode } from '../src/stores/useThemeStore';
import { useI18n, AppLanguage } from '../src/i18n';

export default function SettingsScreen() {
  const router = useRouter();
  const { mode: themeMode, setMode: setThemeMode } = useThemeStore();
  const { t, language, setLanguage } = useI18n();
  const [dailyGoal, setDailyGoal] = useState(10);
  const [dailyNewLimit, setDailyNewLimit] = useState(5);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationHour, setNotificationHour] = useState(9);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const rows = await db.select().from(schema.userProfile).limit(1);
      if (rows.length > 0) {
        setDailyGoal(rows[0].dailyGoalMinutes);
        setDailyNewLimit(rows[0].dailyNewLimit);
      }
    } catch {}
  }

  async function updateSetting(field: string, value: number | string) {
    try {
      await db.update(schema.userProfile).set({ [field]: value }).where(eq(schema.userProfile.id, 1));
    } catch {}
  }

  function handleGoalChange(minutes: number) {
    setDailyGoal(minutes);
    updateSetting('dailyGoalMinutes', minutes);
  }

  function handleNewLimitChange(limit: number) {
    setDailyNewLimit(limit);
    updateSetting('dailyNewLimit', limit);
  }

  async function handleNotificationToggle(enabled: boolean) {
    setNotificationsEnabled(enabled);
    if (enabled) {
      await scheduleReviewReminder(notificationHour, 0);
    } else {
      await cancelReviewReminders();
    }
  }

  function handleResetData() {
    Alert.alert(
      t('settings.resetTitle'),
      t('settings.resetMessage'),
      [
        { text: t('settings.cancel'), style: 'cancel' },
        {
          text: t('settings.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await db.run(require('drizzle-orm').sql`DELETE FROM srs_cards`);
              await db.run(require('drizzle-orm').sql`DELETE FROM review_history`);
              await db.run(require('drizzle-orm').sql`DELETE FROM daily_stats`);
              await db.update(schema.userProfile).set({
                xp: 0, level: 1, streakDays: 0, lastStudyDate: null,
              }).where(eq(schema.userProfile.id, 1));
              Alert.alert(t('settings.resetDone'), t('settings.resetDoneMsg'));
            } catch {}
          },
        },
      ],
    );
  }

  const GOAL_OPTIONS = [5, 10, 15, 20, 30];
  const NEW_LIMIT_OPTIONS = [3, 5, 8, 10, 15];
  const HOUR_OPTIONS = [7, 8, 9, 10, 12, 18, 20, 21];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Daily goal */}
      <Card>
        <Text style={styles.sectionTitle}>{t('settings.dailyGoal')}</Text>
        <View style={styles.optionRow}>
          {GOAL_OPTIONS.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.chip, dailyGoal === m && styles.chipActive]}
              onPress={() => handleGoalChange(m)}
            >
              <Text style={[styles.chipText, dailyGoal === m && styles.chipTextActive]}>{m}{t('settings.min')}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* New kanji per day */}
      <Card>
        <Text style={styles.sectionTitle}>{t('settings.newLimit')}</Text>
        <View style={styles.optionRow}>
          {NEW_LIMIT_OPTIONS.map((n) => (
            <TouchableOpacity
              key={n}
              style={[styles.chip, dailyNewLimit === n && styles.chipActive]}
              onPress={() => handleNewLimitChange(n)}
            >
              <Text style={[styles.chipText, dailyNewLimit === n && styles.chipTextActive]}>{n}{t('settings.chars')}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Notifications */}
      <Card>
        <Text style={styles.sectionTitle}>{t('settings.notifications')}</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{t('settings.reviewReminder')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ true: colors.primary }}
          />
        </View>
        {notificationsEnabled && (
          <>
            <Text style={styles.subLabel}>{t('settings.notifTime')}</Text>
            <View style={styles.optionRow}>
              {HOUR_OPTIONS.map((h) => (
                <TouchableOpacity
                  key={h}
                  style={[styles.chip, notificationHour === h && styles.chipActive]}
                  onPress={() => {
                    setNotificationHour(h);
                    scheduleReviewReminder(h, 0);
                  }}
                >
                  <Text style={[styles.chipText, notificationHour === h && styles.chipTextActive]}>{h}:00</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </Card>

      {/* Theme */}
      <Card>
        <Text style={styles.sectionTitle}>{t('settings.theme')}</Text>
        <View style={styles.optionRow}>
          {([['light', t('settings.light')], ['dark', t('settings.dark')], ['system', t('settings.system')]] as [string, string][]).map(([m, label]) => (
            <TouchableOpacity
              key={m}
              style={[styles.chip, themeMode === m && styles.chipActive]}
              onPress={() => setThemeMode(m as ThemeMode)}
            >
              <Text style={[styles.chipText, themeMode === m && styles.chipTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Language */}
      <Card>
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <View style={styles.optionRow}>
          {[['ko', '한국어'], ['ja', '日本語']].map(([code, label]) => (
            <TouchableOpacity
              key={code}
              style={[styles.chip, language === code && styles.chipActive]}
              onPress={() => { setLanguage(code as AppLanguage); updateSetting('language', code === 'ko' ? 'ko' : 'ja'); }}
            >
              <Text style={[styles.chipText, language === code && styles.chipTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* About */}
      <Card>
        <Text style={styles.sectionTitle}>{t('settings.appInfo')}</Text>
        <Text style={styles.infoText}>{t('settings.version')}</Text>
        <Text style={styles.infoText}>{t('settings.kanjiCount')}</Text>
        <Text style={styles.infoText}>{t('settings.curriculum')}</Text>
      </Card>

      {/* Reset */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetData}>
        <Text style={styles.resetText}>{t('settings.resetData')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxxl },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.label, color: colors.textSecondary },
  chipTextActive: { color: '#fff' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { ...typography.body, color: colors.text },
  subLabel: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.md, marginBottom: spacing.sm },
  infoText: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.xs },
  resetButton: {
    padding: spacing.lg, alignItems: 'center',
    backgroundColor: colors.error + '10', borderRadius: radius.md,
  },
  resetText: { ...typography.label, color: colors.error },
});
