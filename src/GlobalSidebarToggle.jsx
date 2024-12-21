import React from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { useSidebar } from './COntext';

const GlobalSidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <AiOutlineBars
      onClick={toggleSidebar}
    />
  );
};

export default GlobalSidebarToggle;
