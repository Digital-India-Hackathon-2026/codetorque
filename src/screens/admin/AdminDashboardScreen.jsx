import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

function AdminOverviewTab() {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 24 }}>System Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <div style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', borderRadius: 20, padding: 20, color: 'white', boxShadow: '0 8px 24px rgba(16,185,129,0.3)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Platform Revenue</div>
          <div style={{ fontSize: 28, fontWeight: 900, marginTop: 4 }}>₹45,200</div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7B7B7B' }}>Total Users</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', marginTop: 4 }}>1,245</div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7B7B7B' }}>Active Partners</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', marginTop: 4 }}>48</div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7B7B7B' }}>Pending Partners</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#F59E0B', marginTop: 4 }}>5</div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Recent Activity</h2>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>New User Registration</div>
          <div style={{ fontSize: 13, color: '#7B7B7B', marginTop: 4 }}>Just now</div>
        </div>
      ))}
    </div>
  );
}

function AdminPartnersTab() {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Partner Management</h1>
      
      <h2 style={{ fontSize: 16, fontWeight: 800, color: '#F59E0B', marginBottom: 16 }}>Pending Approval (2)</h2>
      {[1, 2].map(i => (
        <div key={i} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Sai Car Wash</div>
              <div style={{ fontSize: 13, color: '#7B7B7B' }}>Andheri East</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ flex: 1, padding: 12, background: '#10B981', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700 }}>Approve</button>
            <button style={{ flex: 1, padding: 12, background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: 12, fontWeight: 700 }}>Reject</button>
          </div>
        </div>
      ))}

      <h2 style={{ fontSize: 16, fontWeight: 800, marginTop: 32, marginBottom: 16 }}>Active Partners</h2>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>MotoMate Assured Hub {i}</div>
            <div style={{ fontSize: 13, color: '#7B7B7B' }}>ID: PTN-100{i}</div>
          </div>
          <ChevronRight size={20} color="#ccc" />
        </div>
      ))}
    </div>
  );
}

function AdminUsersTab() {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>User Management</h1>
      <input 
        placeholder="Search users..." 
        style={{ width: '100%', padding: 16, background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 16, marginBottom: 24, outline: 'none' }}
      />
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Customer Name {i}</div>
            <div style={{ fontSize: 13, color: '#7B7B7B' }}>+91 987654321{i}</div>
          </div>
          <button style={{ padding: '6px 12px', background: '#F5F5F5', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600 }}>Suspend</button>
        </div>
      ))}
    </div>
  );
}

function AdminBookingsTab() {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>All Bookings</h1>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>#BKG-20{i}4</span>
            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600, background: '#D1FAE5', padding: '2px 8px', borderRadius: 8 }}>Completed</span>
          </div>
          <div style={{ fontSize: 13, color: '#7B7B7B' }}>Customer: Rahul K • Partner: MotoMate Hub</div>
        </div>
      ))}
    </div>
  );
}

function AdminSettingsTab({ onLogout }) {
  return (
    <div style={{ padding: '24px 24px 100px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Platform Settings</h1>
      
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {['Service Categories', 'Pricing Templates', 'Offers & Promotions', 'Global Notifications', 'FAQ & Content', 'Logout'].map((item, i) => (
          <div key={i} onClick={item === 'Logout' ? onLogout : undefined} style={{ padding: 16, borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', cursor: item === 'Logout' ? 'pointer' : 'default' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: item === 'Logout' ? '#EF4444' : '#1A1A1A' }}>{item}</span>
            <ChevronRight size={20} color="#ccc" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardScreen({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverviewTab />;
      case 'partners': return <AdminPartnersTab />;
      case 'users': return <AdminUsersTab />;
      case 'bookings': return <AdminBookingsTab />;
      case 'settings': return <AdminSettingsTab onLogout={onLogout} />;
      default: return <AdminOverviewTab />;
    }
  };

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'partners', icon: Briefcase, label: 'Partners' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {renderTab()}
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
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
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer', flex: 1,
                color: isActive ? '#10B981' : '#9CA3AF'
              }}
            >
              <tab.icon size={22} color={isActive ? '#10B981' : '#9CA3AF'} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500 }}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
