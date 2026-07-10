import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, MapPin, Clock, CreditCard, Check, Calendar, User, IndianRupee } from 'lucide-react';

const steps = ['Service', 'Date & Time', 'Address', 'Payment', 'Confirm'];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const dateOptions = ['Today', 'Tomorrow', 'Sat, Jul 12', 'Sun, Jul 13', 'Mon, Jul 14'];

const paymentMethods = [
  { id: 'upi', icon: '📱', label: 'UPI', sub: 'Pay via any UPI app' },
  { id: 'card', icon: '💳', label: 'Debit/Credit Card', sub: 'Visa, Mastercard, RuPay' },
  { id: 'wallet', icon: '👛', label: 'MotoWallet', sub: '₹1,240 available' },
];

function StepHeader({ current, onBack }) {
  return (
    <div style={{
      padding: '56px 24px 20px', position: 'sticky', top: 0,
      background: 'rgba(250,250,250,0.95)', backdropFilter: 'blur(12px)', zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} color="#4A4A48" />
        </button>
        <div>
          <h2 className="title-md">{steps[current]}</h2>
          <p className="subtitle" style={{ fontSize: 12, marginTop: 2 }}>Step {current + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {steps.map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, flex: 1, alignItems: 'center' }}>
            <motion.div
              animate={{
                background: i < current ? 'linear-gradient(135deg, #22C55E, #4ADE80)' : i === current ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'rgba(74,74,72,0.15)',
              }}
              style={{ height: 4, borderRadius: 2, flex: 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingScreen({ provider, onDone, onCancel }) {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('3:00 PM');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('upi');
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const prov = provider || { name: 'Shine Pro Auto Spa', price: '₹499', rating: 4.9 };

  const confirmBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
      setTimeout(onDone, 2500);
    }, 1500);
  };

  if (booked) {
    return (
      <div className="page" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: 32,
        background: 'linear-gradient(180deg, rgba(34,197,94,0.04) 0%, #FAFAFA 100%)',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ textAlign: 'center', maxWidth: 320 }}
        >
          <motion.div
            animate={{ rotateZ: [0, 10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 1.2, repeat: 2 }}
            style={{ fontSize: 80, marginBottom: 24 }}
          >
            🎉
          </motion.div>
          <div className="success-check" style={{ margin: '0 auto 24px', width: 80, height: 80 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <motion.path
                d="M8 21L17 30L32 12"
                stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#4A4A48', marginBottom: 8 }}>
            Booking Confirmed!
          </h2>
          <p className="subtitle" style={{ marginBottom: 8 }}>
            Your booking with {prov.name} is confirmed!
          </p>
          <div className="badge badge-warning" style={{ margin: '0 auto', display: 'inline-flex' }}>
            📅 {selectedDate} · {selectedTime}
          </div>
          <div style={{ marginTop: 24, padding: '16px', background: 'white', borderRadius: 18, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 12, color: '#7B7B7B' }}>Booking ID</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#4A4A48', letterSpacing: 1.5 }}>MM2025{Math.floor(Math.random() * 1000)}</div>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ padding: '20px 24px' }}>
            <div style={{ padding: '20px', background: 'white', borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'rgba(247,140,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                }}>🏪</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#4A4A48' }}>{prov.name}</div>
                  <div className="rating-pill" style={{ marginTop: 4, display: 'inline-flex' }}>⭐ {prov.rating}</div>
                </div>
              </div>
              <div className="divider" style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#7B7B7B' }}>Service Price</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#F78C06' }}>{prov.price}</div>
                </div>
                <div className="badge badge-success">Available Today</div>
              </div>
            </div>

            <div style={{ padding: '20px', background: 'white', borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <p className="label" style={{ marginBottom: 12 }}>INCLUDES</p>
              {['Exterior wash & rinse', 'Interior vacuum clean', 'Dashboard wipe', 'Tyre shine', 'Air freshener'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid rgba(74,74,72,0.06)' : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 10, background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} color="#22C55E" />
                  </div>
                  <span style={{ fontSize: 13, color: '#4A4A48' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div style={{ padding: '20px 24px' }}>
            <p className="label" style={{ marginBottom: 12 }}>SELECT DATE</p>
            <div className="h-scroll" style={{ marginBottom: 24 }}>
              {dateOptions.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  style={{
                    padding: '12px 20px', flexShrink: 0,
                    background: selectedDate === date ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'white',
                    border: selectedDate === date ? 'none' : '1.5px solid rgba(74,74,72,0.1)',
                    borderRadius: 16, fontFamily: 'Inter', cursor: 'pointer',
                    fontSize: 13, fontWeight: 700,
                    color: selectedDate === date ? 'white' : '#4A4A48',
                    boxShadow: selectedDate === date ? '0 6px 18px rgba(247,140,6,0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s',
                  }}
                >
                  {date}
                </button>
              ))}
            </div>

            <p className="label" style={{ marginBottom: 12 }}>SELECT TIME</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{
                    padding: '14px 8px',
                    background: selectedTime === time ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'white',
                    border: selectedTime === time ? 'none' : '1.5px solid rgba(74,74,72,0.1)',
                    borderRadius: 14, fontFamily: 'Inter', cursor: 'pointer',
                    fontSize: 13, fontWeight: 700,
                    color: selectedTime === time ? 'white' : '#4A4A48',
                    boxShadow: selectedTime === time ? '0 4px 14px rgba(247,140,6,0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s',
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ padding: '20px 24px' }}>
            <p className="label" style={{ marginBottom: 12 }}>SERVICE ADDRESS</p>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <MapPin size={16} color="#7B7B7B" style={{ position: 'absolute', left: 16, top: 18 }} />
              <input
                className="input-field"
                style={{ paddingLeft: 44 }}
                placeholder="Enter your full address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <button
              onClick={() => setAddress('Flat 204, Seaview Apt, Bandra West, Mumbai 400050')}
              style={{
                width: '100%', padding: '14px', background: 'rgba(247,140,6,0.06)',
                border: '1.5px dashed rgba(247,140,6,0.3)', borderRadius: 16,
                fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#F78C06',
                cursor: 'pointer', marginBottom: 20,
              }}
            >
              📍 Use Current Location
            </button>

            <p className="label" style={{ marginBottom: 12 }}>SAVED ADDRESSES</p>
            {['Flat 204, Seaview Apt, Bandra West', '12 MG Road, Pune Station Area'].map((addr, i) => (
              <div
                key={i}
                onClick={() => setAddress(addr)}
                className="card-hover"
                style={{
                  display: 'flex', gap: 12, alignItems: 'center',
                  padding: '16px', background: 'white',
                  borderRadius: 16, marginBottom: 10,
                  border: address === addr ? '1.5px solid rgba(247,140,6,0.4)' : '1.5px solid rgba(74,74,72,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 11,
                  background: 'rgba(247,140,6,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {i === 0 ? '🏠' : '🏢'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4A4A48' }}>{i === 0 ? 'Home' : 'Work'}</div>
                  <div style={{ fontSize: 12, color: '#7B7B7B' }}>{addr}</div>
                </div>
                {address === addr && (
                  <div style={{ marginLeft: 'auto' }}>
                    <Check size={16} color="#22C55E" />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div style={{ padding: '20px 24px' }}>
            <p className="label" style={{ marginBottom: 12 }}>PAYMENT METHOD</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {paymentMethods.map(pm => (
                <div
                  key={pm.id}
                  onClick={() => setPayment(pm.id)}
                  className="option-card"
                  style={{ borderColor: payment === pm.id ? 'rgba(247,140,6,0.5)' : 'rgba(74,74,72,0.08)' }}
                >
                  <div style={{ fontSize: 24 }}>{pm.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#4A4A48' }}>{pm.label}</div>
                    <div style={{ fontSize: 12, color: '#7B7B7B' }}>{pm.sub}</div>
                  </div>
                  {payment === pm.id && (
                    <div style={{ width: 22, height: 22, borderRadius: 11, background: 'linear-gradient(135deg, #F78C06, #FFD21F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} color="white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div style={{ background: 'white', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <p className="label" style={{ marginBottom: 14 }}>PRICE SUMMARY</p>
              {[['Service charge', prov.price], ['Platform fee', '₹29'], ['GST (18%)', '₹95']].map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(74,74,72,0.06)' }}>
                  <span style={{ fontSize: 13, color: '#7B7B7B' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#4A4A48' }}>{val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#4A4A48' }}>Total</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#F78C06' }}>₹623</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ padding: '20px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#4A4A48', marginBottom: 20 }}>Review & Confirm</h3>

            {[
              { icon: <User size={16} color="#7B7B7B" />, label: 'Provider', value: prov.name },
              { icon: <Calendar size={16} color="#7B7B7B" />, label: 'Date & Time', value: `${selectedDate} · ${selectedTime}` },
              { icon: <MapPin size={16} color="#7B7B7B" />, label: 'Address', value: address || 'Flat 204, Seaview Apt, Bandra West' },
              { icon: <CreditCard size={16} color="#7B7B7B" />, label: 'Payment', value: paymentMethods.find(p => p.id === payment)?.label },
              { icon: <IndianRupee size={16} color="#7B7B7B" />, label: 'Total Amount', value: '₹623' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '14px', background: 'white',
                borderRadius: 16, marginBottom: 10,
                border: '1px solid rgba(74,74,72,0.06)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}>
                <div style={{ marginTop: 1, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#4A4A48' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page" style={{ minHeight: '100vh' }}>
      <StepHeader current={step} onBack={step === 0 ? onCancel : () => setStep(s => s - 1)} />

      <div style={{ paddingBottom: 120 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        padding: '16px 24px 32px',
        background: 'rgba(250,250,250,0.95)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(74,74,72,0.06)',
      }}>
        <button
          className="btn-gradient"
          onClick={step < 4 ? () => setStep(s => s + 1) : confirmBooking}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {loading ? <div className="spinner" /> : step < 4 ? <>Continue <ChevronRight size={18} /></> : '✨ Confirm Booking'}
        </button>
      </div>
    </div>
  );
}
