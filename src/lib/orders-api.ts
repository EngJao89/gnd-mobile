import { api } from '@/lib/axios';
import type { CheckoutResult, Order, OrderItem } from '@/types/order';
import type { Product, ProductStore } from '@/types/product';

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

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function normalizeOrderItem(value: unknown): OrderItem | null {
  const data = asRecord(value);

  if (!data) {
    return null;
  }

  const product =
    data.product && typeof data.product === 'object' && !Array.isArray(data.product)
      ? (data.product as Product)
      : undefined;
  const id = readString(data.id, product?.id);
  const quantity = Math.max(1, readNumber(data.quantity, 1));
  const unitPrice = readString(
    data.unitPrice ?? data.unit_price ?? data.price ?? product?.price,
  );
  const totalPrice =
    readString(data.totalPrice ?? data.total_price) ||
    String(Number(unitPrice || 0) * quantity);

  if (!id && !product) {
    return null;
  }

  return {
    id: id || product?.id || '',
    quantity,
    unitPrice,
    totalPrice,
    product,
  };
}

function readItems(data: Record<string, unknown>): unknown[] {
  if (Array.isArray(data.items)) {
    return data.items;
  }

  if (Array.isArray(data.orderItems)) {
    return data.orderItems;
  }

  if (Array.isArray(data.order_items)) {
    return data.order_items;
  }

  if (data.product) {
    return [data];
  }

  return [];
}

function sumItemsTotal(items: OrderItem[]) {
  return items.reduce((sum, item) => {
    const value = Number(item.totalPrice);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
}

export function normalizeOrder(value: unknown): Order | null {
  const data = asRecord(value);

  if (!data) {
    return null;
  }

  const nested = asRecord(data.order) ?? data;
  const id = readString(nested.id);

  if (!id) {
    return null;
  }

  const store =
    nested.store && typeof nested.store === 'object' && !Array.isArray(nested.store)
      ? (nested.store as ProductStore)
      : undefined;
  const items = readItems(nested).flatMap((item) => {
    const orderItem = normalizeOrderItem(item);
    return orderItem ? [orderItem] : [];
  });
  const totalFromItems = sumItemsTotal(items);
  const totalPrice =
    readString(
      nested.totalPrice ?? nested.total_price ?? nested.total ?? nested.amount,
    ) || (totalFromItems > 0 ? String(totalFromItems) : undefined);

  return {
    id,
    storeId: readString(nested.storeId ?? nested.store_id ?? store?.id) || undefined,
    storeName: readString(nested.storeName ?? nested.store_name ?? store?.name) || undefined,
    store,
    status: readString(nested.status) || undefined,
    notes: readString(nested.notes) || undefined,
    totalPrice,
    createdAt: readString(nested.createdAt ?? nested.created_at) || undefined,
    items,
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

export function normalizeOrders(value: unknown): Order[] {
  return readOrderList(value).flatMap((item) => {
    const order = normalizeOrder(item);
    return order ? [order] : [];
  });
}

export function normalizeCheckout(value: unknown): CheckoutResult {
  return { orders: normalizeOrders(value) };
}

export async function getOrders() {
  const { data } = await api.get('/orders');
  return normalizeOrders(data);
}

export async function checkoutCart(notes = '') {
  const { data } = await api.post('/orders/checkout', { notes: notes.trim() });
  return normalizeCheckout(data);
}
