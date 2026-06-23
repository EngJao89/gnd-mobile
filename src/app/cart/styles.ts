import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ScreenGutter,
    paddingBottom: Spacing.three,
  },
  payments: {
    marginTop: Spacing.five,
    gap: Spacing.three,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.GREEN_500,
    borderRadius: 8,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    minHeight: 56,
  },
  paymentButtonRow: {
    justifyContent: 'space-between',
  },
  applePayText: {
    fontSize: FontSize.xl,
    color: Colors.GRAY_800,
    fontWeight: '500',
  },
  bpayBadge: {
    backgroundColor: Colors.GRAY_600,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 4,
  },
  bpayText: {
    color: Colors.WHITE,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  debitCreditText: {
    fontSize: FontSize.lg,
    color: Colors.GRAY_500,
    fontWeight: '500',
  },
  cardIcon: {
    fontSize: FontSize.xl,
    color: Colors.GRAY_500,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.four,
  },
  backLink: {
    color: Colors.GRAY_900,
    fontSize: FontSize.base,
    textDecorationLine: 'underline',
  },
});
