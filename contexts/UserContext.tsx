import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../public/icons/Loading";
import axiosInstance from "../utils/axiosInstance";

type User = {
  role: "admin" | "user";
  email?: string;
  token?: string;
};

type UserContextProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ role: "admin" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user && user.token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
    }
  }, [user]);

  if (!isMounted) return <Loading />; // Consider having a loading spinner or feedback here

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
