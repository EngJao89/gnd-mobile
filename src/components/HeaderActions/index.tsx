import { View } from 'react-native';

import CartHeaderButton from '@/components/CartHeaderButton';
import ProfileHeaderButton from '@/components/ProfileHeaderButton';

import { styles } from './styles';

export default function HeaderActions() {
  return (
    <View style={styles.container}>
      <ProfileHeaderButton />
      <CartHeaderButton />
    </View>
  );
}
