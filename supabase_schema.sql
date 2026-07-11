-- MotoMate Full Supabase Schema
-- Run this entire script in the Supabase SQL Editor.

-------------------------------------------------------------------
-- 1. EXTENSIONS
-------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------------------------------
-- 2. CREATE TABLES
-------------------------------------------------------------------

-- PROFILES (Customers, Partners, Admins)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('customer', 'partner', 'admin')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PARTNERS (Business Details)
CREATE TABLE public.partners (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  working_days TEXT,
  working_hours TEXT,
  years_experience INTEGER,
  services_offered TEXT[],
  doorstep_service BOOLEAN DEFAULT false,
  emergency_service BOOLEAN DEFAULT false,
  gst_number TEXT,
  business_logo_url TEXT,
  shop_photo_url TEXT,
  owner_id_url TEXT,
  business_reg_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VEHICLES (Customer Garage)
CREATE TABLE public.vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('car', 'bike')),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  reg_number TEXT NOT NULL,
  nickname TEXT,
  fuel TEXT,
  transmission TEXT,
  color TEXT,
  year TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MASTER SERVICES (Global Catalog)
CREATE TABLE public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  base_price NUMERIC,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PARTNER SERVICES (Pricing per partner)
CREATE TABLE public.partner_services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(partner_id, service_id)
);

-- BOOKINGS
CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  address TEXT,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'cancelled', 'rejected')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-------------------------------------------------------------------
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-------------------------------------------------------------------
-- 4. RLS POLICIES
-------------------------------------------------------------------

-- Profiles: Users can read and update their own profile. Admins can read all.
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Partners: Public can read approved partners. Partners can manage their own. Admins can manage all.
CREATE POLICY "Public can view approved partners" ON public.partners FOR SELECT USING (status = 'approved');
CREATE POLICY "Partners can view and update their own business" ON public.partners FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins can manage all partners" ON public.partners FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Vehicles: Users can manage their own vehicles.
CREATE POLICY "Users can manage their own vehicles" ON public.vehicles FOR ALL USING (auth.uid() = user_id);

-- Services: Public read-only. Admins manage.
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Partner Services: Public read-only. Partners manage their own.
CREATE POLICY "Public can view partner services" ON public.partner_services FOR SELECT USING (true);
CREATE POLICY "Partners can manage their own services" ON public.partner_services FOR ALL USING (auth.uid() = partner_id);

-- Bookings: Customers can see their own. Partners can see their own. Admins can see all.
CREATE POLICY "Customers can manage their own bookings" ON public.bookings FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Partners can view and update their assigned bookings" ON public.bookings FOR ALL USING (auth.uid() = partner_id);
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Notifications: Users can manage their own notifications.
CREATE POLICY "Users can manage their own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Reviews: Public can read. Customers can insert/update their own.
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Customers can manage their own reviews" ON public.reviews FOR ALL USING (auth.uid() = customer_id);

-------------------------------------------------------------------
-- 5. REALTIME SUBSCRIPTIONS
-------------------------------------------------------------------
-- Enable Realtime for Bookings and Notifications
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-------------------------------------------------------------------
-- 6. STORAGE BUCKETS
-------------------------------------------------------------------
-- Note: Buckets should ideally be created via Supabase Dashboard GUI (Storage -> New Bucket)
-- Buckets to create: 'avatars', 'vehicles', 'shops'
-- Make them PUBLIC so images can be served to the UI.
