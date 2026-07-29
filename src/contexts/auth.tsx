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
  clearTokens,
  loadPersistedTokens,
  saveTokens,
  type AuthTokens,
} from '@/lib/token-storage';

export type AuthRole = 'user' | 'store' | null;

type AuthContextValue = {
  role: AuthRole;
  isReady: boolean;
  setRole: (role: AuthRole) => void;
  signInUser: (tokens: AuthTokens, rememberMe?: boolean) => Promise<void>;
  signInStore: (tokens: AuthTokens, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  isUser: boolean;
  isStore: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AuthRole>(null);
  const [isReady, setIsReady] = useState(false);

  const signOut = useCallback(async () => {
    await clearTokens();
    setRole(null);
  }, []);

  const signInUser = useCallback(async (tokens: AuthTokens, rememberMe = false) => {
    await saveTokens('user', tokens, rememberMe);
    setRole('user');
  }, []);

  const signInStore = useCallback(async (tokens: AuthTokens, rememberMe = false) => {
    await saveTokens('store', tokens, rememberMe);
    setRole('store');
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const session = await loadPersistedTokens();

        if (isMounted && session) {
          setRole(session.owner);
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
      signInUser,
      signInStore,
      signOut,
      isUser: role === 'user',
      isStore: role === 'store',
    }),
    [role, isReady, signInUser, signInStore, signOut],
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
