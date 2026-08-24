import { Redirect } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import CartEmpty from '@/components/CartEmpty';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';
import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

export default function Cart() {
  const { t } = useTranslation();
  const { isReady, isStore } = useAuth();

  if (isReady && isStore) {
    return <Redirect href="/store-purchases" />;
  }

  return (
    <View style={styles.container}>
      <HeaderList location="Belmore, Sydney" logoSource={images.headerLogo} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CartEmpty />

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
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
