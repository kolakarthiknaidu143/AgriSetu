import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser, UserRole, INotification } from '../types';
import { api, setStoredToken, removeStoredToken, getStoredToken } from '../services/api';

interface AuthContextType {
  user: IUser | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  demoLogin: (role: UserRole) => Promise<void>;
  logout: () => void;
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
  notifications: INotification[];
  unreadNotificationsCount: number;
  refreshNotifications: () => Promise<void>;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  const fetchCurrentUser = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }
      const data = await api.getMe();
      setUser(data.user);
      await refreshNotifications();
    } catch (err) {
      console.warn('Auth token expired or invalid:', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const refreshNotifications = async () => {
    try {
      if (!getStoredToken()) return;
      const data = await api.getNotifications();
      setNotifications(data.notifications || []);
      setUnreadNotificationsCount(data.unreadCount || 0);
    } catch {
      // non-blocking
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    const interval = setInterval(refreshNotifications, 12000);
    return () => clearInterval(interval);
  }, [token]);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const data = await api.login(credentials);
      setStoredToken(data.token);
      setToken(data.token);
      setUser(data.user);
      await refreshNotifications();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: any) => {
    setIsLoading(true);
    try {
      const data = await api.register(formData);
      setStoredToken(data.token);
      setToken(data.token);
      setUser(data.user);
      await refreshNotifications();
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (targetRole: UserRole) => {
    setIsLoading(true);
    try {
      const data = await api.demoLogin(targetRole);
      setStoredToken(data.token);
      setToken(data.token);
      setUser(data.user);
      await refreshNotifications();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeStoredToken();
    setToken(null);
    setUser(null);
    setNotifications([]);
    setUnreadNotificationsCount(0);
  };

  const role: UserRole = user?.role || 'farmer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        demoLogin,
        logout,
        language,
        setLanguage,
        notifications,
        unreadNotificationsCount,
        refreshNotifications,
        isDemoModalOpen,
        setIsDemoModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
