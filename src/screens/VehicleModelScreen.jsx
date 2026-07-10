import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import { carModelsData, bikeModelsData } from '../data/vehicleModels';
export default function VehicleModelScreen({ vehicleType, brand, onBack, onDone }) {
  const scrollRef = useRef(null);
  
  // Fallback data if brand not mapped specifically
  const fallbackCars = [{ name: `${brand} Sedan`, category: 'Sedan', image: '/assets/vehicles/cars/placeholder.svg', fuel: 'Petrol', transmission: 'Manual', year: '2024' }];
  const fallbackBikes = [{ name: `${brand} Cruiser`, category: 'Cruiser', image: '/assets/vehicles/bikes/placeholder.svg', fuel: 'Petrol', transmission: 'Manual', year: '2024' }];
  
  const rawModels = vehicleType === 'car' 
    ? (carModelsData[brand] || fallbackCars)
    : (bikeModelsData[brand] || fallbackBikes);

  const formatBrand = brand.toLowerCase().replace(/ /g, '-');
  const typeFolder = vehicleType === 'car' ? 'cars' : 'bikes';

  const models = rawModels.map(model => ({
    ...model,
    fallbackImage: `/assets/vehicles/${typeFolder}/${formatBrand}/placeholder.svg`
  }));

  const getBrandLogo = (brandName) => {
    // We will just use the provided SVG/PNG mappings from VehicleBrandScreen conceptually, 
    // but a reliable fallback is better here.
    const fBrand = brandName.toLowerCase().replace(/ /g, '-');
    const fType = vehicleType === 'car' ? 'cars' : 'bikes';
    return `/assets/brands/${fType}/${fBrand}/logo.png`;
  };

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (model) => {
    setSelectedId(model.name);
    setTimeout(() => {
      onDone(model);
    }, 500); // Allow hero/expand animation to play
  };

  return (
    <div className="page" style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 20px', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} color="#4A4A48" />
          </button>
          <div>
            <h2 className="title-md">Select {brand} Model</h2>
            <p className="subtitle" style={{ fontSize: 12, marginTop: 2 }}>
              Swipe to explore available models
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Snap Scroll Gallery */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingBottom: '100px' }}>
        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory',
            padding: '20px 24px',
            gap: 16,
            width: '100%',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Firefox
          }}
          className="hide-scrollbar"
        >
          {models.map((model, i) => {
            const isSelected = selectedId === model.name;
            
            return (
              <motion.div
                key={model.name}
                layoutId={`model-card-${model.name}`}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: i * 0.1, 
                  type: 'spring', stiffness: 260, damping: 20 
                }}
                style={{
                  scrollSnapAlign: 'center',
                  minWidth: '85%',
                  maxWidth: '85%',
                  background: 'white',
                  borderRadius: 32,
                  boxShadow: isSelected ? '0 24px 48px rgba(247,140,6,0.2)' : '0 16px 32px rgba(0,0,0,0.06)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: isSelected ? '2px solid #F78C06' : '1px solid rgba(0,0,0,0.03)',
                  zIndex: isSelected ? 50 : 1,
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {/* Image Placeholder / Display */}
                <motion.div 
                  layoutId={`model-img-${model.name}`}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 20,
                    background: '#FFFFFF',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = model.fallbackImage;
                    }}
                  />
                </motion.div>

                <motion.div layoutId={`model-info-${model.name}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 24, fontWeight: 800, color: '#4A4A48', marginBottom: 4 }}>
                        {model.name}
                      </h3>
                      <span style={{ 
                        fontSize: 12, fontWeight: 700, color: '#F78C06', 
                        background: 'rgba(247,140,6,0.1)', padding: '4px 8px', borderRadius: 6
                      }}>
                        {model.category}
                      </span>
                    </div>
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand} 
                      onError={(e) => { e.target.onerror = null; e.target.src = getBrandLogo(brand).replace('.png', '.svg'); }}
                      style={{ height: 32, objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
                    <div style={{ background: '#F5F5F5', padding: '10px', borderRadius: 12 }}>
                      <p style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600, marginBottom: 2 }}>FUEL</p>
                      <p style={{ fontSize: 12, color: '#4A4A48', fontWeight: 700 }}>{model.fuel}</p>
                    </div>
                    <div style={{ background: '#F5F5F5', padding: '10px', borderRadius: 12 }}>
                      <p style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600, marginBottom: 2 }}>GEAR</p>
                      <p style={{ fontSize: 12, color: '#4A4A48', fontWeight: 700 }}>{model.transmission}</p>
                    </div>
                    <div style={{ background: '#F5F5F5', padding: '10px', borderRadius: 12 }}>
                      <p style={{ fontSize: 10, color: '#7B7B7B', fontWeight: 600, marginBottom: 2 }}>YEAR</p>
                      <p style={{ fontSize: 12, color: '#4A4A48', fontWeight: 700 }}>{model.year}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(model)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 16,
                    background: isSelected ? '#F78C06' : 'linear-gradient(135deg, rgba(247,140,6,0.1), rgba(247,140,6,0.1))',
                    border: 'none',
                    color: isSelected ? 'white' : '#F78C06',
                    fontSize: 15,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    marginTop: 'auto',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 8px 16px rgba(247,140,6,0.2)' : 'none',
                  }}
                >
                  {isSelected ? 'Selected' : 'Select Vehicle'}
                  {!isSelected && <ChevronRight size={18} />}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Hide scrollbar styles inline for convenience */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
