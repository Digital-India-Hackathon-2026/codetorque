import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#FAFAFA',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Animated background circles */}
      <motion.div
        style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247,140,6,0.08) 0%, transparent 70%)',
          top: '10%', right: '-50px',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,210,31,0.1) 0%, transparent 70%)',
          bottom: '15%', left: '-30px',
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        {/* Logo Icon */}
        <motion.div
          style={{
            height: 80,
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
            borderRadius: 16,
            overflow: 'hidden',
            background: '#2C2C2C', // Match dark background if any
            padding: '10px 20px'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/logo.png" 
            alt="MotoMate Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </motion.div>



        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: 14, color: '#7B7B7B', marginTop: 8, fontWeight: 500, letterSpacing: 0.5 }}
        >
          Your Automotive Partner
        </motion.p>
      </motion.div>

      {/* Animated vehicle silhouette */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ marginTop: 60, zIndex: 1 }}
      >
        <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
          <motion.path
            d="M20 50 C20 50 30 28 60 28 L90 22 L120 22 L140 28 C155 28 165 50 165 50"
            stroke="rgba(247,140,6,0.25)" strokeWidth="2.5" strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: 'easeInOut' }}
          />
          <motion.circle cx="42" cy="52" r="12" fill="rgba(247,140,6,0.15)" stroke="rgba(247,140,6,0.35)" strokeWidth="2"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }} />
          <motion.circle cx="138" cy="52" r="12" fill="rgba(247,140,6,0.15)" stroke="rgba(247,140,6,0.35)" strokeWidth="2"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }} />
        </svg>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 60, display: 'flex', gap: 8 }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(247,140,6,0.4)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
