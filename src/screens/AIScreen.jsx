import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Zap, ChevronRight } from 'lucide-react';

const suggestions = [
  "My bike won't start",
  "My car vibrates at high speed",
  "My tyre is punctured",
  "Strange noise from engine",
  "AC not cooling properly",
  "Battery drain issue",
];

const aiResponses = {
  "My bike won't start": {
    cause: "Possible issues: Dead battery, Fuel system blockage, Spark plug failure, or Kickstarter mechanism issue.",
    cost: "₹200 - ₹800 (diagnosis), ₹500 - ₹2,500 (repair)",
    provider: "QuickFix Bikes — 0.8 km away",
    eta: "18 min",
  },
  "My car vibrates at high speed": {
    cause: "Likely causes: Wheel balancing issue, Worn tyre, Loose wheel bolts, or Driveshaft imbalance.",
    cost: "₹400 - ₹600 (wheel balancing), ₹800 - ₹2,000 (tyre replacement)",
    provider: "TyreKing Pro — 1.2 km away",
    eta: "22 min",
  },
  "My tyre is punctured": {
    cause: "Your tyre may have a nail/object embedded, sidewall damage, or valve issue.",
    cost: "₹150 - ₹350 (tubeless repair), ₹500 - ₹800 (tube replacement)",
    provider: "PatchMaster Tyres — 0.5 km away",
    eta: "12 min",
  },
};

const defaultResponses = [
  {
    cause: "I'll analyze your issue. Based on common patterns, this could be related to wear and tear or a minor mechanical issue.",
    cost: "₹300 - ₹1,500 (estimated based on service type)",
    provider: "Nearby Expert Mechanic — 1.0 km away",
    eta: "20 min",
  },
];

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '12px 16px' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 6, height: 6, borderRadius: 3, background: '#7B7B7B' }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function AIResponseCard({ response, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'white', border: '1px solid rgba(74,74,72,0.08)',
        borderRadius: 20, padding: '18px', boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
        marginTop: 4,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(247,140,6,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🔍</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#F78C06', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Possible Cause
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#4A4A48', lineHeight: 1.6 }}>{response.cause}</p>
      </div>

      <div className="divider" style={{ margin: '12px 0' }} />

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(34,197,94,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>💰</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Estimated Cost
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#4A4A48', fontWeight: 600 }}>{response.cost}</p>
      </div>

      <div className="divider" style={{ margin: '12px 0' }} />

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(59,130,246,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>📍</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Nearest Provider
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#4A4A48' }}>{response.provider}</p>
        <p style={{ fontSize: 12, color: '#7B7B7B', marginTop: 2 }}>ETA: {response.eta}</p>
      </div>

      <button
        onClick={onBook}
        className="btn-gradient"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 20px' }}
      >
        Book Now · {response.eta} <ChevronRight size={16} />
      </button>
    </motion.div>
  );
}

export default function AIScreen({ onBook }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: "Hi! I'm MotoMate AI 🤖 Tell me about any vehicle issue and I'll help diagnose it, estimate the cost, and connect you with the nearest service provider!",
      timestamp: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text, timestamp: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = aiResponses[text] || defaultResponses[0];
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: "Here's my analysis:",
        response,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingBottom: 90 }}>
      {/* Header */}
      <div style={{
        padding: '56px 24px 16px',
        background: 'linear-gradient(180deg, rgba(247,140,6,0.04) 0%, transparent 100%)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(247,140,6,0.3)',
          }}>
            <Zap size={22} color="white" />
          </div>
          <div>
            <h2 className="title-md">MotoMate AI</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: '#22C55E' }} />
              <span style={{ fontSize: 12, color: '#22C55E', fontWeight: 600 }}>Online · Ready to help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ padding: '0 24px 16px', flexShrink: 0 }}>
          <p className="label" style={{ marginBottom: 10 }}>COMMON ISSUES</p>
          <div className="h-scroll">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                style={{
                  padding: '10px 16px', background: 'white',
                  border: '1.5px solid rgba(74,74,72,0.1)', borderRadius: 100,
                  fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#4A4A48',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1, padding: '8px 24px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {msg.role === 'ai' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9,
                    background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  }}>⚡</div>
                  <span style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600 }}>MotoMate AI</span>
                </div>
              )}
              <div className={`chat-bubble ${msg.role}`}>
                {msg.text}
              </div>
              {msg.response && (
                <AIResponseCard response={msg.response} onBook={() => onBook()} />
              )}
              <span style={{ fontSize: 10, color: '#7B7B7B', paddingRight: msg.role === 'user' ? 4 : 0 }}>
                {msg.timestamp}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 9,
              background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>⚡</div>
            <div className="chat-bubble ai" style={{ padding: '10px 14px' }}>
              <TypingIndicator />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 24px 24px', flexShrink: 0,
        background: 'rgba(250,250,250,0.95)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(74,74,72,0.06)',
      }}>
        <div style={{
          display: 'flex', gap: 10,
          background: 'white', border: '1.5px solid rgba(74,74,72,0.1)',
          borderRadius: 18, padding: '10px 10px 10px 18px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <input
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontFamily: 'Inter', fontSize: 14, color: '#4A4A48', background: 'transparent',
            }}
            placeholder="Describe your vehicle issue..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && input.trim() && sendMessage(input.trim())}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'rgba(247,140,6,0.08)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Mic size={16} color="#F78C06" />
            </button>
            <button
              onClick={() => input.trim() && sendMessage(input.trim())}
              disabled={!input.trim()}
              style={{
                width: 38, height: 38, borderRadius: 12,
                background: input.trim() ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'rgba(74,74,72,0.08)',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: input.trim() ? '0 4px 12px rgba(247,140,6,0.3)' : 'none',
              }}
            >
              <Send size={16} color={input.trim() ? 'white' : '#7B7B7B'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
