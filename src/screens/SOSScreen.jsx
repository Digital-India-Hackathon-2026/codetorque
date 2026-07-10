import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, MapPin } from 'lucide-react';

const emergencyTypes = [
  { id: 'battery', icon: '🔋', label: 'Battery Dead', color: '#F59E0B' },
  { id: 'engine', icon: '⚙️', label: 'Engine Failure', color: '#EF4444' },
  { id: 'accident', icon: '🚨', label: 'Accident', color: '#FF4D4F' },
  { id: 'fuel', icon: '⛽', label: 'Out of Fuel', color: '#6366F1' },
  { id: 'puncture', icon: '🔩', label: 'Tyre Puncture', color: '#6B7280' },
  { id: 'unknown', icon: '❓', label: 'Unknown Issue', color: '#4A4A48' },
];

export default function SOSScreen({ onBook }) {
  const [selected, setSelected] = useState(null);
  const [triggered, setTriggered] = useState(false);
  const [dispatching, setDispatching] = useState(false);

  const triggerSOS = () => {
    if (!selected) return;
    setDispatching(true);
    setTimeout(() => {
      setDispatching(false);
      setTriggered(true);
    }, 2000);
  };

  if (triggered) {
    return (
      <div style={{
        minHeight: '100vh', padding: '60px 24px 90px',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Dispatch Confirmed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'white', borderRadius: 28,
            padding: '28px 24px', marginBottom: 20,
            border: '1px solid rgba(74,74,72,0.06)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div className="badge badge-error" style={{ fontSize: 12, padding: '6px 16px' }}>
              🔴 LIVE
            </div>
            <span style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 600 }}>Help dispatched</span>
          </div>

          <div style={{ fontSize: 20, fontWeight: 800, color: '#4A4A48', marginBottom: 6 }}>
            Help is on the way!
          </div>
          <p className="subtitle" style={{ marginBottom: 20 }}>
            Ramesh Kumar is heading to your location
          </p>

          {/* ETA */}
          <div style={{
            background: 'rgba(255,77,79,0.06)', borderRadius: 18,
            padding: '18px', marginBottom: 20,
            border: '1px solid rgba(255,77,79,0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: '#7B7B7B', fontWeight: 600, marginBottom: 4 }}>ESTIMATED ARRIVAL</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#FF4D4F' }}>12 min</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#7B7B7B', marginBottom: 4 }}>DISTANCE</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#4A4A48' }}>0.9 km</div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="map-placeholder" style={{ marginBottom: 20 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Road grid */}
              <svg width="100%" height="100%" viewBox="0 0 360 200" style={{ position: 'absolute' }}>
                <rect width="360" height="200" fill="#e8f4e8"/>
                {/* Roads */}
                <rect x="0" y="90" width="360" height="20" fill="white" opacity="0.7"/>
                <rect x="160" y="0" width="20" height="200" fill="white" opacity="0.7"/>
                {/* Dashes */}
                <line x1="0" y1="100" x2="360" y2="100" stroke="rgba(247,140,6,0.4)" strokeWidth="2" strokeDasharray="12 8"/>
                {/* Location pin */}
                <circle cx="180" cy="100" r="12" fill="#FF4D4F"/>
                <circle cx="180" cy="100" r="5" fill="white"/>
                {/* Mechanic */}
                <motion.circle
                  cx="80" cy="100" r="8" fill="#F78C06"
                  animate={{ cx: [80, 120, 160] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              <div style={{
                position: 'absolute', bottom: 12, left: 12,
                background: 'white', borderRadius: 12, padding: '8px 14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4A4A48' }}>📍 Your Location</div>
                <div style={{ fontSize: 10, color: '#7B7B7B' }}>Bandra West, Mumbai</div>
              </div>
            </div>
          </div>

          {/* Mechanic Card */}
          <div style={{
            display: 'flex', gap: 14, padding: '16px',
            background: 'rgba(247,140,6,0.04)', borderRadius: 18,
            border: '1px solid rgba(247,140,6,0.12)', marginBottom: 16,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              flexShrink: 0,
            }}>👨‍🔧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#4A4A48' }}>Ramesh Kumar</div>
              <div className="rating-pill" style={{ marginTop: 4, display: 'inline-flex' }}>⭐ 4.9 · 1,284 jobs</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <button style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(59,130,246,0.1)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Phone size={16} color="#3B82F6" />
              </button>
              <button style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(247,140,6,0.1)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <MessageSquare size={16} color="#F78C06" />
              </button>
            </div>
          </div>

          {/* Progress Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { done: true, label: 'SOS Triggered', sub: 'Emergency detected', color: '#22C55E' },
              { done: true, label: 'Help Dispatched', sub: 'Mechanic assigned', color: '#22C55E' },
              { done: false, label: 'En Route', sub: 'Mechanic is coming', color: '#F78C06', active: true },
              { done: false, label: 'Arrived', sub: 'Mechanic at location', color: '#3B82F6' },
              { done: false, label: 'Issue Resolved', sub: 'Service complete', color: '#4A4A48' },
            ].map((step, i, arr) => (
              <div key={i} className="timeline-item" style={{ paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                {i < arr.length - 1 && <div className="timeline-line" />}
                <div
                  className="timeline-dot"
                  style={{
                    background: step.done ? step.color : step.active ? step.color : 'rgba(74,74,72,0.15)',
                    boxShadow: step.active ? `0 0 0 4px ${step.color}25` : 'none',
                    marginTop: 2,
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: step.done || step.active ? '#4A4A48' : '#7B7B7B' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#7B7B7B', marginTop: 2 }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <button
          onClick={() => { setTriggered(false); setSelected(null); }}
          className="btn-ghost"
        >
          Cancel Emergency
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '56px 24px 90px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div className="badge badge-error" style={{ marginBottom: 12, fontSize: 12, padding: '6px 16px', display: 'inline-flex' }}>
          🚨 Emergency Services
        </div>
        <h1 className="title-lg" style={{ marginBottom: 8 }}>Need Immediate Help?</h1>
        <p className="subtitle">Press SOS to dispatch the nearest mechanic to your location immediately</p>
      </div>

      {/* Location */}
      <div style={{
        display: 'flex', gap: 12, alignItems: 'center',
        padding: '14px 18px',
        background: 'rgba(247,140,6,0.06)', borderRadius: 18,
        border: '1px solid rgba(247,140,6,0.15)', marginBottom: 32,
      }}>
        <MapPin size={18} color="#F78C06" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4A4A48' }}>Current Location Detected</div>
          <div style={{ fontSize: 12, color: '#7B7B7B' }}>Bandra West, Mumbai, Maharashtra</div>
        </div>
        <div className="badge badge-success" style={{ marginLeft: 'auto' }}>Live</div>
      </div>

      {/* SOS Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
        <AnimatePresence mode="wait">
          {dispatching ? (
            <motion.div key="dispatching" initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: 'center' }}>
              <div style={{
                width: 120, height: 120, borderRadius: 60,
                background: '#FF4D4F',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
                boxShadow: '0 0 0 16px rgba(255,77,79,0.15)',
              }}>
                <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white', width: 32, height: 32 }} />
              </div>
              <p style={{ fontSize: 13, color: '#FF4D4F', fontWeight: 700 }}>Dispatching help...</p>
            </motion.div>
          ) : (
            <motion.div key="sos" style={{ textAlign: 'center' }}>
              <motion.button
                className="sos-btn"
                onClick={triggerSOS}
                whileTap={{ scale: 0.92 }}
                style={{ opacity: selected ? 1 : 0.7 }}
              >
                <span style={{ fontSize: 28 }}>🚨</span>
                <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: 2 }}>SOS</span>
              </motion.button>
              <p style={{ marginTop: 12, fontSize: 12, color: '#7B7B7B' }}>
                {selected ? 'Tap to activate emergency' : 'Select issue type first'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Issue Type */}
      <div>
        <p className="label" style={{ marginBottom: 14 }}>SELECT ISSUE TYPE</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {emergencyTypes.map((type, i) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(type.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px', background: selected === type.id ? `${type.color}12` : 'white',
                border: selected === type.id ? `2px solid ${type.color}60` : '1.5px solid rgba(74,74,72,0.08)',
                borderRadius: 18, fontFamily: 'Inter', cursor: 'pointer',
                boxShadow: selected === type.id ? `0 6px 20px ${type.color}25` : '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{type.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: selected === type.id ? type.color : '#4A4A48', textAlign: 'left' }}>
                {type.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
