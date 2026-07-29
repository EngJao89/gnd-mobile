import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TokenOwner = 'user' | 'store';

const TOKEN_KEYS: Record<TokenOwner, { access: string; refresh: string }> = {
  user: {
    access: 'user_access_token',
    refresh: 'user_refresh_token',
  },
  store: {
    access: 'store_access_token',
    refresh: 'store_refresh_token',
  },
};

let memoryTokens: AuthTokens | null = null;
let activeOwner: TokenOwner | null = null;
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

async function clearOwnerKeys(owner: TokenOwner) {
  const keys = TOKEN_KEYS[owner];
  await Promise.all([deleteSecureItem(keys.access), deleteSecureItem(keys.refresh)]);
}

async function readPersistedOwnerTokens(owner: TokenOwner): Promise<AuthTokens | null> {
  const keys = TOKEN_KEYS[owner];
  const [accessToken, refreshToken] = await Promise.all([
    getSecureItem(keys.access),
    getSecureItem(keys.refresh),
  ]);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

export async function saveTokens(
  owner: TokenOwner,
  tokens: AuthTokens,
  persist?: boolean,
) {
  if (persist !== undefined) {
    shouldPersist = persist;
  }

  const otherOwner: TokenOwner = owner === 'user' ? 'store' : 'user';

  memoryTokens = tokens;
  activeOwner = owner;

  await clearOwnerKeys(otherOwner);

  if (shouldPersist) {
    const keys = TOKEN_KEYS[owner];
    await Promise.all([
      setSecureItem(keys.access, tokens.accessToken),
      setSecureItem(keys.refresh, tokens.refreshToken),
    ]);
  } else {
    await clearOwnerKeys(owner);
  }
}

export async function loadPersistedTokens(): Promise<{
  owner: TokenOwner;
  tokens: AuthTokens;
} | null> {
  const userTokens = await readPersistedOwnerTokens('user');

  if (userTokens) {
    memoryTokens = userTokens;
    activeOwner = 'user';
    shouldPersist = true;
    return { owner: 'user', tokens: userTokens };
  }

  const storeTokens = await readPersistedOwnerTokens('store');

  if (storeTokens) {
    memoryTokens = storeTokens;
    activeOwner = 'store';
    shouldPersist = true;
    return { owner: 'store', tokens: storeTokens };
  }

  return null;
}

export function getAccessToken() {
  return memoryTokens?.accessToken ?? null;
}

export function getRefreshToken() {
  return memoryTokens?.refreshToken ?? null;
}

export function getTokenOwner() {
  return activeOwner;
}

export async function clearTokens() {
  memoryTokens = null;
  activeOwner = null;
  shouldPersist = false;
  await Promise.all([clearOwnerKeys('user'), clearOwnerKeys('store')]);
}
