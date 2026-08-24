import { getAccessToken } from '@/lib/token-storage';

type TokenPayload = {
  sub?: string;
  id?: string;
  storeId?: string;
};

export function getStoreIdFromToken() {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const padded = payload.replaceAll('-', '+').replaceAll('_', '/');
    const normalized = padded.padEnd(Math.ceil(padded.length / 4) * 4, '=');
    const data = JSON.parse(atob(normalized)) as TokenPayload;

    return data.storeId ?? data.sub ?? data.id ?? null;
  } catch {
    return null;
  }
}
