import { supabase } from '../lib/supabase';

export const authService = {
  /**
   * Log in using Google OAuth.
   */
  async loginWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Auth Service - Google Login Error:', error);
      throw error;
    }
  },

  /**
   * Log in using Email and Password.
   */
  async loginWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Auth Service - Email Login Error:', error);
      throw error;
    }
  },

  /**
   * Register a new Customer.
   */
  async registerCustomer(email: string, password: string, fullName: string, phone: string) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Registration failed, no user returned.');

      const { error: profileError } = await supabase.from('profiles').insert([{
        id: data.user.id,
        email: email,
        full_name: fullName,
        phone: phone,
        role: 'customer'
      }]);

      if (profileError) throw profileError;
      return data;
    } catch (error) {
      console.error('Auth Service - Customer Registration Error:', error);
      throw error;
    }
  },

  /**
   * Register a new Partner (Business Onboarding).
   */
  async registerPartner(email: string, password: string, partnerData: any) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Registration failed, no user returned.');

      const { error: profileError } = await supabase.from('profiles').insert([{
        id: data.user.id,
        email: email,
        full_name: partnerData.ownerName,
        phone: partnerData.phone,
        role: 'partner'
      }]);
      
      if (profileError) throw profileError;

      const { error: partnerError } = await supabase.from('partners').insert([{
        id: data.user.id,
        business_name: partnerData.businessName,
        owner_name: partnerData.ownerName,
        business_type: partnerData.businessType,
        phone: partnerData.phone,
        email: email,
        address: partnerData.address,
        city: partnerData.city,
        state: partnerData.state,
        pincode: partnerData.pincode,
        working_days: partnerData.workingDays,
        working_hours: partnerData.workingHours,
        years_experience: parseInt(partnerData.yearsExperience) || 0,
        services_offered: partnerData.servicesOffered || [],
        doorstep_service: partnerData.doorstepService || false,
        emergency_service: partnerData.emergencyService || false,
        gst_number: partnerData.gst || null,
        status: 'pending'
      }]);

      if (partnerError) throw partnerError;
      return data;
    } catch (error) {
      console.error('Auth Service - Partner Registration Error:', error);
      throw error;
    }
  },

  /**
   * Check if profile exists, and create one if it doesn't.
   * Useful for OAuth logins where the profile isn't manually created.
   */
  async ensureProfileExists(user: any) {
    if (!user) return;
    try {
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!existingProfile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            full_name: user.user_metadata?.full_name || '',
            email: user.email,
            avatar_url: user.user_metadata?.avatar_url || '',
            role: 'customer',
          }]);
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Auth Service - Ensure Profile Error:', error);
    }
  },

  /**
   * Log out the current user.
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Auth Service - Logout Error:', error);
      throw error;
    }
  },

  /**
   * Get the current session.
   */
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Restore session.
   */
  async restoreSession() {
    return await this.getCurrentSession();
  }
};
