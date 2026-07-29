import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

import {
  clearStoreTokens,
  getStoreAccessToken,
  getStoreRefreshToken,
  saveStoreTokens,
  type StoreTokens,
} from '@/lib/token-storage';

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type AuthFailureListener = () => void;

let authFailureListener: AuthFailureListener | null = null;
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

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

function isStoreAuthPath(url?: string) {
  return Boolean(url?.includes('/store-auth/login') || url?.includes('/store-auth/refresh'));
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
  const accessToken = getStoreAccessToken();

  if (accessToken && !isStoreAuthPath(config.url)) {
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
      isStoreAuthPath(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getStoreRefreshToken();

    if (!refreshToken) {
      await clearStoreTokens();
      notifyAuthFailure();
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
      const { data } = await refreshClient.post<StoreTokens>('/store-auth/refresh', {
        refreshToken,
      });

      await saveStoreTokens(data);
      processRefreshQueue(null, data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processRefreshQueue(refreshError, null);
      await clearStoreTokens();
      notifyAuthFailure();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
