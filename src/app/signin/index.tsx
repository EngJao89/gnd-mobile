import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { Colors } from '@/constants/theme';
import { api } from '@/lib/axios';

import { type SignInFormData, signInSchema } from './schema';
import { styles } from './styles';

export default function SignIn() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  async function onSubmit(data: SignInFormData) {
    try {
      await api.post('/auth/login', data);
      Alert.alert('Success', 'Logged in successfully.');
      router.replace('/');
    } catch {
      Alert.alert('Error', 'Invalid phone number or password.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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

          <View style={styles.form}>
            <Text style={styles.label}>Phone number</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  placeholderTextColor={Colors.GRAY_400}
                />
              )}
            />
            {errors.phone ? <Text style={styles.error}>{errors.phone.message}</Text> : null}

            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoComplete="password"
                  placeholderTextColor={Colors.GRAY_400}
                />
              )}
            />
            {errors.password ? <Text style={styles.error}>{errors.password.message}</Text> : null}

            <View style={styles.rememberRow}>
              <Text style={styles.rememberLabel}>Remember me</Text>
              <Pressable onPress={() => setRememberMe((value) => !value)}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
              </Pressable>
            </View>

            <Button
              title={isSubmitting ? 'Logging in...' : 'Log in'}
              uppercase={false}
              style={styles.loginButton}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.footer}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backLink}>Back</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
