import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    emoji: '🚗',
    title: 'Book trusted Car\n& Bike Wash',
    subtitle: 'Premium doorstep wash services at your fingertips. Certified professionals, guaranteed satisfaction.',
    bg: 'linear-gradient(145deg, rgba(247,140,6,0.06) 0%, rgba(255,210,31,0.04) 100%)',
    visual: (
      <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
        <rect x="20" y="80" width="180" height="60" rx="16" fill="rgba(247,140,6,0.08)" />
        <path d="M30 80 C30 80 50 40 80 38 L100 34 L130 34 L155 40 C178 48 190 80 190 80Z" fill="rgba(247,140,6,0.15)" stroke="rgba(247,140,6,0.4)" strokeWidth="2"/>
        <circle cx="65" cy="85" r="18" fill="rgba(247,140,6,0.12)" stroke="rgba(247,140,6,0.5)" strokeWidth="2.5"/>
        <circle cx="155" cy="85" r="18" fill="rgba(247,140,6,0.12)" stroke="rgba(247,140,6,0.5)" strokeWidth="2.5"/>
        <circle cx="65" cy="85" r="8" fill="rgba(247,140,6,0.3)"/>
        <circle cx="155" cy="85" r="8" fill="rgba(247,140,6,0.3)"/>
        {/* Water drops */}
        {[70, 90, 110, 130, 150].map((x, i) => (
          <motion.ellipse key={i} cx={x} cy={20} rx={4} ry={8} fill="rgba(59,130,246,0.4)"
            animate={{ y: [0, 30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <rect x="60" y="52" width="100" height="28" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(247,140,6,0.2)" strokeWidth="1"/>
        <text x="110" y="72" textAnchor="middle" fill="#4A4A48" fontSize="11" fontWeight="600">SHINE PRO</text>
      </svg>
    ),
  },
  {
    emoji: '🔧',
    title: 'Find nearby verified\nmechanics',
    subtitle: 'Connect with trusted mechanics instantly. Real-time tracking, transparent pricing, no surprises.',
    bg: 'linear-gradient(145deg, rgba(34,197,94,0.06) 0%, rgba(247,140,6,0.04) 100%)',
    visual: (
      <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
        <circle cx="110" cy="80" r="60" fill="rgba(34,197,94,0.07)" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5"/>
        <circle cx="110" cy="80" r="40" fill="rgba(34,197,94,0.07)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        <circle cx="110" cy="80" r="8" fill="rgba(247,140,6,0.8)"/>
        <circle cx="110" cy="80" r="4" fill="#F78C06"/>
        {/* Provider dots */}
        {[{x:70,y:50,r:4.5},{x:150,y:60,r:5.5},{x:130,y:110,r:4}].map((d,i)=>(
          <motion.circle key={i} cx={d.x} cy={d.y} r={d.r} fill="rgba(247,140,6,0.7)"
            animate={{scale:[1,1.3,1],opacity:[0.7,1,0.7]}}
            transition={{duration:1.5,repeat:Infinity,delay:i*0.4}}/>
        ))}
        <path d="M110 80 L70 50" stroke="rgba(247,140,6,0.3)" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M110 80 L150 60" stroke="rgba(247,140,6,0.3)" strokeWidth="1.5" strokeDasharray="3 3"/>
        {/* Wrench */}
        <path d="M95 100 L115 78 M113 76 L120 84 M93 98 L100 106" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    emoji: '🆘',
    title: 'Emergency roadside\nassistance',
    subtitle: '24/7 emergency help at the tap of a button. We dispatch the nearest professional immediately.',
    bg: 'linear-gradient(145deg, rgba(255,77,79,0.06) 0%, rgba(247,140,6,0.04) 100%)',
    visual: (
      <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
        <motion.circle cx="110" cy="80" r="55" fill="none" stroke="rgba(255,77,79,0.15)" strokeWidth="2"
          animate={{r:[55,65,55],opacity:[0.5,0.1,0.5]}} transition={{duration:2,repeat:Infinity}}/>
        <motion.circle cx="110" cy="80" r="40" fill="none" stroke="rgba(255,77,79,0.2)" strokeWidth="1.5"
          animate={{r:[40,50,40],opacity:[0.6,0.15,0.6]}} transition={{duration:2,repeat:Infinity,delay:0.3}}/>
        <circle cx="110" cy="80" r="28" fill="rgba(255,77,79,0.12)"/>
        <circle cx="110" cy="80" r="22" fill="rgba(255,77,79,0.2)"/>
        <text x="110" y="87" textAnchor="middle" fill="#FF4D4F" fontSize="22" fontWeight="900">SOS</text>
        <path d="M20 130 L80 70 L110 80 L140 60 L200 100" stroke="rgba(247,140,6,0.4)" strokeWidth="2" strokeDasharray="5 3"/>
        {[20,70,120,170].map((x,i)=>(
          <motion.circle key={i} cx={x} cy={90+Math.sin(i)*15} r="3" fill="rgba(247,140,6,0.5)"
            animate={{opacity:[0.3,1,0.3]}} transition={{duration:1,repeat:Infinity,delay:i*0.25}}/>
        ))}
      </svg>
    ),
  },
];

export default function OnboardingScreen({ onDone }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
    else onDone();
  };

  const slide = slides[current];

  return (
    <div className="page page-enter" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Skip */}
      <div style={{ padding: '56px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onDone}
          style={{ background: 'none', border: 'none', color: '#7B7B7B', fontSize: 14, fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer', padding: '8px 0' }}
        >
          Skip
        </button>
      </div>

      {/* Visual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 32px',
          }}
        >
          <div style={{
            width: 260, height: 260,
            borderRadius: 40,
            background: slide.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 48, position: 'relative',
            border: '1px solid rgba(247,140,6,0.1)',
          }}>
            {slide.visual}
            <div style={{
              position: 'absolute', top: -12, right: -12,
              width: 44, height: 44, borderRadius: 14,
              background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}>
              {slide.emoji}
            </div>
          </div>

          <div style={{ textAlign: 'center', maxWidth: 320 }}>
            <motion.h2
              key={`title-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ fontSize: 28, fontWeight: 800, color: '#4A4A48', lineHeight: 1.25, marginBottom: 16, whiteSpace: 'pre-line', letterSpacing: '-0.3px' }}
            >
              {slide.title}
            </motion.h2>
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="subtitle"
              style={{ fontSize: 15 }}
            >
              {slide.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom */}
      <div style={{ padding: '0 24px 48px' }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className={`progress-dot ${i === current ? 'active' : i < current ? 'done' : ''}`}
              animate={{ width: i === current ? 28 : 10 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <button className="btn-gradient" onClick={next} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {current < slides.length - 1 ? 'Continue' : 'Get Started'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
