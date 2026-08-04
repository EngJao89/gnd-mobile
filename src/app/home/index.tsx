import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

export default function Home() {
  const router = useRouter();
  const { signOut } = useAuth();
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

      <View style={styles.footer}>
        <LanguageSwitcher />

        <Button
          title={t('home.signInUser')}
          uppercase={false}
          style={{ marginTop: 0 }}
          onPress={() => router.push('/signin')}
        />
        <Button
          title={t('home.signInStore')}
          uppercase={false}
          onPress={() => router.push('/signin-store')}
        />
        <Button
          title={t('home.registerUser')}
          uppercase={false}
          onPress={() => router.push('/register')}
        />
        <Button
          title={t('home.registerStore')}
          uppercase={false}
          onPress={() => router.push('/register-store')}
        />

        <Pressable
          onPress={async () => {
            await signOut();
            router.push('/waytoscan');
          }}>
          <Text style={styles.link}>{t('home.continueWithoutRegistration')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
