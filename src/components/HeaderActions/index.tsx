import { View } from 'react-native';

import CartHeaderButton from '@/components/CartHeaderButton';
import LogoutHeaderButton from '@/components/LogoutHeaderButton';
import ProfileHeaderButton from '@/components/ProfileHeaderButton';
import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

export default function HeaderActions() {
  const { isUser } = useAuth();

  return (
    <View style={styles.container}>
      <ProfileHeaderButton />
      <CartHeaderButton />
      {isUser ? <LogoutHeaderButton /> : null}
    </View>
  );
}
