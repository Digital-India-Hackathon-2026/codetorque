import { motion } from 'framer-motion';
import { Home, Grid, Zap, AlertTriangle, User } from 'lucide-react';

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'services', icon: Grid, label: 'Services' },
  { id: 'ai', icon: Zap, label: 'AI Help' },
  { id: 'sos', icon: AlertTriangle, label: 'SOS' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function TabBar({ active, onChange }) {
  return (
    <div className="tab-bar">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        const isSOS = tab.id === 'sos';

        return (
          <button
            key={tab.id}
            className={`tab-item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {isSOS ? (
              <motion.div
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: isActive
                    ? '#FF4D4F'
                    : 'linear-gradient(135deg, rgba(255,77,79,0.15), rgba(255,77,79,0.08))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 6px 18px rgba(255,77,79,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <Icon size={20} color={isActive ? 'white' : '#FF4D4F'} />
              </motion.div>
            ) : (
              <motion.div
                className="tab-icon"
                animate={isActive ? { y: -1 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isActive ? (
                  <motion.div
                    style={{
                      width: 44, height: 32, borderRadius: 10,
                      background: 'rgba(247,140,6,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Icon size={20} color="#F78C06" />
                  </motion.div>
                ) : (
                  <Icon size={20} />
                )}
              </motion.div>
            )}
            <span className="tab-label" style={{ fontSize: 9 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
