import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.GREEN_700,
    paddingHorizontal: ScreenGutter,
    paddingBottom: Spacing.three,
  },
  logo: {
    width: 36,
    height: 36,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenGutter,
    width: '100%',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: Spacing.four,
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.GREEN_500,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: FontSize.base,
    color: Colors.GRAY_900,
    marginBottom: Spacing.four,
    ...Platform.select({
      ios: {
        shadowColor: Colors.GRAY_900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.GREEN_700,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderRadius: 8,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.GRAY_900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButtonPressed: {
    opacity: 0.9,
  },
  submitLabel: {
    color: Colors.WHITE,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.five,
  },
});
