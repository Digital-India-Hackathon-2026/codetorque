import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function PhoneLoginView({ onBack }) {
  const { mockLogin } = useAuth();
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpSent(true); }, 1200);
  };

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); mockLogin(); }, 1200);
  };

  const handleOtpChange = (val, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 3) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ padding: '0 0 40px' }}
    >
      <button className="back-btn" onClick={onBack} style={{ marginBottom: 32 }}>
        <ArrowLeft size={18} color="#4A4A48" />
      </button>

      <AnimatePresence mode="wait">
        {!otpSent ? (
          <motion.div key="phone" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <p className="label" style={{ marginBottom: 8 }}>MOBILE NUMBER</p>
            <h2 className="title-lg" style={{ marginBottom: 8 }}>Enter your phone<br />number</h2>
            <p className="subtitle" style={{ marginBottom: 32 }}>We'll send you a verification code</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <div style={{
                padding: '16px 16px', background: 'white', border: '1.5px solid rgba(74,74,72,0.1)',
                borderRadius: 16, display: 'flex', alignItems: 'center', gap: 8,
                fontWeight: 600, fontSize: 15, color: '#4A4A48', whiteSpace: 'nowrap',
              }}>
                🇮🇳 +91
              </div>
              <input
                className="input-field"
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
              />
            </div>

            <button
              className="btn-gradient"
              onClick={sendOtp}
              disabled={phone.length < 10}
              style={{ opacity: phone.length < 10 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {loading ? <div className="spinner" /> : <>Send OTP <ChevronRight size={18} /></>}
            </button>
          </motion.div>
        ) : (
          <motion.div key="otp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <p className="label" style={{ marginBottom: 8 }}>VERIFICATION</p>
            <h2 className="title-lg" style={{ marginBottom: 8 }}>Enter OTP</h2>
            <p className="subtitle" style={{ marginBottom: 32 }}>Code sent to +91 {phone}</p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 32, justifyContent: 'center' }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className="otp-input"
                  type="tel"
                  value={digit}
                  onChange={e => handleOtpChange(e.target.value, i)}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !digit && i > 0) {
                      document.getElementById(`otp-${i - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button className="btn-gradient" onClick={verifyOtp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <div className="spinner" /> : <>Verify & Continue <ChevronRight size={18} /></>}
            </button>

            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#7B7B7B' }}>
              Didn't receive? <span style={{ color: '#F78C06', fontWeight: 600, cursor: 'pointer' }}>Resend</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LoginScreen() {
  const [view, setView] = useState('main');
  const { loginWithGoogle, loading, mockLogin } = useAuth();

  return (
    <div className="page page-enter" style={{ padding: '60px 24px 40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ flex: 1 }}>
        {view === 'main' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <div style={{ marginBottom: 48 }}>
              <div style={{
                height: 64,
                borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 12px 32px rgba(0,0,0,0.1)', marginBottom: 24,
                overflow: 'hidden',
                background: '#2C2C2C', // For dark background blending
                padding: '8px 16px',
                display: 'inline-flex'
              }}>
                <img 
                  src="/logo.png" 
                  alt="MotoMate Logo" 
                  style={{ height: '100%', objectFit: 'contain' }} 
                />
              </div>

              <h1 className="title-xl" style={{ marginBottom: 8 }}>Welcome back!</h1>
              <p className="subtitle">Sign in to access your personalized automotive experience</p>
            </div>

            {/* Login options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Google */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={loginWithGoogle}
                disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  padding: '16px', background: 'white',
                  border: '1.5px solid rgba(74,74,72,0.1)', borderRadius: 16,
                  fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#4A4A48',
                  cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                   <span style={{ color: '#7B7B7B', fontSize: 15, fontWeight: 600 }}>Connecting...</span>
                ) : (
                  <>
                    <GoogleIcon />
                    Continue with Google
                  </>
                )}
              </motion.button>

              {/* Phone */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setView('phone')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  padding: '16px', background: 'white',
                  border: '1.5px solid rgba(74,74,72,0.1)', borderRadius: 16,
                  fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#4A4A48',
                  cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <Phone size={20} color="#4A4A48" />
                Continue with Phone
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
                <div className="divider" style={{ margin: 0 }} />
                <span style={{ color: '#7B7B7B', fontSize: 12, whiteSpace: 'nowrap' }}>or</span>
                <div className="divider" style={{ margin: 0 }} />
              </div>

              {/* Email */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={mockLogin}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  padding: '16px', background: 'white',
                  border: '1.5px solid rgba(74,74,72,0.1)', borderRadius: 16,
                  fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#4A4A48',
                  cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <Mail size={20} color="#4A4A48" />
                Continue with Email
              </motion.button>

              <button className="btn-gradient" onClick={mockLogin} style={{ marginTop: 8 }}>
                LOGIN
              </button>
              <button 
                onClick={mockLogin} 
                style={{ 
                  marginTop: 8, 
                  padding: '16px', 
                  background: 'white', 
                  border: '1.5px solid #F78C06', 
                  borderRadius: 16, 
                  fontFamily: 'Inter', 
                  fontSize: 16, 
                  fontWeight: 700, 
                  color: '#F78C06', 
                  cursor: 'pointer' 
                }}
              >
                REGISTER
              </button>
            </div>

            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#7B7B7B', lineHeight: 1.6 }}>
              By continuing, you agree to our{' '}
              <span style={{ color: '#F78C06', fontWeight: 600 }}>Terms of Service</span> and{' '}
              <span style={{ color: '#F78C06', fontWeight: 600 }}>Privacy Policy</span>
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {view === 'phone' && (
            <PhoneLoginView onBack={() => setView('main')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
