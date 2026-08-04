import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import { useAuth } from '@/contexts/auth';
import { api } from '@/lib/axios';

import { createSignInStoreSchema, type SignInStoreFormData } from './schema';
import { styles } from './styles';

export default function SignInStore() {
  const router = useRouter();
  const { signInStore } = useAuth();
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const signInStoreSchema = useMemo(() => createSignInStoreSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInStoreFormData>({
    resolver: zodResolver(signInStoreSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: SignInStoreFormData) {
    try {
      const { data: tokens } = await api.post<{
        accessToken: string;
        refreshToken: string;
      }>('/store-auth/login', data);

      await signInStore(tokens, rememberMe);
      Alert.alert(t('signinStore.welcomeTitle'), t('signinStore.welcomeMessage'), [
        { text: t('common.ok'), onPress: () => router.replace('/list') },
      ]);
    } catch {
      Alert.alert(t('common.error'), t('signinStore.invalidCredentials'));
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
              <Text style={styles.title}>{t('brand.groceries')}</Text>

              <View style={styles.brandRow}>
                <View style={styles.brandText}>
                  <Text style={styles.subtitle}>{t('brand.next')}</Text>
                  <Text style={styles.subtitle}>{t('brand.door')}</Text>
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
            <Text style={styles.label}>{t('common.email')}</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholderTextColor={Colors.GRAY_400}
                />
              )}
            />
            {errors.email ? <Text style={styles.error}>{errors.email.message}</Text> : null}

            <Text style={styles.label}>{t('common.password')}</Text>
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
              <Text style={styles.rememberLabel}>{t('common.rememberMe')}</Text>
              <Pressable onPress={() => setRememberMe((value) => !value)}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
              </Pressable>
            </View>

            <Button
              title={isSubmitting ? t('common.loggingIn') : t('common.logIn')}
              uppercase={false}
              style={styles.loginButton}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.footer}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backLink}>{t('common.back')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
