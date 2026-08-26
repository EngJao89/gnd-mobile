import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import ProductItem from '@/components/ProductItem';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { api } from '@/lib/axios';
import { getStoreIdFromToken } from '@/lib/get-store-id-from-token';
import type { Product, ProductStore } from '@/types/product';

import { styles } from './styles';

function getParamValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function belongsToStore(product: Product, storeId: string) {
  return product.storeId === storeId || product.store?.id === storeId;
}

function formatStoreAddress(store: ProductStore) {
  return [
    store.street,
    store.numberOrBlock,
    store.neighborhood,
    `${store.city} - ${store.state}`,
    store.zipCode,
  ]
    .filter(Boolean)
    .join(', ');
}

async function fetchStoreById(storeId: string) {
  try {
    const { data } = await api.get<ProductStore>(`/stores/${storeId}`);
    return data;
  } catch {
    return null;
  }
}

async function fetchAuthenticatedStore() {
  try {
    const { data } = await api.get<ProductStore>('/stores/me');
    return data;
  } catch {
    return null;
  }
}

export default function StoreProfile() {
  const router = useRouter();
  const { isStore } = useAuth();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const storeIdFromRoute = getParamValue(id);

  const [store, setStore] = useState<ProductStore | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStoreProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let storeId = storeIdFromRoute ?? null;
      let loadedStore: ProductStore | null = null;

      if (storeId) {
        loadedStore = await fetchStoreById(storeId);
      } else if (isStore) {
        loadedStore = await fetchAuthenticatedStore();
        storeId = loadedStore?.id ?? getStoreIdFromToken();

        if (storeId && !loadedStore) {
          loadedStore = await fetchStoreById(storeId);
        }
      }

      const { data } = await api.get<Product[]>('/products', {
        params: storeId ? { storeId } : undefined,
      });

      if (!storeId) {
        loadedStore = data[0]?.store ?? loadedStore;
        storeId = loadedStore?.id ?? data[0]?.storeId ?? null;
      }

      const resolvedStoreId = storeId;
      const storeProducts = resolvedStoreId
        ? data.filter((product) => belongsToStore(product, resolvedStoreId))
        : [];

      loadedStore ??= storeProducts[0]?.store ?? null;

      if (!loadedStore) {
        setStore(null);
        setProducts([]);
        setError(t('storeProfile.notFound'));
        return;
      }

      setStore(loadedStore);
      setProducts(storeProducts);
    } catch {
      setStore(null);
      setProducts([]);
      setError(t('storeProfile.loadError'));
    } finally {
      setLoading(false);
    }
  }, [isStore, storeIdFromRoute, t]);

  useEffect(() => {
    void loadStoreProfile();
  }, [loadStoreProfile]);

  const address = useMemo(() => (store ? formatStoreAddress(store) : ''), [store]);
  const location = store ? `${store.city}, ${store.state}` : undefined;

  let content = null;

  if (loading && !store) {
    content = (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={Colors.GREEN_700} />
      </View>
    );
  } else if (error && !store) {
    content = (
      <View style={styles.centerContent}>
        <Text style={styles.statusText}>{error}</Text>
        <Button title={t('common.tryAgain')} uppercase={false} onPress={loadStoreProfile} />
      </View>
    );
  } else if (store) {
    content = (
      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/products/${item.id}`)}>
            <ProductItem product={item} showStoreName={false} />
          </Pressable>
        )}
        onRefresh={loadStoreProfile}
        refreshing={loading}
        contentContainerStyle={[
          styles.listContent,
          products.length === 0 && styles.centerContent,
        ]}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.subtitle}>{t('storeProfile.subtitle')}</Text>

            <View style={styles.section}>
              <View style={styles.field}>
                <Text style={styles.label}>{t('storeProfile.legalName')}</Text>
                <Text style={styles.value}>{store.legalName}</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>{t('storeProfile.email')}</Text>
                <Text style={styles.value}>{store.email}</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>{t('storeProfile.address')}</Text>
                <Text style={styles.value}>{address}</Text>
              </View>
            </View>

            <View style={styles.productsSeparator} />
            <Text style={styles.productsTitle}>{t('storeProfile.products')}</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.statusText}>{t('storeProfile.emptyProducts')}</Text>
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <HeaderList location={location} logoSource={images.headerLogo} />

      {content}

      <View style={styles.footer}>
        <BackButton />
      </View>

      <BottomTabBar />
    </View>
  );
}
