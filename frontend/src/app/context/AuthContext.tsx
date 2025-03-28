// src/app/context/AuthContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/src/@types/global';

// Define the shape of the AuthContext value
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create a context for authentication
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Initial user state is null

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
