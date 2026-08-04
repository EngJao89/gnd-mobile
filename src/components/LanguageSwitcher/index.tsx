import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { setAppLanguage, type AppLanguage } from '@/i18n';

import { styles } from './styles';

const options: AppLanguage[] = ['pt', 'en'];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = (i18n.language.startsWith('en') ? 'en' : 'pt') as AppLanguage;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('language.label')}</Text>
      <View style={styles.options}>
        {options.map((language) => {
          const isActive = current === language;

          return (
            <Pressable
              key={language}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => setAppLanguage(language)}>
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                {t(`language.${language}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
