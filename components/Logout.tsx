import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import Button from "./Button";
import { removeSession } from "../utils/manageSession";

const LogoutButton: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();

  // State to ensure component is mounted before rendering anything dependent on client-side APIs.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Clear user state
    setUser(null);

    // Remove the token from the cookie
    removeSession("user");

    // Redirect to login or home page (or wherever you'd like)
    router.push("/login");
  };

  if (!isMounted) return null;

  return <Button label="Cerrar Sesion" onClick={handleLogout} />;
};

export default LogoutButton;
