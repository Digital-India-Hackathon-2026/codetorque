import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function VehicleLineIcon({ type, selected }) {
  const color = selected ? '#F78C06' : '#111111';

  if (type === 'bike') {
    return (
      <svg width="54" height="54" viewBox="0 0 96 64" fill="none" aria-hidden="true">
        <path d="M14 43H8" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M18 33H8" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M14 23H8" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="30" cy="46" r="12" stroke={color} strokeWidth="6" />
        <circle cx="72" cy="46" r="12" stroke={color} strokeWidth="6" />
        <path
          d="M28 34H38L48 24H61C68 24 73 29 74 36L76 46"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M41 46H58"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M56 24L65 12H77"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M74 18H83L79 30"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="54" height="54" viewBox="0 0 96 64" fill="none" aria-hidden="true">
      <path d="M14 42H8" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M18 31H8" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M14 20H8" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
      <path
        d="M24 42V29C24 25 27 22 31 22H39L49 13H64C71 13 78 17 81 24L85 34C86 37 84 42 80 42H75"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M38 42H59" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d="M42 52H62" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="31" cy="43" r="10" stroke={color} strokeWidth="6" />
      <circle cx="72" cy="43" r="10" stroke={color} strokeWidth="6" />
    </svg>
  );
}

export default function VehicleSelectScreen({ onDone }) {
  const [selected, setSelected] = useState(null);

  const options = [
    {
      type: 'car',
      label: 'Car',
      desc: 'Hatchback • Sedan • SUV • MUV',
    },
    {
      type: 'bike',
      label: 'Bike',
      desc: 'Scooter • Sports • Cruiser',
    },
  ];

  const handleSelect = (type) => {
    setSelected(type);
    setTimeout(() => {
      onDone(type);
    }, 450); // wait for scale animation
  };

  return (
    <div className="page" style={{ 
      padding: '60px 24px 40px', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)' 
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 40 }}
      >
        <div className="time-badge">
          <span>👋</span> Welcome, Vinay!
        </div>
        <h1 className="title-xl" style={{ marginBottom: 10 }}>
          Choose Your<br /><span className="gradient-text">Vehicle</span>
        </h1>
        <p className="subtitle">Let's personalize your experience</p>
      </motion.div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        <AnimatePresence>
          {options.map((opt, i) => {
            const isSelected = selected === opt.type;
            const isOtherSelected = selected && selected !== opt.type;

            if (isOtherSelected) return null; // hide the other one when one is selected

            return (
              <motion.div
                key={opt.type}
                layoutId={`vehicle-card-${opt.type}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  delay: selected ? 0 : i * 0.15 + 0.1, 
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelect(opt.type)}
                style={{
                  padding: '32px 24px',
                  borderRadius: 24,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(247,140,6,0.1) 0%, rgba(255,210,31,0.05) 100%)' 
                    : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isSelected ? '2px solid rgba(247,140,6,0.4)' : '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: isSelected
                    ? '0 16px 40px rgba(247,140,6,0.15)'
                    : '0 8px 32px rgba(0,0,0,0.04)',
                  transformOrigin: 'center center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                <div style={{
                  width: 72, height: 72,
                  borderRadius: 20,
                  background: isSelected ? 'rgba(247,140,6,0.15)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}>
                  <VehicleLineIcon type={opt.type} selected={isSelected} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, fontFamily: 'Inter' }}>
                    {opt.label}
                  </h3>
                  <p style={{ fontSize: 13, color: '#7B7B7B', fontWeight: 500, fontFamily: 'Inter' }}>
                    {opt.desc}
                  </p>
                </div>

                {/* Selection Indicator */}
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: isSelected ? 1 : 0, 
                    opacity: isSelected ? 1 : 0 
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(247,140,6,0.3)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 7.5L5.5 9.5L10.5 4.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
