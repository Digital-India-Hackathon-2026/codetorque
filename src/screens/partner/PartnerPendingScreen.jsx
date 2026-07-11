import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function PartnerPendingScreen({ onLogout }) {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    if (onLogout) onLogout();
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#FAFAFA',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24
    }}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          background: 'white', padding: 40, borderRadius: 24,
          boxShadow: '0 12px 32px rgba(0,0,0,0.04)', textAlign: 'center',
          maxWidth: 400
        }}
      >
        <div style={{
          width: 80, height: 80, borderRadius: 40, background: 'rgba(245, 158, 11, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <AlertCircle size={40} color="#F59E0B" />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 12 }}>
          Application Under Review
        </h2>
        <p style={{ fontSize: 15, color: '#7B7B7B', lineHeight: 1.6, marginBottom: 32 }}>
          Your partner application is currently being reviewed by the MotoMate team. You will be able to access your dashboard once approved.
        </p>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%', padding: 16, background: '#FEE2E2',
            border: 'none', borderRadius: 16, color: '#B91C1C', fontSize: 16, fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}
