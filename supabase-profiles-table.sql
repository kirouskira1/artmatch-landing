-- Criar a tabela profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  phone TEXT,
  role TEXT DEFAULT 'artist',
  instagram TEXT,
  state TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Configurar segurança da tabela (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso
CREATE POLICY "Usuários podem ver seus próprios perfis"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Função para criar perfil automaticamente quando um novo usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil quando um novo usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Comentário para explicar como usar este script
COMMENT ON TABLE public.profiles IS 'Tabela de perfis de usuários do Artmatch';
