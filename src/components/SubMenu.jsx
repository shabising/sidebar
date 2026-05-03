import { useNavigate } from 'react-router-dom';

export default function SubMenu({ items, isOpen, isActive }) {
  const navigate = useNavigate();

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
        <div
          key={item.id}
          role="menuitem"
          tabIndex={0}
          className={`sub-link ${isActive(item.path) ? 'sub-link--active' : ''}`}
          onClick={() => navigate(item.path)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate(item.path);
            }
            if (e.key === 'Escape') {
              e.currentTarget.closest('.nav-item')
                ?.querySelector('.nav-link')?.focus();
            }
          }}
          aria-current={isActive(item.path) ? 'page' : undefined}
        >
          <span className="sub-dot" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}