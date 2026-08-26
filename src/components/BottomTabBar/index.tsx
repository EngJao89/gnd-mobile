import { usePathname, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth';

import { styles } from './styles';

type TabItem = {
  key: string;
  label: string;
  icon: string;
  href: string;
  match: (pathname: string) => boolean;
  onPress?: () => void;
};

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { isUser, isStore, signOut } = useAuth();
  let profileHref = '/signin';

  if (isStore) {
    profileHref = '/store-profile';
  } else if (isUser) {
    profileHref = '/profile';
  }

  const tabs: TabItem[] = [
    {
      key: 'home',
      label: t('navigation.home'),
      icon: '🏠',
      href: '/list',
      match: (path) => path === '/list' || path.startsWith('/products/'),
    },
    {
      key: 'profile',
      label: t('navigation.profile'),
      icon: isStore ? '🏪' : '👤',
      href: profileHref,
      match: (path) => (isStore ? path === '/store-profile' : path === '/profile'),
    },
    isStore
      ? {
          key: 'purchases',
          label: t('navigation.purchases'),
          icon: '📦',
          href: '/store-purchases',
          match: (path) => path === '/store-purchases',
        }
      : {
          key: 'cart',
          label: t('navigation.cart'),
          icon: '🛒',
          href: '/cart',
          match: (path) => path === '/cart',
        },
  ];

  if (isUser || isStore) {
    tabs.push({
      key: 'logout',
      label: t('navigation.logout'),
      icon: '🚪',
      href: '/',
      match: () => false,
      onPress: async () => {
        await signOut();
        router.replace('/');
      },
    });
  }

  function handlePress(tab: TabItem) {
    if (tab.onPress) {
      tab.onPress();
      return;
    }

    if (tab.match(pathname)) {
      return;
    }

    router.push(tab.href as '/');
  }

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {tabs.map((tab) => {
        const isActive = tab.match(pathname);

        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => handlePress(tab)}>
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
