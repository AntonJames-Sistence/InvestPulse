'use client';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}

interface DecodedToken {
  username: string;
  exp: number;
}

interface AuthContextType {
  authState: AuthState;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  // Get token from local storage and set auth to current user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const username = decodedToken.username;

      if (decodedToken.exp * 1000 > Date.now()) {
        setAuthState({ isAuthenticated: true, user: { username } });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (username: string) => {
    setAuthState({ isAuthenticated: true, user: { username } });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
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
