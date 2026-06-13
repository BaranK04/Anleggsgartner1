import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, appStore } from '../store';

interface AuthContextType {
  user: User | null;
  login: (email: string, asAdmin?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ug_currentUser');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const login = (email: string, asAdmin = false) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].toUpperCase(),
      email,
      role: asAdmin || email === 'admin@anleggsgartner1.no' ? 'admin' : 'user'
    };
    appStore.saveUser(newUser);
    setUser(newUser);
    localStorage.setItem('ug_currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ug_currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
