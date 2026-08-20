import { Colors, FontSize, ScreenGutter, Spacing } from '@/constants/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.GREEN_700,
    paddingHorizontal: ScreenGutter,
    paddingBottom: Spacing.three,
  },
  logo: {
    width: 36,
    height: 36,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenGutter,
  },
  scannerFrame: {
    width: 280,
    height: 280,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: Colors.GREEN_800,
    overflow: 'hidden',
    backgroundColor: Colors.GREEN_500,
    ...Platform.select({
      ios: {
        shadowColor: Colors.GRAY_900,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scannerTopBand: {
    height: 48,
    backgroundColor: Colors.GREEN_400,
  },
  scannerMiddleBand: {
    flex: 1,
    backgroundColor: '#8B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  scannerBottomBand: {
    height: 48,
    backgroundColor: Colors.GREEN_400,
  },
  camera: {
    ...StyleSheet.absoluteFill,
  },
  barcodeImage: {
    width: '85%',
    height: 72,
    backgroundColor: Colors.WHITE,
    borderRadius: 4,
  },
  instruction: {
    marginTop: Spacing.four,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.GRAY_900,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  permissionText: {
    marginTop: Spacing.two,
    fontSize: FontSize.sm,
    color: Colors.GRAY_600,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: ScreenGutter,
    paddingVertical: Spacing.five,
  },
});
