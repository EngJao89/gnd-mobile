import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'store_access_token';
const REFRESH_TOKEN_KEY = 'store_refresh_token';

export type StoreTokens = {
  accessToken: string;
  refreshToken: string;
};

let memoryTokens: StoreTokens | null = null;
let shouldPersist = false;

const canUseSecureStore = Platform.OS !== 'web';

async function setSecureItem(key: string, value: string) {
  if (!canUseSecureStore) {
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getSecureItem(key: string) {
  if (!canUseSecureStore) {
    return null;
  }

  return SecureStore.getItemAsync(key);
}

async function deleteSecureItem(key: string) {
  if (!canUseSecureStore) {
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

export async function saveStoreTokens(tokens: StoreTokens, persist?: boolean) {
  if (persist !== undefined) {
    shouldPersist = persist;
  }

  memoryTokens = tokens;

  if (shouldPersist) {
    await Promise.all([
      setSecureItem(ACCESS_TOKEN_KEY, tokens.accessToken),
      setSecureItem(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
  } else {
    await Promise.all([deleteSecureItem(ACCESS_TOKEN_KEY), deleteSecureItem(REFRESH_TOKEN_KEY)]);
  }
}

export async function loadPersistedStoreTokens(): Promise<StoreTokens | null> {
  const [accessToken, refreshToken] = await Promise.all([
    getSecureItem(ACCESS_TOKEN_KEY),
    getSecureItem(REFRESH_TOKEN_KEY),
  ]);

  if (!accessToken || !refreshToken) {
    return null;
  }

  memoryTokens = { accessToken, refreshToken };
  shouldPersist = true;
  return memoryTokens;
}

export function getStoreAccessToken() {
  return memoryTokens?.accessToken ?? null;
}

export function getStoreRefreshToken() {
  return memoryTokens?.refreshToken ?? null;
}

export async function clearStoreTokens() {
  memoryTokens = null;
  shouldPersist = false;
  await Promise.all([deleteSecureItem(ACCESS_TOKEN_KEY), deleteSecureItem(REFRESH_TOKEN_KEY)]);
}
