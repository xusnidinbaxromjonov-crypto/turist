import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Load initial state from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('turist_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (name: string, email?: string) => {
    const newUser = {
      id: 'u' + Date.now(),
      name: name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=047857&color=fff`
    };
    setUser(newUser);
    localStorage.setItem('turist_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('turist_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
