import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import CartEmpty from '@/components/CartEmpty';
import CartHeaderButton from '@/components/CartHeaderButton';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

export default function Cart() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderList
        location="Belmore, Sydney"
        logoSource={images.headerLogo}
        button={<CartHeaderButton />}
      />

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
            <Text style={styles.debitCreditText}>Debit/Credit</Text>
            <Text style={styles.cardIcon}>💳</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
