import { ChevronLeft } from 'lucide-react';
import { navData } from '../data/navData';
import NavItem from './NavItem';

export default function Sidebar({
  collapsed, setCollapsed,
  isMobile, mobileOpen, setMobileOpen,
  openMenus, toggleMenu,
  isActive,
  darkMode, setDarkMode
}) {
  return (
    <>
      {isMobile && mobileOpen && (
        <div
          className="overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'sidebar',
          collapsed ? 'collapsed' : '',
          isMobile ? 'is-mobile' : '',
          isMobile && mobileOpen ? 'mobile-open' : ''
        ].join(' ')}
        aria-label="Main navigation"
      >
        <div className="sidebar-logo">
          <div className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="#a89dff"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#6c63ff" opacity="0.7"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#6c63ff" opacity="0.7"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="#a89dff" opacity="0.4"/>
            </svg>
          </div>
          {!collapsed && <span className="logo-text">nexus</span>}
        </div> 

        <nav className="nav-scroll">
          {navData.map(section => (
            <div key={section.section}>
              {!collapsed && (
                <div className="nav-section-label">{section.section}</div>
              )}
              {section.items.map(item => (
                <NavItem
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  isActive={isActive}
                />
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">

        <button
          className="dark-toggle"
          onClick={() => setDarkMode(p => !p)}
          aria-label="Toggle dark mode"
        >
          <span className="nav-icon" aria-hidden="true">
            {darkMode ? '☀️' : '🌙'}
          </span>
          {!collapsed && (
            <span className="nav-label">
              {darkMode ? 'Light mode' : 'Dark mode'}
            </span>
          )}
        </button>

          <div
            className="user-row"
            tabIndex={0}
            role="button"
            aria-label="User profile"
          >
            <div className="avatar" aria-hidden="true">AH</div>
            {!collapsed && (
              <div className="user-info">
                <div className="user-name">Anar H.</div>
                <div className="user-role">Developer</div>
              </div>
            )}
          </div>
        </div>
      </aside>
        <button
            className="toggle-btn"
            onClick={() => setCollapsed(p => !p)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            <ChevronLeft
              size={12}
              style={{
                transform: collapsed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.28s'
              }}
            />
          </button>
    </>
  );
}