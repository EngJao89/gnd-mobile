import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: Spacing.three,
  },
  headerContent: {
    paddingHorizontal: ScreenGutter,
    paddingTop: Spacing.four,
  },
  productsSeparator: {
    height: 1,
    backgroundColor: Colors.GRAY_200,
    marginBottom: Spacing.three,
  },
  productsTitle: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    marginBottom: Spacing.two,
  },
  centerContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.four,
  },
  statusText: {
    fontSize: FontSize.base,
    color: Colors.GRAY_600,
    textAlign: 'center',
    marginBottom: Spacing.three,
  },
});
