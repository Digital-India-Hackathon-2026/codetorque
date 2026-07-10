import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import SplashScreen from './screens/SplashScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import VehicleSelectScreen from './screens/VehicleSelectScreen';
import VehicleBrandScreen from './screens/VehicleBrandScreen';
import AddVehicleScreen from './screens/AddVehicleScreen';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import AIScreen from './screens/AIScreen';
import SOSScreen from './screens/SOSScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import VehicleModelScreen from './screens/VehicleModelScreen';
import TabBar from './components/TabBar';

import PartnerLoginScreen from './screens/partner/PartnerLoginScreen';
import PartnerRegisterScreen from './screens/partner/PartnerRegisterScreen';
import PartnerDashboardScreen from './screens/partner/PartnerDashboardScreen';
import AdminLoginScreen from './screens/admin/AdminLoginScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';

// App flow states
const FLOWS = {
  SPLASH: 'splash',
  ROLE_SELECTION: 'role_selection',
  
  // Customer flows
  ONBOARDING: 'onboarding',
  LOGIN: 'login',
  VEHICLE_SELECT: 'vehicle_select',
  VEHICLE_BRAND: 'vehicle_brand',
  VEHICLE_MODEL: 'vehicle_model',
  ADD_VEHICLE: 'add_vehicle',
  MAIN: 'main',

  // Partner flows
  PARTNER_LOGIN: 'partner_login',
  PARTNER_REGISTER: 'partner_register',
  PARTNER_DASHBOARD: 'partner_dashboard',

  // Admin flows
  ADMIN_LOGIN: 'admin_login',
  ADMIN_DASHBOARD: 'admin_dashboard',
};

function AppContent() {
  const [flow, setFlow] = useState(FLOWS.SPLASH);
  const [activeTab, setActiveTab] = useState('home');
  const [vehicleType, setVehicleType] = useState('car');
  const [vehicleData, setVehicleData] = useState(null);
  const [overlay, setOverlay] = useState(null); // 'booking' | 'notifications' | 'add_vehicle_flow'
  const [bookingProvider, setBookingProvider] = useState(null);
  const [serviceTarget, setServiceTarget] = useState({ category: 'carwash', option: null });

  // ─── Navigation handlers ────────────────────────────────────────────
  const handleNavigate = (tab, subId, optionId) => {
    if (tab === 'notifications') {
      setOverlay('notifications');
      return;
    }
    if (tab === 'services') {
      setServiceTarget({
        category: subId || 'carwash',
        option: optionId || null,
      });
    }
    setActiveTab(tab);
  };

  const handleBook = (provider) => {
    setBookingProvider(provider || null);
    setOverlay('booking');
  };

  const handleAddVehicleFlow = () => {
    setOverlay('add_vehicle_flow');
  };

  // ─── Render active tab ──────────────────────────────────────────────
  const renderMain = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} onBookOffer={handleBook} />;
      case 'services':
        return <ServicesScreen initialService={serviceTarget.category} initialOption={serviceTarget.option} onBook={handleBook} />;
      case 'ai':
        return <AIScreen onBook={() => handleBook(null)} />;
      case 'sos':
        return <SOSScreen onBook={handleBook} />;
      case 'profile':
        return <ProfileScreen onAddVehicle={handleAddVehicleFlow} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onBookOffer={handleBook} />;
    }
  };

  // ─── SPLASH ─────────────────────────────────────────────────────────
  if (flow === FLOWS.SPLASH) {
    return <SplashScreen onDone={() => setFlow(FLOWS.ROLE_SELECTION)} />;
  }

  // ─── ROLE SELECTION ─────────────────────────────────────────────────
  if (flow === FLOWS.ROLE_SELECTION) {
    return (
      <RoleSelectionScreen
        onSelect={(role) => {
          if (role === 'customer') setFlow(FLOWS.ONBOARDING);
          else if (role === 'partner') setFlow(FLOWS.PARTNER_LOGIN);
          else if (role === 'admin') setFlow(FLOWS.ADMIN_LOGIN);
        }}
      />
    );
  }

  // ─── ONBOARDING ──────────────────────────────────────────────────────
  if (flow === FLOWS.ONBOARDING) {
    return <OnboardingScreen onDone={() => setFlow(FLOWS.LOGIN)} />;
  }

  // ─── LOGIN ────────────────────────────────────────────────────────────
  if (flow === FLOWS.LOGIN) {
    return <LoginScreen onDone={() => setFlow(FLOWS.VEHICLE_SELECT)} />;
  }

  // ─── VEHICLE SELECT ──────────────────────────────────────────────────
  if (flow === FLOWS.VEHICLE_SELECT) {
    return (
      <VehicleSelectScreen
        onDone={(type) => {
          setVehicleType(type);
          setFlow(FLOWS.VEHICLE_BRAND);
        }}
      />
    );
  }

  // ─── VEHICLE BRAND ────────────────────────────────────────────────────
  if (flow === FLOWS.VEHICLE_BRAND) {
    return (
      <VehicleBrandScreen
        vehicleType={vehicleType}
        onBack={() => setFlow(FLOWS.VEHICLE_SELECT)}
        onDone={(brand) => {
          setVehicleData({ brand });
          setFlow(FLOWS.VEHICLE_MODEL);
        }}
      />
    );
  }

  // ─── VEHICLE MODEL ────────────────────────────────────────────────────
  if (flow === FLOWS.VEHICLE_MODEL) {
    return (
      <VehicleModelScreen
        vehicleType={vehicleType}
        brand={vehicleData?.brand}
        onBack={() => setFlow(FLOWS.VEHICLE_BRAND)}
        onDone={(modelObj) => {
          setVehicleData(prev => ({ ...prev, ...modelObj, model: modelObj.name }));
          setFlow(FLOWS.ADD_VEHICLE);
        }}
      />
    );
  }

  // ─── ADD VEHICLE (initial setup) ──────────────────────────────────────
  if (flow === FLOWS.ADD_VEHICLE) {
    return (
      <AddVehicleScreen
        vehicleType={vehicleType}
        vehicleData={vehicleData}
        onBack={() => setFlow(FLOWS.VEHICLE_BRAND)}
        onDone={() => setFlow(FLOWS.MAIN)}
      />
    );
  }

  // ─── PARTNER FLOWS ────────────────────────────────────────────────────
  if (flow === FLOWS.PARTNER_LOGIN) {
    return (
      <PartnerLoginScreen 
        onBack={() => setFlow(FLOWS.ROLE_SELECTION)}
        onRegister={() => setFlow(FLOWS.PARTNER_REGISTER)}
        onDone={() => setFlow(FLOWS.PARTNER_DASHBOARD)} 
      />
    );
  }

  if (flow === FLOWS.PARTNER_REGISTER) {
    return (
      <PartnerRegisterScreen
        onBack={() => setFlow(FLOWS.ROLE_SELECTION)}
      />
    );
  }

  if (flow === FLOWS.PARTNER_DASHBOARD) {
    return <PartnerDashboardScreen />;
  }

  // ─── ADMIN FLOWS ──────────────────────────────────────────────────────
  if (flow === FLOWS.ADMIN_LOGIN) {
    return (
      <AdminLoginScreen 
        onBack={() => setFlow(FLOWS.ROLE_SELECTION)}
        onDone={() => setFlow(FLOWS.ADMIN_DASHBOARD)} 
      />
    );
  }

  if (flow === FLOWS.ADMIN_DASHBOARD) {
    return <AdminDashboardScreen />;
  }

  // ─── MAIN APP ─────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {renderMain()}
        </motion.div>
      </AnimatePresence>

      {/* Tab Bar */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* ─── Overlays ─── */}
      <AnimatePresence>
        {overlay === 'booking' && (
          <motion.div
            key="booking"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, background: '#FAFAFA',
              zIndex: 500, overflowY: 'auto',
            }}
          >
            <BookingScreen
              provider={bookingProvider}
              onDone={() => setOverlay(null)}
              onCancel={() => setOverlay(null)}
            />
          </motion.div>
        )}

        {overlay === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, background: '#FAFAFA',
              zIndex: 500, overflowY: 'auto',
            }}
          >
            <NotificationsScreen onBack={() => setOverlay(null)} />
          </motion.div>
        )}

        {overlay === 'add_vehicle_flow' && (
          <motion.div
            key="add_vehicle_flow"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, background: '#FAFAFA',
              zIndex: 500, overflowY: 'auto',
            }}
          >
            <VehicleSelectScreen
              onDone={(type) => {
                setVehicleType(type);
                setOverlay('add_vehicle_flow_brand');
              }}
            />
          </motion.div>
        )}

        {overlay === 'add_vehicle_flow_brand' && (
          <motion.div
            key="add_vehicle_flow_brand"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, background: '#FAFAFA',
              zIndex: 500, overflowY: 'auto',
            }}
          >
            <VehicleBrandScreen
              vehicleType={vehicleType}
              onBack={() => setOverlay('add_vehicle_flow')}
              onDone={(brand) => {
                setVehicleData({ brand });
                setOverlay('add_vehicle_flow_model');
              }}
            />
          </motion.div>
        )}

        {overlay === 'add_vehicle_flow_model' && (
          <motion.div
            key="add_vehicle_flow_model"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, background: '#FAFAFA',
              zIndex: 500, overflowY: 'auto',
            }}
          >
            <VehicleModelScreen
              vehicleType={vehicleType}
              brand={vehicleData?.brand}
              onBack={() => setOverlay('add_vehicle_flow_brand')}
              onDone={(modelObj) => {
                setVehicleData(prev => ({ ...prev, ...modelObj, model: modelObj.name }));
                setOverlay('add_vehicle_flow_form');
              }}
            />
          </motion.div>
        )}

        {overlay === 'add_vehicle_flow_form' && (
          <motion.div
            key="add_vehicle_flow_form"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, background: '#FAFAFA',
              zIndex: 500, overflowY: 'auto',
            }}
          >
            <AddVehicleScreen
              vehicleType={vehicleType}
              vehicleData={vehicleData}
              onBack={() => setOverlay('add_vehicle_flow_brand')}
              onDone={() => setOverlay(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
