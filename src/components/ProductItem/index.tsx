import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '@/lib/format-price';
import { getProductImageUrl } from '@/lib/get-product-image-url';
import type { Product } from '@/types/product';

import { styles } from './styles';

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(0);
  const [imageError, setImageError] = useState(false);
  const imageUri = getProductImageUrl(product.imageUrl);

  useEffect(() => {
    setImageError(false);
  }, [product.id, product.imageUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.imageColumn}>
        <View style={styles.imageWrapper}>
          {imageError ? (
            <Text style={styles.imageFallback}>{t('common.noImage')}</Text>
          ) : (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              contentFit="contain"
              onError={() => setImageError(true)}
            />
          )}
        </View>
        {product.store?.name ? (
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

        <View style={styles.quantityRow}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => setQuantity((current) => Math.max(0, current - 1))}>
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
      </View>
    </View>
  );
}
