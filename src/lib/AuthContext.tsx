import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, AuthUser } from './supabase';

type AuthContextType = {
  session: Session | null;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{data: any, error: AuthError | null}>;
  signInWithGoogle: () => Promise<{data: any, error: AuthError | null}>;
  signUp: (email: string, password: string) => Promise<{data: any, error: AuthError | null}>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{data: any, error: AuthError | null}>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Erro ao obter sessão:', error);
        setError(error.message);
      } else {
        setSession(session);
        if (session?.user) {
          const userData: AuthUser = {
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
            role: session.user.user_metadata?.role || 'artist',
            full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture
          };
          setUser(userData);
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        if (session?.user) {
          const userData: AuthUser = {
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
            role: session.user.user_metadata?.role || 'artist',
            full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return { data: null, error: { message: error.message } as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return { data: null, error: { message: error.message } as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Configurar opções para enviar email de confirmação
      const result = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            role: 'artist', // Definir papel padrão como artista
            full_name: email.split('@')[0] // Nome temporário baseado no email
          }
        }
      });
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return { data: null, error: { message: error.message } as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return { data: null, error: { message: error.message } as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    loading,
    error,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
