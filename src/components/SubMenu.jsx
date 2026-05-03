import { NavLink } from 'react-router-dom';

export default function SubMenu({ items, isOpen }) {
  return (
    <div
      style={{
        maxHeight: isOpen ? items.length * 44 + 'px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.28s cubic-bezier(.4,0,.2,1)'
      }}
      role="menu"
    >
      {items.map(item => (
        <NavLink
          key={item.id}
          to={item.path}
          role="menuitem"
          className={({ isActive }) =>
            `sub-link ${isActive ? 'sub-link--active' : ''}`
          }
        >
          <span className="sub-dot" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}