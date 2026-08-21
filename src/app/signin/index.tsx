import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { api } from '@/lib/axios';
import { loadRememberedEmail, persistRememberedEmail } from '@/lib/token-storage';

import { createSignInSchema, type SignInFormData } from './schema';
import { styles } from './styles';

export default function SignIn() {
  const router = useRouter();
  const { signInUser } = useAuth();
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const signInSchema = useMemo(() => createSignInSchema(t), [t]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    let isMounted = true;

    async function restoreRememberedAccount() {
      const email = await loadRememberedEmail('user');

      if (!isMounted || !email) {
        return;
      }

      setRememberMe(true);
      reset({ email, password: '' });
    }

    void restoreRememberedAccount();

    return () => {
      isMounted = false;
    };
  }, [reset]);

  async function onSubmit(data: SignInFormData) {
    try {
      const { data: tokens } = await api.post<{
        accessToken: string;
        refreshToken: string;
      }>('/auth/login', data);

      await signInUser(tokens, rememberMe);
      await persistRememberedEmail('user', data.email, rememberMe);
      Alert.alert(t('common.success'), t('signin.successMessage'));
      router.replace('/list');
    } catch {
      Alert.alert(t('common.error'), t('signin.invalidCredentials'));
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

            <Pressable
              style={styles.rememberRow}
              onPress={() => setRememberMe((value) => !value)}>
              <Text style={styles.rememberLabel}>{t('common.rememberMe')}</Text>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
            </Pressable>

            <Button
              title={isSubmitting ? t('common.loggingIn') : t('common.logIn')}
              uppercase={false}
              style={styles.loginButton}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.footer}>
            <BackButton />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
