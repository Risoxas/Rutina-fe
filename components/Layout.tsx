// components/Layout.tsx
import React from 'react';
import NavBar from './NavBar'; // We'll create this component next
import { type } from 'os';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <NavBar />
      <div>
        {children}
      </div>
    </div>
  );
}

