import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREEN_700,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  logoContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 36,
    height: 36,
  },
  locationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.two,
  },
  location: {
    color: Colors.WHITE,
    fontSize: FontSize.sm,
    fontWeight: '400',
    textAlign: 'center',
  },
  actionContainer: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  userContent: {
    alignItems: 'center',
    paddingTop: Spacing.two,
  },
  userLabel: {
    color: Colors.WHITE,
    fontSize: FontSize.base,
    fontWeight: '600',
  },
});
