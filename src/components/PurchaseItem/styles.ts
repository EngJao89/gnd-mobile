import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_200,
    backgroundColor: Colors.WHITE,
  },
  imageColumn: {
    width: 80,
    flexShrink: 0,
    alignItems: 'center',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: Colors.GRAY_300,
    borderRadius: 8,
    padding: Spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.GRAY_50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    fontSize: FontSize.xs,
    color: Colors.GRAY_400,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.three,
    minHeight: 80,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  name: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: '500',
    color: Colors.GRAY_900,
    lineHeight: FontSize.base * 1.35,
    paddingRight: Spacing.one,
  },
  price: {
    fontSize: FontSize.base,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    flexShrink: 0,
    minWidth: 56,
    textAlign: 'right',
  },
  meta: {
    marginTop: Spacing.one,
    fontSize: FontSize.sm,
    color: Colors.GRAY_500,
  },
  date: {
    marginTop: Spacing.one,
    fontSize: FontSize.xs,
    color: Colors.GRAY_400,
  },
});
