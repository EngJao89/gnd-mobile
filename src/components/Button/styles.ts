import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export type ButtonColorStyle = 'PRIMARY' | 'SECONDARY';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: Spacing.three,
    paddingVertical: 12,
    paddingHorizontal: Spacing.two,
    borderWidth: 3,
    borderRadius: 6,
    borderColor: Colors.GREEN_500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPrimary: {
    backgroundColor: Colors.WHITE,
  },
  containerSecondary: {
    backgroundColor: Colors.GREEN_700,
  },
  label: {
    fontWeight: 'bold',
    fontSize: FontSize.sm,
    textTransform: 'uppercase',
  },
  labelPrimary: {
    color: Colors.GREEN_500,
  },
  labelSecondary: {
    color: Colors.WHITE,
  },
});

export function getButtonStyles(color: ButtonColorStyle = 'PRIMARY') {
  const isPrimary = color === 'PRIMARY';

  return {
    container: [styles.container, isPrimary ? styles.containerPrimary : styles.containerSecondary],
    label: [styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary],
  };
}
