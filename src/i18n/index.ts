import * as SecureStore from 'expo-secure-store';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

import en from './locales/en.json';
import pt from './locales/pt.json';

export const SUPPORTED_LANGUAGES = ['pt', 'en'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = 'pt';

const LANGUAGE_KEY = 'app_language';
const canUseSecureStore = Platform.OS !== 'web';

function resolveDeviceLanguage(): AppLanguage {
  const deviceLanguage = getLocales()[0]?.languageCode;

  if (deviceLanguage === 'en') {
    return 'en';
  }

  return DEFAULT_LANGUAGE;
}

export async function getStoredLanguage(): Promise<AppLanguage | null> {
  if (!canUseSecureStore) {
    return null;
  }

  const stored = await SecureStore.getItemAsync(LANGUAGE_KEY);

  if (stored === 'pt' || stored === 'en') {
    return stored;
  }

  return null;
}

export async function setAppLanguage(language: AppLanguage) {
  await i18n.changeLanguage(language);

  if (canUseSecureStore) {
    await SecureStore.setItemAsync(LANGUAGE_KEY, language);
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: resolveDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export async function initLanguagePreference() {
  const stored = await getStoredLanguage();

  if (stored && stored !== i18n.language) {
    await i18n.changeLanguage(stored);
  }
}

export default i18n;
