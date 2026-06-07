import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type CartEmptyProps = {
  title: string;
  label: string;
  value: string;
  icon?: ReactNode;
};

export default function CartEmpty({ title, label, value, icon }: CartEmptyProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.contentValue}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}
