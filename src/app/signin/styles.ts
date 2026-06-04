import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.two,
    paddingBottom: 0,
    backgroundColor: Colors.GREEN_700,
  },
  title: {
    color: Colors.WHITE,
    fontSize: FontSize.xxxxxl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.WHITE,
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
