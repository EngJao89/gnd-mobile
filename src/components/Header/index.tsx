import { Image, Text, View, type ImageSourcePropType } from 'react-native';

import { styles } from './styles';

type HeaderProps = {
  location?: string;
  userName?: string;
  logoSource?: ImageSourcePropType;
};

export default function Header({ location, userName, logoSource }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.imageContent}>
          {logoSource ? <Image source={logoSource} style={styles.image} resizeMode="contain" /> : null}
        </View>

        <View style={styles.maps}>
          {location ? <Text style={styles.location}>{location}</Text> : null}
        </View>
      </View>

      {userName ? (
        <View style={styles.userContent}>
          <Text style={styles.userLabel}>{userName}</Text>
        </View>
      ) : null}
    </View>
  );
}
