import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubMenu({ items, isOpen, isActive }) {
  const navigate = useNavigate();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="submenu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: 'hidden' }}
          role="menu"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ x: -8, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
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
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}