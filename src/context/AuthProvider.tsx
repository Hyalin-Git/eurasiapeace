"use client";
import { verifyToken } from "@/server/api/auth";
import { User } from "@/types";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import useSWR from "swr";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useSWR("/api/auth/verify-token", verifyToken, {
    onSuccess: (data) => {
      setUser(data?.data?.data?.user);
    },
    onError: (err: unknown) => {
      if (err) {
        setUser(null);
      }
    },
    refreshInterval: 180000, // 3 minutes
    revalidateIfStale: true,
    revalidateOnFocus: true,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }

  return context;
}
