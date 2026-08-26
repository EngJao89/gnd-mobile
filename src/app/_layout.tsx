import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AuthProvider } from '@/contexts/auth';
import { CartProvider } from '@/contexts/cart';
import { initLanguagePreference } from '@/i18n';

import '@/i18n';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    void initLanguagePreference();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <CartProvider>
          <Slot />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
