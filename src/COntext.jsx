import React, { createContext, useContext, useState } from 'react';

// Context oluşturuyoruz
const SidebarContext = createContext();

// Provider bileşeni
export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook: Sidebar context'i kullanmak için
export const useSidebar = () => useContext(SidebarContext);
