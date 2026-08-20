import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

export default function Success() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <HeaderList location="Belmore, Sydney" logoSource={images.headerLogo} />

      <View style={styles.content}>
        <Image source={images.success} style={styles.successImage} contentFit="contain" />

        <Text style={styles.title}>{t('success.title')}</Text>
        <Text style={styles.subtitle}>{t('success.subtitle')}</Text>
        <Text style={styles.message}>{t('success.message')}</Text>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>{t('common.back')}</Text>
        </Pressable>
      </View>

      <BottomTabBar />
    </View>
  );
}
