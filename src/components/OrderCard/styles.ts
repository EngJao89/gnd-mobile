import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_200,
    backgroundColor: Colors.WHITE,
    gap: Spacing.two,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.GRAY_900,
  },
  status: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.GRAY_500,
    flexShrink: 0,
  },
  statusPending: {
    color: Colors.GRAY_500,
  },
  statusConfirmed: {
    color: Colors.GREEN_700,
  },
  statusCancelled: {
    color: Colors.RED_600,
  },
  meta: {
    fontSize: FontSize.sm,
    color: Colors.GRAY_500,
  },
  notes: {
    fontSize: FontSize.sm,
    color: Colors.GRAY_600,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  itemName: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.GRAY_800,
  },
  itemPrice: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.GRAY_900,
    flexShrink: 0,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.GRAY_400,
  },
  total: {
    fontSize: FontSize.base,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
  },
});
