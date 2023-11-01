import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { useUser } from "../contexts/UserContext";
import Link from "next/link";
import LogoutButton from "./Logout";
import Hamburger from "./Hamburger";
import Modal from "./Modal";
// import Loading from "../public/icons/Loading";

const NavBar: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isActive = (href: string) => router.pathname.includes(href);

  useEffect(() => {
    () => {
      setIsMobileMenuOpen(false);
    };
  }, []);

  const links =
    user?.role === "admin"
      ? [
          { text: "Clientes", href: "/clients" },
          { text: "Ejercicios", href: "/exercises" },
        ]
      : [{ text: "Routine", href: "/routine" }];

  /* eslint-disable no-use-before-define*/
  return (
    <StyledNavBar>
      <StyledLinks>
        {links.map((link) => (
          <Link legacyBehavior href={link.href} key={link.text}>
            <StyledLink $active={isActive(link.href)}>{link.text}</StyledLink>
          </Link>
        ))}
      </StyledLinks>

      {/* Mobile */}
      <Hamburger
        open={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div />
        <div />
        <div />
      </Hamburger>
      <Modal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        ContentComponent={() => (
          <LinkWrapper>
            <div>Paginas:</div>
            {links.map((link) => (
              <Link legacyBehavior href={link.href} key={link.text}>
                <StyledLink
                  onClick={() => setIsMobileMenuOpen(false)}
                  $active={false}
                >
                  {link.text}
                </StyledLink>
              </Link>
            ))}
          </LinkWrapper>
        )}
      ></Modal>
      <LogoutButton />
      {/* {user ? (
        <>
          {links.map((link) => (
            <Link legacyBehavior href={link.href} key={link.text}>
              <a>{link.text}</a>
            </Link>
          ))}
          <LogoutButton />
        </>
      ) : (
        <Loading />
      )} */}
    </StyledNavBar>
  );
};

const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
`;

const StyledLink = styled.a<{ $active: boolean }>`
  color: #333;
  text-decoration: none;
  padding: 5px 10px;

  ${(props) =>
    props.$active &&
    css`
      background-color: #666;
      color: #fff;
      border-radius: 5px;
    `}
`;

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    ${StyledLinks} {
      display: none;
    }
  }

  @media (min-width: 769px) {
    ${Hamburger} {
      display: none;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${StyledLink} {
    border: 1px solid #aaa;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;
export default NavBar;
