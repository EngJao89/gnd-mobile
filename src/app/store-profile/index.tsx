import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import HeaderActions from '@/components/HeaderActions';
import HeaderList from '@/components/HeaderList';
import { images } from '@/constants/images';

import { styles } from './styles';

const storeProfile = {
  name: 'Mercado Serve Mais',
  legalName: 'Serve Mais Varejo LTDA',
  cnpj: '87.778.686/0001-24',
  ownerName: 'Carlos Matheus',
  email: 'serve-mais@gmail.com',
  street: 'AV. Araguaia',
  numberOrBlock: '125',
  neighborhood: 'Aldeia dos Sonhos',
  city: 'Anápolis',
  state: 'GO',
  zipCode: '75045-785',
};

export default function StoreProfile() {
  const router = useRouter();

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
        button={<HeaderActions />}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{storeProfile.name}</Text>
        <Text style={styles.subtitle}>Store profile</Text>

        <View style={styles.section}>
          <View style={styles.field}>
            <Text style={styles.label}>Legal name</Text>
            <Text style={styles.value}>{storeProfile.legalName}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CNPJ</Text>
            <Text style={styles.value}>{storeProfile.cnpj}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.value}>{storeProfile.ownerName}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{storeProfile.email}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{address}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
