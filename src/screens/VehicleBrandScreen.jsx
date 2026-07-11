import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';

const carBrands = [
  { name: 'Hyundai', logo: '/assets/brands/cars/hyundai/logo.png', country: '🇰🇷' },
  { name: 'Tata', logo: '/assets/brands/cars/tata/logo.png', country: '🇮🇳' },
  { name: 'Mahindra', logo: '/assets/brands/cars/mahindra/logo.png', country: '🇮🇳' },
  { name: 'Toyota', logo: '/assets/brands/cars/toyota/logo.png', country: '🇯🇵' },
  { name: 'Honda', logo: '/assets/brands/cars/honda/logo.png', country: '🇯🇵' },
  { name: 'Kia', logo: '/assets/brands/cars/kia/logo.png', country: '🇰🇷' },
  { name: 'Maruti', logo: '/assets/brands/cars/maruti/logo.png', country: '🇮🇳' },
  { name: 'BMW', logo: '/assets/brands/cars/bmw/logo.png', country: '🇩🇪' },
  { name: 'Audi', logo: '/assets/brands/cars/audi/logo.png', country: '🇩🇪' },
  { name: 'Mercedes', logo: '/assets/brands/cars/mercedes/logo.png', country: '🇩🇪' },
  { name: 'Volkswagen', logo: '/assets/brands/cars/volkswagen/logo.png', country: '🇩🇪' },
  { name: 'Skoda', logo: '/assets/brands/cars/skoda/logo.png', country: '🇨🇿' },
];

const bikeBrands = [
  { name: 'Hero', logo: '/assets/brands/bikes/hero/logo.png', country: '🇮🇳' },
  { name: 'Honda', logo: '/assets/brands/bikes/honda/logo.png', country: '🇯🇵' },
  { name: 'TVS', logo: '/assets/brands/bikes/tvs/logo.png', country: '🇮🇳' },
  { name: 'Yamaha', logo: '/assets/brands/bikes/yamaha/logo.png', country: '🇯🇵' },
  { name: 'KTM', logo: '/assets/brands/bikes/ktm/logo.png', country: '🇦🇹' },
  { name: 'Royal Enfield', logo: '/assets/brands/bikes/royal-enfield/logo.png', country: '🇮🇳' },
  { name: 'Bajaj', logo: '/assets/brands/bikes/bajaj/logo.png', country: '🇮🇳' },
  { name: 'Suzuki', logo: '/assets/brands/bikes/suzuki/logo.png', country: '🇯🇵' },
];

function BrandCard({ brand, selected, onSelect }) {
  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }}
      whileTap={{ scale: 0.94 }}
      onClick={() => onSelect(brand.name)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
        padding: '24px 16px',
        background: selected === brand.name ? 'linear-gradient(135deg, rgba(247,140,6,0.1), rgba(255,210,31,0.05))' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: selected === brand.name ? '2px solid rgba(247,140,6,0.5)' : '1px solid rgba(255, 255, 255, 0.8)',
        borderRadius: 24,
        cursor: 'pointer', fontFamily: 'Inter',
        boxShadow: selected === brand.name ? '0 12px 24px rgba(247,140,6,0.15)' : '0 4px 16px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {selected === brand.name && (
        <motion.div 
          layoutId="brand-glow"
          style={{
            position: 'absolute', inset: 0, 
            background: 'radial-gradient(circle at center, rgba(247,140,6,0.15) 0%, transparent 70%)',
          }}
        />
      )}
      
      <div style={{
        width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        position: 'relative', zIndex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        padding: 8,
      }}>
        <img
          src={brand.logo}
          alt={brand.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', filter: selected === brand.name ? 'none' : 'grayscale(15%)', transition: 'filter 0.3s' }}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <span style={{ display: 'none', fontSize: 18, fontWeight: 700, color: '#4A4A48' }}>{brand.name[0]}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: selected === brand.name ? '#F78C06' : '#4A4A48', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {brand.name}
      </span>
    </motion.button>
  );
}

export default function VehicleBrandScreen({ vehicleType, onBack, onDone }) {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [query, setQuery] = useState('');

  const brands = vehicleType === 'car' ? carBrands : bikeBrands;
  const filteredBrands = brands.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));

  const selectBrand = (name) => {
    setSelectedBrand(name);
    setTimeout(() => {
      onDone(name);
    }, 400); // Wait for the ripple/scale effect
  };

  return (
    <div className="page" style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 0', position: 'sticky', top: 0, background: 'rgba(250,250,250,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', zIndex: 10, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} color="#4A4A48" />
          </button>
          <div>
            <h2 className="title-md">
              Select {vehicleType === 'car' ? 'Car' : 'Bike'} Brand
            </h2>
            <p className="subtitle" style={{ fontSize: 12, marginTop: 2 }}>
              Choose your vehicle manufacturer
            </p>
          </div>
        </div>

        <div className="search-bar" style={{ background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Search size={16} color="#7B7B7B" />
          <input placeholder="Search brand..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div style={{ padding: '20px 24px 120px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 2 Column Layout as requested */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {filteredBrands.map((brand, i) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <BrandCard brand={brand} selected={selectedBrand} onSelect={selectBrand} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
