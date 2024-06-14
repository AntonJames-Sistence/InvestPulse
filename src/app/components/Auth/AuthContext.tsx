import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthState {
    isAuthenticated: boolean;
    user: { email: string } | null;
}

interface AuthContextType {
    authState: AuthState;
    login: (user: { email: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
    });

    const login = (user: { email: string }) => {
        setAuthState({ isAuthenticated: true, user });
    }

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    }

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}