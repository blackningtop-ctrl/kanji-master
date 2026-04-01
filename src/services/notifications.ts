/**
 * Notifications service — guarded for Expo Go compatibility.
 * expo-notifications push was removed from Expo Go in SDK 53.
 * This module gracefully degrades when the native module is unavailable.
 */

let Notifications: any = null;
let isAvailable = false;

try {
  Notifications = require('expo-notifications');
  // Test if the native module actually works
  if (Notifications?.setNotificationHandler) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    isAvailable = true;
  }
} catch {
  console.log('[Notifications] expo-notifications not available, skipping');
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (!isAvailable) return false;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  } catch {
    return false;
  }
}

export async function scheduleReviewReminder(_hour = 9, _minute = 0): Promise<string | null> {
  if (!isAvailable) return null;
  try {
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
        hour: _hour,
        minute: _minute,
      },
    });
    return id;
  } catch {
    return null;
  }
}

export async function scheduleNextReviewNotification(dueDate: Date, dueCount: number): Promise<void> {
  if (!isAvailable) return;
  if (dueDate.getTime() <= Date.now()) return;
  try {
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
  } catch {}
}

export async function cancelReviewReminders(): Promise<void> {
  if (!isAvailable) return;
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    for (const notif of scheduled) {
      if (notif.content.data?.type === 'review' || notif.content.data?.type === 'review_due') {
        await Notifications.cancelScheduledNotificationAsync(notif.identifier);
      }
    }
  } catch {}
}

export async function getScheduledCount(): Promise<number> {
  if (!isAvailable) return 0;
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    return scheduled.length;
  } catch {
    return 0;
  }
}
