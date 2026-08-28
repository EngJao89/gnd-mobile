import { Redirect, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import CartEmpty from '@/components/CartEmpty';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import ProductItem from '@/components/ProductItem';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { useCart } from '@/contexts/cart';
import { formatPrice } from '@/lib/format-price';

import { styles } from './styles';

export default function Cart() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isReady, isUser, isStore } = useAuth();
  const { items, isLoading, isCheckingOut, checkout, reload } = useCart();
  const [notes, setNotes] = useState('');

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = Number(item.product.price);
        return sum + (Number.isFinite(price) ? price * item.quantity : 0);
      }, 0),
    [items],
  );

  const canCheckout = items.length > 0 && !isCheckingOut;

  async function handleCheckout() {
    if (isCheckingOut) {
      return;
    }

    if (!isUser) {
      Alert.alert(t('cart.signInRequiredTitle'), t('cart.checkoutSignInRequired'), [
        { text: t('common.ok') },
        { text: t('cart.signInAction'), onPress: () => router.push('/signin') },
      ]);
      return;
    }

    if (items.length === 0) {
      return;
    }

    try {
      const result = await checkout(notes);
      setNotes('');
      router.replace({
        pathname: '/success',
        params: { count: String(Math.max(result.orders.length, 1)) },
      });
    } catch {
      Alert.alert(t('common.error'), t('cart.checkoutError'));
    }
  }

  if (isReady && isStore) {
    return <Redirect href="/store-orders" />;
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
              <>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>{t('cart.total')}</Text>
                  <Text style={styles.totalValue}>{formatPrice(String(total))}</Text>
                </View>

                <Text style={styles.notesLabel}>{t('cart.notesLabel')}</Text>
                <TextInput
                  style={styles.notesInput}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder={t('cart.notesPlaceholder')}
                  placeholderTextColor={Colors.GRAY_400}
                  editable={!isCheckingOut}
                  multiline
                />

                {isCheckingOut ? (
                  <ActivityIndicator
                    style={styles.checkoutSpinner}
                    size="small"
                    color={Colors.GREEN_700}
                  />
                ) : null}

                <View style={styles.payments}>
                  <Pressable
                    style={[styles.paymentButton, !canCheckout && styles.paymentButtonDisabled]}
                    disabled={!canCheckout}
                    onPress={handleCheckout}>
                    <Text style={styles.applePayText}>{'\uF8FF'} Pay</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.paymentButton, !canCheckout && styles.paymentButtonDisabled]}
                    disabled={!canCheckout}
                    onPress={handleCheckout}>
                    <View style={styles.bpayBadge}>
                      <Text style={styles.bpayText}>BPAY</Text>
                    </View>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.paymentButton,
                      styles.paymentButtonRow,
                      !canCheckout && styles.paymentButtonDisabled,
                    ]}
                    disabled={!canCheckout}
                    onPress={handleCheckout}>
                    <Text style={styles.debitCreditText}>{t('cart.debitCredit')}</Text>
                    <Text style={styles.cardIcon}>💳</Text>
                  </Pressable>
                </View>
              </>
            ) : null}

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
