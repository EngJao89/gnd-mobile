import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.GRAY_300,
    justifyContent: 'center',
    paddingTop: 60,
    paddingLeft: Spacing.three,
    paddingRight: Spacing.three,
    paddingBottom: 60,
    marginTop: 40,
    marginLeft: Spacing.four,
    marginRight: Spacing.four,
  },
  title: {
    fontSize: FontSize.xl,
    color: Colors.GRAY_400,
    fontWeight: 'bold',
    marginRight: Spacing.two,
  },
  contentValue: {
    flexDirection: 'row',
    marginTop: 36,
    marginLeft: Spacing.four,
    marginRight: Spacing.four,
    marginBottom: 36,
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.GRAY_700,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
  value: {
    color: Colors.GRAY_700,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
});
