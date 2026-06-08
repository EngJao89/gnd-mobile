import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN_700,
  },
  content: {
    flexGrow: 1,
    paddingBottom: Spacing.five,
  },
  brandSection: {
    alignItems: 'center',
    paddingTop: Spacing.five,
    paddingBottom: Spacing.four,
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
  form: {
    paddingTop: 80,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  label: {
    color: Colors.WHITE,
    fontSize: FontSize.lg,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: FontSize.base,
    color: Colors.GRAY_900,
    marginBottom: Spacing.two,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
    marginBottom: Spacing.three,
  },
  rememberLabel: {
    color: Colors.WHITE,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
  },
  checkboxChecked: {
    backgroundColor: Colors.GREEN_500,
  },
  loginButton: {
    marginTop: Spacing.two,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Spacing.three,
  },
  backLink: {
    color: Colors.WHITE,
    fontSize: FontSize.lg,
    textDecorationLine: 'underline',
  },
});
