import { supabase } from './supabase';
import { AuthUser } from './supabase';

// Perfil mock para desenvolvimento
const MOCK_PROFILE = {
  id: '505ea4bd-eb84-465a-9b1b-5e1a3e063c61',
  email: 'artista@exemplo.com',
  full_name: 'Artista Exemplo',
  avatar_url: 'https://picsum.photos/200/200?random=1',
  bio: 'Artista visual com foco em arte contemporânea e expressões culturais do Nordeste brasileiro.',
  website: 'https://exemplo.com.br',
  location: 'Recife, PE',
  phone: '(81) 99999-9999',
  role: 'artist',
  instagram: '@artista_exemplo',
  state: 'PE',
  city: 'Recife',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Flag para usar perfil mock em desenvolvimento
const USE_MOCK_PROFILE = true; // Altere para false quando a tabela profiles existir no Supabase

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  phone?: string;
  role?: string;
  instagram?: string;
  state?: string;
  city?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileUpdateData {
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  phone?: string;
  instagram?: string;
  state?: string;
  city?: string;
}

/**
 * Busca o perfil do usuário atual
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    // Se estiver usando perfil mock, retorna o mock
    if (USE_MOCK_PROFILE) {
      console.log('Usando perfil mock para desenvolvimento');
      return MOCK_PROFILE;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        // Verificar se o erro é porque a tabela não existe
        if (error.code === '42P01') { // código para "relation does not exist"
          console.warn('A tabela profiles não existe no banco de dados. Use o script SQL para criá-la.');
          // Retornar um perfil mock com os dados do usuário atual
          return {
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name,
            avatar_url: user.user_metadata?.avatar_url,
            role: 'artist'
          } as Profile;
        } else {
          console.error('Erro ao buscar perfil:', error);
          return null;
        }
      }
      
      return data;
    } catch (error) {
      console.warn('Erro ao acessar a tabela profiles, usando perfil mock:', error);
      // Retornar um perfil mock com os dados do usuário atual
      return {
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        role: 'artist'
      } as Profile;
    }
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return null;
  }
}

/**
 * Atualiza o perfil do usuário
 */
export async function updateProfile(profileData: ProfileUpdateData): Promise<{ data: Profile | null, error: Error | null }> {
  try {
    // Se estiver usando perfil mock, simula atualização
    if (USE_MOCK_PROFILE) {
      console.log('Simulando atualização de perfil no modo desenvolvimento');
      const updatedProfile = {
        ...MOCK_PROFILE,
        ...profileData,
        updated_at: new Date().toISOString()
      };
      return { data: updatedProfile, error: null };
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: new Error('Usuário não autenticado') };
    }
    
    try {
      // Atualizar o perfil na tabela profiles
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) {
        // Verificar se o erro é porque a tabela não existe
        if (error.code === '42P01') { // código para "relation does not exist"
          console.warn('A tabela profiles não existe no banco de dados. Use o script SQL para criá-la.');
          // Retornar um perfil mock atualizado
          const mockUpdatedProfile = {
            id: user.id,
            email: user.email || '',
            ...profileData,
            updated_at: new Date().toISOString()
          } as Profile;
          return { data: mockUpdatedProfile, error: null };
        } else {
          console.error('Erro ao atualizar perfil:', error);
          return { data: null, error: new Error(error.message) };
        }
      }
      
      // Atualizar os metadados do usuário no auth
      if (profileData.full_name) {
        await supabase.auth.updateUser({
          data: { 
            full_name: profileData.full_name,
            avatar_url: profileData.avatar_url
          }
        });
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { data: null, error: error as Error };
    }
    
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Faz upload de um avatar para o usuário
 */
export async function uploadAvatar(file: File): Promise<{ url: string | null, error: Error | null }> {
  try {
    // Se estiver usando perfil mock, simula upload
    if (USE_MOCK_PROFILE) {
      console.log('Simulando upload de avatar no modo desenvolvimento');
      // Gerar uma URL aleatória do picsum para simular o upload
      const mockUrl = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
      return { url: mockUrl, error: null };
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { url: null, error: new Error('Usuário não autenticado') };
    }
    
    // Criar um nome de arquivo único para o avatar
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    try {
      // Fazer upload do arquivo para o bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) {
        console.error('Erro ao fazer upload do avatar:', uploadError);
        return { url: null, error: new Error(uploadError.message) };
      }
      
      // Obter a URL pública do avatar
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      const avatarUrl = data.publicUrl;
      
      // Atualizar o perfil com a nova URL do avatar
      try {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Erro ao atualizar avatar no perfil:', updateError);
          return { url: avatarUrl, error: new Error(updateError.message) };
        }
        
        // Atualizar os metadados do usuário no auth
        await supabase.auth.updateUser({
          data: { avatar_url: avatarUrl }
        });
        
        return { url: avatarUrl, error: null };
      } catch (error) {
        console.warn('Erro ao atualizar perfil com avatar, mas o upload foi bem-sucedido:', error);
        return { url: data.publicUrl, error: null };
      }
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error);
      return { url: null, error: error as Error };
    }
    
  } catch (error) {
    console.error('Erro ao fazer upload do avatar:', error);
    return { url: null, error: error as Error };
  }
}

/**
 * Calcula a porcentagem de completude do perfil
 */
export function calculateProfileCompleteness(profile: Profile | null): number {
  if (!profile) return 0;
  
  const fields = [
    profile.full_name,
    profile.avatar_url,
    profile.bio,
    profile.website,
    profile.location,
    profile.phone,
    profile.instagram,
    profile.state,
    profile.city
  ];
  
  const filledFields = fields.filter(field => field && field.trim() !== '').length;
  const totalFields = fields.length;
  
  return Math.round((filledFields / totalFields) * 100);
}
