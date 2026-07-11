import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function PartnerRejectedScreen({ onLogout }) {
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
          width: 80, height: 80, borderRadius: 40, background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <AlertCircle size={40} color="#EF4444" />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 12 }}>
          Application Rejected
        </h2>
        <p style={{ fontSize: 15, color: '#7B7B7B', lineHeight: 1.6, marginBottom: 32 }}>
          Unfortunately, your application to become a MotoMate partner was not approved. Please contact support for more details.
        </p>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%', padding: 16, background: '#1A1A1A',
            border: 'none', borderRadius: 16, color: 'white', fontSize: 16, fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}
