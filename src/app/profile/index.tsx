import { Redirect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import BottomTabBar from '@/components/BottomTabBar';
import HeaderList from '@/components/HeaderList';
import ProfilePhoto from '@/components/ProfilePhoto';
import { images } from '@/constants/images';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth';
import { api } from '@/lib/axios';
import { decodeJwtPayload, getSubjectFromToken } from '@/lib/decode-jwt';
import { getUserDisplayName, normalizeUserProfile } from '@/lib/normalize-user-profile';
import type { UserProfile } from '@/types/user';

import { styles } from './styles';

function ProfileField({ label, value }: Readonly<{ label: string; value?: string }>) {
  if (!value) {
    return null;
  }

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

async function fetchAuthenticatedUser() {
  try {
    const { data } = await api.get('/users/me', { skipAuthRefresh: true });
    return normalizeUserProfile(data);
  } catch {
    return null;
  }
}

async function fetchUserById(userId: string) {
  try {
    const { data } = await api.get(`/users/${userId}`);
    return normalizeUserProfile(data);
  } catch {
    return null;
  }
}

export default function Profile() {
  const { isReady, isUser, isStore } = useAuth();
  const { t } = useTranslation();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let loadedUser = await fetchAuthenticatedUser();

      if (!loadedUser) {
        const userId = getSubjectFromToken();
        loadedUser = userId ? await fetchUserById(userId) : null;
      }

      const tokenEmail = decodeJwtPayload()?.email;

      if (loadedUser && !loadedUser.email && tokenEmail) {
        loadedUser = { ...loadedUser, email: tokenEmail };
      }

      if (!loadedUser) {
        setUser(null);
        setError(t('userProfile.notFound'));
        return;
      }

      setUser(loadedUser);
    } catch {
      setUser(null);
      setError(t('userProfile.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isReady || !isUser) {
      return;
    }

    void loadProfile();
  }, [isReady, isUser, loadProfile]);

  if (isReady && isStore) {
    return <Redirect href="/store-profile" />;
  }

  if (isReady && !isUser) {
    return <Redirect href="/signin" />;
  }

  const displayName = user ? getUserDisplayName(user) : '';

  let content = null;

  if (loading && !user) {
    content = (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={Colors.GREEN_700} />
      </View>
    );
  } else if (error && !user) {
    content = (
      <View style={styles.centerContent}>
        <Text style={styles.statusText}>{error}</Text>
        <Button title={t('common.tryAgain')} uppercase={false} onPress={loadProfile} />
      </View>
    );
  } else if (user) {
    content = (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.photoWrap}>
          <ProfilePhoto name={displayName} />
        </View>

        <Text style={styles.title}>{displayName || t('userProfile.subtitle')}</Text>
        <Text style={styles.subtitle}>{t('userProfile.subtitle')}</Text>

        <View style={styles.section}>
          <ProfileField label={t('register.firstName')} value={user.firstName} />
          <ProfileField label={t('register.surname')} value={user.surname} />
          <ProfileField label={t('common.email')} value={user.email} />
          <ProfileField label={t('register.phone')} value={user.phone} />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderList logoSource={images.headerLogo} />

      {content}

      <View style={styles.footer}>
        <BackButton />
      </View>

      <BottomTabBar />
    </View>
  );
}
