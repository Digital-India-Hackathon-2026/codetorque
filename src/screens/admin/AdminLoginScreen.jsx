import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft, Mail, Lock } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function AdminLoginScreen({ onDone, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 24px'
    }}>
      <button 
        onClick={onBack}
        style={{
          background: 'white', border: '1px solid rgba(0,0,0,0.05)',
          width: 40, height: 40, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', marginBottom: 24,
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}
      >
        <ChevronLeft size={20} color="#1A1A1A" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white', borderRadius: 24, padding: 32,
          boxShadow: '0 12px 32px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'linear-gradient(135deg, #10B981, #34D399)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
          }}>
            <Shield size={32} color="white" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>
            Admin Login
          </h1>
          <p style={{ fontSize: 14, color: '#7B7B7B', fontWeight: 500, lineHeight: 1.5 }}>
            Restricted access. Only authorized personnel.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, left: 16 }}>
              <Mail size={20} color="#7B7B7B" />
            </div>
            <input 
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '16px 16px 16px 48px',
                background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 16, fontSize: 15, fontFamily: 'Inter',
                color: '#1A1A1A', outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, left: 16 }}>
              <Lock size={20} color="#7B7B7B" />
            </div>
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '16px 16px 16px 48px',
                background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 16, fontSize: 15, fontFamily: 'Inter',
                color: '#1A1A1A', outline: 'none'
              }}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onDone}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px', background: 'linear-gradient(135deg, #10B981, #34D399)',
              border: 'none', borderRadius: 16,
              fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: 'white',
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
              marginTop: 8
            }}
          >
            Login to Dashboard
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.05)' }} />
            <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.05)' }} />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onDone}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '16px', background: 'white',
              border: '1.5px solid rgba(74,74,72,0.1)', borderRadius: 16,
              fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#4A4A48',
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <GoogleIcon />
            Admin SSO Login
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
