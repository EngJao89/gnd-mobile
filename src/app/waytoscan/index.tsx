import { useRouter } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';

import { styles } from './styles';

export default function WayToScan() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.brandContent}>
          <Text style={styles.title}>{t('brand.groceries')}</Text>

          <View style={styles.brandRow}>
            <View style={styles.brandText}>
              <Text style={styles.subtitle}>{t('brand.next')}</Text>
              <Text style={styles.subtitle}>{t('brand.door')}</Text>
            </View>

            <Image
              source={require('@/assets/images/home-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title={t('waytoscan.qrCode')}
          uppercase={false}
          style={styles.actionButton}
          onPress={() => router.push('/barcode')}
        />
        <Button
          title={t('waytoscan.enterWithKeyboard')}
          uppercase={false}
          onPress={() => router.push('/enter-keyboard')}
        />
      </View>

      <View style={styles.footer}>
        <BackButton />
      </View>
    </SafeAreaView>
  );
}
