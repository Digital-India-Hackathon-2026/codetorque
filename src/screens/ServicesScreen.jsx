import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Droplets, Wrench, Battery, Circle, Truck, Shield, Settings, Zap, Brush, Store } from 'lucide-react';

const categories = [
  { id: 'carwash', icon: <Droplets size={20} />, label: 'Car Wash', color: '#3B82F6' },
  { id: 'bikewash', icon: <Droplets size={20} />, label: 'Bike Wash', color: '#8B5CF6' },
  { id: 'service', icon: <Settings size={20} />, label: 'Service', color: '#10B981' },
  { id: 'battery', icon: <Battery size={20} />, label: 'Battery', color: '#F59E0B' },
  { id: 'tyre', icon: <Circle size={20} />, label: 'Tyre', color: '#6B7280' },
  { id: 'inspection', icon: <Shield size={20} />, label: 'Inspection', color: '#0EA5E9' },
  { id: 'mechanic', icon: <Wrench size={20} />, label: 'Mechanic', color: '#059669' },
  { id: 'painting', icon: <Brush size={20} />, label: 'Painting', color: '#EC4899' },
  { id: 'detailing', icon: <Star size={20} />, label: 'Detailing', color: '#F78C06' },
  { id: 'towing', icon: <Truck size={20} />, label: 'Towing', color: '#EF4444' },
  { id: 'insurance', icon: <Shield size={20} />, label: 'Insurance', color: '#6366F1' },
  { id: 'accessories', icon: <Zap size={20} />, label: 'Accessories', color: '#D97706' },
];

const serviceOptions = {
  carwash: [
    { id: 'exterior', title: 'Exterior Wash', price: '₹299', time: '45 mins', image: '/assets/services/car-wash/exterior-wash.jpg', fallback: '/assets/services/car-wash/image.png', popular: false },
    { id: 'interior', title: 'Interior Cleaning', price: '₹399', time: '60 mins', image: '/assets/services/car-wash/interior-cleaning.jpg', fallback: '/assets/services/car-wash/image.png', popular: false },
    { id: 'foam', title: 'Foam Wash', price: '₹499', time: '60 mins', image: '/assets/services/car-wash/foam-wash.jpg', fallback: '/assets/services/car-wash/image.png', popular: true },
    { id: 'premium', title: 'Premium Wash', price: '₹799', time: '90 mins', image: '/assets/services/car-wash/premium-wash.jpg', fallback: '/assets/services/car-wash/image.png', popular: false },
    { id: 'ceramic', title: 'Ceramic Coating', price: '₹2,999', time: '3 hrs', image: '/assets/services/car-wash/ceramic-coating.jpg', fallback: '/assets/services/car-wash/image.png', popular: false },
    { id: 'doorstep', title: 'Doorstep Wash', price: '₹599', time: '75 mins', image: '/assets/services/car-wash/doorstep-wash.jpg', fallback: '/assets/services/car-wash/image.png', popular: false },
  ],
  bikewash: [
    { id: 'quick-bike', title: 'Quick Bike Wash', price: '₹149', time: '25 mins', image: '/assets/services/bike-wash/image.png', fallback: '/assets/services/bike-wash/image.png', popular: false },
    { id: 'bike-spa', title: 'Bike Spa Service', price: '₹349', time: '50 mins', image: '/assets/offers/bike_spa.png', fallback: '/assets/services/bike-wash/image.png', popular: true },
    { id: 'chain-clean', title: 'Chain Clean & Lube', price: '₹249', time: '35 mins', image: '/assets/services/bike-wash/image.png', fallback: '/assets/services/bike-wash/image.png', popular: false },
    { id: 'engine-degrease', title: 'Engine Degreasing', price: '₹299', time: '40 mins', image: '/assets/services/bike-wash/image.png', fallback: '/assets/services/bike-wash/image.png', popular: false },
    { id: 'bike-detailing', title: 'Bike Detailing', price: '₹699', time: '80 mins', image: '/assets/offers/bike_spa.png', fallback: '/assets/services/bike-wash/image.png', popular: false },
  ],
};

const providerGroups = {
  carwash: [
    { id: 'cw-1', name: 'Shine Pro Auto Spa', rating: 4.9, reviews: 2841, distance: '0.8 km', eta: '25 min', price: '₹499', tags: ['Certified', 'Premium'] },
    { id: 'cw-2', name: 'AutoGlow Services', rating: 4.7, reviews: 1203, distance: '1.4 km', eta: '35 min', price: '₹399', tags: ['Doorstep'] },
    { id: 'cw-3', name: 'CleanKing Auto Wash', rating: 4.6, reviews: 987, distance: '2.1 km', eta: '40 min', price: '₹349', tags: ['Budget', 'Quick'] },
  ],
  bikewash: [
    { id: 'bw-1', name: 'MotoShine Bike Spa', rating: 4.8, reviews: 1320, distance: '0.7 km', eta: '20 min', price: '₹349', tags: ['Bike Expert', 'Foam'] },
    { id: 'bw-2', name: 'GearGlow Wash Co.', rating: 4.7, reviews: 944, distance: '1.6 km', eta: '30 min', price: '₹249', tags: ['Chain Lube'] },
    { id: 'bw-3', name: 'TwoWheel Detail Lab', rating: 4.6, reviews: 711, distance: '2.4 km', eta: '42 min', price: '₹399', tags: ['Detailing'] },
  ],
  service: [
    { id: 'sv-1', name: 'MotoMate Service Hub', rating: 4.8, reviews: 1860, distance: '1.1 km', eta: '35 min', price: '₹1,499', tags: ['Full Service', 'Warranty Safe'] },
    { id: 'sv-2', name: 'Prime Auto Care', rating: 4.7, reviews: 990, distance: '1.9 km', eta: '45 min', price: '₹1,299', tags: ['Pickup Drop'] },
    { id: 'sv-3', name: 'Urban Garage Works', rating: 4.5, reviews: 640, distance: '2.8 km', eta: '55 min', price: '₹999', tags: ['Budget'] },
  ],
  mechanic: [
    { id: 'mc-1', name: 'QuickFix Mechanics', rating: 4.9, reviews: 2310, distance: '0.9 km', eta: '22 min', price: '₹299', tags: ['On-site', 'Engine'] },
    { id: 'mc-2', name: 'Ramesh Auto Works', rating: 4.8, reviews: 1742, distance: '1.3 km', eta: '28 min', price: '₹249', tags: ['Trusted'] },
    { id: 'mc-3', name: 'Precision Garage', rating: 4.7, reviews: 1188, distance: '2.0 km', eta: '38 min', price: '₹349', tags: ['Diagnostics'] },
  ],
  battery: [
    { id: 'bt-1', name: 'PowerCell Auto', rating: 4.8, reviews: 1430, distance: '0.6 km', eta: '18 min', price: '₹699', tags: ['Jump Start', 'Replacement'] },
    { id: 'bt-2', name: 'VoltUp Battery Hub', rating: 4.7, reviews: 826, distance: '1.5 km', eta: '32 min', price: '₹599', tags: ['Warranty'] },
    { id: 'bt-3', name: 'Ampere Roadside', rating: 4.5, reviews: 512, distance: '2.5 km', eta: '44 min', price: '₹499', tags: ['Emergency'] },
  ],
  tyre: [
    { id: 'ty-1', name: 'TyreKing Assist', rating: 4.8, reviews: 1250, distance: '0.8 km', eta: '24 min', price: '₹199', tags: ['Puncture', 'Air Fill'] },
    { id: 'ty-2', name: 'WheelCare Express', rating: 4.7, reviews: 832, distance: '1.7 km', eta: '36 min', price: '₹249', tags: ['Balancing'] },
    { id: 'ty-3', name: 'RoadGrip Tyres', rating: 4.6, reviews: 688, distance: '2.3 km', eta: '46 min', price: '₹299', tags: ['Replacement'] },
  ],
  inspection: [
    { id: 'in-1', name: 'CheckMate Inspection', rating: 4.9, reviews: 910, distance: '1.0 km', eta: '30 min', price: '₹499', tags: ['120-point'] },
    { id: 'in-2', name: 'AutoScan Diagnostics', rating: 4.7, reviews: 704, distance: '1.8 km', eta: '40 min', price: '₹599', tags: ['OBD Scan'] },
  ],
  painting: [
    { id: 'pt-1', name: 'ColorCraft Auto Paint', rating: 4.8, reviews: 760, distance: '1.5 km', eta: '50 min', price: '₹1,999', tags: ['Scratch Repair'] },
    { id: 'pt-2', name: 'Dent & Paint Studio', rating: 4.6, reviews: 585, distance: '2.4 km', eta: '65 min', price: '₹1,499', tags: ['Body Work'] },
  ],
  detailing: [
    { id: 'dt-1', name: 'GlossLab Detailing', rating: 4.9, reviews: 1120, distance: '1.2 km', eta: '45 min', price: '₹1,299', tags: ['Premium'] },
    { id: 'dt-2', name: 'Ceramic Shield Studio', rating: 4.8, reviews: 890, distance: '2.2 km', eta: '60 min', price: '₹2,999', tags: ['Ceramic'] },
  ],
  towing: [
    { id: 'tw-1', name: 'RapidTow 24x7', rating: 4.8, reviews: 1765, distance: '0.9 km', eta: '20 min', price: '₹799', tags: ['Flatbed'] },
    { id: 'tw-2', name: 'RoadRescue Towline', rating: 4.6, reviews: 980, distance: '1.8 km', eta: '35 min', price: '₹699', tags: ['24/7'] },
  ],
  insurance: [
    { id: 'is-1', name: 'PolicyPro Assist', rating: 4.7, reviews: 640, distance: 'Online', eta: '10 min', price: '₹0', tags: ['Renewal'] },
    { id: 'is-2', name: 'ClaimCare Desk', rating: 4.6, reviews: 505, distance: 'Online', eta: '15 min', price: '₹0', tags: ['Claims'] },
  ],
  accessories: [
    { id: 'ac-1', name: 'AutoAddons Store', rating: 4.8, reviews: 950, distance: '1.4 km', eta: '35 min', price: '₹299', tags: ['Genuine Parts'] },
    { id: 'ac-2', name: 'MotoGear Accessories', rating: 4.7, reviews: 780, distance: '2.0 km', eta: '45 min', price: '₹199', tags: ['Popular'] },
  ],
};

function CategoryPill({ cat, active, onClick }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 18px', flexShrink: 0,
        background: active ? cat.color : 'white',
        border: active ? 'none' : `1.5px solid rgba(74,74,72,0.1)`,
        borderRadius: 100, fontFamily: 'Inter', cursor: 'pointer',
        boxShadow: active ? `0 4px 14px ${cat.color}40` : '0 2px 6px rgba(0,0,0,0.04)',
        transition: 'all 0.25s',
        color: active ? 'white' : '#4A4A48',
      }}
    >
      <span style={{ color: active ? 'white' : cat.color }}>{cat.icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.label}</span>
    </motion.button>
  );
}

function ServiceCard({ opt, isSelected, onClick, delayIndex }) {
  const [imgSrc, setImgSrc] = useState(opt.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delayIndex * 0.08, type: 'spring', stiffness: 250, damping: 20 }}
      whileHover={{ scale: 1.02, y: -8, boxShadow: isSelected ? '0 20px 44px rgba(247,140,6,0.22)' : '0 18px 38px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 360,
        background: isSelected 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(247,140,6,0.03))' 
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: isSelected 
          ? '2.5px solid #F78C06' 
          : '1.5px solid rgba(74,74,72,0.08)',
        borderRadius: 24,
        boxShadow: isSelected 
          ? '0 12px 30px rgba(247,140,6,0.15)' 
          : '0 4px 16px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {isSelected && (
        <motion.div
          layoutId="selected-service-glow"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(247,140,6,0.12), rgba(255,210,31,0.04))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      {/* Cover Image Section (approx 62%) */}
      <div style={{ position: 'relative', height: '62%', width: '100%', overflow: 'hidden' }}>
        <motion.img
          src={imgSrc}
          onError={() => setImgSrc(opt.fallback)}
          alt={opt.title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.35 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Subtle dark gradient overlay at the bottom of the image */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none'
        }} />
        
        {opt.popular && (
          <div className="badge badge-warning" style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
            Popular
          </div>
        )}
      </div>

      {/* Details Section */}
      <div style={{ 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        flexGrow: 1,
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Service Name */}
          <h3 style={{ 
            fontSize: 16, 
            fontWeight: 700, 
            color: '#1A1A1A', 
            margin: 0,
            lineHeight: 1.2
          }}>
            {opt.title}
          </h3>
          
          {/* Price */}
          <div style={{ 
            fontSize: 13, 
            color: '#4A4A48', 
            fontWeight: 500
          }}>
            Starting from <span style={{ fontWeight: 800, color: '#F78C06' }}>{opt.price}</span>
          </div>

          {/* Time (No emojis) */}
          <div style={{ 
            fontSize: 11, 
            color: '#7B7B7B',
            fontWeight: 500
          }}>
            Duration: {opt.time}
          </div>
        </div>

        {/* Premium Book Now Button */}
        <button style={{
          width: '100%',
          padding: '10px 16px',
          background: isSelected ? 'linear-gradient(135deg, #F78C06, #FFD21F)' : 'rgba(74,74,72,0.06)',
          border: 'none',
          borderRadius: 12,
          color: isSelected ? 'white' : '#4A4A48',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: isSelected ? '0 4px 12px rgba(247,140,6,0.25)' : 'none',
        }}>
          {isSelected ? 'Selected' : 'Book Now'}
        </button>
      </div>
    </motion.div>
  );
}

function ProviderCard({ provider, onBook, accent, delayIndex = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayIndex * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.02, y: -4, boxShadow: '0 14px 34px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="provider-card"
      style={{
        borderColor: `${accent}20`,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 18,
        background: `${accent}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Store size={26} color={accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#4A4A48', marginBottom: 4 }}>{provider.name}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {provider.tags.map(t => (
            <span key={t} className="badge badge-warning" style={{ fontSize: 10 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={12} fill="#FBBF24" color="#FBBF24" />
            <span>{provider.rating} ({provider.reviews})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#7B7B7B' }}>
            <MapPin size={11} /> {provider.distance}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#7B7B7B' }}>
            <Clock size={11} /> {provider.eta}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#4A4A48' }}>{provider.price}</div>
        <button
          onClick={onBook}
          style={{
            background: 'linear-gradient(135deg, #F78C06, #FFD21F)', border: 'none',
            borderRadius: 10, padding: '8px 14px', fontFamily: 'Inter',
            fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(247,140,6,0.3)',
          }}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesScreen({ initialService, initialOption, onBook }) {
  const [activeCategory, setActiveCategory] = useState(
    initialService || 'carwash'
  );
  const [selectedWash, setSelectedWash] = useState(initialOption || null);
  const activeCat = categories.find(c => c.id === activeCategory) || categories[0];
  const activeOptions = serviceOptions[activeCategory] || [];
  const activeProviders = providerGroups[activeCategory] || [];

  useEffect(() => {
    if (initialService) {
      setActiveCategory(initialService);
    }
    setSelectedWash(initialOption || null);
  }, [initialService, initialOption]);

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <motion.div
        key={activeCat.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
        padding: '56px 24px 20px',
        background: `linear-gradient(180deg, ${activeCat.color}12 0%, transparent 100%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            background: activeCat.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 10px 24px ${activeCat.color}35`,
          }}>
            {activeCat.icon}
          </div>
          <div>
            <h1 className="title-lg" style={{ marginBottom: 4 }}>{activeCat.label}</h1>
            <p className="subtitle" style={{ fontSize: 13 }}>
              {activeOptions.length > 0
                ? `Choose a ${activeCat.label.toLowerCase()} type and nearby specialist`
                : `Showing only ${activeCat.label.toLowerCase()} providers near you`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <div style={{ padding: '0 24px 20px' }}>
        <div className="h-scroll">
          {categories.map(cat => (
            <CategoryPill
              key={cat.id}
              cat={cat}
              active={activeCategory === cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedWash(null);
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        {/* Service Options (wash categories only) */}
        {activeOptions.length > 0 && (
          <motion.div
            key={`${activeCategory}-options`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ marginBottom: 28 }}
          >
            <p className="label" style={{ marginBottom: 14 }}>
              {activeCategory === 'carwash' ? 'CAR WASHING TYPES' : 'BIKE WASHING TYPES'}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20
            }}>
              {activeOptions.map((opt, i) => (
                <ServiceCard
                  key={opt.id}
                  opt={opt}
                  isSelected={selectedWash === opt.id}
                  onClick={() => setSelectedWash(opt.id === selectedWash ? null : opt.id)}
                  delayIndex={i}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Providers */}
        {(!activeOptions.length || selectedWash) && (
          <motion.div
            key={`${activeCategory}-providers`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: activeOptions.length > 0 ? 0.08 : 0 }}
            style={{ marginTop: 24 }}
          >
            <p className="label" style={{ marginBottom: 14 }}>
              {activeCategory === 'mechanic' ? 'MECHANIC SHOPS NEAR YOU' : `${activeCat.label.toUpperCase()} SHOPS NEAR YOU`}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {activeProviders.map((p, i) => (
                <ProviderCard key={p.id} provider={p} accent={activeCat.color} onBook={() => onBook({ ...p, service: activeCat.label })} delayIndex={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
