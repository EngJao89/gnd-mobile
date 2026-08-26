import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

export default function ProfileHeaderButton() {
  const router = useRouter();
  const { isUser, isStore } = useAuth();

  function handlePress() {
    if (isStore) {
      router.push('/store-profile');
      return;
    }

    if (isUser) {
      router.push('/profile');
      return;
    }

    router.push('/signin');
  }

  return (
    <Pressable style={styles.profileButton} onPress={handlePress}>
      <Text style={styles.profileIcon}>{isStore ? '🏪' : '👤'}</Text>
    </Pressable>
  );
}
