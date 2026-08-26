import { decodeJwtPayload } from '@/lib/decode-jwt';

export function getStoreIdFromToken() {
  const payload = decodeJwtPayload();

  if (!payload) {
    return null;
  }

  return payload.storeId ?? payload.sub ?? payload.id ?? null;
}
