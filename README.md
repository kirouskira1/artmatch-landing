# Artmatch - Conexão entre Artistas e Oportunidades Culturais

![Artmatch Banner](/public/images/artmatch-social.png)

## Sobre o Projeto

Artmatch é uma plataforma inovadora que conecta artistas a oportunidades culturais como editais, exposições e projetos. Utilizando um algoritmo inteligente de compatibilidade, o sistema facilita o encontro entre talentos artísticos e as melhores oportunidades para seu perfil.

O projeto nasceu da vivência de Adriano Rodrigues, CEO e desenvolvedor, ao perceber a dificuldade que artistas enfrentam para encontrar e compreender editais culturais. Com o Artmatch, essa barreira é eliminada, criando uma ponte entre talento e oportunidade.

### Principais Características

- **Para Artistas:**
  - Criação de perfil e portfólio completo
  - Feed personalizado de editais com alta compatibilidade
  - Inscrição simplificada diretamente pela plataforma
  - Acompanhamento do status das inscrições
  - Feedback para melhorar o perfil

- **Para Organizadores:**
  - Criação e publicação de editais estruturados
  - Descoberta de artistas altamente compatíveis
  - Ferramentas avançadas de triagem
  - Gerenciamento de inscrições em um só lugar
  - Relatórios e métricas detalhadas

## Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Supabase (autenticação, banco de dados, armazenamento)
- **UI/UX:** shadcn/ui, Lucide React (ícones)
- **PWA:** Service Worker para funcionalidade offline
- **Bibliotecas:** date-fns, react-hook-form, zod, swiper

## Como Executar Localmente

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Conta no Supabase

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/artmatch.git

# Entre no diretório
cd artmatch

# Instale as dependências
npm install
# ou
yarn install

# Configure as variáveis de ambiente
# Crie um arquivo .env com:
# VITE_SUPABASE_URL=sua_url_supabase
# VITE_SUPABASE_ANON_KEY=sua_chave_anonima

# Execute o script SQL no Supabase
# Importe o arquivo supabase-schema.sql no Editor SQL do Supabase

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

Acesse: `http://localhost:8080`

## Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com/)
2. Copie a URL e a chave anônima do projeto
3. Configure o arquivo .env com essas credenciais
4. Execute o script SQL (supabase-schema.sql) para criar as tabelas

## PWA (Progressive Web App)

Artmatch funciona como um Progressive Web App, permitindo:

- Instalação no dispositivo
- Funcionalidade offline básica
- Experiência app-like em dispositivos móveis
- Carregamento rápido

## Implantação

Este projeto pode ser implantado em serviços como:

- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## Suporte e Contribuições

Para dúvidas, sugestões ou problemas, entre em contato:
- Email: work.adrian.rodrigues@gmail.com
- LinkedIn: [Adriano Rodrigues](https://www.linkedin.com/in/adriano-rodrigues-ads/)

---

Desenvolvido pelo time Artmatch, uma iniciativa apoiada pelo Porto Digital e Prefeitura do Recife.

© 2023-2024 Artmatch. Todos os direitos reservados.
