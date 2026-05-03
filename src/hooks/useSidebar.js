import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus]   = useState({});
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  document.body.classList.toggle('dark', darkMode);
}, [darkMode]);

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
      if (e.key === 'Escape') setMobileOpen(false);
      if (e.key === '[' && !isMobile) setCollapsed(prev => !prev);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobile]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMenu = (id) =>
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));

  return {
    collapsed, setCollapsed,
    isMobile,
    mobileOpen, setMobileOpen,
    openMenus, toggleMenu,
    isActive,
    darkMode, setDarkMode,
  };
}