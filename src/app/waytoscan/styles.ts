import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN_700,
  },
  brandSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  brandContent: {
    alignItems: 'flex-start',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    alignItems: 'flex-start',
  },
  title: {
    color: Colors.WHITE,
    fontSize: FontSize.xxxxxl,
    fontWeight: 'bold',
    lineHeight: FontSize.xxxxxl * 1.05,
    marginBottom: Spacing.one,
  },
  subtitle: {
    color: Colors.WHITE,
    fontSize: FontSize.xxxxxl,
    fontWeight: 'bold',
    lineHeight: FontSize.xxxxxl * 1.05,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: Spacing.two,
  },
  actions: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  actionButton: {
    marginTop: 0,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    paddingTop: Spacing.five,
  },
});
