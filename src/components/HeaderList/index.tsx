import { type ReactNode } from 'react';
import { Image, Text, View, type ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

import { styles } from './styles';

type HeaderListProps = {
  location?: string;
  userName?: string;
  logoSource?: ImageSourcePropType;
  button?: ReactNode;
};

export default function HeaderList({ location, userName, logoSource, button }: HeaderListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          {logoSource ? <Image source={logoSource} style={styles.logo} resizeMode="contain" /> : null}
        </View>

        <View style={styles.locationContainer}>
          {location ? <Text style={styles.location}>{location}</Text> : null}
        </View>

        <View style={styles.actionContainer}>{button}</View>
      </View>

      {userName ? (
        <View style={styles.userContent}>
          <Text style={styles.userLabel}>{userName}</Text>
        </View>
      ) : null}
    </View>
  );
}
