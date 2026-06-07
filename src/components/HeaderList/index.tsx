import { type ReactNode } from 'react';
import { Image, Text, View, type ImageSourcePropType } from 'react-native';

import { styles } from './styles';

type HeaderListProps = {
  location?: string;
  userName?: string;
  logoSource?: ImageSourcePropType;
  button?: ReactNode;
};

export default function HeaderList({ location, userName, logoSource, button }: HeaderListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.imageContent}>
          {logoSource ? <Image source={logoSource} style={styles.image} resizeMode="contain" /> : null}
        </View>

        <View style={styles.maps}>
          {location ? <Text style={styles.location}>{location}</Text> : null}
          {button ? <View>{button}</View> : null}
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
