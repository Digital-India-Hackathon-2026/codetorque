import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Upload, MapPin, CheckCircle } from 'lucide-react';

export default function PartnerRegisterScreen({ onBack }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    mobile: '',
    email: '',
    address: '',
    gst: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
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
            width: 80, height: 80, borderRadius: 40, background: 'rgba(59,130,246,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle size={40} color="#3B82F6" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 12 }}>
            Registration Submitted!
          </h2>
          <p style={{ fontSize: 15, color: '#7B7B7B', lineHeight: 1.6, marginBottom: 32 }}>
            Your partner account is currently <strong style={{ color: '#F59E0B' }}>Pending Verification</strong>. 
            Our team will review your application and get back to you shortly.
          </p>
          <button 
            onClick={onBack}
            style={{
              width: '100%', padding: 16, background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
              border: 'none', borderRadius: 16, color: 'white', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 8px 20px rgba(59,130,246,0.3)'
            }}
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '16px', background: '#F5F5F5',
    border: '1px solid rgba(0,0,0,0.05)', borderRadius: 12,
    fontSize: 15, fontFamily: 'Inter', color: '#1A1A1A',
    marginBottom: 16, outline: 'none'
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#FAFAFA', padding: '40px 24px', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button 
          onClick={onBack}
          style={{
            background: 'white', border: '1px solid rgba(0,0,0,0.05)',
            width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          <ChevronLeft size={20} color="#1A1A1A" />
        </button>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A' }}>Register Business</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white', borderRadius: 24, padding: 24,
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)'
        }}
      >
        <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#7B7B7B', marginBottom: 12, textTransform: 'uppercase' }}>
            Basic Details
          </h3>
          <input required style={inputStyle} placeholder="Business Name" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
          <input required style={inputStyle} placeholder="Owner Name" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
          
          <div style={{ display: 'flex', gap: 12 }}>
            <input required style={{...inputStyle, flex: 1}} placeholder="Mobile Number" type="tel" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
            <input required style={{...inputStyle, flex: 1}} placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#7B7B7B', margin: '24px 0 12px', textTransform: 'uppercase' }}>
            Location & Services
          </h3>
          <div style={{ position: 'relative' }}>
            <input required style={{...inputStyle, paddingRight: 140}} placeholder="Shop Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            <button 
              type="button"
              style={{ 
                position: 'absolute', right: 8, top: 8, 
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#E0E7FF', border: 'none', borderRadius: 8, padding: '8px 12px',
                color: '#3B82F6', fontSize: 12, fontWeight: 700, cursor: 'pointer'
              }}
            >
              <MapPin size={14} /> GPS
            </button>
          </div>
          <input required style={inputStyle} placeholder="Services Offered (e.g. Car Wash, Mechanic)" />
          <input required style={inputStyle} placeholder="Working Hours (e.g. 9 AM - 8 PM)" />

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#7B7B7B', margin: '24px 0 12px', textTransform: 'uppercase' }}>
            Documents (Optional)
          </h3>
          <input style={inputStyle} placeholder="GST Number" value={formData.gst} onChange={e => setFormData({...formData, gst: e.target.value})} />
          
          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <div style={{
              flex: 1, border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 12,
              padding: 16, textAlign: 'center', cursor: 'pointer', background: '#FAFAFA'
            }}>
              <Upload size={20} color="#7B7B7B" style={{ marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600 }}>Shop Images</div>
            </div>
            <div style={{
              flex: 1, border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 12,
              padding: 16, textAlign: 'center', cursor: 'pointer', background: '#FAFAFA'
            }}>
              <Upload size={20} color="#7B7B7B" style={{ marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600 }}>Profile Image</div>
            </div>
            <div style={{
              flex: 1, border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 12,
              padding: 16, textAlign: 'center', cursor: 'pointer', background: '#FAFAFA'
            }}>
              <Upload size={20} color="#7B7B7B" style={{ marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600 }}>Govt ID</div>
            </div>
          </div>

          <button 
            type="submit"
            style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
              border: 'none', borderRadius: 16,
              color: 'white', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(59,130,246,0.3)'
            }}
          >
            Submit Registration
          </button>
        </form>
      </motion.div>
    </div>
  );
}
