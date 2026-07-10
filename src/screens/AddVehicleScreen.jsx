import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const fuelOptions = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
const transmissionOptions = ['Manual', 'Automatic', 'AMT', 'DCT'];
const colors = ['Black', 'White', 'Silver', 'Red', 'Blue', 'Grey', 'Brown', 'Green', 'Orange'];
const years = Array.from({ length: 15 }, (_, i) => String(2025 - i));

export default function AddVehicleScreen({ vehicleData, vehicleType, onBack, onDone }) {
  const { vehicles, setVehicles, setActiveVehicle } = useApp();
  
  // Default values from vehicleData if they exist, otherwise sensible defaults
  const defaultFuel = fuelOptions.find(f => vehicleData?.fuel?.includes(f)) || 'Petrol';
  const defaultTransmission = transmissionOptions.find(t => vehicleData?.transmission?.includes(t) || (t === 'Automatic' && vehicleData?.transmission?.includes('Auto'))) || 'Manual';
  
  const [form, setForm] = useState({
    regNumber: '',
    nickname: '',
    mileage: '',
    fuel: defaultFuel,
    transmission: defaultTransmission,
    color: 'White',
    year: vehicleData?.year || '2024',
  });
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const isValid = form.regNumber.length >= 6 && form.nickname.length >= 1;
  const heroImage = vehicleData?.image || (vehicleType === 'car'
    ? 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'
    : 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600');

  const save = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      const newVehicle = {
        id: Date.now(),
        type: vehicleType,
        brand: vehicleData?.brand || 'Hyundai',
        model: vehicleData?.model || 'Creta',
        regNumber: form.regNumber.toUpperCase(),
        nickname: form.nickname,
        fuel: form.fuel,
        transmission: form.transmission,
        color: form.color,
        year: form.year,
        mileage: form.mileage || '0 km',
        insurance: 'Add Insurance',
        puc: 'Add PUC',
        healthScore: 95,
        lastService: 'Not serviced yet',
        nextService: 'Schedule now',
        image: heroImage,
      };
      setVehicles(prev => [...prev, newVehicle]);
      setActiveVehicle(vehicles.length);
      setLoading(false);
      setSaved(true);
      setTimeout(onDone, 1600);
    }, 1200);
  };

  if (saved) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 24 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{ textAlign: 'center' }}
        >
          <div className="success-check" style={{ margin: '0 auto 24px', width: 100, height: 100 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <motion.path
                d="M10 25L20 35L38 15"
                stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </svg>
          </div>
          <h2 className="title-lg" style={{ marginBottom: 8 }}>Vehicle Added!</h2>
          <p className="subtitle">
            {form.nickname} has been added to your garage
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page" style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Contextual Header with Hero Image */}
      <div style={{ position: 'relative', height: 260, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
        <motion.div 
          layoutId={`model-img-${vehicleData?.model}`}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
        }} />
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          style={{
            position: 'absolute', top: 56, left: 24,
            width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
          }}
        >
          <ArrowLeft size={20} color="white" />
        </button>

        {/* Brand and Model Info */}
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <motion.div layoutId={`model-info-${vehicleData?.model}`}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, marginBottom: 4, letterSpacing: 1 }}>
              {vehicleData?.brand?.toUpperCase() || 'BRAND'}
            </p>
            <h1 style={{ color: 'white', fontSize: 32, fontWeight: 800, margin: 0 }}>
              {vehicleData?.model || 'Model'}
            </h1>
          </motion.div>
        </div>
      </div>

      <div style={{ padding: '24px 24px 120px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Registration Number */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="label" style={{ marginBottom: 8, color: '#7B7B7B', fontSize: 12 }}>REGISTRATION NUMBER <span style={{ color: '#F78C06' }}>*</span></p>
          <input
            className="input-field"
            placeholder="MH 01 AB 1234"
            value={form.regNumber}
            onChange={e => setForm(f => ({ ...f, regNumber: e.target.value }))}
            style={{ textTransform: 'uppercase', letterSpacing: 1.5, background: 'white', border: '1.5px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          />
        </motion.div>

        {/* Nickname */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="label" style={{ marginBottom: 8, color: '#7B7B7B', fontSize: 12 }}>VEHICLE NICKNAME <span style={{ color: '#F78C06' }}>*</span></p>
          <input
            className="input-field"
            placeholder="e.g. My Creta, Thunder"
            value={form.nickname}
            onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))}
            style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          />
        </motion.div>

        {/* Current Mileage */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="label" style={{ marginBottom: 8, color: '#7B7B7B', fontSize: 12 }}>CURRENT MILEAGE (KM)</p>
          <input
            className="input-field"
            placeholder="e.g. 25000"
            type="number"
            value={form.mileage}
            onChange={e => setForm(f => ({ ...f, mileage: e.target.value }))}
            style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          />
        </motion.div>

        {/* Fuel Type */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p className="label" style={{ marginBottom: 10, color: '#7B7B7B', fontSize: 12 }}>FUEL TYPE</p>
          <div className="h-scroll" style={{ margin: '0 -24px', padding: '0 24px 8px' }}>
            {fuelOptions.map(fuel => (
              <button
                key={fuel}
                onClick={() => setForm(f => ({ ...f, fuel }))}
                style={{
                  padding: '10px 20px',
                  background: form.fuel === fuel ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'white',
                  border: form.fuel === fuel ? 'none' : '1.5px solid rgba(74,74,72,0.1)',
                  borderRadius: 100, whiteSpace: 'nowrap',
                  fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
                  color: form.fuel === fuel ? 'white' : '#4A4A48',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: form.fuel === fuel ? '0 4px 12px rgba(247,140,6,0.3)' : '0 2px 6px rgba(0,0,0,0.02)',
                }}
              >
                {fuel}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Transmission */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="label" style={{ marginBottom: 10, color: '#7B7B7B', fontSize: 12 }}>TRANSMISSION</p>
          <div className="h-scroll" style={{ margin: '0 -24px', padding: '0 24px 8px' }}>
            {transmissionOptions.map(t => (
              <button
                key={t}
                onClick={() => setForm(f => ({ ...f, transmission: t }))}
                style={{
                  padding: '10px 20px',
                  background: form.transmission === t ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'white',
                  border: form.transmission === t ? 'none' : '1.5px solid rgba(74,74,72,0.1)',
                  borderRadius: 100, whiteSpace: 'nowrap',
                  fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
                  color: form.transmission === t ? 'white' : '#4A4A48',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: form.transmission === t ? '0 4px 12px rgba(247,140,6,0.3)' : '0 2px 6px rgba(0,0,0,0.02)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Color */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <p className="label" style={{ marginBottom: 10, color: '#7B7B7B', fontSize: 12 }}>COLOUR</p>
          <div className="h-scroll" style={{ margin: '0 -24px', padding: '0 24px 8px' }}>
            {colors.map(color => {
              const colorMap = {
                Black: '#1a1a1a', White: '#f5f5f5', Silver: '#C0C0C0', Red: '#DC2626',
                Blue: '#2563EB', Grey: '#6B7280', Brown: '#92400E', Green: '#059669', Orange: '#EA580C',
              };
              return (
                <button
                  key={color}
                  onClick={() => setForm(f => ({ ...f, color }))}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '8px',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', fontFamily: 'Inter',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: colorMap[color],
                    border: form.color === color ? '3px solid #F78C06' : '2px solid rgba(74,74,72,0.15)',
                    transition: 'all 0.2s',
                    boxShadow: form.color === color ? '0 0 0 4px rgba(247,140,6,0.2)' : 'none',
                  }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: form.color === color ? '#F78C06' : '#7B7B7B' }}>
                    {color}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Year */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <p className="label" style={{ marginBottom: 10, color: '#7B7B7B', fontSize: 12 }}>YEAR</p>
          <div className="h-scroll" style={{ margin: '0 -24px', padding: '0 24px 8px' }}>
            {years.slice(0, 8).map(y => (
              <button
                key={y}
                onClick={() => setForm(f => ({ ...f, year: y }))}
                style={{
                  padding: '10px 18px',
                  background: form.year === y ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'white',
                  border: form.year === y ? 'none' : '1.5px solid rgba(74,74,72,0.1)',
                  borderRadius: 100, whiteSpace: 'nowrap',
                  fontFamily: 'Inter', fontSize: 13, fontWeight: 700,
                  color: form.year === y ? 'white' : '#4A4A48',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: form.year === y ? '0 4px 12px rgba(247,140,6,0.3)' : '0 2px 6px rgba(0,0,0,0.02)',
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <motion.button
            className="btn-gradient"
            onClick={save}
            disabled={!isValid}
            style={{
              opacity: isValid ? 1 : 0.5, marginTop: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: isValid ? '0 12px 24px rgba(247,140,6,0.25)' : 'none',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? <div className="spinner" /> : <>Add Vehicle <ChevronRight size={18} /></>}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
