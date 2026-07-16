import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
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

import { type RegisterStoreFormData, registerStoreSchema } from './schema';
import { styles } from './styles';

const fields: {
  name: keyof RegisterStoreFormData;
  label: string;
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
  { name: 'name', label: 'Store name', autoComplete: 'organization' },
  { name: 'legalName', label: 'Legal name', autoComplete: 'organization' },
  { name: 'cnpj', label: 'CNPJ', autoCapitalize: 'none' },
  { name: 'ownerName', label: 'Owner name', autoComplete: 'name' },
  {
    name: 'email',
    label: 'Email',
    keyboardType: 'email-address',
    autoComplete: 'email',
    autoCapitalize: 'none',
  },
  {
    name: 'password',
    label: 'Password',
    secureTextEntry: true,
    autoComplete: 'new-password',
    autoCapitalize: 'none',
  },
  { name: 'street', label: 'Street', autoComplete: 'street-address' },
  { name: 'numberOrBlock', label: 'Number or block' },
  { name: 'neighborhood', label: 'Neighborhood' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State', autoCapitalize: 'characters' },
  { name: 'zipCode', label: 'ZIP code', autoComplete: 'postal-code', autoCapitalize: 'none' },
];

export default function RegisterStore() {
  const router = useRouter();

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
      Alert.alert('Success', 'Store created successfully.');
      router.replace('/signin-store');
    } catch {
      Alert.alert('Error', 'Could not create store. Please try again.');
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
            {fields.map((field) => (
              <View key={field.name}>
                <Text style={styles.label}>{field.label}</Text>
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
              title={isSubmitting ? 'Registering...' : 'Register'}
              uppercase={false}
              style={styles.registerButton}
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
