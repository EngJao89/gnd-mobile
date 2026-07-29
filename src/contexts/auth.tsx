import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { onAuthFailure } from '@/lib/axios';
import {
  clearStoreTokens,
  loadPersistedStoreTokens,
  saveStoreTokens,
  type StoreTokens,
} from '@/lib/token-storage';

export type AuthRole = 'user' | 'store' | null;

type AuthContextValue = {
  role: AuthRole;
  isReady: boolean;
  setRole: (role: AuthRole) => void;
  signInStore: (tokens: StoreTokens, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  isUser: boolean;
  isStore: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AuthRole>(null);
  const [isReady, setIsReady] = useState(false);

  const signOut = useCallback(async () => {
    await clearStoreTokens();
    setRole(null);
  }, []);

  const signInStore = useCallback(async (tokens: StoreTokens, rememberMe = false) => {
    await saveStoreTokens(tokens, rememberMe);
    setRole('store');
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const tokens = await loadPersistedStoreTokens();

        if (isMounted && tokens) {
          setRole('store');
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return onAuthFailure(() => {
      setRole(null);
    });
  }, []);

  const value = useMemo(
    () => ({
      role,
      isReady,
      setRole,
      signInStore,
      signOut,
      isUser: role === 'user',
      isStore: role === 'store',
    }),
    [role, isReady, signInStore, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
