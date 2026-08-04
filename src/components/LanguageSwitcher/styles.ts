import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  label: {
    color: Colors.WHITE,
    fontSize: FontSize.sm,
  },
  options: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  option: {
    minWidth: 40,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: Colors.WHITE,
  },
  optionText: {
    color: Colors.WHITE,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  optionTextActive: {
    color: Colors.GREEN_700,
  },
});
