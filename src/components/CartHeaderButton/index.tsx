import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { styles } from './styles';

export default function CartHeaderButton() {
  const router = useRouter();

  return (
    <Pressable style={styles.cartButton} onPress={() => router.push('/cart')}>
      <Text style={styles.cartIcon}>🛒</Text>
    </Pressable>
  );
}
