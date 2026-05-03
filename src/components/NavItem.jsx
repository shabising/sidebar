import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubMenu from './SubMenu';

export default function NavItem({ item, collapsed, openMenus, toggleMenu, isActive }) {
  const hasChildren = item.children?.length > 0;
  const isOpen = openMenus[item.id];
  const Icon = item.icon;
  const navigate = useNavigate();

  const isParentActive = hasChildren
    ? item.children.some(child => isActive(child.path))
    : false;

  const handleClick = () => {
    if (hasChildren) {
      toggleMenu(item.id);
    } else {
      navigate(item.path);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="nav-item">
      <div
        className={`nav-link ${isParentActive && !hasChildren ? 'active' : ''} ${isParentActive && hasChildren ? 'parent-active' : ''} ${!hasChildren && isActive(item.path) ? 'active' : ''}`}
        role="button"
        tabIndex={0}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-haspopup={hasChildren ? 'true' : undefined}
        aria-current={!hasChildren && isActive(item.path) ? 'page' : undefined}
        data-tooltip={collapsed ? item.label : undefined}
        onClick={handleClick}
        onKeyDown={handleKey}
      >
        <span className="nav-icon" aria-hidden="true"><Icon size={16} /></span>
        {!collapsed && <span className="nav-label">{item.label}</span>}
        {!collapsed && item.badge && (
          <span className="nav-badge" aria-label={`${item.badge} new`}>
            {item.badge}
          </span>
        )}
        {!collapsed && hasChildren && (
          <ChevronRight
            size={14}
            className={`nav-chevron ${isOpen ? 'open' : ''}`}
            aria-hidden="true"
          />
        )}
      </div>

      {hasChildren && !collapsed && (
        <SubMenu items={item.children} isOpen={isOpen} isActive={isActive} />
      )}
    </div>
  );
}