import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

const storeProfile = {
  name: 'Mercado Serve Mais',
  legalName: 'Serve Mais Varejo LTDA',
  email: 'serve-mais@gmail.com',
  street: 'AV. Araguaia',
  numberOrBlock: '125',
  neighborhood: 'Aldeia dos Sonhos',
  city: 'Anápolis',
  state: 'GO',
  zipCode: '75045-785',
};

export default function StoreProfile() {
  const { t } = useTranslation();

  const address = [
    storeProfile.street,
    storeProfile.numberOrBlock,
    storeProfile.neighborhood,
    `${storeProfile.city} - ${storeProfile.state}`,
    storeProfile.zipCode,
  ].join(', ');

  return (
    <View style={styles.container}>
      <HeaderList
        location={`${storeProfile.city}, ${storeProfile.state}`}
        logoSource={images.headerLogo}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{storeProfile.name}</Text>
        <Text style={styles.subtitle}>{t('storeProfile.subtitle')}</Text>

        <View style={styles.section}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('storeProfile.legalName')}</Text>
            <Text style={styles.value}>{storeProfile.legalName}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('storeProfile.email')}</Text>
            <Text style={styles.value}>{storeProfile.email}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('storeProfile.address')}</Text>
            <Text style={styles.value}>{address}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BackButton />
      </View>

      <BottomTabBar />
    </View>
  );
}
