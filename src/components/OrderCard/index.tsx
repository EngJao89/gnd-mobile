import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@/lib/format-date';
import { formatPrice } from '@/lib/format-price';
import { getBuyerDisplayName } from '@/lib/get-buyer-display-name';
import {
  canUserCancelOrder,
  getOrderStatusI18nKey,
  getStoreStatusActions,
  normalizeOrderStatus,
  type OrderStatus,
} from '@/lib/order-status';
import type { Order } from '@/types/order';

import { styles } from './styles';

type OrderCardProps = {
  order: Order;
  variant?: 'user' | 'store';
  isUpdating?: boolean;
  onCancel?: () => void;
  onStatusChange?: (status: OrderStatus) => void;
};

function getStatusStyle(status?: string) {
  const normalized = normalizeOrderStatus(status);

  if (normalized === 'ACCEPTED' || normalized === 'COMPLETED') {
    return styles.statusConfirmed;
  }

  if (normalized === 'REJECTED' || normalized === 'CANCELLED') {
    return styles.statusCancelled;
  }

  return styles.statusPending;
}

function getStoreActionLabel(status: OrderStatus, t: (key: string) => string) {
  if (status === 'ACCEPTED') {
    return t('orders.actions.accept');
  }

  if (status === 'REJECTED') {
    return t('orders.actions.reject');
  }

  if (status === 'COMPLETED') {
    return t('orders.actions.complete');
  }

  return t('orders.actions.cancel');
}

function getItemName(item: Order['items'][number], fallback: string) {
  return item.productName || item.product?.name || fallback;
}

export default function OrderCard({
  order,
  variant = 'user',
  isUpdating = false,
  onCancel,
  onStatusChange,
}: Readonly<OrderCardProps>) {
  const { t } = useTranslation();
  const storeName = order.storeName || order.store?.name;
  const buyerName = getBuyerDisplayName(order.buyer);
  const title =
    variant === 'store'
      ? buyerName || t('orders.fallbackTitle', { id: order.id.slice(0, 8) })
      : storeName || t('orders.fallbackTitle', { id: order.id.slice(0, 8) });
  const storeActions = variant === 'store' ? getStoreStatusActions(order.status) : [];
  const showUserCancel = variant === 'user' && canUserCancelOrder(order.status) && onCancel;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.status, getStatusStyle(order.status)]}>
          {t(getOrderStatusI18nKey(order.status))}
        </Text>
      </View>

      {variant === 'store' && storeName ? <Text style={styles.meta}>{storeName}</Text> : null}

      <Text style={styles.meta}>{t('orders.itemCount', { count: order.items.length })}</Text>

      {order.notes ? (
        <Text style={styles.notes} numberOfLines={2}>
          {order.notes}
        </Text>
      ) : null}

      {order.items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemName} numberOfLines={1}>
            {getItemName(item, t('orders.itemFallback'))}
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

      {showUserCancel ? (
        <View style={styles.actions}>
          <Pressable
            style={[
              styles.actionButton,
              styles.actionButtonDanger,
              isUpdating && styles.actionButtonDisabled,
            ]}
            disabled={isUpdating}
            onPress={onCancel}>
            <Text style={[styles.actionLabel, styles.actionLabelDanger]}>
              {t('orders.actions.cancel')}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {storeActions.length > 0 && onStatusChange ? (
        <View style={styles.actions}>
          {storeActions.map((status) => {
            const isDanger = status === 'REJECTED' || status === 'CANCELLED';

            return (
              <Pressable
                key={status}
                style={[
                  styles.actionButton,
                  isDanger && styles.actionButtonDanger,
                  isUpdating && styles.actionButtonDisabled,
                ]}
                disabled={isUpdating}
                onPress={() => onStatusChange(status)}>
                <Text style={[styles.actionLabel, isDanger && styles.actionLabelDanger]}>
                  {getStoreActionLabel(status, t)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
