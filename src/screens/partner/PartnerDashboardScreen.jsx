import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Calendar, Wrench, User, ChevronRight, Briefcase, 
  MapPin, Phone, MessageCircle, Navigation, Clock, Activity,
  CheckCircle, TrendingUp, BarChart2, DollarSign, Users, Store, Edit2, AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// --- MOCK DATA ---
const initialBookings = [
  { 
    id: 'BK001', customer: 'Rahul K', phone: '+91 9876543210', 
    vehicleImg: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?w=800&q=80', 
    brand: 'Maruti Suzuki', model: 'Swift', regNo: 'MH 02 AB 1234',
    service: 'Premium Foam Wash', date: 'Today', time: '10:30 AM', 
    address: 'A-402, Lodha Bellissimo, Mahalakshmi, Mumbai', 
    price: 499, payment: 'Paid', status: 'Pending'
  },
  { 
    id: 'BK002', customer: 'Sneha M', phone: '+91 8765432109', 
    vehicleImg: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80', 
    brand: 'Hyundai', model: 'Creta', regNo: 'MH 04 XY 9876',
    service: 'Ceramic Coating', date: 'Today', time: '02:00 PM', 
    address: 'Hiranandani Gardens, Powai, Mumbai', 
    price: 4500, payment: 'Pending', status: 'Accepted'
  },
];

const initialServices = [
  { id: 's1', name: 'Car Wash', price: 399, duration: '45 mins', active: true },
  { id: 's2', name: 'Bike Wash', price: 199, duration: '30 mins', active: true },
  { id: 's3', name: 'Premium Wash', price: 599, duration: '60 mins', active: false },
  { id: 's4', name: 'Foam Wash', price: 499, duration: '45 mins', active: true },
  { id: 's5', name: 'Ceramic Coating', price: 4500, duration: '4 hrs', active: true },
  { id: 's6', name: 'Interior Cleaning', price: 899, duration: '90 mins', active: false },
  { id: 's7', name: 'Mechanic', price: 500, duration: 'Varies', active: false },
  { id: 's8', name: 'General Service', price: 2499, duration: '3 hrs', active: false },
  { id: 's9', name: 'Battery Assistance', price: 300, duration: '30 mins', active: true },
  { id: 's10', name: 'Tyre Repair', price: 150, duration: '20 mins', active: true },
  { id: 's11', name: 'Towing', price: 1500, duration: 'Varies', active: false },
];

const chartData = [40, 60, 45, 80, 55, 90, 75]; // Mon-Sun

// --- COMPONENTS ---

function PartnerDashboardTab({ bookings }) {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A' }}>Dashboard</h1>
          <p style={{ fontSize: 14, color: '#7B7B7B' }}>Welcome back, MotoMate Assured</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Store size={22} color="#3B82F6" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <div style={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', borderRadius: 24, padding: 20, color: 'white', boxShadow: '0 12px 24px rgba(59,130,246,0.25)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Today's Earnings</div>
          <div style={{ fontSize: 28, fontWeight: 900, marginTop: 4 }}>₹4,250</div>
        </div>
        <div style={{ background: 'white', borderRadius: 24, padding: 20, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7B7B7B' }}>Monthly Earnings</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginTop: 4 }}>₹82,400</div>
        </div>
        <div style={{ background: 'white', borderRadius: 24, padding: 20, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7B7B7B' }}>Active / Pending</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#F59E0B', marginTop: 4 }}>4 / 2</div>
        </div>
        <div style={{ background: 'white', borderRadius: 24, padding: 20, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7B7B7B' }}>Average Rating</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#10B981', marginTop: 4 }}>4.9★</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800 }}>Today's Bookings</h2>
        <span style={{ fontSize: 13, color: '#3B82F6', fontWeight: 600 }}>View All</span>
      </div>
      
      {bookings.map(b => (
        <div key={b.id} style={{ background: 'white', borderRadius: 20, padding: 16, marginBottom: 16, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F3F4F6', backgroundImage: `url(${b.vehicleImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div>
                <span style={{ fontSize: 15, fontWeight: 800, display: 'block', color: '#1A1A1A' }}>{b.customer}</span>
                <span style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 500 }}>{b.brand} {b.model}</span>
              </div>
            </div>
            <span style={{ fontSize: 12, color: b.status === 'Pending' ? '#F59E0B' : '#3B82F6', fontWeight: 700, background: b.status === 'Pending' ? '#FEF3C7' : '#EFF6FF', padding: '4px 10px', borderRadius: 12, height: 'fit-content' }}>
              {b.status}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px dashed rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 600 }}>{b.service}</div>
            <div style={{ fontSize: 14, color: '#7B7B7B', fontWeight: 600 }}>{b.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PartnerBookingsTab({ bookings, updateStatus }) {
  const nextStatusMap = {
    'Pending': 'Accepted',
    'Accepted': 'Partner On The Way',
    'Partner On The Way': 'Service Started',
    'Service Started': 'Service Completed',
    'Service Completed': 'Awaiting Customer Review'
  };

  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, color: '#1A1A1A' }}>Live Bookings</h1>
      
      {bookings.map(b => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          key={b.id} 
          style={{ background: 'white', borderRadius: 24, padding: 20, marginBottom: 20, boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: '#F3F4F6', backgroundImage: `url(${b.vehicleImg})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(0,0,0,0.05)' }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A' }}>{b.customer}</div>
                <div style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 500, marginTop: 2 }}>{b.phone}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#10B981' }}>₹{b.price}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: b.payment === 'Paid' ? '#10B981' : '#F59E0B', textTransform: 'uppercase', marginTop: 4 }}>{b.payment}</div>
            </div>
          </div>

          {/* Vehicle & Service Info */}
          <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 600 }}>Vehicle</span>
              <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700 }}>{b.brand} {b.model} • {b.regNo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 600 }}>Service</span>
              <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700 }}>{b.service}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 600 }}>Time</span>
              <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700 }}>{b.date}, {b.time}</span>
            </div>
          </div>

          {/* Address & Navigation */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={16} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500, lineHeight: 1.4 }}>{b.address}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button style={{ flex: 1, padding: '12px 0', background: '#F3F4F6', border: 'none', borderRadius: 12, color: '#1A1A1A', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Phone size={16} /> Call
            </button>
            <button style={{ flex: 1, padding: '12px 0', background: '#F3F4F6', border: 'none', borderRadius: 12, color: '#1A1A1A', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <MessageCircle size={16} /> Chat
            </button>
            <button style={{ flex: 1, padding: '12px 0', background: '#E0E7FF', border: 'none', borderRadius: 12, color: '#3B82F6', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Navigation size={16} /> Map
            </button>
          </div>

          {/* Status Update */}
          <div style={{ borderTop: '1px dashed rgba(0,0,0,0.1)', paddingTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7B7B7B', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>
              Current Status: <span style={{ color: '#1A1A1A' }}>{b.status}</span>
            </div>
            
            {b.status === 'Pending' ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  onClick={() => updateStatus(b.id, 'Accepted')}
                  style={{ flex: 1, padding: 14, background: '#10B981', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}
                >
                  Accept Booking
                </button>
                <button style={{ flex: 1, padding: 14, background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15 }}>
                  Reject
                </button>
              </div>
            ) : b.status !== 'Awaiting Customer Review' ? (
              <button 
                onClick={() => updateStatus(b.id, nextStatusMap[b.status])}
                style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, boxShadow: '0 8px 20px rgba(59,130,246,0.3)' }}
              >
                Mark as: {nextStatusMap[b.status]}
              </button>
            ) : (
              <div style={{ textAlign: 'center', padding: 12, background: '#F3F4F6', borderRadius: 12, color: '#7B7B7B', fontWeight: 600, fontSize: 14 }}>
                Completed & Awaiting Review
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PartnerServicesTab({ services, setServices }) {
  const toggleService = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, color: '#1A1A1A' }}>Service Catalog</h1>
      
      {services.map((s) => (
        <div key={s.id} style={{ background: 'white', borderRadius: 20, padding: 20, marginBottom: 16, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A' }}>{s.name}</div>
              <div style={{ fontSize: 13, color: s.active ? '#10B981' : '#7B7B7B', fontWeight: 600 }}>
                {s.active ? 'Available' : 'Disabled'}
              </div>
            </div>
            
            {/* Custom Toggle Switch */}
            <div 
              onClick={() => toggleService(s.id)}
              style={{ 
                width: 52, height: 28, background: s.active ? '#10B981' : '#E5E7EB', 
                borderRadius: 14, position: 'relative', cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            >
              <motion.div 
                animate={{ x: s.active ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ width: 24, height: 24, background: 'white', borderRadius: '50%', position: 'absolute', top: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: '#F9FAFB', padding: '8px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600, marginBottom: 4 }}>Price (₹)</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Edit2 size={12} color="#9CA3AF" style={{ marginRight: 6 }} />
                <input type="number" defaultValue={s.price} style={{ background: 'none', border: 'none', outline: 'none', fontSize: 15, fontWeight: 700, color: '#1A1A1A', width: '100%' }} />
              </div>
            </div>
            <div style={{ flex: 1, background: '#F9FAFB', padding: '8px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600, marginBottom: 4 }}>Duration</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Edit2 size={12} color="#9CA3AF" style={{ marginRight: 6 }} />
                <input type="text" defaultValue={s.duration} style={{ background: 'none', border: 'none', outline: 'none', fontSize: 15, fontWeight: 700, color: '#1A1A1A', width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PartnerAnalyticsTab() {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, color: '#1A1A1A' }}>Analytics</h1>
      
      {/* Revenue Chart Mock */}
      <div style={{ background: 'white', borderRadius: 24, padding: 24, marginBottom: 24, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>Weekly Revenue</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          {chartData.map((val, i) => (
            <div key={i} style={{ width: '10%', height: `${val}%`, background: 'linear-gradient(to top, #3B82F6, #60A5FA)', borderRadius: '6px 6px 0 0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: '#7B7B7B' }}>{val}k</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, padding: '0 4px' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF' }}>{day}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Activity size={16} color="#3B82F6" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>142</div>
          <div style={{ fontSize: 12, color: '#7B7B7B', fontWeight: 600 }}>Total Jobs (Month)</div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Clock size={16} color="#F59E0B" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>2-4 PM</div>
          <div style={{ fontSize: 12, color: '#7B7B7B', fontWeight: 600 }}>Peak Hours</div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Most Booked Services</h2>
      {[
        { name: 'Premium Foam Wash', count: 45 },
        { name: 'Ceramic Coating', count: 28 },
        { name: 'Interior Cleaning', count: 22 }
      ].map((s, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'white', borderRadius: 16, marginBottom: 12, border: '1px solid rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#3B82F6' }}>#{i+1}</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800 }}>{s.count} <span style={{ fontSize: 12, color: '#7B7B7B', fontWeight: 500 }}>bookings</span></span>
        </div>
      ))}
    </div>
  );
}

function PartnerProfileTab({ onLogout }) {
  const [activeSection, setActiveSection] = useState('profile'); // profile | customers

  if (activeSection === 'customers') {
    return (
      <div style={{ padding: '24px 24px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <button onClick={() => setActiveSection('profile')} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 900 }}>My Customers</h1>
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Customer Name {i}</div>
              <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>★ 5.0 Rating Given</div>
            </div>
            <div style={{ fontSize: 13, color: '#7B7B7B', marginBottom: 4 }}>+91 987654321{i}</div>
            <div style={{ fontSize: 13, color: '#7B7B7B' }}>Total Bookings: {i * 2 + 1}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, color: '#1A1A1A' }}>Profile</h1>
      
      <div style={{ background: 'white', borderRadius: 24, padding: 24, marginBottom: 24, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, #1A1A1A, #4A4A48)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Store size={32} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A' }}>MotoMate Assured</div>
          <div style={{ fontSize: 14, color: '#7B7B7B', fontWeight: 500, marginTop: 4 }}>Andheri East, Mumbai</div>
          <div style={{ fontSize: 12, color: '#3B82F6', fontWeight: 700, marginTop: 8, background: '#E0E7FF', display: 'inline-block', padding: '4px 10px', borderRadius: 8 }}>Edit Details</div>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        {[
          { label: 'Store Status', value: 'Online', color: '#10B981' },
          { label: 'Working Hours', value: '9 AM - 8 PM' },
          { label: 'Bank Details', value: 'HDFC ****1234' },
          { label: 'UPI ID', value: 'motomate@hdfc' },
          { label: 'Shop Images', value: '3 uploaded' }
        ].map((item, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: item.color || '#7B7B7B' }}>{item.value}</span>
              <ChevronRight size={18} color="#D1D5DB" />
            </div>
          </div>
        ))}
        
        {/* Customers Link */}
        <div onClick={() => setActiveSection('customers')} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: '#F9FAFB' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#3B82F6' }}>View Customer Directory</span>
          <ChevronRight size={18} color="#3B82F6" />
        </div>

        <div onClick={onLogout} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#EF4444' }}>Logout Account</span>
          <ChevronRight size={18} color="#FCA5A5" />
        </div>
      </div>
    </div>
  );
}

export default function PartnerDashboardScreen({ onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showAvailability, setShowAvailability] = useState(true);
  
  const [bookings, setBookings] = useState(initialBookings);
  const [services, setServices] = useState(initialServices);

  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <PartnerDashboardTab bookings={bookings} />;
      case 'bookings': return <PartnerBookingsTab bookings={bookings} updateStatus={updateBookingStatus} />;
      case 'services': return <PartnerServicesTab services={services} setServices={setServices} />;
      case 'analytics': return <PartnerAnalyticsTab />;
      case 'profile': return <PartnerProfileTab onLogout={onLogout} />;
      default: return <PartnerDashboardTab bookings={bookings} />;
    }
  };

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'services', icon: Wrench, label: 'Services' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          {renderTab()}
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        display: 'flex', padding: '12px 16px 24px', justifyContent: 'space-between',
        zIndex: 100
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer', flex: 1,
                color: isActive ? '#3B82F6' : '#9CA3AF'
              }}
            >
              <div style={{ position: 'relative' }}>
                <tab.icon size={24} color={isActive ? '#3B82F6' : '#9CA3AF'} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div layoutId="nav-indicator" style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#3B82F6' }} />
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 600 }}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
