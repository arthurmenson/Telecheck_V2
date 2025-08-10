import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import * as authService from '../services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const authState = await authService.getAuthState();
      if (authState.token && authState.userId) {
        // In a real app, you'd validate the token and fetch user data
        setUser({
          id: authState.userId,
          name: 'Sarah Johnson',
          email: authState.userId.includes('@') ? authState.userId : 'sarah.johnson@email.com',
          avatar: undefined,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const authState = await authService.login(email, password);
      
      if (authState.token) {
        setUser({
          id: authState.userId || email,
          name: 'Sarah Johnson', // In real app, this would come from API
          email: email,
          avatar: undefined,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const authState = await authService.register(name, email, password);
      
      if (authState.token) {
        setUser({
          id: authState.userId || email,
          name: name,
          email: email,
          avatar: undefined,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Registration Failed', 'Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};