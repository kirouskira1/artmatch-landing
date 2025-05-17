import { supabase } from './supabase';
import { Database } from './database.types';

// Tipos para o uso no aplicativo
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Edital = Database['public']['Tables']['editals']['Row'];
export type Application = Database['public']['Tables']['applications']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];

// API para perfis
export const profilesApi = {
  // Obter perfil do usuário atual
  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    
    return data;
  },
  
  // Atualizar perfil
  async updateProfile(profile: Partial<Profile>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
      .select()
      .single();
      
    if (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { error: error.message };
    }
    
    return { data };
  },
  
  // Obter perfil por ID
  async getProfileById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    
    return data;
  }
};

// API para editais
export const editalsApi = {
  // Obter todos os editais
  async getAllEditals() {
    const { data, error } = await supabase
      .from('editals')
      .select(`
        *,
        categories(name)
      `)
      .eq('status', 'open')
      .order('deadline', { ascending: true });
      
    if (error) {
      console.error('Erro ao buscar editais:', error);
      return [];
    }
    
    return data;
  },
  
  // Obter edital por ID
  async getEditalById(id: number) {
    const { data, error } = await supabase
      .from('editals')
      .select(`
        *,
        categories(name),
        edital_stages(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Erro ao buscar edital:', error);
      return null;
    }
    
    return data;
  },
  
  // Obter editais recomendados para o artista
  async getRecommendedEditals() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .rpc('get_matching_editals', { artist_uuid: user.id });
      
    if (error) {
      console.error('Erro ao buscar editais recomendados:', error);
      return [];
    }
    
    return data;
  },
  
  // Criar novo edital (apenas para organizadores)
  async createEdital(edital: Omit<Edital, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    // Verificar se o usuário é um organizador
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (!profile || profile.role !== 'organizer') {
      return { error: 'Apenas organizadores podem criar editais' };
    }
    
    const { data, error } = await supabase
      .from('editals')
      .insert({
        ...edital,
        organization_id: user.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Erro ao criar edital:', error);
      return { error: error.message };
    }
    
    return { data };
  }
};

// API para inscrições
export const applicationsApi = {
  // Obter inscrições do usuário atual
  async getUserApplications() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        editals(id, title, organization_name, deadline, status)
      `)
      .eq('artist_id', user.id);
      
    if (error) {
      console.error('Erro ao buscar inscrições:', error);
      return [];
    }
    
    return data;
  },
  
  // Criar nova inscrição
  async createApplication(editalId: number, submissionData: any) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { data, error } = await supabase
      .from('applications')
      .insert({
        edital_id: editalId,
        artist_id: user.id,
        submission_data: submissionData,
        status: 'pending'
      })
      .select()
      .single();
      
    if (error) {
      console.error('Erro ao criar inscrição:', error);
      return { error: error.message };
    }
    
    return { data };
  },
  
  // Obter inscrições para um edital (apenas para organizadores)
  async getEditalApplications(editalId: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    // Verificar se o usuário é o organizador do edital
    const { data: edital } = await supabase
      .from('editals')
      .select('organization_id')
      .eq('id', editalId)
      .single();
      
    if (!edital || edital.organization_id !== user.id) {
      console.error('Usuário não autorizado a ver estas inscrições');
      return [];
    }
    
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        profiles(id, full_name, avatar_url)
      `)
      .eq('edital_id', editalId);
      
    if (error) {
      console.error('Erro ao buscar inscrições do edital:', error);
      return [];
    }
    
    return data;
  }
};

// API para portfólio
export const portfolioApi = {
  // Obter itens do portfólio do usuário atual
  async getUserPortfolio() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .select(`
        *,
        categories(name)
      `)
      .eq('artist_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar portfólio:', error);
      return [];
    }
    
    return data;
  },
  
  // Adicionar item ao portfólio
  async addPortfolioItem(item: Omit<PortfolioItem, 'id' | 'artist_id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert({
        ...item,
        artist_id: user.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Erro ao adicionar item ao portfólio:', error);
      return { error: error.message };
    }
    
    return { data };
  },
  
  // Remover item do portfólio
  async removePortfolioItem(id: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id)
      .eq('artist_id', user.id);
      
    if (error) {
      console.error('Erro ao remover item do portfólio:', error);
      return { error: error.message };
    }
    
    return { success: true };
  }
};

// API para mensagens
export const messagesApi = {
  // Obter conversas do usuário
  async getUserConversations() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    // Buscar todas as mensagens enviadas ou recebidas pelo usuário
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(id, full_name, avatar_url, role),
        recipient:recipient_id(id, full_name, avatar_url, role),
        editals:edital_id(id, title)
      `)
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar conversas:', error);
      return [];
    }
    
    // Agrupar mensagens por contato
    const conversations: Record<string, any> = {};
    
    data.forEach(message => {
      // Determinar o ID do contato (a outra pessoa na conversa)
      const contactId = message.sender_id === user.id ? message.recipient_id : message.sender_id;
      
      if (!contactId) return; // Ignorar mensagens do sistema sem destinatário
      
      if (!conversations[contactId]) {
        const contact = message.sender_id === user.id ? message.recipient : message.sender;
        
        conversations[contactId] = {
          id: contactId,
          name: contact?.full_name || 'Usuário desconhecido',
          avatar: contact?.avatar_url,
          role: contact?.role,
          lastMessage: message.content,
          lastMessageDate: message.created_at,
          unreadCount: message.sender_id !== user.id && !message.read ? 1 : 0,
          editalId: message.edital_id,
          editalTitle: message.editals?.title
        };
      } else {
        // Atualizar contagem de não lidas
        if (message.sender_id !== user.id && !message.read) {
          conversations[contactId].unreadCount += 1;
        }
        
        // Atualizar última mensagem se for mais recente
        if (new Date(message.created_at) > new Date(conversations[contactId].lastMessageDate)) {
          conversations[contactId].lastMessage = message.content;
          conversations[contactId].lastMessageDate = message.created_at;
        }
      }
    });
    
    return Object.values(conversations);
  },
  
  // Obter mensagens de uma conversa
  async getConversationMessages(contactId: string, editalId?: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    let query = supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},recipient_id.eq.${contactId}),and(sender_id.eq.${contactId},recipient_id.eq.${user.id})`)
      .order('created_at', { ascending: true });
      
    if (editalId) {
      query = query.eq('edital_id', editalId);
    }
    
    const { data, error } = await query;
      
    if (error) {
      console.error('Erro ao buscar mensagens:', error);
      return [];
    }
    
    // Marcar mensagens como lidas
    const unreadMessages = data
      .filter(msg => msg.sender_id === contactId && !msg.read)
      .map(msg => msg.id);
      
    if (unreadMessages.length > 0) {
      await supabase
        .from('messages')
        .update({ read: true })
        .in('id', unreadMessages);
    }
    
    return data;
  },
  
  // Enviar mensagem
  async sendMessage(recipientId: string, content: string, editalId?: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        recipient_id: recipientId,
        edital_id: editalId || null,
        content,
        read: false
      })
      .select()
      .single();
      
    if (error) {
      console.error('Erro ao enviar mensagem:', error);
      return { error: error.message };
    }
    
    return { data };
  }
};

// API para notificações
export const notificationsApi = {
  // Obter notificações do usuário
  async getUserNotifications() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar notificações:', error);
      return [];
    }
    
    return data;
  },
  
  // Marcar notificação como lida
  async markNotificationAsRead(id: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      return { error: error.message };
    }
    
    return { success: true };
  },
  
  // Marcar todas as notificações como lidas
  async markAllNotificationsAsRead() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false);
      
    if (error) {
      console.error('Erro ao marcar todas notificações como lidas:', error);
      return { error: error.message };
    }
    
    return { success: true };
  },
  
  // Obter configurações de notificação
  async getNotificationSettings() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Erro ao buscar configurações de notificação:', error);
      return [];
    }
    
    return data;
  },
  
  // Atualizar configuração de notificação
  async updateNotificationSetting(type: string, field: 'email' | 'push' | 'site', value: boolean) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    // Verificar se a configuração já existe
    const { data: existing } = await supabase
      .from('notification_settings')
      .select('id')
      .eq('user_id', user.id)
      .eq('type', type)
      .single();
      
    let result;
    
    if (existing) {
      // Atualizar configuração existente
      result = await supabase
        .from('notification_settings')
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Criar nova configuração
      result = await supabase
        .from('notification_settings')
        .insert({
          user_id: user.id,
          type,
          [field]: value
        })
        .select()
        .single();
    }
    
    if (result.error) {
      console.error('Erro ao atualizar configuração de notificação:', result.error);
      return { error: result.error.message };
    }
    
    return { data: result.data };
  }
};

// API para categorias
export const categoriesApi = {
  // Obter todas as categorias
  async getAllCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
      
    if (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
    
    return data;
  }
};

// API para favoritos
export const favoritesApi = {
  // Obter editais favoritos do usuário
  async getUserFavorites() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        editals(*)
      `)
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Erro ao buscar favoritos:', error);
      return [];
    }
    
    return data.map(fav => fav.editals);
  },
  
  // Adicionar edital aos favoritos
  async addToFavorites(editalId: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        edital_id: editalId
      })
      .select()
      .single();
      
    if (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      return { error: error.message };
    }
    
    return { data };
  },
  
  // Remover edital dos favoritos
  async removeFromFavorites(editalId: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return { error: 'Usuário não autenticado' };
    
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('edital_id', editalId);
      
    if (error) {
      console.error('Erro ao remover dos favoritos:', error);
      return { error: error.message };
    }
    
    return { success: true };
  },
  
  // Verificar se um edital está nos favoritos
  async isEditalFavorite(editalId: number) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('edital_id', editalId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // Não encontrado
        return false;
      }
      console.error('Erro ao verificar favorito:', error);
      return false;
    }
    
    return !!data;
  }
};
