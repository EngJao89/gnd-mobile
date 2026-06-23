import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

export default function Success() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderList
        location="Belmore, Sydney"
        logoSource={images.headerLogo}
        button={
          <View style={styles.cartButton}>
            <Text style={styles.cartIcon}>🛒</Text>
          </View>
        }
      />

      <View style={styles.content}>
        <Image source={images.success} style={styles.successImage} contentFit="contain" />

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
