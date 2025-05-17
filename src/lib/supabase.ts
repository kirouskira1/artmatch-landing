import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar as credenciais do Supabase
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: Variáveis de ambiente do Supabase não configuradas. Verifique o arquivo .env');
}

// Criar cliente Supabase com opções adicionais
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Tipos relacionados à autenticação
export type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
    picture?: string;
  };
  role?: string;
  full_name?: string;
  avatar_url?: string;
};
