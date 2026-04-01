import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts, NotoSerifJP_400Regular, NotoSerifJP_700Bold } from '@expo-google-fonts/noto-serif-jp';
import { NotoSansJP_400Regular, NotoSansJP_600SemiBold, NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';
import { initDatabase } from '../src/db/client';
import { runMigrations } from '../src/db/migrate';
import { seedDatabase } from '../src/db/seed';
import { requestNotificationPermissions, scheduleReviewReminder } from '../src/services/notifications';
import { colors } from '../src/theme/colors';
import { onOnboardingDone, isOnboardingDone } from '../src/stores/onboardingFlag';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const [fontsLoaded] = useFonts({
    NotoSerifJP: NotoSerifJP_400Regular,
    'NotoSerifJP-Bold': NotoSerifJP_700Bold,
    NotoSansJP: NotoSansJP_400Regular,
    'NotoSansJP-SemiBold': NotoSansJP_600SemiBold,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
  });

  useEffect(() => {
    async function init() {
      try {
        console.log('[KanjiMaster] Initializing DB...');
        await initDatabase();
        console.log('[KanjiMaster] Starting migrations...');
        await runMigrations();
        console.log('[KanjiMaster] Migrations done. Seeding...');
        await seedDatabase();
        console.log('[KanjiMaster] Seed complete!');

        // Check if onboarding needed
        try {
          const { db: database, schema: sch } = await import('../src/db/client');
          const profiles = await database.select().from(sch.userProfile).limit(1);
          if (!isOnboardingDone() && (profiles.length === 0 || !profiles[0].lastStudyDate)) {
            setNeedsOnboarding(true);
          }
        } catch {
          setNeedsOnboarding(true);
        }

        // Request notification permissions (non-blocking)
        requestNotificationPermissions().then((granted) => {
          if (granted) {
            scheduleReviewReminder(9, 0);
          }
        });
      } catch (e) {
        console.error('[KanjiMaster] DB init failed:', e);
      } finally {
        setReady(true);
        SplashScreen.hideAsync();
      }
    }
    init();
  }, []);

  const router = useRouter();

  // Listen for onboarding completion
  useEffect(() => {
    const unsub = onOnboardingDone(() => {
      setNeedsOnboarding(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!needsOnboarding) return;
    router.replace('/onboarding');
  }, [ready, needsOnboarding]);

  if (!ready || !fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="kanji/[id]" options={{ title: '', presentation: 'card' }} />
        <Stack.Screen name="review" options={{ title: '', presentation: 'fullScreenModal' }} />
        <Stack.Screen name="quiz" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="write-quiz" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="collection" options={{ title: '', presentation: 'card' }} />
        <Stack.Screen name="radical" options={{ title: '', presentation: 'card' }} />
        <Stack.Screen name="settings" options={{ title: '', presentation: 'card' }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
