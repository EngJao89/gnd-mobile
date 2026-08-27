import { Colors, FontSize } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const PHOTO_SIZE = 112;
const BADGE_SIZE = 32;

export const styles = StyleSheet.create({
  container: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors.GREEN_700,
    backgroundColor: Colors.GREEN_100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.GREEN_800,
  },
  placeholderIcon: {
    fontSize: FontSize.xxxxl,
    color: Colors.GREEN_800,
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: Colors.GREEN_700,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: FontSize.sm,
    color: Colors.WHITE,
  },
});
