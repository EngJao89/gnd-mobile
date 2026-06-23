import { Text, View } from 'react-native';

import { styles } from './styles';

type CartEmptyProps = {
  title?: string;
  label?: string;
  value?: string;
};

export default function CartEmpty({
  title = 'Your cart is empty',
  label = 'Total:',
  value = '$0',
}: CartEmptyProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.contentValue}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}
