import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('@auth');
        if (status === 'true') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    try {
      await AsyncStorage.setItem('@auth', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error saving auth status:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@auth');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error removing auth status:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
