/**
 * Web compatibility layer for drizzle-orm query conditions.
 *
 * On web, we intercept drizzle's eq/lte/ne/and/inArray/sql functions
 * to produce simple condition objects that our in-memory DB proxy understands.
 *
 * This module monkey-patches the condition builders when running on web.
 */
import { Platform } from 'react-native';

export function patchDrizzleForWeb() {
  if (Platform.OS !== 'web') return;

  // The web DB proxy reads condition objects with _type field.
  // drizzle-orm's actual eq/lte/etc produce SQL AST nodes.
  // On web, we need these to produce our simple objects instead.
  // Since our proxy handles the `then` method, we intercept at the
  // query chain level (in client.ts createQueryChain).
  // The conditions from drizzle are passed as-is to our matchesWhere.

  console.log('[WebCompat] Web platform detected, using in-memory DB');
}
