import { motion } from 'framer-motion';
import { User, Briefcase, Shield, ChevronRight } from 'lucide-react';

const roles = [
  {
    id: 'customer',
    title: 'Customer',
    desc: 'Book services & manage vehicles',
    icon: User,
    gradient: 'linear-gradient(135deg, #F78C06, #FFD21F)',
    shadow: 'rgba(247, 140, 6, 0.2)'
  },
  {
    id: 'partner',
    title: 'Partner',
    desc: 'Grow your automotive business',
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    shadow: 'rgba(59, 130, 246, 0.2)'
  },
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Manage platform operations',
    icon: Shield,
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    shadow: 'rgba(16, 185, 129, 0.2)'
  }
];

export default function RoleSelectionScreen({ onSelect }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 24px'
    }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginTop: 40, marginBottom: 48 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', background: '#1A1A1A',
          padding: '8px 20px', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          marginBottom: 24
        }}>
          <img src="/logo.png" alt="MotoMate" style={{ height: 28, objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: 8 }}>
          Choose Your Role
        </h1>
        <p style={{ fontSize: 16, color: '#7B7B7B', fontWeight: 500 }}>
          How would you like to use MotoMate?
        </p>
      </motion.div>

      {/* Role Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.02, y: -4, boxShadow: `0 16px 32px ${role.shadow}` }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(role.id)}
            style={{
              background: 'white',
              borderRadius: 24,
              padding: 24,
              border: '1px solid rgba(0,0,0,0.03)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Accent */}
            <div style={{
              position: 'absolute',
              right: -40,
              top: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: role.gradient,
              opacity: 0.1,
              filter: 'blur(20px)'
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 10 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: role.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 20px ${role.shadow}`
              }}>
                <role.icon size={32} color="white" />
              </div>
              
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>{role.title}</h3>
                <p style={{ fontSize: 14, color: '#7B7B7B', fontWeight: 500 }}>{role.desc}</p>
              </div>
            </div>

            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: '#F5F5F5',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ChevronRight size={20} color="#1A1A1A" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
