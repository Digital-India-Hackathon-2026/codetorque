import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { useApp } from './context/AppContext';
import SplashScreen from './screens/SplashScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import CustomerRegisterScreen from './screens/CustomerRegisterScreen';
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
  REGISTER: 'register',
  VEHICLE_SELECT: 'vehicle_select',
  VEHICLE_BRAND: 'vehicle_brand',
  VEHICLE_MODEL: 'vehicle_model',
  ADD_VEHICLE: 'add_vehicle',
  MAIN: 'main',

  PARTNER_LOGIN: 'partner_login',
  PARTNER_DASHBOARD: 'partner_dashboard',

  // Admin flows
  ADMIN_LOGIN: 'admin_login',
  ADMIN_DASHBOARD: 'admin_dashboard',
};

function AppContent() {
  const { user, profile, partnerData, loading: authLoading } = useAuth();
  const { vehicles, setVehicles, setActiveVehicle } = useApp();
  const [flow, setFlow] = useState(FLOWS.SPLASH);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [overlay, setOverlay] = useState(null); // 'booking', 'notifications', 'add_vehicle_flow'
  const [bookingProvider, setBookingProvider] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [serviceTarget, setServiceTarget] = useState({ category: 'carwash', option: null });
  const [profileTarget, setProfileTarget] = useState('profile');

  // ─── Auth Routing ───────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading) {
      if (user && profile) {
        // Default Customer routing (Admin and Partner mock flows handled manually via onDone)
        if (profile.role === 'customer') {
          const authFlows = [FLOWS.SPLASH, FLOWS.ROLE_SELECTION, FLOWS.LOGIN, FLOWS.REGISTER];
          if (authFlows.includes(flow)) {
            setFlow(FLOWS.VEHICLE_SELECT);
          }
        }
      } else if (!user) {
        // User is not logged in. 
        // If they are in a protected customer flow, push to role selection
        const protectedFlows = [
          FLOWS.VEHICLE_SELECT, FLOWS.VEHICLE_BRAND, 
          FLOWS.VEHICLE_MODEL, FLOWS.ADD_VEHICLE, FLOWS.MAIN
        ];
        
        if (protectedFlows.includes(flow)) {
           setFlow(FLOWS.ROLE_SELECTION);
        }
      }
    }
  }, [user, profile, authLoading, flow]);

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
      setActiveTab('services');
      return;
    }
    if (tab === 'profile' || tab === 'bookings' || tab === 'vehicles') {
      let target = 'profile';
      if (tab === 'bookings') target = 'bookings';
      else if (tab === 'vehicles') target = 'vehicles';
      else if (subId) target = subId;
      
      setProfileTarget(target);
      setActiveTab('profile');
      return;
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
        return <ProfileScreen onAddVehicle={handleAddVehicleFlow} initialTab={profileTarget} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onBookOffer={handleBook} />;
    }
  };

  // ─── SPLASH ─────────────────────────────────────────────────────────
  if (flow === FLOWS.SPLASH || authLoading) {
    return <SplashScreen onDone={() => {
       if (!authLoading && !user) setFlow(FLOWS.ROLE_SELECTION)
    }} />;
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
    return <LoginScreen onDone={() => setFlow(FLOWS.VEHICLE_SELECT)} onRegister={() => setFlow(FLOWS.REGISTER)} />;
  }

  // ─── REGISTER ─────────────────────────────────────────────────────────
  if (flow === FLOWS.REGISTER) {
    return <CustomerRegisterScreen onBack={() => setFlow(FLOWS.LOGIN)} onDone={() => setFlow(FLOWS.VEHICLE_SELECT)} />;
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
        onDone={() => {
          setActiveTab('home');
          setFlow(FLOWS.MAIN);
        }}
      />
    );
  }

  // ─── PARTNER FLOWS ────────────────────────────────────────────────────
  if (flow === FLOWS.PARTNER_LOGIN) {
    return (
      <PartnerLoginScreen 
        onBack={() => setFlow(FLOWS.ROLE_SELECTION)}
        onDone={() => setFlow(FLOWS.PARTNER_DASHBOARD)} 
      />
    );
  }

  if (flow === FLOWS.PARTNER_DASHBOARD) {
    return <PartnerDashboardScreen onLogout={() => setFlow(FLOWS.ROLE_SELECTION)} />;
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
    return <AdminDashboardScreen onLogout={() => setFlow(FLOWS.ROLE_SELECTION)} />;
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

export default AppContent;
