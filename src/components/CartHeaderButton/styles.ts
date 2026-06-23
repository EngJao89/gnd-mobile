import { Colors, FontSize } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cartButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: FontSize.base,
  },
});
