import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { images } from '@/constants/images';
import { Spacing } from '@/constants/theme';

import { styles } from './styles';

export default function BarcodeScanner() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarcodeScanned = useCallback(() => {
    if (scanned) {
      return;
    }

    setScanned(true);
    router.replace('/list');
  }, [router, scanned]);

  const hasPermission = permission?.granted;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <Image source={images.headerLogo} style={styles.logo} contentFit="contain" />
      </View>

      <View style={styles.content}>
        <View style={styles.scannerFrame}>
          {hasPermission ? (
            <CameraView
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'upc_a', 'upc_e'],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
          ) : (
            <>
              <View style={styles.scannerTopBand} />
              <View style={styles.scannerMiddleBand}>
                <Image source={images.barcode} style={styles.barcodeImage} contentFit="contain" />
              </View>
              <View style={styles.scannerBottomBand} />
            </>
          )}
        </View>

        <Text style={styles.instruction}>Point your camera to barcode</Text>

        {!hasPermission ? (
          <>
            <Text style={styles.permissionText}>Camera access is required to scan barcodes.</Text>
            <Button
              title="Allow camera"
              uppercase={false}
              onPress={requestPermission}
              style={{ marginTop: Spacing.three, width: '100%' }}
            />
          </>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
