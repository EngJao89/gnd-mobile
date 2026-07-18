import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type AuthRole = 'user' | 'store' | null;

type AuthContextValue = {
  role: AuthRole;
  setRole: (role: AuthRole) => void;
  isUser: boolean;
  isStore: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AuthRole>(null);

  const value = useMemo(
    () => ({
      role,
      setRole,
      isUser: role === 'user',
      isStore: role === 'store',
    }),
    [role],
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
