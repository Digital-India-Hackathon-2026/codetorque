import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function CustomerRegisterScreen({ onBack, onDone }) {
  const { registerCustomer } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await registerCustomer(formData.email, formData.password, formData.fullName, formData.phone);
      setSuccess(true);
      setTimeout(() => {
        onDone();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
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
            maxWidth: 400, width: '100%'
          }}
        >
          <div style={{
            width: 80, height: 80, borderRadius: 40, background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle size={40} color="#10B981" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 12 }}>
            Registration Successful!
          </h2>
          <p style={{ fontSize: 15, color: '#7B7B7B', lineHeight: 1.6 }}>
            Welcome to MotoMate. Setting up your garage...
          </p>
        </motion.div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '16px 16px 16px 48px', background: '#F5F5F5',
    border: '1px solid rgba(0,0,0,0.05)', borderRadius: 12,
    fontSize: 15, fontFamily: 'Inter', color: '#1A1A1A',
    outline: 'none', transition: 'all 0.2s ease'
  };

  const iconStyle = {
    position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
    color: '#9CA3AF'
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#FAFAFA', padding: '40px 24px',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        <button 
          onClick={onBack}
          style={{
            background: 'white', border: '1px solid rgba(0,0,0,0.05)',
            width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          <ArrowLeft size={20} color="#1A1A1A" />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 400, margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>
            Create Account
          </h1>
          <p style={{ fontSize: 15, color: '#7B7B7B', marginBottom: 32 }}>
            Join MotoMate to manage your vehicles and book premium services.
          </p>

          {error && (
            <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: 12, borderRadius: 12, fontSize: 14, marginBottom: 24, fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            <div style={{ position: 'relative' }}>
              <User size={20} style={iconStyle} />
              <input 
                type="text" name="fullName" placeholder="Full Name" 
                value={formData.fullName} onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail size={20} style={iconStyle} />
              <input 
                type="email" name="email" placeholder="Email Address" 
                value={formData.email} onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Phone size={20} style={iconStyle} />
              <input 
                type="tel" name="phone" placeholder="Mobile Number" 
                value={formData.phone} onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={20} style={iconStyle} />
              <input 
                type="password" name="password" placeholder="Password" 
                value={formData.password} onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={20} style={iconStyle} />
              <input 
                type="password" name="confirmPassword" placeholder="Confirm Password" 
                value={formData.confirmPassword} onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: 16, background: '#1A1A1A',
                border: 'none', borderRadius: 12, color: 'white',
                fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                marginTop: 8, opacity: loading ? 0.7 : 1,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}
            >
              {loading ? 'Creating Account...' : 'Register'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
