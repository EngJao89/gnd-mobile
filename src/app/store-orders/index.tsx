import { Redirect, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import OrderCard from '@/components/OrderCard';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import type { OrderStatus } from '@/lib/order-status';
import { getStoreOrders, updateStoreOrderStatus } from '@/lib/orders-api';
import type { Order } from '@/types/order';

import { styles } from './styles';

function getStatusConfirmCopy(
  status: OrderStatus,
  t: (key: string) => string,
) {
  if (status === 'ACCEPTED') {
    return {
      title: t('storeOrders.confirm.acceptedTitle'),
      message: t('storeOrders.confirm.acceptedMessage'),
    };
  }

  if (status === 'REJECTED') {
    return {
      title: t('storeOrders.confirm.rejectedTitle'),
      message: t('storeOrders.confirm.rejectedMessage'),
    };
  }

  if (status === 'COMPLETED') {
    return {
      title: t('storeOrders.confirm.completedTitle'),
      message: t('storeOrders.confirm.completedMessage'),
    };
  }

  return {
    title: t('storeOrders.confirm.cancelledTitle'),
    message: t('storeOrders.confirm.cancelledMessage'),
  };
}

export default function StoreOrders() {
  const { isReady, isStore } = useAuth();
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setOrders(await getStoreOrders());
    } catch {
      setOrders([]);
      setError(t('storeOrders.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useFocusEffect(
    useCallback(() => {
      if (!isReady || !isStore) {
        return;
      }

      void loadOrders();
    }, [isReady, isStore, loadOrders]),
  );

  async function applyStatus(orderId: string, status: OrderStatus) {
    try {
      setUpdatingId(orderId);
      const updated = await updateStoreOrderStatus(orderId, status);

      if (updated) {
        setOrders((current) =>
          current.map((order) => (order.id === orderId ? { ...order, ...updated } : order)),
        );
      }

      await loadOrders();
    } catch {
      Alert.alert(t('common.error'), t('storeOrders.updateError'));
    } finally {
      setUpdatingId(null);
    }
  }

  function handleStatusChange(order: Order, status: OrderStatus) {
    const isDanger = status === 'REJECTED' || status === 'CANCELLED';
    const confirm = getStatusConfirmCopy(status, t);

    Alert.alert(confirm.title, confirm.message, [
      { text: t('common.back'), style: 'cancel' },
      {
        text: t('common.ok'),
        style: isDanger ? 'destructive' : 'default',
        onPress: () => {
          void applyStatus(order.id, status);
        },
      },
    ]);
  }

  if (isReady && !isStore) {
    return <Redirect href="/orders" />;
  }

  let content = null;

  if (loading && orders.length === 0) {
    content = (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={Colors.GREEN_700} />
      </View>
    );
  } else if (error && orders.length === 0) {
    content = (
      <View style={styles.centerContent}>
        <Text style={styles.statusText}>{error}</Text>
        <Button title={t('common.tryAgain')} uppercase={false} onPress={loadOrders} />
      </View>
    );
  } else {
    content = (
      <FlatList
        style={styles.list}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            variant="store"
            isUpdating={updatingId === item.id}
            onStatusChange={(status) => handleStatusChange(item, status)}
          />
        )}
        onRefresh={loadOrders}
        refreshing={loading}
        contentContainerStyle={[
          styles.listContent,
          orders.length === 0 && styles.centerContent,
        ]}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>{t('storeOrders.title')}</Text>
            <Text style={styles.subtitle}>{t('storeOrders.subtitle')}</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.statusText}>{t('storeOrders.empty')}</Text>}
      />
    );
  }

  return (
    <View style={styles.container}>
      <HeaderList logoSource={images.headerLogo} />

      {content}

      <View style={styles.footer}>
        <BackButton />
      </View>

      <BottomTabBar />
    </View>
  );
}
