import { Text, View } from 'react-native';

import { styles } from './styles';

export default function SignIn() {
  return (
    <View style={styles.container} >
      <Text style={styles.title}>Groceries</Text>
      <Text style={styles.subtitle}>Next Door</Text>
    </View>
  );
}