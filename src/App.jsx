import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useSidebar } from './hooks/useSidebar';
import { Menu } from 'lucide-react';
import './index.css';

function Layout() {
  const {
    collapsed, setCollapsed,
    isMobile, mobileOpen, setMobileOpen,
    openMenus, toggleMenu,
    isActive,
    darkMode, setDarkMode,
  } = useSidebar();

  const location = useLocation();
  const pageName = location.pathname === '/'
    ? 'Dashboard'
    : location.pathname.split('/').filter(Boolean).pop().replace('-', ' ');

  return (
    <div className={`app ${isMobile ? 'is-mobile' : ''} ${collapsed ? 'is-collapsed' : ''}`}>      
      <Sidebar
        collapsed={collapsed} setCollapsed={setCollapsed}
        isMobile={isMobile} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
        openMenus={openMenus} toggleMenu={toggleMenu}
        isActive={isActive}
        darkMode={darkMode} setDarkMode={setDarkMode}
      />

      <div className="main-content">
        {isMobile && (
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        )}

        <header className="topbar">
          <span className="page-title">{pageName}</span>
        </header>

        <main className="content-area">
          <Routes>
            <Route path="/"                  element={<Page title="Dashboard" />} />
            <Route path="/analytics"         element={<Page title="Analytics" />} />
            <Route path="/projects"          element={<Page title="Projects" />} />
            <Route path="/projects/all"      element={<Page title="All Projects" />} />
            <Route path="/projects/active"   element={<Page title="Active Projects" />} />
            <Route path="/projects/archived" element={<Page title="Archived" />} />
            <Route path="/team"              element={<Page title="Team" />} />
            <Route path="/team/members"      element={<Page title="Members" />} />
            <Route path="/team/roles"        element={<Page title="Roles" />} />
            <Route path="/files"             element={<Page title="Files" />} />
            <Route path="/messages"          element={<Page title="Messages" />} />
            <Route path="/settings"          element={<Page title="Settings" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Page({ title }) {
  return (
    <div style={{ padding: '8px 0' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{title}</h1>
      <p style={{ color: '#888', fontSize: 14 }}>Bu {title} səhifəsidir.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}