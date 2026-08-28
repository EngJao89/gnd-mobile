export const ORDER_STATUSES = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'COMPLETED',
  'CANCELLED',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function normalizeOrderStatus(value?: string): OrderStatus | undefined {
  const status = value?.trim().toUpperCase();

  if (status === 'CANCELED') {
    return 'CANCELLED';
  }

  if (status === 'CONFIRMED') {
    return 'ACCEPTED';
  }

  return ORDER_STATUSES.find((item) => item === status);
}

export function getOrderStatusI18nKey(status?: string) {
  switch (normalizeOrderStatus(status)) {
    case 'ACCEPTED':
      return 'orders.status.accepted';
    case 'REJECTED':
      return 'orders.status.rejected';
    case 'COMPLETED':
      return 'orders.status.completed';
    case 'CANCELLED':
      return 'orders.status.cancelled';
    default:
      return 'orders.status.pending';
  }
}

export function getStoreStatusActions(status?: string): OrderStatus[] {
  const current = normalizeOrderStatus(status);

  if (current === 'PENDING') {
    return ['ACCEPTED', 'REJECTED'];
  }

  if (current === 'ACCEPTED') {
    return ['COMPLETED', 'CANCELLED'];
  }

  return [];
}

export function canUserCancelOrder(status?: string) {
  return normalizeOrderStatus(status) === 'PENDING';
}
