import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, ChevronRight, Activity, Shield, Clock, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';

function VehicleHealthRing({ score }) {
  const r = 28, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score > 80 ? '#22C55E' : score > 60 ? '#F78C06' : '#FF4D4F';

  return (
    <div style={{ position: 'relative', width: 72, height: 72 }}>
      <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(74,74,72,0.1)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 14, fontWeight: 900, color }}>{score}%</div>
      </div>
    </div>
  );
}

function VehicleCard({ v, isActive, onSwitch, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'white', borderRadius: 24, overflow: 'hidden',
        border: isActive ? '2px solid rgba(247,140,6,0.4)' : '1px solid rgba(74,74,72,0.06)',
        boxShadow: isActive ? '0 12px 40px rgba(247,140,6,0.12)' : '0 4px 20px rgba(0,0,0,0.06)',
        marginBottom: 16,
      }}
    >
      {/* Active badge */}
      {isActive && (
        <div style={{
          background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
          padding: '8px 20px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: 'white' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: 0.5 }}>ACTIVE VEHICLE</span>
        </div>
      )}

      {/* Vehicle Image */}
      <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
        <img
          src={v.image}
          alt={v.model}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.src = `https://via.placeholder.com/400x160/F5F5F5/4A4A48?text=${v.brand}+${v.model}`; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 12, left: 16,
          background: 'rgba(0,0,0,0.5)', borderRadius: 8,
          padding: '4px 12px', backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: 1.5 }}>
            {v.regNumber}
          </span>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#4A4A48' }}>{v.brand} {v.model}</div>
            <div style={{ fontSize: 13, color: '#7B7B7B', marginTop: 2 }}>{v.nickname} · {v.year}</div>
          </div>
          <VehicleHealthRing score={v.healthScore} />
        </div>

        {/* Specs row */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
          {[
            { icon: '⛽', label: v.fuel },
            { icon: '⚙️', label: v.transmission },
            { icon: '🎨', label: v.color },
            { icon: '📊', label: v.mileage.split(' ')[0] },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(74,74,72,0.08)' : 'none',
              padding: '0 4px',
            }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Insurance / PUC */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { icon: <Shield size={13} color="#22C55E" />, label: 'Insurance', value: v.insurance, color: '#22C55E' },
            { icon: <Activity size={13} color="#3B82F6" />, label: 'PUC', value: v.puc, color: '#3B82F6' },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, padding: '10px 12px',
              background: `${item.color}08`, borderRadius: 12,
              border: `1px solid ${item.color}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                {item.icon}
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.label}</span>
              </div>
              <div style={{ fontSize: 10, color: '#4A4A48', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Service */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px', background: 'rgba(247,140,6,0.05)',
          borderRadius: 12, marginBottom: 16, flexWrap: 'wrap', gap: 8,
        }}>
          <div>
            <div style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600 }}>LAST SERVICE</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4A4A48' }}>{v.lastService}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600 }}>NEXT SERVICE</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#F78C06' }}>{v.nextService}</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          {!isActive && (
            <button onClick={onSwitch} className="btn-gradient" style={{ flex: 1, padding: '12px' }}>
              Set Active
            </button>
          )}
          <button
            onClick={onEdit}
            style={{
              flex: isActive ? 2 : 1, padding: '12px',
              background: 'rgba(74,74,72,0.06)', border: 'none',
              borderRadius: 14, fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
              color: '#4A4A48', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <Edit2 size={14} /> Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              width: 48, padding: '12px',
              background: 'rgba(255,77,79,0.08)', border: 'none',
              borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Trash2 size={16} color="#FF4D4F" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: '🔔', label: 'Notifications', sub: 'Manage alerts & reminders' },
      { icon: '🔒', label: 'Privacy & Security', sub: 'PIN, biometric, data' },
      { icon: '🌐', label: 'Language', sub: 'English (India)' },
    ],
  },
  {
    title: 'App',
    items: [
      { icon: '💳', label: 'Payment Methods', sub: 'UPI, cards, wallet' },
      { icon: '📍', label: 'Saved Addresses', sub: '2 addresses saved' },
      { icon: '🎁', label: 'Refer & Earn', sub: 'Get ₹100 per referral' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help & FAQ', sub: 'Get answers quickly' },
      { icon: 'ℹ️', label: 'About MotoMate', sub: 'Version 1.0.0' },
    ],
  },
];

export default function ProfileScreen({ onAddVehicle }) {
  const { user, vehicles, activeVehicle, setActiveVehicle, setVehicles, bookings, notifications, darkMode, setDarkMode } = useApp();
  const [tab, setTab] = useState('profile');

  const tabs = ['profile', 'vehicles', 'bookings', 'settings'];

  const deleteVehicle = (id) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{
        padding: '56px 24px 24px',
        background: 'linear-gradient(180deg, rgba(247,140,6,0.06) 0%, transparent 100%)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', background: '#1A1A1A',
          padding: '6px 14px', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          marginBottom: 24
        }}>
          <img src="/logo.png" alt="MotoMate" style={{ height: 20, objectFit: 'contain' }} />
        </div>
        {/* User Info */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 22,
              background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, boxShadow: '0 8px 24px rgba(247,140,6,0.3)',
            }}>
              👤
            </div>
            <div style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 24, height: 24, borderRadius: 8,
              background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Camera size={12} color="#4A4A48" />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#4A4A48' }}>{user.name}</div>
            <div style={{ fontSize: 13, color: '#7B7B7B', marginTop: 2 }}>{user.phone}</div>
            <div style={{ fontSize: 12, color: '#7B7B7B' }}>{user.email}</div>
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'white', border: '1px solid rgba(74,74,72,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <Edit2 size={16} color="#4A4A48" />
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Member Since', value: 'Jan 2024', icon: '🗓' },
            { label: 'Bookings', value: bookings.length, icon: '✅' },
            { label: 'Vehicles', value: vehicles.length, icon: '🚗' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '14px 12px', textAlign: 'center',
              background: 'white', borderRadius: 18,
              border: '1px solid rgba(74,74,72,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#4A4A48' }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 24px 20px' }}>
        <div className="h-scroll">
          {[
            { id: 'profile', label: '👤 Profile' },
            { id: 'vehicles', label: '🚗 My Vehicles' },
            { id: 'bookings', label: '📋 Bookings' },
            { id: 'settings', label: '⚙️ Settings' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 20px', flexShrink: 0,
                background: tab === t.id ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'white',
                border: tab === t.id ? 'none' : '1.5px solid rgba(74,74,72,0.1)',
                borderRadius: 100, fontFamily: 'Inter', cursor: 'pointer',
                fontSize: 13, fontWeight: 700,
                color: tab === t.id ? 'white' : '#4A4A48',
                boxShadow: tab === t.id ? '0 6px 18px rgba(247,140,6,0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.25s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          style={{ padding: '0 24px' }}
        >
          {/* Profile Tab */}
          {tab === 'profile' && (
            <div>
              <div style={{ background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 16 }}>
                {[
                  { icon: '👤', label: 'Full Name', value: user.name },
                  { icon: '📱', label: 'Phone', value: user.phone },
                  { icon: '✉️', label: 'Email', value: user.email },
                  { icon: '📅', label: 'Member Since', value: user.memberSince },
                ].map((item, i, arr) => (
                  <div key={i} style={{
                    display: 'flex', gap: 14, alignItems: 'center', padding: '16px 20px',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(74,74,72,0.06)' : 'none',
                  }}>
                    <div style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#4A4A48', marginTop: 2 }}>{item.value}</div>
                    </div>
                    <ChevronRight size={14} color="#7B7B7B" />
                  </div>
                ))}
              </div>

              <button style={{
                width: '100%', padding: '16px', background: 'rgba(255,77,79,0.06)',
                border: '1.5px solid rgba(255,77,79,0.2)', borderRadius: 18,
                fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: '#FF4D4F',
                cursor: 'pointer',
              }}>
                🚪 Logout
              </button>
            </div>
          )}

          {/* Vehicles Tab */}
          {tab === 'vehicles' && (
            <div>
              {vehicles.map((v, i) => (
                <VehicleCard
                  key={v.id}
                  v={v}
                  isActive={i === activeVehicle}
                  onSwitch={() => setActiveVehicle(i)}
                  onEdit={() => { }}
                  onDelete={() => deleteVehicle(v.id)}
                />
              ))}

              {/* Add Vehicle */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onAddVehicle}
                style={{
                  width: '100%', padding: '20px',
                  background: 'rgba(247,140,6,0.04)',
                  border: '2px dashed rgba(247,140,6,0.3)', borderRadius: 24,
                  fontFamily: 'Inter', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 11,
                  background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Plus size={18} color="white" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#F78C06' }}>Add New Vehicle</span>
              </motion.button>
            </div>
          )}

          {/* Bookings Tab */}
          {tab === 'bookings' && (
            <div>
              {bookings.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: 'white', borderRadius: 20, padding: '18px 20px',
                    marginBottom: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(74,74,72,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: 'rgba(247,140,6,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                    }}>
                      {b.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#4A4A48' }}>{b.service}</div>
                      <div style={{ fontSize: 12, color: '#7B7B7B', marginTop: 2 }}>{b.provider}</div>
                      <div style={{ fontSize: 11, color: '#7B7B7B', marginTop: 2 }}>{b.vehicle}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className={`badge badge-${b.status === 'upcoming' ? 'warning' : b.status === 'completed' ? 'success' : 'error'}`} style={{ marginBottom: 6 }}>
                        {b.status}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#4A4A48' }}>{b.amount}</div>
                    </div>
                  </div>
                  <div className="divider" style={{ margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#7B7B7B' }}>📅 {b.date}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {b.status === 'completed' && (
                        <button style={{
                          padding: '6px 14px', background: 'rgba(247,140,6,0.08)',
                          border: 'none', borderRadius: 8,
                          fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: '#F78C06', cursor: 'pointer',
                        }}>
                          Rebook
                        </button>
                      )}
                      <button style={{
                        padding: '6px 14px', background: 'rgba(74,74,72,0.06)',
                        border: 'none', borderRadius: 8,
                        fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: '#4A4A48', cursor: 'pointer',
                      }}>
                        Invoice
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {tab === 'settings' && (
            <div>
              {/* Dark Mode */}
              <div style={{
                background: 'white', borderRadius: 20, padding: '18px 20px',
                marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: 22 }}>🌙</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#4A4A48' }}>Dark Mode</div>
                  <div style={{ fontSize: 12, color: '#7B7B7B' }}>Switch app appearance</div>
                </div>
                <button className={`toggle ${darkMode ? 'on' : ''}`} onClick={() => setDarkMode(!darkMode)}>
                  <div className="toggle-thumb" />
                </button>
              </div>

              {settingsSections.map((section, si) => (
                <div key={si} style={{ marginBottom: 16 }}>
                  <p className="label" style={{ marginBottom: 10 }}>{section.title.toUpperCase()}</p>
                  <div style={{
                    background: 'white', borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  }}>
                    {section.items.map((item, i, arr) => (
                      <div key={i} style={{
                        display: 'flex', gap: 14, alignItems: 'center', padding: '16px 20px',
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(74,74,72,0.06)' : 'none',
                        cursor: 'pointer',
                      }}>
                        <div style={{ fontSize: 20 }}>{item.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#4A4A48' }}>{item.label}</div>
                          <div style={{ fontSize: 11, color: '#7B7B7B', marginTop: 1 }}>{item.sub}</div>
                        </div>
                        <ChevronRight size={14} color="#7B7B7B" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
