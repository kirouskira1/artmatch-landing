-- Configuração inicial do banco de dados Artmatch
-- Este script cria todas as tabelas necessárias para o funcionamento do aplicativo

-- Tabela de perfis (estende a tabela auth.users do Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'artist', -- 'artist' ou 'organizer'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para criar automaticamente um perfil quando um usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'artist')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para chamar a função quando um novo usuário é criado
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tabela de categorias de arte
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir categorias iniciais
INSERT INTO categories (name, description) VALUES
  ('Artes Visuais', 'Pintura, desenho, gravura, escultura, fotografia, etc.'),
  ('Artes Plásticas', 'Escultura, cerâmica, modelagem, etc.'),
  ('Arte Digital', 'Arte criada ou apresentada usando tecnologia digital'),
  ('Fotografia', 'Arte fotográfica em todas as suas formas'),
  ('Performance', 'Arte performática e intervenções artísticas'),
  ('Audiovisual', 'Cinema, vídeo-arte e outras formas audiovisuais'),
  ('Música', 'Composição e performance musical'),
  ('Literatura', 'Poesia, prosa, dramaturgia e outras formas literárias'),
  ('Dança', 'Coreografia e performance de dança'),
  ('Teatro', 'Artes cênicas e dramáticas'),
  ('Moda', 'Design de moda e estilismo'),
  ('Design', 'Design gráfico, de produto, etc.'),
  ('Arquitetura', 'Projetos arquitetônicos e urbanísticos'),
  ('Artesanato', 'Técnicas tradicionais e contemporâneas de artesanato'),
  ('Multimídia', 'Projetos que combinam múltiplas formas de arte')
ON CONFLICT (name) DO NOTHING;

-- Tabela de editais
CREATE TABLE IF NOT EXISTS editals (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organization_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  location TEXT,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  event_end_date TIMESTAMP WITH TIME ZONE,
  category_id INTEGER REFERENCES categories(id),
  value TEXT,
  slots INTEGER,
  requirements TEXT[],
  documents TEXT[],
  criteria JSONB,
  status TEXT NOT NULL DEFAULT 'open', -- 'open', 'closed', 'draft'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de etapas do edital
CREATE TABLE IF NOT EXISTS edital_stages (
  id SERIAL PRIMARY KEY,
  edital_id INTEGER REFERENCES editals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de inscrições
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  edital_id INTEGER REFERENCES editals(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'under_review', 'approved', 'rejected'
  submission_data JSONB, -- Dados específicos da submissão
  documents JSONB, -- Links para documentos enviados
  feedback TEXT,
  score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos de inscrição
CREATE TABLE IF NOT EXISTS application_documents (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de portfólio do artista
CREATE TABLE IF NOT EXISTS portfolio_items (
  id SERIAL PRIMARY KEY,
  artist_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  year INTEGER,
  dimensions TEXT,
  materials TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  edital_id INTEGER REFERENCES editals(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'edital', 'application', 'message', 'system'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações de notificação
CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'edital', 'application', 'message', 'system'
  email BOOLEAN DEFAULT TRUE,
  push BOOLEAN DEFAULT TRUE,
  site BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, type)
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  edital_id INTEGER REFERENCES editals(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, edital_id)
);

-- Configurar políticas de segurança (RLS - Row Level Security)

-- Política para perfis: usuários só podem ver seus próprios dados
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver todos os perfis" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Usuários só podem atualizar seus próprios perfis" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Política para editais: organizadores podem criar e editar seus próprios editais
ALTER TABLE editals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ver editais publicados" 
  ON editals FOR SELECT 
  USING (status = 'open' OR organization_id = auth.uid());

CREATE POLICY "Organizadores podem criar editais" 
  ON editals FOR INSERT 
  WITH CHECK (organization_id = auth.uid());

CREATE POLICY "Organizadores podem atualizar seus próprios editais" 
  ON editals FOR UPDATE 
  USING (organization_id = auth.uid());

-- Política para inscrições: artistas podem ver e editar suas próprias inscrições
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artistas podem ver suas próprias inscrições" 
  ON applications FOR SELECT 
  USING (artist_id = auth.uid() OR EXISTS (
    SELECT 1 FROM editals WHERE editals.id = applications.edital_id AND editals.organization_id = auth.uid()
  ));

CREATE POLICY "Artistas podem criar inscrições" 
  ON applications FOR INSERT 
  WITH CHECK (artist_id = auth.uid());

CREATE POLICY "Artistas podem atualizar suas próprias inscrições" 
  ON applications FOR UPDATE 
  USING (artist_id = auth.uid() OR EXISTS (
    SELECT 1 FROM editals WHERE editals.id = applications.edital_id AND editals.organization_id = auth.uid()
  ));

-- Política para mensagens
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver mensagens enviadas ou recebidas" 
  ON messages FOR SELECT 
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Usuários podem enviar mensagens" 
  ON messages FOR INSERT 
  WITH CHECK (sender_id = auth.uid());

-- Política para notificações
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas próprias notificações" 
  ON notifications FOR SELECT 
  USING (user_id = auth.uid());

-- Política para configurações de notificação
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas próprias configurações" 
  ON notification_settings FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Usuários podem atualizar suas próprias configurações" 
  ON notification_settings FOR UPDATE 
  USING (user_id = auth.uid());

-- Política para favoritos
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios favoritos" 
  ON favorites FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Usuários podem adicionar favoritos" 
  ON favorites FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Usuários podem remover seus próprios favoritos" 
  ON favorites FOR DELETE 
  USING (user_id = auth.uid());

-- Criar funções para operações comuns

-- Função para buscar editais compatíveis com o perfil do artista
CREATE OR REPLACE FUNCTION get_matching_editals(artist_uuid UUID)
RETURNS TABLE (
  edital_id INTEGER,
  title TEXT,
  organization_name TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  category_name TEXT,
  compatibility FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id as edital_id,
    e.title,
    e.organization_name,
    e.deadline,
    c.name as category_name,
    -- Algoritmo simples de compatibilidade (será melhorado com IA)
    (RANDOM() * 30 + 70)::FLOAT as compatibility
  FROM 
    editals e
  JOIN 
    categories c ON e.category_id = c.id
  WHERE 
    e.status = 'open'
  AND
    e.deadline > NOW()
  ORDER BY 
    compatibility DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para obter estatísticas de um organizador
CREATE OR REPLACE FUNCTION get_organizer_stats(organizer_uuid UUID)
RETURNS TABLE (
  total_editals INTEGER,
  active_editals INTEGER,
  total_applications INTEGER,
  pending_applications INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM editals WHERE organization_id = organizer_uuid) as total_editals,
    (SELECT COUNT(*) FROM editals WHERE organization_id = organizer_uuid AND status = 'open') as active_editals,
    (SELECT COUNT(*) FROM applications a JOIN editals e ON a.edital_id = e.id WHERE e.organization_id = organizer_uuid) as total_applications,
    (SELECT COUNT(*) FROM applications a JOIN editals e ON a.edital_id = e.id WHERE e.organization_id = organizer_uuid AND a.status = 'pending') as pending_applications;
END;
$$ LANGUAGE plpgsql;

-- Função para obter estatísticas de um artista
CREATE OR REPLACE FUNCTION get_artist_stats(artist_uuid UUID)
RETURNS TABLE (
  total_applications INTEGER,
  active_applications INTEGER,
  approved_applications INTEGER,
  portfolio_items INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM applications WHERE artist_id = artist_uuid) as total_applications,
    (SELECT COUNT(*) FROM applications a JOIN editals e ON a.edital_id = e.id WHERE a.artist_id = artist_uuid AND e.status = 'open') as active_applications,
    (SELECT COUNT(*) FROM applications WHERE artist_id = artist_uuid AND status = 'approved') as approved_applications,
    (SELECT COUNT(*) FROM portfolio_items WHERE artist_id = artist_uuid) as portfolio_items;
END;
$$ LANGUAGE plpgsql;
