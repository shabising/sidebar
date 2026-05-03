import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SubMenu from './SubMenu';

export default function NavItem({ item, collapsed, openMenus, toggleMenu }) {
  const hasChildren = item.children?.length > 0;
  const isOpen = openMenus[item.id];
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) toggleMenu(item.id);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="nav-item">
      {hasChildren ? (
        <div
          className="nav-link"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="true"
          data-tooltip={collapsed ? item.label : undefined}
          onClick={handleClick}
          onKeyDown={handleKey}
        >
          <span className="nav-icon" aria-hidden="true"><Icon size={16} /></span>
          {!collapsed && <span className="nav-label">{item.label}</span>}
          {!collapsed && (
            <ChevronRight
              size={14}
              className={`nav-chevron ${isOpen ? 'open' : ''}`}
              aria-hidden="true"
            />
          )}
        </div>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
          data-tooltip={collapsed ? item.label : undefined}
        >
          <span className="nav-icon" aria-hidden="true"><Icon size={16} /></span>
          {!collapsed && <span className="nav-label">{item.label}</span>}
          {!collapsed && item.badge && (
            <span className="nav-badge" aria-label={`${item.badge} new`}>
              {item.badge}
            </span>
          )}
        </NavLink>
      )}

      {hasChildren && !collapsed && (
        <SubMenu items={item.children} isOpen={isOpen} />
      )}
    </div>
  );
}