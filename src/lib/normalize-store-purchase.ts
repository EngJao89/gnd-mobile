import type { Product } from '@/types/product';
import type { StorePurchase, StorePurchaseBuyer } from '@/types/purchase';

function readString(value: unknown, fallback = '') {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return fallback;
}

function readNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeBuyer(value: unknown): StorePurchaseBuyer | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const buyer = value as Record<string, unknown>;
  const id = readString(buyer.id);

  if (!id) {
    return null;
  }

  return {
    id,
    firstName: readString(buyer.firstName ?? buyer.first_name) || undefined,
    surname: readString(buyer.surname) || undefined,
    email: readString(buyer.email) || undefined,
  };
}

export function normalizeStorePurchase(value: unknown): StorePurchase | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const item = value as Record<string, unknown>;
  const product = item.product;
  const id = readString(item.id);

  if (!id || !product || typeof product !== 'object') {
    return null;
  }

  const quantity = readNumber(item.quantity, 1);
  const unitPrice = readString(
    item.unitPrice ?? item.unit_price ?? (product as Product).price,
  );
  const totalPrice =
    readString(item.totalPrice ?? item.total_price) ||
    String(Number(unitPrice) * quantity);
  const createdAt = readString(item.createdAt ?? item.created_at);

  return {
    id,
    quantity,
    unitPrice,
    totalPrice,
    createdAt,
    product: product as Product,
    buyer: normalizeBuyer(item.buyer ?? item.user ?? item.customer),
  };
}

export function normalizeStorePurchases(value: unknown): StorePurchase[] {
  let list: unknown[] = [];

  if (Array.isArray(value)) {
    list = value;
  } else if (value && typeof value === 'object' && Array.isArray((value as { data?: unknown }).data)) {
    list = (value as { data: unknown[] }).data;
  }

  return list.flatMap((item) => {
    const purchase = normalizeStorePurchase(item);
    return purchase ? [purchase] : [];
  });
}
