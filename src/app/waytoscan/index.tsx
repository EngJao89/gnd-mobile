import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';

import { styles } from './styles';

export default function WayToScan() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.brandContent}>
          <Text style={styles.title}>Groceries</Text>

          <View style={styles.brandRow}>
            <View style={styles.brandText}>
              <Text style={styles.subtitle}>Next</Text>
              <Text style={styles.subtitle}>Door</Text>
            </View>

            <Image
              source={require('@/assets/images/home-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="QR-Code"
          uppercase={false}
          style={styles.actionButton}
          onPress={() => router.push('/barcode')}
        />
        <Button title="Enter with keyboard" uppercase={false} />
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
