import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CartEmpty from '@/components/CartEmpty';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

export default function Cart() {
  const router = useRouter();
  const { t } = useTranslation();

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
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>{t('common.back')}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
