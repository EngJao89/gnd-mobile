import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
    paddingBottom: Spacing.two,
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
  footer: {
    width: '100%',
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.five,
  },
});
