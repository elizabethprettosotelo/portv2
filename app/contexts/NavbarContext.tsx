'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type NavbarContextType = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Update CSS variable when sidebar state changes
  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth >= 768) {
        const width = sidebarCollapsed ? '48px' : '256px';
        document.documentElement.style.setProperty('--sidebar-width', width);
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '0px');
      }
    };

    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [sidebarCollapsed]);

  return (
    <NavbarContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
