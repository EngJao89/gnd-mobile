import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import HeaderList from '@/components/HeaderList';

import { styles } from './styles';

export default function Success() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderList
        location="Belmore, Sydney"
        logoSource={require('@/assets/images/header-logo.png')}
        button={
          <View style={styles.cartButton}>
            <Text style={styles.cartIcon}>🛒</Text>
          </View>
        }
      />

      <View style={styles.content}>
        <Image
          source={require('@/assets/images/success.png')}
          style={styles.successImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.subtitle}>this position will be available soon.</Text>
        <Text style={styles.message}>We are closer than is seems</Text>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
