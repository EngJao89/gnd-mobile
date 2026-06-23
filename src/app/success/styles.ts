import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenGutter,
    paddingBottom: Spacing.five,
  },
  successImage: {
    width: 160,
    height: 160,
    marginBottom: Spacing.four,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: Spacing.three,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.GRAY_500,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  message: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: FontSize.lg * 1.4,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.five,
  },
  backLink: {
    color: Colors.GRAY_900,
    fontSize: FontSize.base,
    textDecorationLine: 'underline',
  },
});
