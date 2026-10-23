import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const subscribe = () => () => {};

function useIsHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const isHydrated = useIsHydrated();
  const colorScheme = useRNColorScheme();

  if (isHydrated) {
    return colorScheme;
  }

  return 'light';
}
