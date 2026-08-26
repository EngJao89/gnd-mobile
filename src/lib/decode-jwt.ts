import { getAccessToken } from '@/lib/token-storage';

export type TokenPayload = {
  sub?: string;
  id?: string;
  storeId?: string;
  email?: string;
};

export function decodeJwtPayload(): TokenPayload | null {
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
    return JSON.parse(atob(normalized)) as TokenPayload;
  } catch {
    return null;
  }
}

export function getSubjectFromToken() {
  const payload = decodeJwtPayload();
  return payload?.sub ?? payload?.id ?? null;
}
