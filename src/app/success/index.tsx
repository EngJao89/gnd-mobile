import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

function getParamValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default function Success() {
  const { t } = useTranslation();
  const { count } = useLocalSearchParams<{ count?: string | string[] }>();
  const orderCount = Number(getParamValue(count) ?? '1');
  const subtitle =
    Number.isFinite(orderCount) && orderCount > 1
      ? t('success.subtitle_other', { count: orderCount })
      : t('success.subtitle');

  return (
    <View style={styles.container}>
      <HeaderList location="Belmore, Sydney" logoSource={images.headerLogo} />

      <View style={styles.content}>
        <Image source={images.success} style={styles.successImage} contentFit="contain" />

        <Text style={styles.title}>{t('success.title')}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.message}>{t('success.message')}</Text>
      </View>

      <View style={styles.footer}>
        <BackButton />
      </View>

      <BottomTabBar />
    </View>
  );
}
