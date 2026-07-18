import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { styles } from './styles';

export default function ProfileHeaderButton() {
  const router = useRouter();

  return (
    <Pressable style={styles.profileButton} onPress={() => router.push('/store-profile')}>
      <Text style={styles.profileIcon}>🏪</Text>
    </Pressable>
  );
}
