import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREEN_700,
    paddingTop: 72,
    paddingLeft: Spacing.one,
    paddingRight: Spacing.three,
    paddingBottom: Spacing.four,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContent: {
    flex: 1,
  },
  maps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 104,
  },
  location: {
    color: Colors.WHITE,
    fontSize: FontSize.sm,
    fontWeight: '400',
    marginLeft: Spacing.one,
  },
  image: {
    width: '50%',
  },
  userContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  userLabel: {
    color: Colors.WHITE,
    fontSize: FontSize.base,
    fontWeight: '600',
  },
});
