import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { getApiBaseUrl } from '@/lib/axios';
import type { Product } from '@/types/product';

import { styles } from './styles';

type ProductItemProps = {
  product: Product;
};

function formatPrice(price: string) {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return price;
  }

  return `$${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}

export default function ProductItem({ product }: ProductItemProps) {
  const [quantity, setQuantity] = useState(0);
  const imageUri = `${getApiBaseUrl()}${product.imageUrl}`;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
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
