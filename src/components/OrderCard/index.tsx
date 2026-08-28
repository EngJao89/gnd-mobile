import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@/lib/format-date';
import { formatPrice } from '@/lib/format-price';
import type { Order } from '@/types/order';

import { styles } from './styles';

type OrderCardProps = {
  order: Order;
};

function getStatusStyle(status?: string) {
  const normalized = status?.toUpperCase();

  if (normalized === 'CONFIRMED' || normalized === 'COMPLETED') {
    return styles.statusConfirmed;
  }

  if (normalized === 'CANCELLED' || normalized === 'CANCELED') {
    return styles.statusCancelled;
  }

  return styles.statusPending;
}

export default function OrderCard({ order }: Readonly<OrderCardProps>) {
  const { t } = useTranslation();
  const storeName = order.storeName || order.store?.name;
  const statusKey = order.status ? `orders.status.${order.status.toLowerCase()}` : '';
  const statusLabel = order.status
    ? t(statusKey, { defaultValue: order.status })
    : t('orders.status.pending');

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {storeName || t('orders.fallbackTitle', { id: order.id.slice(0, 8) })}
        </Text>
        <Text style={[styles.status, getStatusStyle(order.status)]}>{statusLabel}</Text>
      </View>

      <Text style={styles.meta}>{t('orders.itemCount', { count: order.items.length })}</Text>

      {order.notes ? (
        <Text style={styles.notes} numberOfLines={2}>
          {order.notes}
        </Text>
      ) : null}

      {order.items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.product?.name ?? t('orders.itemFallback')}
            {item.quantity > 1 ? ` × ${item.quantity}` : ''}
          </Text>
          {item.totalPrice ? (
            <Text style={styles.itemPrice}>{formatPrice(item.totalPrice)}</Text>
          ) : null}
        </View>
      ))}

      <View style={styles.footerRow}>
        {order.createdAt ? <Text style={styles.date}>{formatDate(order.createdAt)}</Text> : <View />}
        {order.totalPrice ? (
          <Text style={styles.total}>{formatPrice(order.totalPrice)}</Text>
        ) : null}
      </View>
    </View>
  );
}
