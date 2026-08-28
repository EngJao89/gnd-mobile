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
  footerContent: {
    paddingHorizontal: ScreenGutter,
  },
  emptyWrap: {
    paddingHorizontal: ScreenGutter,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  totalLabel: {
    color: Colors.GRAY_700,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
  totalValue: {
    color: Colors.GRAY_700,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
  notesLabel: {
    marginTop: Spacing.four,
    marginBottom: Spacing.one,
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.GRAY_500,
    textTransform: 'uppercase',
  },
  notesInput: {
    minHeight: 72,
    borderWidth: 1,
    borderColor: Colors.GRAY_300,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: FontSize.base,
    color: Colors.GRAY_900,
    textAlignVertical: 'top',
    backgroundColor: Colors.WHITE,
  },
  checkoutSpinner: {
    marginTop: Spacing.three,
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
  paymentButtonDisabled: {
    opacity: 0.5,
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
    width: '100%',
    paddingVertical: Spacing.four,
  },
});
