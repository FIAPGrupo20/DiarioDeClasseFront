import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { AuthUser, UserRole } from '../types';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  ready: boolean;
  login: (payload: { email: string; senha: string; role: UserRole }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'diario:token';
const USER_KEY = 'diario:user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(TOKEN_KEY);
    const savedUser = window.localStorage.getItem(USER_KEY);

    if (!savedToken || !savedUser) {
      setReady(true);
      return;
    }

    setToken(savedToken);
    setUser(JSON.parse(savedUser) as AuthUser);

    api.me(savedToken)
      .then((response) => {
        setUser(response.user);
        window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const login = async (payload: { email: string; senha: string; role: UserRole }) => {
    const response = await api.login(payload);
    setToken(response.token);
    setUser(response.user);
    window.localStorage.setItem(TOKEN_KEY, response.token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}