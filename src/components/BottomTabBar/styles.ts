import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.GREEN_700,
    borderTopWidth: 1,
    borderTopColor: Colors.GREEN_800,
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.two,
    borderRadius: 12,
    gap: Spacing.one,
  },
  tabActive: {
    backgroundColor: Colors.GREEN_800,
  },
  icon: {
    fontSize: FontSize.lg,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.GREEN_200,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelActive: {
    color: Colors.WHITE,
    fontWeight: '700',
  },
});
