import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);

  const [activeVehicle, setActiveVehicle] = useState(0);

  const [bookings, setBookings] = useState([
    {
      id: 'MM2025001',
      service: 'Premium Foam Wash',
      provider: 'Shine Pro Auto Spa',
      date: 'Today, 3:00 PM',
      status: 'upcoming',
      amount: '₹599',
      vehicle: 'Hyundai Creta',
      icon: '🚗',
    },
    {
      id: 'MM2025002',
      service: 'Full Service',
      provider: 'QuickFix Garage',
      date: '25 Jun 2025',
      status: 'completed',
      amount: '₹2,499',
      vehicle: 'Hyundai Creta',
      icon: '🔧',
    },
    {
      id: 'MM2025003',
      service: 'Tyre Rotation',
      provider: 'TyreKing',
      date: '10 Jun 2025',
      status: 'completed',
      amount: '₹349',
      vehicle: 'RE Classic 350',
      icon: '⚙️',
    },
    {
      id: 'MM2025004',
      service: 'Battery Check',
      provider: 'PowerCell Auto',
      date: '01 Jun 2025',
      status: 'cancelled',
      amount: '₹199',
      vehicle: 'Hyundai Creta',
      icon: '🔋',
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'booking', title: 'Booking Confirmed', message: 'Your Premium Foam Wash is scheduled for Today, 3:00 PM', time: '2 min ago', read: false },
    { id: 2, type: 'reminder', title: 'Service Due Soon', message: 'Hyundai Creta service is due on 15 Aug 2025', time: '1 hour ago', read: false },
    { id: 3, type: 'offer', title: '20% Off on Car Wash', message: 'Use code CLEAN20 for 20% off on any car wash service', time: '3 hours ago', read: true },
    { id: 4, type: 'assigned', title: 'Mechanic Assigned', message: 'Ramesh Kumar has been assigned to your service', time: 'Yesterday', read: true },
    { id: 5, type: 'insurance', title: 'Insurance Expiry Alert', message: 'Your Creta insurance expires in 30 days. Renew now!', time: '2 days ago', read: true },
  ]);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider value={{
      vehicles, setVehicles,
      activeVehicle, setActiveVehicle,
      bookings, setBookings,
      notifications, setNotifications,
      darkMode, setDarkMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
