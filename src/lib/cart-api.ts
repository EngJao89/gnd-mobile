import { api } from '@/lib/axios';
import type { Product } from '@/types/product';
import type { Cart, CartItem } from '@/types/cart';

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

export function normalizeCartItem(value: unknown): CartItem | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const item = value as Record<string, unknown>;
  const product = item.product;
  const productId = readString(item.productId ?? item.product_id);

  if (!product || typeof product !== 'object' || !productId) {
    return null;
  }

  return {
    id: readString(item.id, productId),
    productId,
    quantity: Math.max(0, readNumber(item.quantity, 0)),
    product: product as Product,
  };
}

export function normalizeCart(value: unknown): Cart {
  const payload = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  let rawItems: unknown[] = [];

  if (Array.isArray(value)) {
    rawItems = value;
  } else if (Array.isArray(payload.items)) {
    rawItems = payload.items;
  } else if (Array.isArray(payload.data)) {
    rawItems = payload.data;
  }

  return {
    id: readString(payload.id) || undefined,
    items: rawItems.flatMap((item) => {
      const cartItem = normalizeCartItem(item);
      return cartItem ? [cartItem] : [];
    }),
  };
}

export async function addCartItem(productId: string, quantity: number) {
  const { data } = await api.post('/cart/items', { productId, quantity });
  return data;
}

export async function getCart() {
  const { data } = await api.get('/cart', { skipAuthRefresh: true });
  return normalizeCart(data);
}
