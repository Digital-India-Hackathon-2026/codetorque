import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Bell, ChevronRight, MapPin, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

const services = [
  { id: 'carwash', image: '/assets/services/car-wash/image.png', label: 'Car Wash', desc: 'Premium washing', tab: 'services' },
  { id: 'bikewash', image: '/assets/services/bike-wash/image.png', label: 'Bike Wash', desc: 'Detailed clean', tab: 'services' },
  { id: 'mechanic', image: '/assets/services/mechanic/image.png', label: 'Mechanic', desc: 'Expert repair', tab: 'services' },
  { id: 'battery', image: '/assets/services/battery/image.png', label: 'Battery', desc: 'Replacement', tab: 'services' },
  { id: 'tyre', image: '/assets/services/tyre/image.png', label: 'Tyre Repair', desc: 'Puncture fix', tab: 'services' },
  { id: 'towing', image: '/assets/services/towing/image.png', label: 'Towing', desc: '24/7 assistance', tab: 'services' },
  { id: 'sos', image: '/assets/services/emergency/image.png', label: 'Emergency SOS', desc: 'Roadside help', tab: 'sos' },
  { id: 'garage', image: '/assets/services/garage/image.png', label: 'Service Center', desc: 'Authorized', tab: 'profile' },
];

const offers = [
  {
    title: '30% OFF',
    subtitle: 'Premium Foam Wash',
    desc: 'Use SHINE30',
    image: '/assets/offers/foam_wash.png',
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(247,140,6,0.5) 100%)',
    serviceId: 'carwash',
    optionId: 'foam',
    provider: { name: 'MotoMate Assured', price: '₹349', originalPrice: '₹499', rating: 4.9, service: 'Car Wash' }
  },
  {
    title: 'Flat ₹999 OFF',
    subtitle: 'Ceramic Coating',
    desc: 'Luxury detailing',
    image: '/assets/offers/ceramic_coating.png',
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(16,185,129,0.5) 100%)',
    serviceId: 'carwash',
    optionId: 'ceramic',
    provider: { name: 'Premium Detailing Studio', price: '₹2000', originalPrice: '₹2999', rating: 4.8, service: 'Car Wash' }
  },
  {
    title: 'First Wash Free',
    subtitle: 'Bike Spa Service',
    desc: 'New users only',
    image: '/assets/offers/bike_spa.png',
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(59,130,246,0.5) 100%)',
    serviceId: 'bikewash',
    optionId: 'bike-spa',
    provider: { name: 'MotoShine Bike Spa', price: '₹0', originalPrice: '₹349', rating: 4.9, service: 'Bike Wash' }
  },
];

const searchItems = [
  {
    id: 'carwash',
    label: 'Car Wash',
    desc: 'Premium washing',
    tab: 'services',
    serviceId: 'carwash',
    keywords: ['wash', 'cleaning', 'clean', 'foam', 'exterior', 'interior', 'doorstep', 'car spa'],
  },
  {
    id: 'foam',
    label: 'Foam Wash',
    desc: 'Car Wash option',
    tab: 'services',
    serviceId: 'carwash',
    optionId: 'foam',
    keywords: ['premium foam wash', 'offer', 'shine', 'soap'],
  },
  {
    id: 'interior',
    label: 'Interior Cleaning',
    desc: 'Car Wash option',
    tab: 'services',
    serviceId: 'carwash',
    optionId: 'interior',
    keywords: ['inside cleaning', 'vacuum', 'dashboard'],
  },
  {
    id: 'ceramic',
    label: 'Ceramic Coating',
    desc: 'Car Wash option',
    tab: 'services',
    serviceId: 'carwash',
    optionId: 'ceramic',
    keywords: ['coating', 'detailing', 'paint protection'],
  },
  {
    id: 'bikewash',
    label: 'Bike Wash',
    desc: 'Detailed clean',
    tab: 'services',
    serviceId: 'bikewash',
    keywords: ['bike spa', 'two wheeler wash', 'motorcycle cleaning'],
  },
  {
    id: 'mechanic',
    label: 'Mechanic',
    desc: 'Expert repair',
    tab: 'services',
    serviceId: 'mechanic',
    keywords: ['repair', 'engine', 'breakdown', 'fix', 'garage'],
  },
  {
    id: 'service',
    label: 'Service',
    desc: 'Maintenance care',
    tab: 'services',
    serviceId: 'service',
    keywords: ['full service', 'periodic service', 'maintenance'],
  },
  {
    id: 'battery',
    label: 'Battery',
    desc: 'Replacement',
    tab: 'services',
    serviceId: 'battery',
    keywords: ['jumpstart', 'power', 'charging'],
  },
  {
    id: 'tyre',
    label: 'Tyre Repair',
    desc: 'Puncture fix',
    tab: 'services',
    serviceId: 'tyre',
    keywords: ['tire', 'puncture', 'wheel', 'air'],
  },
  {
    id: 'towing',
    label: 'Towing',
    desc: '24/7 assistance',
    tab: 'services',
    serviceId: 'towing',
    keywords: ['tow', 'roadside', 'pickup'],
  },
  {
    id: 'inspection',
    label: 'Inspection',
    desc: 'Vehicle checkup',
    tab: 'services',
    serviceId: 'inspection',
    keywords: ['checkup', 'health', 'diagnosis'],
  },
  {
    id: 'painting',
    label: 'Painting',
    desc: 'Body paint work',
    tab: 'services',
    serviceId: 'painting',
    keywords: ['paint', 'scratch', 'dent'],
  },
  {
    id: 'detailing',
    label: 'Detailing',
    desc: 'Premium finish',
    tab: 'services',
    serviceId: 'detailing',
    keywords: ['polish', 'shine', 'ceramic'],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    desc: 'Policy support',
    tab: 'services',
    serviceId: 'insurance',
    keywords: ['renewal', 'claim', 'policy'],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    desc: 'Vehicle add-ons',
    tab: 'services',
    serviceId: 'accessories',
    keywords: ['parts', 'addon', 'upgrade'],
  },
  {
    id: 'sos',
    label: 'Emergency SOS',
    desc: 'Roadside help',
    tab: 'sos',
    keywords: ['emergency', 'help', 'accident', 'roadside'],
  },
  {
    id: 'garage',
    label: 'Service Center',
    desc: 'Authorized centers',
    tab: 'profile',
    keywords: ['garage', 'center', 'authorised', 'authorized'],
  },
  {
    id: 'shine-pro',
    label: 'Shine Pro Auto Spa',
    desc: 'Nearby provider',
    tab: 'services',
    serviceId: 'carwash',
    keywords: ['provider', 'auto spa', 'premium wash'],
  },
  {
    id: 'autoglow',
    label: 'AutoGlow Services',
    desc: 'Nearby provider',
    tab: 'services',
    serviceId: 'carwash',
    keywords: ['provider', 'doorstep wash'],
  },
  {
    id: 'cleanking',
    label: 'CleanKing Auto Wash',
    desc: 'Nearby provider',
    tab: 'services',
    serviceId: 'carwash',
    keywords: ['provider', 'budget wash'],
  },
];

export default function HomeScreen({ onNavigate, onBookOffer }) {
  const { user, vehicles, activeVehicle, notifications } = useApp();
  const vehicle = vehicles[activeVehicle];
  const unreadCount = notifications.filter(n => !n.read).length;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = (normalizedQuery
    ? searchItems.filter(item => {
      const searchable = `${item.label} ${item.desc} ${item.keywords.join(' ')}`.toLowerCase();
      return searchable.includes(normalizedQuery);
    })
    : searchItems.filter(item => ['carwash', 'bikewash', 'mechanic', 'battery'].includes(item.id))
  ).slice(0, 6);

  const selectSearchResult = (item) => {
    setSearchQuery(item.label);
    setSearchOpen(false);
    onNavigate(item.tab, item.serviceId || item.id, item.optionId);
  };

  const submitSearch = () => {
    if (searchResults.length > 0) {
      const exactMatch = searchResults.find(item => item.label.toLowerCase() === normalizedQuery);
      selectSearchResult(exactMatch || searchResults[0]);
    }
  };

  return (
    <div style={{ paddingBottom: 90, background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(247,140,6,0.06) 0%, rgba(250,250,250,0) 100%)',
        padding: '56px 24px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              {/* MotoMate Logo Placeholder */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', background: '#1A1A1A',
                padding: '6px 14px', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <img src="/logo.png" alt="MotoMate" style={{ height: 20, objectFit: 'contain' }} />
              </div>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A', marginBottom: 2 }}>
              Welcome Mate!
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={12} color="#7B7B7B" />
              <span style={{ fontSize: 12, color: '#7B7B7B', fontWeight: 500 }}>Mumbai, Maharashtra</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('notifications')}
              className="icon-badge"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bell size={20} color="#4A4A48" />
              </div>
              {unreadCount > 0 && (
                <div className="icon-badge-count">{unreadCount}</div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', zIndex: 20 }}>
          <div className="search-bar" style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <Search size={16} color="#7B7B7B" />
            <input
              placeholder="Search services, providers..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 120)}
              onKeyDown={e => {
                if (e.key === 'Enter') submitSearch();
              }}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={submitSearch}
              style={{
                padding: '4px 12px', background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
                borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'white',
                border: 'none', fontFamily: 'Inter', cursor: 'pointer', flexShrink: 0,
              }}
            >
              Near Me
            </button>
          </div>

          <AnimatePresence>
            {searchOpen && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid rgba(74,74,72,0.08)',
                  borderRadius: 16,
                  boxShadow: '0 14px 34px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                }}
              >
                {searchResults.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => selectSearchResult(item)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '13px 16px',
                      background: 'white',
                      border: 'none',
                      borderBottom: index === searchResults.length - 1 ? 'none' : '1px solid rgba(74,74,72,0.06)',
                      fontFamily: 'Inter',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <Search size={14} color="#F78C06" />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>
                        {item.label}
                      </span>
                      <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#7B7B7B', marginTop: 2 }}>
                        {item.desc}
                      </span>
                    </span>
                    <ChevronRight size={15} color="#C4C4C4" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>

        {/* Offers & Deals (Moved Up) */}
        <div style={{ marginBottom: 32 }}>
          <div className="section-header">
            <span className="label" style={{ color: '#1A1A1A', fontWeight: 800, fontSize: 16 }}>OFFERS & DEALS</span>
            <button className="see-all">View all</button>
          </div>

          <div className="h-scroll" style={{ margin: '0 -24px', padding: '0 24px 10px' }}>
            {offers.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.02, y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onBookOffer(offer.provider)}
                style={{
                  minWidth: 280, height: 160, borderRadius: 24,
                  position: 'relative', flexShrink: 0, overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${offer.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: offer.gradient,
                  padding: '24px 20px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 2 }}>
                    {offer.title}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>
                    {offer.subtitle}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                    {offer.desc}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookOffer(offer.provider);
                    }}
                    style={{
                    position: 'absolute', right: 20, bottom: 20,
                    background: 'linear-gradient(135deg, #F78C06, #FFD21F)',
                    borderRadius: 12, padding: '8px 16px',
                    fontSize: 12, fontWeight: 700, color: 'white',
                    display: 'flex', alignItems: 'center', gap: 4,
                    boxShadow: '0 4px 12px rgba(247,140,6,0.4)',
                    border: 'none',
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                  }}>
                    Book <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vehicle Card */}
        {vehicle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 32 }}
          >
            <div className="section-header">
              <span className="label" style={{ color: '#1A1A1A', fontWeight: 800, fontSize: 16 }}>MY VEHICLE</span>
              <button className="see-all" onClick={() => onNavigate('profile', 'vehicles')}>Switch</button>
            </div>

            <motion.div
              className="vehicle-card"
              whileHover={{ y: -4, boxShadow: '0 18px 44px rgba(0,0,0,0.1)' }}
              style={{ overflow: 'hidden', padding: 0, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}
            >
              {/* Vehicle Image */}
              <div style={{
                position: 'relative',
                height: 184,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 18px)',
                }} />
                <motion.img
                  key={vehicle.image}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  src={vehicle.image}
                  alt={vehicle.model}
                  style={{
                    position: 'absolute',
                    inset: '10px 10px 30px',
                    width: 'calc(100% - 20px)',
                    height: 'calc(100% - 40px)',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                  }}
                  onError={e => { e.target.src = vehicle.type === 'bike' ? '/assets/vehicles/bikes/placeholder.svg' : '/assets/vehicles/cars/placeholder.svg'; }}
                />
                <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(247,140,6,0.15)',
                      border: '1px solid rgba(247,140,6,0.3)',
                      color: '#D97706',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 0.8,
                      marginBottom: 6,
                      textTransform: 'uppercase',
                    }}>
                      Active {vehicle.type}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.5px' }}>
                      {vehicle.brand} {vehicle.model}
                    </div>
                    <div style={{ fontSize: 13, color: '#4A4A48', marginTop: 2, fontWeight: 700, letterSpacing: 1 }}>
                      {vehicle.regNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                  {[
                    { icon: '⛽', label: vehicle.fuel },
                    { icon: '⚙️', label: vehicle.transmission },
                    { icon: '📅', label: vehicle.year },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center', flex: 1, background: '#F5F5F5', padding: '10px 0', borderRadius: 12 }}>
                      <div style={{ fontSize: 16, marginBottom: 4 }}>{item.icon}</div>
                      <div style={{ fontSize: 11, color: '#4A4A48', fontWeight: 600 }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Health bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#7B7B7B', fontWeight: 600 }}>Vehicle Health</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: vehicle.healthScore > 80 ? '#22C55E' : '#F78C06' }}>
                      {vehicle.healthScore}%
                    </span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(74,74,72,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${vehicle.healthScore}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                      style={{
                        height: '100%', borderRadius: 4,
                        background: vehicle.healthScore > 80 ? 'linear-gradient(90deg, #22C55E, #4ADE80)' : 'linear-gradient(90deg, #F78C06, #FFD21F)',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                    <span style={{ fontSize: 11, color: '#7B7B7B', fontWeight: 500 }}>Next service: {vehicle.nextService}</span>
                    <Activity size={14} color="#7B7B7B" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Quick Services */}
        <div style={{ marginBottom: 32 }}>
          <div className="section-header">
            <span className="label" style={{ color: '#1A1A1A', fontWeight: 800, fontSize: 16 }}>QUICK SERVICES</span>
            <button className="see-all" onClick={() => onNavigate('services')}>See all</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.03, y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.12)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate(svc.tab, svc.id)}
                style={{
                  borderRadius: 24, 
                  overflow: 'hidden', 
                  position: 'relative',
                  height: 150, 
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${svc.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 100%)',
                  padding: 16,
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  zIndex: 2
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ 
                      fontSize: 16, 
                      fontWeight: 800, 
                      color: 'white', 
                      letterSpacing: 0.5,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)' 
                    }}>
                      {svc.label}
                    </span>
                    <span style={{ 
                      fontSize: 11, 
                      color: 'rgba(255,255,255,0.75)', 
                      fontWeight: 500,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)' 
                    }}>
                      {svc.desc}
                    </span>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255,255,255,0.18)', 
                    backdropFilter: 'blur(10px)', 
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)', 
                    padding: '8px 0', 
                    borderRadius: 10,
                    fontSize: 11, 
                    fontWeight: 700, 
                    color: 'white', 
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Book Now
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div style={{ marginBottom: 8 }}>
          <div className="section-header">
            <span className="label" style={{ color: '#1A1A1A', fontWeight: 800, fontSize: 16 }}>RECENT ACTIVITY</span>
            <button className="see-all" onClick={() => onNavigate('bookings')}>See all</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🚗', title: 'Premium Foam Wash', provider: 'Shine Pro Auto Spa', time: 'Today, 3:00 PM', status: 'upcoming' },
              { icon: '🔧', title: 'Full Service', provider: 'QuickFix Garage', time: 'Jun 25', status: 'completed' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="card-hover"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px', background: 'white',
                  borderRadius: 18, border: '1px solid rgba(0,0,0,0.03)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(247,140,6,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#7B7B7B', marginTop: 2, fontWeight: 500 }}>{item.provider}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#7B7B7B', marginBottom: 4, fontWeight: 600 }}>{item.time}</div>
                  <div className={`badge badge-${item.status === 'upcoming' ? 'warning' : 'success'}`}>
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
