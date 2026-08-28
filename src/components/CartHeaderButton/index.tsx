import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

export default function CartHeaderButton() {
  const router = useRouter();
  const { isStore } = useAuth();

  return (
    <Pressable
      style={styles.cartButton}
      onPress={() => router.push(isStore ? '/store-orders' : '/cart')}>
      <Text style={styles.cartIcon}>{isStore ? '📦' : '🛒'}</Text>
    </Pressable>
  );
}
