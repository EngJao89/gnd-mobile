import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/contexts/auth';
import { useCart } from '@/contexts/cart';
import { formatPrice } from '@/lib/format-price';
import { getProductImageUrl } from '@/lib/get-product-image-url';
import type { Product } from '@/types/product';

import { styles } from './styles';

type ProductItemProps = {
  product: Product;
  showStoreName?: boolean;
};

export default function ProductItem({ product, showStoreName = true }: Readonly<ProductItemProps>) {
  const router = useRouter();
  const { t } = useTranslation();
  const { isUser, isStore } = useAuth();
  const { addItem, getQuantity, isUpdating } = useCart();
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageError, setImageError] = useState(false);
  const imageUri = getProductImageUrl(product.imageUrl);
  const quantity = isUser ? getQuantity(product.id) : localQuantity;
  const updating = isUpdating(product.id);

  useEffect(() => {
    setImageError(false);
  }, [product.id, product.imageUrl]);

  async function handleIncrement() {
    if (isStore) {
      return;
    }

    if (!isUser) {
      Alert.alert(t('cart.signInRequiredTitle'), t('cart.signInRequired'), [
        { text: t('common.ok') },
        { text: t('cart.signInAction'), onPress: () => router.push('/signin') },
      ]);
      return;
    }

    try {
      await addItem(product.id, 1, product);
    } catch {
      Alert.alert(t('common.error'), t('cart.addError'));
    }
  }

  function handleDecrement() {
    if (isUser || isStore) {
      return;
    }

    setLocalQuantity((current) => Math.max(0, current - 1));
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageColumn}>
        <View style={styles.imageWrapper}>
          {imageError ? (
            <Text style={styles.imageFallback}>{t('common.noImage')}</Text>
          ) : (
            <Image
              recyclingKey={product.id}
              source={{ uri: imageUri }}
              style={styles.image}
              contentFit="contain"
              onError={() => setImageError(true)}
            />
          )}
        </View>
        {showStoreName && product.store?.name ? (
          <Text style={styles.storeName} numberOfLines={2}>
            {product.store.name}
          </Text>
        ) : null}
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>

        <Text style={styles.meta}>
          {product.brand} | {product.sector}
        </Text>

        <View
          style={styles.quantityRow}
          onStartShouldSetResponder={() => true}>
          <Pressable
            style={styles.quantityButton}
            disabled={updating}
            onPress={handleDecrement}>
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>

          <View style={styles.quantityValue}>
            <Text style={styles.quantityValueText}>{quantity}</Text>
          </View>

          <Pressable
            style={styles.quantityButton}
            disabled={updating || isStore}
            onPress={handleIncrement}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
