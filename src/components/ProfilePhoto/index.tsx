import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { styles } from './styles';

type ProfilePhotoProps = {
  uri?: string | null;
  name?: string;
};

function getInitials(name?: string) {
  if (!name?.trim()) {
    return '';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts.at(0)?.[0] ?? '';
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? '') : '';

  return `${first}${last}`.toUpperCase();
}

function ProfilePhotoContent({
  showImage,
  uri,
  initials,
  onImageError,
}: Readonly<{
  showImage: boolean;
  uri?: string | null;
  initials: string;
  onImageError: () => void;
}>) {
  if (showImage) {
    return (
      <Image
        source={{ uri: uri ?? undefined }}
        style={styles.image}
        contentFit="cover"
        onError={onImageError}
      />
    );
  }

  if (initials) {
    return <Text style={styles.initials}>{initials}</Text>;
  }

  return <Text style={styles.placeholderIcon}>👤</Text>;
}

export default function ProfilePhoto({ uri, name }: Readonly<ProfilePhotoProps>) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);
  const showImage = Boolean(uri) && !imageError;

  useEffect(() => {
    setImageError(false);
  }, [uri]);

  return (
    <View
      style={styles.container}
      accessibilityRole="image"
      accessibilityLabel={t('userProfile.photo')}>
      <View style={styles.circle}>
        <ProfilePhotoContent
          showImage={showImage}
          uri={uri}
          initials={initials}
          onImageError={() => setImageError(true)}
        />
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeIcon}>📷</Text>
      </View>
    </View>
  );
}
