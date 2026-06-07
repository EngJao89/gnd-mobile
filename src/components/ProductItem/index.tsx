import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type ProductItemProps = {
  name: string;
  subtitle: string;
  price: string;
  icon?: ReactNode;
  footer?: ReactNode;
};

export default function ProductItem({ name, subtitle, price, icon, footer }: ProductItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {icon ? <View style={styles.iconContent}>{icon}</View> : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>{price}</Text>
        {footer}
      </View>
    </View>
  );
}
