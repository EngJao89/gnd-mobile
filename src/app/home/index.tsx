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
          title="Sign in"
          uppercase={false}
          style={{ marginTop: 0 }}
          onPress={() => router.push('/signin')}
        />
        <Button title="Register" uppercase={false} onPress={() => router.push('/register')} />

        <Pressable>
          <Text style={styles.link}>Continue without Registration</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
