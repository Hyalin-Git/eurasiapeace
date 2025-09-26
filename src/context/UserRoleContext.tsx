"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

interface UserRoleContextType {
  userRole: string[];
  setUserRole: (userRole: string[]) => void;
}

const UserRoleContext = createContext<UserRoleContextType | null>(null);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const { user: authUser } = useAuth();
  const [userRole, setUserRole] = useState<string[]>([]);

  useEffect(() => {
    setUserRole(authUser?.roles || []);
  }, [authUser]);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);

  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }

  return context;
}
