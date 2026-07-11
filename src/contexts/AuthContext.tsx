import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/auth.service';

interface AuthContextType {
  user: any | null;
  session: any | null;
  profile: any | null;
  partnerData: any | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (e: string, p: string) => Promise<any>;
  registerCustomer: (e: string, p: string, n: string, ph: string) => Promise<any>;
  registerPartner: (e: string, p: string, d: any) => Promise<any>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  restoreSession: () => Promise<void>;
  mockLogin: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  partnerData: null,
  loading: true,
  loginWithGoogle: async () => {},
  loginWithEmail: async () => {},
  registerCustomer: async () => {},
  registerPartner: async () => {},
  logout: async () => {},
  refreshSession: async () => {},
  restoreSession: async () => {},
  mockLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [partnerData, setPartnerData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) {
        setProfile(data);
        if (data.role === 'partner') {
          const { data: pData } = await supabase.from('partners').select('*').eq('id', userId).single();
          setPartnerData(pData);
        } else {
          setPartnerData(null);
        }
      } else {
        setProfile(null);
        setPartnerData(null);
      }
    } catch (e) {
      console.error(e);
      setProfile(null);
      setPartnerData(null);
    }
  };

  const refreshSession = async () => {
    try {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session?.user) {
        await authService.ensureProfileExists(session.user);
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setSession(session);
      setUser(session?.user || null);
    } catch (error) {
      console.error('Error refreshing session:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          await authService.ensureProfileExists(session.user);
          await fetchProfile(session.user.id);
        }
      }

      if (event === 'SIGNED_OUT') {
        setProfile(null);
      }

      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await authService.loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      setLoading(false);
      throw error;
    }
  };

  const loginWithEmail = async (e: string, p: string) => {
    setLoading(true);
    try {
      const data = await authService.loginWithEmail(e, p);
      await refreshSession();
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const registerCustomer = async (e: string, p: string, n: string, ph: string) => {
    setLoading(true);
    try {
      const data = await authService.registerCustomer(e, p, n, ph);
      await refreshSession();
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const registerPartner = async (e: string, p: string, d: any) => {
    setLoading(true);
    try {
      const data = await authService.registerPartner(e, p, d);
      await refreshSession();
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setSession(null);
      setUser(null);
      setProfile(null);
      setPartnerData(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const restoreSession = async () => {
    return refreshSession();
  };

  const mockLogin = () => {
    console.warn("MOCK LOGIN USED");
    const mockUser = {
      id: 'mock-user-123',
      email: 'mock@example.com',
      user_metadata: { full_name: 'Mock User' }
    };
    setUser(mockUser);
    setProfile({ role: 'customer', full_name: 'Mock User', email: 'mock@example.com' });
    setSession({ user: mockUser });
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      partnerData,
      loading,
      loginWithGoogle,
      loginWithEmail,
      registerCustomer,
      registerPartner,
      logout,
      refreshSession,
      restoreSession,
      mockLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
