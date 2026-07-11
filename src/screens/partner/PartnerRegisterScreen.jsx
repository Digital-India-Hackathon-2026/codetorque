import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function PartnerRegisterScreen({ onBack, onDone }) {
  const { registerPartner } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    businessType: 'Car Wash',
    phone: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    workingDays: 'Mon-Sun',
    workingHours: '09:00 AM - 08:00 PM',
    yearsExperience: '',
    servicesOffered: [],
    doorstepService: false,
    emergencyService: false,
    gst: '',
    declaration: false
  });

  const availableServices = [
    'Car Wash', 'Bike Wash', 'Mechanic', 'Battery Assistance', 
    'Tyre Repair', 'Towing', 'General Service', 'Ceramic Coating'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleService = (service) => {
    setFormData(prev => {
      if (prev.servicesOffered.includes(service)) {
        return { ...prev, servicesOffered: prev.servicesOffered.filter(s => s !== service) };
      }
      return { ...prev, servicesOffered: [...prev.servicesOffered, service] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.businessName || !formData.ownerName || !formData.phone || !formData.email || !formData.password || !formData.address) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!formData.declaration) {
      setError('You must agree to the declaration.');
      return;
    }

    setLoading(true);
    try {
      await registerPartner(formData.email, formData.password, formData);
      setSuccess(true);
      // We don't auto-login or go to dashboard because status is pending
      // User must go back and wait for admin approval
    } catch (err) {
      console.error(err);
      setError(err.message || 'Application submission failed.');
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
            Application Submitted Successfully
          </h2>
          <p style={{ fontSize: 15, color: '#7B7B7B', lineHeight: 1.6, marginBottom: 32 }}>
            Thank you for applying to become a MotoMate Partner.<br/>
            Our team will review your application. You will be notified once your account is approved.
          </p>
          <button 
            onClick={onBack}
            style={{
              width: '100%', padding: 16, background: '#1A1A1A',
              border: 'none', borderRadius: 16, color: 'white', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
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
  
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 700, color: '#7B7B7B', marginBottom: 8, textTransform: 'uppercase' };

  return (
    <div style={{
      minHeight: '100vh', background: '#FAFAFA', padding: '40px 24px', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
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
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A' }}>Business Onboarding</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white', borderRadius: 24, padding: 32,
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)',
          maxWidth: 600, margin: '0 auto'
        }}
      >
        {error && (
          <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: 12, borderRadius: 12, fontSize: 14, marginBottom: 24, fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <label style={labelStyle}>Business Information</label>
          <input type="text" name="businessName" placeholder="Business Name *" value={formData.businessName} onChange={handleChange} style={inputStyle} required />
          <input type="text" name="ownerName" placeholder="Owner Name *" value={formData.ownerName} onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email" placeholder="Business Email *" value={formData.email} onChange={handleChange} style={inputStyle} required />
          <input type="password" name="password" placeholder="Account Password *" value={formData.password} onChange={handleChange} style={inputStyle} required />
          <input type="tel" name="phone" placeholder="Mobile Number *" value={formData.phone} onChange={handleChange} style={inputStyle} required />
          
          <label style={{...labelStyle, marginTop: 16}}>Location Details</label>
          <textarea name="address" placeholder="Shop Address *" value={formData.address} onChange={handleChange} style={{...inputStyle, height: 100, resize: 'none'}} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleChange} style={inputStyle} required />
            <input type="text" name="pincode" placeholder="Pincode *" value={formData.pincode} onChange={handleChange} style={inputStyle} required />
          </div>
          <input type="text" name="state" placeholder="State *" value={formData.state} onChange={handleChange} style={inputStyle} required />

          <label style={{...labelStyle, marginTop: 16}}>Operational Details</label>
          <select name="businessType" value={formData.businessType} onChange={handleChange} style={inputStyle}>
            <option value="Car Wash">Car Wash</option>
            <option value="Bike Wash">Bike Wash</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Tyre Shop">Tyre Shop</option>
            <option value="Battery Shop">Battery Shop</option>
            <option value="Multi-Service Garage">Multi-Service Garage</option>
          </select>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <input type="text" name="workingDays" placeholder="Working Days" value={formData.workingDays} onChange={handleChange} style={inputStyle} />
            <input type="text" name="workingHours" placeholder="Working Hours" value={formData.workingHours} onChange={handleChange} style={inputStyle} />
          </div>
          <input type="number" name="yearsExperience" placeholder="Years of Experience" value={formData.yearsExperience} onChange={handleChange} style={inputStyle} />
          <input type="text" name="gst" placeholder="GST Number (Optional)" value={formData.gst} onChange={handleChange} style={inputStyle} />

          <label style={{...labelStyle, marginTop: 16}}>Services Offered</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {availableServices.map(service => (
              <div 
                key={service} 
                onClick={() => toggleService(service)}
                style={{ 
                  padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  background: formData.servicesOffered.includes(service) ? '#1A1A1A' : '#F5F5F5',
                  color: formData.servicesOffered.includes(service) ? 'white' : '#7B7B7B',
                  border: formData.servicesOffered.includes(service) ? '1px solid #1A1A1A' : '1px solid rgba(0,0,0,0.05)'
                }}
              >
                {service}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, cursor: 'pointer' }}>
              <input type="checkbox" name="doorstepService" checked={formData.doorstepService} onChange={handleChange} style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>Offer Doorstep Service</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input type="checkbox" name="emergencyService" checked={formData.emergencyService} onChange={handleChange} style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>Provide 24/7 Emergency Assistance</span>
            </label>
          </div>

          <label style={{...labelStyle, marginTop: 16}}>Documents (Storage Buckets Pending)</label>
          <div style={{ padding: 16, border: '1px dashed rgba(0,0,0,0.2)', borderRadius: 12, textAlign: 'center', marginBottom: 16, cursor: 'not-allowed', opacity: 0.5 }}>
            <Upload size={24} color="#7B7B7B" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Upload Business Logo</div>
            <div style={{ fontSize: 12, color: '#7B7B7B' }}>Not available in this demo</div>
          </div>
          <div style={{ padding: 16, border: '1px dashed rgba(0,0,0,0.2)', borderRadius: 12, textAlign: 'center', marginBottom: 24, cursor: 'not-allowed', opacity: 0.5 }}>
            <Upload size={24} color="#7B7B7B" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Upload Shop Photos</div>
            <div style={{ fontSize: 12, color: '#7B7B7B' }}>Not available in this demo</div>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginBottom: 32, padding: 16, background: '#F9FAFB', borderRadius: 12 }}>
            <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} style={{ width: 18, height: 18, marginTop: 2 }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#4B5563', lineHeight: 1.5 }}>
              I confirm that all information provided is correct. I agree to MotoMate's Partner Terms and Conditions.
            </span>
          </label>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: 16, background: '#3B82F6',
              border: 'none', borderRadius: 12, color: 'white',
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 8px 20px rgba(59,130,246,0.3)'
            }}
          >
            {loading ? 'Submitting Application...' : 'Submit Application'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
