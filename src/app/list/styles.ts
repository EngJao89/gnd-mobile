import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  controls: {
    paddingHorizontal: ScreenGutter,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
  },
  searchInput: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.GREEN_500,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: FontSize.base,
    color: Colors.GRAY_900,
  },
  scanButton: {
    marginTop: 0,
    width: '100%',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: Spacing.three,
  },
  centerContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenGutter,
  },
  statusText: {
    fontSize: FontSize.base,
    color: Colors.GRAY_600,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.five,
    paddingBottom: Spacing.four,
    marginTop: Spacing.two,
  },
  backLink: {
    color: Colors.GRAY_900,
    fontSize: FontSize.base,
    textDecorationLine: 'underline',
  },
});
