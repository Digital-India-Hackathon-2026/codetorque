import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Vinay',
    phone: '+91 98765 43210',
    email: 'vinay@example.com',
    photo: null,
    memberSince: 'January 2024',
  });

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: 'car',
      brand: 'Hyundai',
      model: 'Creta',
      regNumber: 'MH 01 AB 1234',
      nickname: 'My Creta',
      fuel: 'Petrol',
      transmission: 'Automatic',
      color: 'Phantom Black',
      year: '2022',
      mileage: '23,450 km',
      insurance: 'Valid till Dec 2025',
      puc: 'Valid till Aug 2025',
      healthScore: 87,
      lastService: '12 Feb 2025',
      nextService: '15 Aug 2025',
      image: '/assets/vehicles/cars/hyundai/creta.png',
    },
    {
      id: 2,
      type: 'bike',
      brand: 'Royal Enfield',
      model: 'Classic 350',
      regNumber: 'MH 01 CD 5678',
      nickname: 'Thunder',
      fuel: 'Petrol',
      transmission: 'Manual',
      color: 'Signals AOR',
      year: '2021',
      mileage: '12,800 km',
      insurance: 'Valid till Mar 2026',
      puc: 'Valid till Nov 2025',
      healthScore: 92,
      lastService: '03 Apr 2025',
      nextService: '03 Oct 2025',
      image: '/assets/vehicles/bikes/royal-enfield/classic-350.png',
    },
  ]);

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
      user, setUser,
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
