import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { Colors, Spacing } from '@/constants/theme';

import { styles } from './styles';

export default function EnterKeyboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');

  function handleSubmit() {
    if (!code.trim()) {
      return;
    }

    router.replace('/list');
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <Image source={images.headerLogo} style={styles.logo} contentFit="contain" />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Enter code below</Text>

        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="Enter product code"
          placeholderTextColor={Colors.GRAY_400}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <Pressable
          style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
          onPress={handleSubmit}>
          <Text style={styles.submitLabel}>Submit</Text>
        </Pressable>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
