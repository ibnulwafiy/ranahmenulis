import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { supabase } from '@/services/supabase';

interface AuthContextType {
  user: User & { id?: string };
  isLoading: boolean;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
}

const initialUser: User & { id?: string } = {
  name: '',
  isLoggedIn: false,
  rememberDevice: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User & { id?: string }>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from Supabase
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email, session.user.last_sign_in_at);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email, session.user.last_sign_in_at);
      } else {
        setUser(initialUser);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email: string | undefined, lastSignIn: string | undefined) => {
    let name = email?.split('@')[0] || 'Penulis';
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .maybeSingle();

      if (profile?.full_name) {
        name = profile.full_name;
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setUser({
        id: userId,
        name: name,
        isLoggedIn: true,
        rememberDevice: true,
        lastLogin: lastSignIn || undefined,
      });
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      let redirectUrl = (import.meta as any).env.VITE_AUTH_REDIRECT_URL;
      if (!redirectUrl || !redirectUrl.startsWith('http')) {
        redirectUrl = window.location.origin;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal masuk dengan Google. Silakan coba lagi.' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const updateUserName = async (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    
    if (!user.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: trimmed,
          updated_at: new Date().toISOString(),
        });
      
      if (!error) {
        setUser((prev) => ({ ...prev, name: trimmed }));
      } else {
        console.error('Error updating profile name:', error);
      }
    } catch (e) {
      console.error('Error in updateUserName:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        logout,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
