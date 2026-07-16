import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';

import { styles } from './styles';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.brandContent}>
          <Text style={styles.title}>Groceries</Text>

          <View style={styles.brandRow}>
            <View style={styles.brandText}>
              <Text style={styles.subtitle}>Next</Text>
              <Text style={styles.subtitle}>Door</Text>
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
        <Button
          title="Sign In User"
          uppercase={false}
          style={{ marginTop: 0 }}
          onPress={() => router.push('/signin')}
        />
        <Button
          title="Sign in Store"
          uppercase={false}
          onPress={() => router.push('/signin-store')}
        />
        <Button
          title="Register User"
          uppercase={false}
          onPress={() => router.push('/register')}
        />
        <Button
          title="Register Store"
          uppercase={false}
          onPress={() => router.push('/register-store')}
        />

        <Pressable onPress={() => router.push('/waytoscan')}>
          <Text style={styles.link}>Continue without Registration</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
