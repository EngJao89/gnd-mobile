import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TokenOwner = 'user' | 'store';

function readToken(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

export function normalizeAuthTokens(payload: unknown): AuthTokens | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const data = payload as Record<string, unknown>;
  const nestedCandidates = [data.tokens, data.data, data];

  for (const candidate of nestedCandidates) {
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
      const nested = candidate as Record<string, unknown>;
      const accessToken = readToken(nested.accessToken ?? nested.access_token);
      const refreshToken = readToken(nested.refreshToken ?? nested.refresh_token);

      if (accessToken && refreshToken) {
        return { accessToken, refreshToken };
      }
    }
  }

  return null;
}

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

const EMAIL_KEYS: Record<TokenOwner, string> = {
  user: 'user_remembered_email',
  store: 'store_remembered_email',
};

let memoryTokens: AuthTokens | null = null;
let activeOwner: TokenOwner | null = null;
let shouldPersist = false;

const canUseSecureStore = Platform.OS !== 'web';

function getWebStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

async function setSecureItem(key: string, value: string) {
  if (!canUseSecureStore) {
    getWebStorage()?.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getSecureItem(key: string) {
  if (!canUseSecureStore) {
    return getWebStorage()?.getItem(key) ?? null;
  }

  return SecureStore.getItemAsync(key);
}

async function deleteSecureItem(key: string) {
  if (!canUseSecureStore) {
    getWebStorage()?.removeItem(key);
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
  const normalized = normalizeAuthTokens(tokens);

  if (!normalized) {
    throw new Error('Invalid auth tokens');
  }

  if (persist !== undefined) {
    shouldPersist = persist;
  }

  const otherOwner: TokenOwner = owner === 'user' ? 'store' : 'user';

  memoryTokens = normalized;
  activeOwner = owner;

  await clearOwnerKeys(otherOwner);

  if (shouldPersist) {
    const keys = TOKEN_KEYS[owner];
    await Promise.all([
      setSecureItem(keys.access, normalized.accessToken),
      setSecureItem(keys.refresh, normalized.refreshToken),
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

async function saveRememberedEmail(owner: TokenOwner, email: string) {
  await setSecureItem(EMAIL_KEYS[owner], email);
}

export async function loadRememberedEmail(owner: TokenOwner) {
  return getSecureItem(EMAIL_KEYS[owner]);
}

async function clearRememberedEmail(owner: TokenOwner) {
  await deleteSecureItem(EMAIL_KEYS[owner]);
}

export async function persistRememberedEmail(
  owner: TokenOwner,
  email: string,
  rememberMe: boolean,
) {
  if (rememberMe) {
    await saveRememberedEmail(owner, email);
    return;
  }

  await clearRememberedEmail(owner);
}

export async function clearTokens() {
  memoryTokens = null;
  activeOwner = null;
  shouldPersist = false;
  await Promise.all([clearOwnerKeys('user'), clearOwnerKeys('store')]);
}
