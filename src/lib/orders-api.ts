import { api } from '@/lib/axios';
import type { CheckoutResult, Order } from '@/types/order';

function readString(value: unknown, fallback = '') {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function normalizeOrder(value: unknown): Order | null {
  const data = asRecord(value);

  if (!data) {
    return null;
  }

  const nested = asRecord(data.order) ?? data;
  const id = readString(nested.id);

  if (!id) {
    return null;
  }

  return {
    id,
    storeId: readString(nested.storeId ?? nested.store_id) || undefined,
    status: readString(nested.status) || undefined,
    notes: readString(nested.notes) || undefined,
  };
}

function readOrderList(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  const data = asRecord(value);

  if (!data) {
    return [];
  }

  if (Array.isArray(data.orders)) {
    return data.orders;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (asRecord(data.order) || data.id) {
    return [data.order ?? data];
  }

  return [];
}

export function normalizeCheckout(value: unknown): CheckoutResult {
  return {
    orders: readOrderList(value).flatMap((item) => {
      const order = normalizeOrder(item);
      return order ? [order] : [];
    }),
  };
}

export async function checkoutCart(notes = '') {
  const { data } = await api.post('/orders/checkout', { notes: notes.trim() });
  return normalizeCheckout(data);
}
