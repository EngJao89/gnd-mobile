import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@/lib/format-date';
import { formatPrice } from '@/lib/format-price';
import { getBuyerDisplayName } from '@/lib/get-buyer-display-name';
import { getProductImageUrl } from '@/lib/get-product-image-url';
import type { StorePurchase } from '@/types/purchase';

import { styles } from './styles';

type PurchaseItemProps = {
  purchase: StorePurchase;
};

export default function PurchaseItem({ purchase }: Readonly<PurchaseItemProps>) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const imageUri = getProductImageUrl(purchase.product.imageUrl);
  const buyerName = getBuyerDisplayName(purchase.buyer);

  useEffect(() => {
    setImageError(false);
  }, [purchase.id, purchase.product.imageUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.imageColumn}>
        <View style={styles.imageWrapper}>
          {imageError ? (
            <Text style={styles.imageFallback}>{t('common.noImage')}</Text>
          ) : (
            <Image
              recyclingKey={purchase.id}
              source={{ uri: imageUri }}
              style={styles.image}
              contentFit="contain"
              onError={() => setImageError(true)}
            />
          )}
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={2}>
            {purchase.product.name}
          </Text>
          <Text style={styles.price}>{formatPrice(purchase.totalPrice)}</Text>
        </View>

        <Text style={styles.meta}>
          {t('storePurchases.quantity', { count: purchase.quantity })}
          {buyerName ? ` · ${buyerName}` : ''}
        </Text>

        {purchase.createdAt ? (
          <Text style={styles.date}>{formatDate(purchase.createdAt)}</Text>
        ) : null}
      </View>
    </View>
  );
}
