import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

/** Returns bottom padding to avoid Android navigation bar overlap */
export function useBottomInset(minPadding = 16) {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 0) + minPadding;
}
