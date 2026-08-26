import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  getTokenOwner,
  normalizeAuthTokens,
  saveTokens,
  type AuthTokens,
  type TokenOwner,
} from '@/lib/token-storage';

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

type AuthFailureListener = () => void;

let authFailureListener: AuthFailureListener | null = null;
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const AUTH_PATHS = [
  '/auth/login',
  '/auth/refresh',
  '/store-auth/login',
  '/store-auth/refresh',
];

export function getApiBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  return Platform.select({
    android: 'http://10.0.2.2:3333',
    default: 'http://localhost:3333',
  })!;
}

export function onAuthFailure(listener: AuthFailureListener) {
  authFailureListener = listener;

  return () => {
    if (authFailureListener === listener) {
      authFailureListener = null;
    }
  };
}

function notifyAuthFailure() {
  authFailureListener?.();
}

function processRefreshQueue(error: unknown, token: string | null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      reject(error ?? new Error('Failed to refresh token'));
      return;
    }

    resolve(token);
  });

  refreshQueue = [];
}

function isAuthPath(url?: string) {
  return Boolean(url && AUTH_PATHS.some((path) => url.includes(path)));
}

function getRefreshEndpoint(owner: TokenOwner) {
  return owner === 'store' ? '/store-auth/refresh' : '/auth/refresh';
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken && !isAuthPath(config.url)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthPath(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    const owner = getTokenOwner();
    const skipLogout = Boolean(originalRequest.skipAuthRefresh);

    if (!refreshToken || !owner) {
      if (!skipLogout) {
        await clearTokens();
        notifyAuthFailure();
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((accessToken) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await refreshClient.post<AuthTokens>(getRefreshEndpoint(owner), {
        refreshToken,
      });
      const tokens = normalizeAuthTokens(data);

      if (!tokens) {
        throw new Error('Invalid refresh tokens');
      }

      await saveTokens(owner, tokens);
      processRefreshQueue(null, tokens.accessToken);

      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processRefreshQueue(refreshError, null);
      if (!skipLogout) {
        await clearTokens();
        notifyAuthFailure();
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
