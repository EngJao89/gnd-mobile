import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export type BackButtonColorStyle = 'PRIMARY' | 'SECONDARY';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: Spacing.three,
    paddingVertical: 12,
    paddingHorizontal: Spacing.two,
    borderWidth: 3,
    borderRadius: 6,
    borderColor: Colors.GREEN_500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  containerPrimary: {
    backgroundColor: Colors.WHITE,
  },
  containerSecondary: {
    backgroundColor: Colors.GREEN_700,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.GREEN_600,
    fontSize: FontSize.sm,
    textTransform: 'uppercase',
    marginRight: Spacing.one,
  },
});

export function getBackButtonStyles(color: BackButtonColorStyle = 'PRIMARY') {
  const isPrimary = color === 'PRIMARY';

  return {
    container: [styles.container, isPrimary ? styles.containerPrimary : styles.containerSecondary],
    label: styles.label,
  };
}
