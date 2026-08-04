import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
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
import { api } from '@/lib/axios';

import { createRegisterStoreSchema, type RegisterStoreFormData } from './schema';
import { styles } from './styles';

const fieldConfigs: {
  name: keyof RegisterStoreFormData;
  labelKey: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoComplete?:
    | 'email'
    | 'new-password'
    | 'street-address'
    | 'postal-code'
    | 'name'
    | 'organization';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}[] = [
  { name: 'name', labelKey: 'registerStore.storeName', autoComplete: 'organization' },
  { name: 'legalName', labelKey: 'registerStore.legalName', autoComplete: 'organization' },
  { name: 'cnpj', labelKey: 'registerStore.cnpj', autoCapitalize: 'none' },
  { name: 'ownerName', labelKey: 'registerStore.ownerName', autoComplete: 'name' },
  {
    name: 'email',
    labelKey: 'common.email',
    keyboardType: 'email-address',
    autoComplete: 'email',
    autoCapitalize: 'none',
  },
  {
    name: 'password',
    labelKey: 'common.password',
    secureTextEntry: true,
    autoComplete: 'new-password',
    autoCapitalize: 'none',
  },
  { name: 'street', labelKey: 'registerStore.street', autoComplete: 'street-address' },
  { name: 'numberOrBlock', labelKey: 'registerStore.numberOrBlock' },
  { name: 'neighborhood', labelKey: 'registerStore.neighborhood' },
  { name: 'city', labelKey: 'registerStore.city' },
  { name: 'state', labelKey: 'registerStore.state', autoCapitalize: 'characters' },
  {
    name: 'zipCode',
    labelKey: 'registerStore.zipCode',
    autoComplete: 'postal-code',
    autoCapitalize: 'none',
  },
];

export default function RegisterStore() {
  const router = useRouter();
  const { t } = useTranslation();
  const registerStoreSchema = useMemo(() => createRegisterStoreSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterStoreFormData>({
    resolver: zodResolver(registerStoreSchema),
    defaultValues: {
      name: '',
      legalName: '',
      cnpj: '',
      ownerName: '',
      email: '',
      password: '',
      street: '',
      numberOrBlock: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  async function onSubmit(data: RegisterStoreFormData) {
    try {
      await api.post('/stores', data);
      Alert.alert(t('common.success'), t('registerStore.successMessage'));
      router.replace('/signin-store');
    } catch {
      Alert.alert(t('common.error'), t('registerStore.errorMessage'));
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
            {fieldConfigs.map((field) => (
              <View key={field.name}>
                <Text style={styles.label}>{t(field.labelKey)}</Text>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors[field.name] && styles.inputError]}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={field.secureTextEntry}
                      keyboardType={field.keyboardType}
                      autoComplete={field.autoComplete}
                      autoCapitalize={field.autoCapitalize}
                      placeholderTextColor={Colors.GRAY_400}
                    />
                  )}
                />
                {errors[field.name] ? (
                  <Text style={styles.error}>{errors[field.name]?.message}</Text>
                ) : null}
              </View>
            ))}

            <Button
              title={isSubmitting ? t('common.registering') : t('common.register')}
              uppercase={false}
              style={styles.registerButton}
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
