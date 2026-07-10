import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const typeConfig = {
  booking: { icon: '✅', color: '#22C55E', label: 'Booking Update' },
  reminder: { icon: '⏰', color: '#F78C06', label: 'Reminder' },
  offer: { icon: '🎁', color: '#8B5CF6', label: 'Offer' },
  assigned: { icon: '👨‍🔧', color: '#3B82F6', label: 'Mechanic' },
  insurance: { icon: '🛡️', color: '#EF4444', label: 'Insurance' },
};

export default function NotificationsScreen({ onBack }) {
  const { notifications, setNotifications } = useApp();

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="page page-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        padding: '56px 24px 20px', position: 'sticky', top: 0,
        background: 'rgba(250,250,250,0.95)', backdropFilter: 'blur(12px)', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button className="back-btn" onClick={onBack}>
              <ArrowLeft size={18} color="#4A4A48" />
            </button>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#4A4A48' }}>Notifications</h2>
          </div>
          <button
            onClick={markAllRead}
            style={{
              background: 'none', border: 'none', fontFamily: 'Inter',
              fontSize: 13, fontWeight: 600, color: '#F78C06', cursor: 'pointer',
            }}
          >
            Mark all read
          </button>
        </div>
      </div>

      <div style={{ padding: '8px 24px 90px' }}>
        {notifications.map((notif, i) => {
          const config = typeConfig[notif.type] || typeConfig.booking;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
              style={{
                display: 'flex', gap: 14, padding: '18px 16px',
                background: notif.read ? 'white' : 'rgba(247,140,6,0.04)',
                borderRadius: 20, marginBottom: 10,
                border: notif.read ? '1px solid rgba(74,74,72,0.06)' : '1.5px solid rgba(247,140,6,0.15)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: `${config.color}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                position: 'relative',
              }}>
                {config.icon}
                {!notif.read && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    width: 10, height: 10, borderRadius: 5,
                    background: '#FF4D4F', border: '2px solid white',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: notif.read ? 600 : 800, color: '#4A4A48' }}>{notif.title}</div>
                  <div style={{ fontSize: 10, color: '#7B7B7B', whiteSpace: 'nowrap', flexShrink: 0 }}>{notif.time}</div>
                </div>
                <div style={{ fontSize: 12, color: '#7B7B7B', lineHeight: 1.5 }}>{notif.message}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8,
                  padding: '3px 10px', borderRadius: 100, background: `${config.color}12`,
                  fontSize: 10, fontWeight: 700, color: config.color,
                }}>
                  {config.label}
                </div>
              </div>
            </motion.div>
          );
        })}

        {notifications.every(n => n.read) && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#4A4A48', marginBottom: 8 }}>All caught up!</div>
            <div className="subtitle">You've read all your notifications</div>
          </div>
        )}
      </div>
    </div>
  );
}
