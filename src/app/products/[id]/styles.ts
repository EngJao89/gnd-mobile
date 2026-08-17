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
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenGutter,
  },
  statusText: {
    fontSize: FontSize.base,
    color: Colors.GRAY_600,
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  imageWrapper: {
    width: 220,
    height: 220,
    borderWidth: 1,
    borderColor: Colors.GRAY_300,
    borderRadius: 12,
    padding: Spacing.three,
    backgroundColor: Colors.GRAY_50,
  },
  storeButton: {
    marginTop: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    backgroundColor: Colors.GREEN_700,
    maxWidth: '100%',
  },
  storeButtonText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    fontSize: FontSize.sm,
    color: Colors.GRAY_400,
    textAlign: 'center',
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    lineHeight: FontSize.xl * 1.3,
    marginBottom: Spacing.two,
  },
  price: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.GREEN_600,
    marginBottom: Spacing.two,
  },
  meta: {
    fontSize: FontSize.sm,
    color: Colors.GRAY_500,
    marginBottom: Spacing.four,
  },
  sectionLabel: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.GRAY_900,
    marginBottom: Spacing.two,
  },
  description: {
    fontSize: FontSize.base,
    color: Colors.GRAY_700,
    lineHeight: FontSize.base * 1.5,
    marginBottom: Spacing.four,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: Spacing.four,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: Colors.GRAY_300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  quantityButtonText: {
    fontSize: FontSize.lg,
    color: Colors.GRAY_700,
    lineHeight: FontSize.lg,
  },
  quantityValue: {
    minWidth: 36,
    height: 36,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY_300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.two,
  },
  quantityValueText: {
    fontSize: FontSize.base,
    color: Colors.GRAY_900,
  },
  addButton: {
    marginTop: 0,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.three,
  },
  backLink: {
    color: Colors.GRAY_900,
    fontSize: FontSize.base,
    textDecorationLine: 'underline',
  },
});
