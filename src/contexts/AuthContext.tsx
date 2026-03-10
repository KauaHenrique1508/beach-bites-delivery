import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    // Mock: restaurant@demo.com logs in as restaurant
    const isRestaurant = email.includes('restaurant');
    setUser({
      id: Date.now().toString(),
      name: isRestaurant ? 'Restaurant Owner' : 'Beach Lover',
      email,
      role: isRestaurant ? 'restaurant' : 'customer',
    });
    return true;
  };

  const signup = (name: string, email: string, _password: string): boolean => {
    setUser({ id: Date.now().toString(), name, email, role: 'customer' });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
