// components/NavBar.tsx
import React from "react";
import { useUser } from "../contexts/UserContext";
import Link from "next/link";


const NavBar: React.FC = () => {
  const {user} = useUser();

  if (!user) return null;

  return (
    <>
      {user.type === "admin" ? (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            background: "#333",
            color: "#fff",
            padding: "10px",
          }}
        >
          <Link href="/clients">
            <a style={{ marginRight: "15px" }}>Clients</a>
          </Link>
          <Link href="/exercises">
            <a>Exercises</a>
          </Link>
        </nav>
      ) : (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            background: "#333",
            color: "#fff",
            padding: "10px",
          }}
        >
          <Link href="/routine">
            <a style={{ marginRight: "15px" }}>Routine</a>
          </Link>
        </nav>
      )}
    </>
  );
};

export default NavBar;
