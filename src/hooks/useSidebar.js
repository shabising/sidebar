import { useState, useEffect } from 'react';

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus]   = useState({});

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '[' && !isMobile) setCollapsed(prev => !prev);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobile]);

  const toggleMenu = (id) =>
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));

  return {
    collapsed, setCollapsed,
    isMobile,
    mobileOpen, setMobileOpen,
    openMenus, toggleMenu,
  };
}