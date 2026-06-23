import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.GRAY_300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: Spacing.three,
    marginTop: Spacing.five,
  },
  title: {
    fontSize: FontSize.xl,
    color: Colors.GRAY_400,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentValue: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
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
