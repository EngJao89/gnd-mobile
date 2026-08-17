import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import HeaderActions from '@/components/HeaderActions';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { api } from '@/lib/axios';
import { formatPrice } from '@/lib/format-price';
import { getProductImageUrl } from '@/lib/get-product-image-url';
import type { Product } from '@/types/product';

import { styles } from './styles';

export default function ProductDetails() {
  const router = useRouter();
  const { isUser } = useAuth();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!id) {
      setError(t('product.notFound'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<Product>(`/products/${id}`);
      setProduct(data);
      setImageError(false);
    } catch {
      setError(t('product.loadError'));
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return (
    <View style={styles.container}>
      <HeaderList
        location="São Paulo, SP"
        logoSource={images.headerLogo}
        button={<HeaderActions />}
      />

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.GREEN_700} />
        </View>
      ) : error || !product ? (
        <View style={styles.centerContent}>
          <Text style={styles.statusText}>{error ?? t('product.notFound')}</Text>
          <Button title={t('common.tryAgain')} uppercase={false} onPress={loadProduct} />
          <View style={styles.footer}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backLink}>{t('common.back')}</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageSection}>
            <View style={styles.imageWrapper}>
              {imageError ? (
                <Text style={styles.imageFallback}>{t('common.noImage')}</Text>
              ) : (
                <Image
                  source={{ uri: getProductImageUrl(product.imageUrl) }}
                  style={styles.image}
                  contentFit="contain"
                  onError={() => setImageError(true)}
                />
              )}
            </View>
            {product.store?.name ? (
              <Pressable
                style={styles.storeButton}
                onPress={() => router.push('/store-profile')}>
                <Text style={styles.storeButtonText}>{product.store.name}</Text>
              </Pressable>
            ) : null}
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.meta}>
            {product.brand} | {product.sector}
          </Text>

          <Text style={styles.sectionLabel}>{t('product.description')}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionLabel}>{t('product.quantity')}</Text>
          <View style={styles.quantityRow}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity((current) => Math.max(1, current - 1))}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <View style={styles.quantityValue}>
              <Text style={styles.quantityValueText}>{quantity}</Text>
            </View>

            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity((current) => current + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          {isUser ? (
            <Button title={t('product.addToCart')} uppercase={false} style={styles.addButton} />
          ) : null}

          <View style={styles.footer}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backLink}>{t('common.back')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
