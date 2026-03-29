import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/** Configure notification handler */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

/** Request notification permissions */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('review', {
      name: '復習リマインダー',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D94F4F',
    });
  }

  return true;
}

/** Schedule daily review reminder */
export async function scheduleReviewReminder(hour = 9, minute = 0): Promise<string | null> {
  await cancelReviewReminders();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '漢字マスター 📚',
      body: '復習の時間です！今日の漢字を復習しましょう。',
      sound: true,
      data: { type: 'review' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  return id;
}

/** Schedule a one-time reminder for due cards */
export async function scheduleNextReviewNotification(dueDate: Date, dueCount: number): Promise<void> {
  if (dueDate.getTime() <= Date.now()) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '復習カードがあります ✏️',
      body: `${dueCount}枚のカードが復習待ちです。`,
      sound: true,
      data: { type: 'review_due' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: dueDate,
    },
  });
}

/** Cancel all review reminders */
export async function cancelReviewReminders(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notif of scheduled) {
    if (notif.content.data?.type === 'review' || notif.content.data?.type === 'review_due') {
      await Notifications.cancelScheduledNotificationAsync(notif.identifier);
    }
  }
}

/** Get count of scheduled notifications */
export async function getScheduledCount(): Promise<number> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  return scheduled.length;
}
