import { Redirect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import PurchaseItem from '@/components/PurchaseItem';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { api } from '@/lib/axios';
import { normalizeStorePurchases } from '@/lib/normalize-store-purchase';
import type { StorePurchase } from '@/types/purchase';

import { styles } from './styles';

export default function StorePurchases() {
  const router = useRouter();
  const { isReady, isStore } = useAuth();
  const { t } = useTranslation();
  const [purchases, setPurchases] = useState<StorePurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPurchases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/stores/me/purchases');
      setPurchases(normalizeStorePurchases(data));
    } catch {
      setPurchases([]);
      setError(t('storePurchases.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isReady || !isStore) {
      return;
    }

    void loadPurchases();
  }, [isReady, isStore, loadPurchases]);

  if (isReady && !isStore) {
    return <Redirect href="/cart" />;
  }

  let content = null;

  if (loading && purchases.length === 0) {
    content = (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={Colors.GREEN_700} />
      </View>
    );
  } else if (error && purchases.length === 0) {
    content = (
      <View style={styles.centerContent}>
        <Text style={styles.statusText}>{error}</Text>
        <Button title={t('common.tryAgain')} uppercase={false} onPress={loadPurchases} />
      </View>
    );
  } else {
    content = (
      <FlatList
        style={styles.list}
        data={purchases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/products/${item.product.id}`)}>
            <PurchaseItem purchase={item} />
          </Pressable>
        )}
        onRefresh={loadPurchases}
        refreshing={loading}
        contentContainerStyle={[
          styles.listContent,
          purchases.length === 0 && styles.centerContent,
        ]}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>{t('storePurchases.title')}</Text>
            <Text style={styles.subtitle}>{t('storePurchases.subtitle')}</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.statusText}>{t('storePurchases.empty')}</Text>}
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
