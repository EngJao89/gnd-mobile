import { Redirect } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import CartEmpty from '@/components/CartEmpty';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import ProductItem from '@/components/ProductItem';
import { images } from '@/constants/images';
import { useAuth } from '@/contexts/auth';
import { useCart } from '@/contexts/cart';
import { formatPrice } from '@/lib/format-price';

import { styles } from './styles';

export default function Cart() {
  const { t } = useTranslation();
  const { isReady, isStore } = useAuth();
  const { items, isLoading, reload } = useCart();

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = Number(item.product.price);
        return sum + (Number.isFinite(price) ? price * item.quantity : 0);
      }, 0),
    [items],
  );

  if (isReady && isStore) {
    return <Redirect href="/store-purchases" />;
  }

  return (
    <View style={styles.container}>
      <HeaderList location="Belmore, Sydney" logoSource={images.headerLogo} />

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item.product} />}
        onRefresh={reload}
        refreshing={isLoading}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <CartEmpty value={formatPrice(String(total))} />
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContent}>
            {items.length > 0 ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>{t('cart.total')}</Text>
                <Text style={styles.totalValue}>{formatPrice(String(total))}</Text>
              </View>
            ) : null}

            <View style={styles.payments}>
              <Pressable style={styles.paymentButton}>
                <Text style={styles.applePayText}>{'\uF8FF'} Pay</Text>
              </Pressable>

              <Pressable style={styles.paymentButton}>
                <View style={styles.bpayBadge}>
                  <Text style={styles.bpayText}>BPAY</Text>
                </View>
              </Pressable>

              <Pressable style={[styles.paymentButton, styles.paymentButtonRow]}>
                <Text style={styles.debitCreditText}>{t('cart.debitCredit')}</Text>
                <Text style={styles.cardIcon}>💳</Text>
              </Pressable>
            </View>

            <View style={styles.footer}>
              <BackButton />
            </View>
          </View>
        }
      />

      <BottomTabBar />
    </View>
  );
}
