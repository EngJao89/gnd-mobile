import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 8,
    borderColor: Colors.GREEN_500,
    marginTop: Spacing.four,
    marginLeft: 12,
    marginRight: 12,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 36,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: Spacing.four,
    marginRight: Spacing.two,
  },
  iconContent: {
    width: '10%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 12,
    borderColor: Colors.GRAY_500,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.three,
    paddingLeft: 36,
    paddingRight: 36,
    paddingBottom: Spacing.three,
    margin: Spacing.one,
  },
  name: {
    fontSize: FontSize.sm,
    fontStyle: 'normal',
    padding: Spacing.one,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontStyle: 'normal',
    color: Colors.GRAY_500,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Spacing.three,
    marginLeft: 44,
  },
  price: {
    color: Colors.GRAY_800,
    fontSize: FontSize.sm,
    fontWeight: 'bold',
    marginLeft: Spacing.two,
  },
});
