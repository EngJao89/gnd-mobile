import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREEN_700,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
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
    minWidth: 48,
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
