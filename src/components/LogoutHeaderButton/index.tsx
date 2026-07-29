import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

export default function LogoutHeaderButton() {
  const router = useRouter();
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.replace('/');
  }

  return (
    <Pressable style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutIcon}>🚪</Text>
    </Pressable>
  );
}
