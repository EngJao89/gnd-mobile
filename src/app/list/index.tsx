import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import ProductItem from '@/components/ProductItem';
import { Colors } from '@/constants/theme';
import { api } from '@/lib/axios';
import type { Product } from '@/types/product';

import { styles } from './styles';

export default function List() {
  const router = useRouter();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<Product[]>('/products');
      setProducts(data);
    } catch {
      setError(t('list.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.sector.toLowerCase().includes(term)
    );
  });

  return (
    <View style={styles.container}>
      <HeaderList
        location="São Paulo, SP"
        logoSource={require('@/assets/images/header-logo.png')}
      />

      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder={t('list.searchPlaceholder')}
          placeholderTextColor={Colors.GRAY_400}
        />

        <Button
          title={t('list.scanWithBarcode')}
          uppercase={false}
          style={styles.scanButton}
          onPress={() => router.push('/barcode')}
        />
      </View>

      {loading && products.length === 0 ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.GREEN_700} />
        </View>
      ) : error && products.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.statusText}>{error}</Text>
          <Button title={t('common.tryAgain')} uppercase={false} onPress={loadProducts} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={[
            styles.listContent,
            filteredProducts.length === 0 && styles.centerContent,
          ]}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/products/${item.id}`)}>
              <ProductItem product={item} />
            </Pressable>
          )}
          onRefresh={loadProducts}
          refreshing={loading && products.length > 0}
          ListEmptyComponent={<Text style={styles.statusText}>{t('list.empty')}</Text>}
        />
      )}

      <BottomTabBar />
    </View>
  );
}
