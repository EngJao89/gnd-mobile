import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
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

import { styles } from './styles';

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

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
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              autoComplete="given-name"
              placeholderTextColor={Colors.GRAY_400}
            />

            <Text style={styles.label}>Surname</Text>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={setSurname}
              autoComplete="family-name"
              placeholderTextColor={Colors.GRAY_400}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              placeholderTextColor={Colors.GRAY_400}
            />

            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
              placeholder="+61"
              placeholderTextColor={Colors.GRAY_400}
            />

            <Button title="Register" uppercase={false} style={styles.registerButton} />
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
