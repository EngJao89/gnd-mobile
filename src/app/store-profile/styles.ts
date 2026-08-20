import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: ScreenGutter,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.GRAY_500,
    marginBottom: Spacing.four,
  },
  section: {
    marginBottom: Spacing.four,
    gap: Spacing.three,
  },
  field: {
    gap: Spacing.one,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.GRAY_500,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: FontSize.base,
    color: Colors.GRAY_900,
  },
  footer: {
    width: '100%',
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.five,
  },
});
