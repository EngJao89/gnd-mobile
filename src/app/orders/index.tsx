import { Redirect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import OrderCard from '@/components/OrderCard';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { getOrders } from '@/lib/orders-api';
import type { Order } from '@/types/order';

import { styles } from './styles';

export default function Orders() {
  const { isReady, isUser, isStore } = useAuth();
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setOrders(await getOrders());
    } catch {
      setOrders([]);
      setError(t('orders.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isReady || !isUser) {
      return;
    }

    void loadOrders();
  }, [isReady, isUser, loadOrders]);

  if (isReady && isStore) {
    return <Redirect href="/store-purchases" />;
  }

  if (isReady && !isUser) {
    return <Redirect href="/signin" />;
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
        renderItem={({ item }) => <OrderCard order={item} />}
        onRefresh={loadOrders}
        refreshing={loading}
        contentContainerStyle={[
          styles.listContent,
          orders.length === 0 && styles.centerContent,
        ]}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>{t('orders.title')}</Text>
            <Text style={styles.subtitle}>{t('orders.subtitle')}</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.statusText}>{t('orders.empty')}</Text>}
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
