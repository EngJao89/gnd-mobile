import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '@/lib/format-price';

import { styles } from './styles';

type CartEmptyProps = {
  title?: string;
  label?: string;
  value?: string;
};

export default function CartEmpty({ title, label, value }: CartEmptyProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title ?? t('cart.emptyTitle')}</Text>
      </View>

      <View style={styles.contentValue}>
        <Text style={styles.label}>{label ?? t('cart.total')}</Text>
        <Text style={styles.value}>{value ?? formatPrice('0')}</Text>
      </View>
    </View>
  );
}
