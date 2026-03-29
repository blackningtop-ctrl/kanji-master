import { Platform } from 'react-native';

const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

let Notifications: any = null;

if (isNative) {
  try {
    Notifications = require('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
        priority: Notifications.AndroidNotificationPriority?.HIGH,
      }),
    });
  } catch {
    // expo-notifications not available
  }
}

/** Request notification permissions */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!isNative || !Notifications) return false;

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
  if (!isNative || !Notifications) return null;

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
  if (!isNative || !Notifications) return;
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
  if (!isNative || !Notifications) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notif of scheduled) {
    if (notif.content.data?.type === 'review' || notif.content.data?.type === 'review_due') {
      await Notifications.cancelScheduledNotificationAsync(notif.identifier);
    }
  }
}

/** Get count of scheduled notifications */
export async function getScheduledCount(): Promise<number> {
  if (!isNative || !Notifications) return 0;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  return scheduled.length;
}
