
import { Menu } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans">
      <header className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800 opacity-90"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center">
              <span className="text-3xl font-bold mr-2">Artmatch</span>
              <span className="bg-primary-600 text-white px-2 py-1 rounded-md text-xs">Beta</span>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#features" className="hover:text-primary-200 transition duration-300">
                Como Funciona
              </a>
              <a href="#plans" className="hover:text-primary-200 transition duration-300">
                Planos
              </a>
              <a href="#testimonials" className="hover:text-primary-200 transition duration-300">
                Depoimentos
              </a>
              <a href="#contact" className="hover:text-primary-200 transition duration-300">
                Contato
              </a>
              <button className="ml-4 bg-white text-primary-900 px-5 py-2 rounded-lg font-medium hover:bg-primary-50 transition duration-300">
                Entrar
              </button>
              <button className="bg-primary-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-400 transition duration-300">
                Cadastrar
              </button>
            </div>
            <button 
              className="md:hidden text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 right-0 bg-primary-800 p-4 rounded-b-lg shadow-lg z-50">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="hover:text-primary-200 transition duration-300 py-2">
                  Como Funciona
                </a>
                <a href="#plans" className="hover:text-primary-200 transition duration-300 py-2">
                  Planos
                </a>
                <a href="#testimonials" className="hover:text-primary-200 transition duration-300 py-2">
                  Depoimentos
                </a>
                <a href="#contact" className="hover:text-primary-200 transition duration-300 py-2">
                  Contato
                </a>
                <button className="bg-white text-primary-900 px-5 py-2 rounded-lg font-medium hover:bg-primary-50 transition duration-300">
                  Entrar
                </button>
                <button className="bg-primary-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-400 transition duration-300">
                  Cadastrar
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-10 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Conexão Inteligente entre Artistas e Editais
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-100">
                Encontre editais culturais compatíveis com seu perfil artístico ou descubra os
                melhores talentos para seus projetos, tudo através de um sistema inteligente de
                compatibilidade.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-50 transform hover:-translate-y-1 transition duration-300">
                  Sou Artista
                </button>
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-500 transform hover:-translate-y-1 transition duration-300">
                  Sou Organizador
                </button>
              </div>
              <div className="mt-8 flex items-center text-primary-200">
                <span className="material-symbols-outlined mr-2">verified</span>
                <span>Mais de 500 artistas conectados a oportunidades ideais</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1628359355624-855775b5c9c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxhcnRpc3RzfGVufDB8fHx8MTc0NzMzMDkxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Artists connecting with opportunities"
                className="rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition duration-500"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="fill-current text-slate-50"
          >
            <path d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,48C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 transform -mt-20 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-4 hover:bg-slate-50 rounded-lg transition duration-300">
                <div className="text-4xl font-bold text-primary-600 mb-2">90%</div>
                <div className="text-xl font-medium">Taxa de compatibilidade</div>
                <p className="text-slate-600 mt-2">
                  Algoritmo de IA que conecta perfis com editais de alta relevância
                </p>
              </div>
              <div className="text-center p-4 hover:bg-slate-50 rounded-lg transition duration-300">
                <div className="text-4xl font-bold text-primary-600 mb-2">2.500+</div>
                <div className="text-xl font-medium">Editais publicados</div>
                <p className="text-slate-600 mt-2">
                  Oportunidades verificadas de prefeituras e instituições culturais
                </p>
              </div>
              <div className="text-center p-4 hover:bg-slate-50 rounded-lg transition duration-300">
                <div className="text-4xl font-bold text-primary-600 mb-2">68%</div>
                <div className="text-xl font-medium">Aumento de aprovações</div>
                <p className="text-slate-600 mt-2">
                  Artistas têm mais sucesso nas inscrições via nossa plataforma
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como o Artmatch funciona</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nossa plataforma usa tecnologia avançada para criar conexões perfeitas entre artistas e
              oportunidades culturais.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-primary-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-primary-600">palette</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Para Artistas</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-primary-500 mr-2 mt-1">check_circle</span>
                    <span>Crie um perfil e portfólio completo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-primary-500 mr-2 mt-1">check_circle</span>
                    <span>Receba editais com alta compatibilidade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-primary-500 mr-2 mt-1">check_circle</span>
                    <span>Inscreva-se diretamente pela plataforma</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-primary-500 mr-2 mt-1">check_circle</span>
                    <span>Acompanhe o status das inscrições</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-primary-500 mr-2 mt-1">check_circle</span>
                    <span>Receba feedback e melhore seu perfil</span>
                  </li>
                </ul>
                <button className="mt-8 w-full py-3 bg-primary-100 text-primary-700 rounded-lg font-medium hover:bg-primary-200 transition duration-300">
                  Ver Mais
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-indigo-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-indigo-600">account_balance</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Para Organizadores</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span>Crie e publique editais estruturados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span>Encontre artistas altamente compatíveis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span>Use ferramentas avançadas de triagem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span>Gerencie inscrições em um só lugar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span>Acesse relatórios e métricas detalhadas</span>
                  </li>
                </ul>
                <button className="mt-8 w-full py-3 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition duration-300">
                  Ver Mais
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-emerald-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">hub</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Algoritmo Inteligente</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span>Matching baseado em múltiplos critérios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span>Análise de compatibilidade de 0-100%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span>Considera localização e experiência</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span>Aprende com dados históricos de aprovações</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span>Transparência na explicação dos resultados</span>
                  </li>
                </ul>
                <button className="mt-8 w-full py-3 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition duration-300">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-slate-100 to-slate-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8"></div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Funcionalidades da Plataforma</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Uma plataforma completa desenvolvida para transformar a maneira como artistas e
              organizadores se conectam.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600">person</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Perfil e Portfólio</h3>
              <p className="text-slate-600">
                Crie um perfil profissional completo com portfólio visual, documentos e links.
                Mostre seu trabalho no melhor formato.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600">find_in_page</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Descoberta Inteligente</h3>
              <p className="text-slate-600">
                Feed personalizado de oportunidades com porcentagem clara de compatibilidade.
                Encontre editais que realmente combinam com você.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600">edit_document</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Inscrição Simplificada</h3>
              <p className="text-slate-600">
                Inscreva-se diretamente na plataforma com formulários inteligentes que preenchem
                automaticamente dados do seu perfil.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600">dashboard</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Dashboard Completo</h3>
              <p className="text-slate-600">
                Acesse métricas, estatísticas e relatórios detalhados sobre seu perfil, inscrições e
                desempenho na plataforma.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600">notifications</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Notificações Personalizadas</h3>
              <p className="text-slate-600">
                Receba alertas sobre novos editais compatíveis, prazos, atualizações de status e
                feedback de organizadores.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600">psychology_alt</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Assistente de IA</h3>
              <p className="text-slate-600">
                Conte com um assistente inteligente que ajuda a melhorar seu perfil e responde
                dúvidas sobre a plataforma e editais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem nossos usuários</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Artistas e organizadores que transformaram sua forma de trabalhar com a Artmatch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
                <div className="ml-2 text-sm text-slate-500">5.0</div>
              </div>
              <p className="text-slate-700 mb-6">
                &quot;Consegui minha primeira bolsa de estudos internacional graças à Artmatch! A
                plataforma me conectou a uma oportunidade que eu nem sabia que existia.&quot;
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
                <div className="ml-2 text-sm text-slate-500">5.0</div>
              </div>
              <p className="text-slate-700 mb-6">
                &quot;Em apenas dois meses usando a Artmatch, recebi três propostas de editais
                relevantes para meu trabalho. A interface é intuitiva e as recomendações são
                precisas.&quot;
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
                <div className="ml-2 text-sm text-slate-500">5.0</div>
              </div>
              <p className="text-slate-700 mb-6">
                &quot;Como organizador cultural, o Artmatch revolucionou nosso processo de seleção.
                Encontramos artistas muito mais alinhados com nossos objetivos e com perfis mais completos.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Artmatch</h3>
              <p className="text-slate-300">
                Conectando talentos artísticos a oportunidades perfeitas através de tecnologia inteligente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-300 hover:text-white">Como Funciona</a></li>
                <li><a href="#plans" className="text-slate-300 hover:text-white">Planos</a></li>
                <li><a href="#testimonials" className="text-slate-300 hover:text-white">Depoimentos</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">Webinars</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">Tutoriais</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="text-slate-300">contato@artmatch.com.br</li>
                <li className="text-slate-300">+55 11 99999-9999</li>
                <li className="text-slate-300">São Paulo, SP - Brasil</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-700 text-center text-sm text-slate-400">
            &copy; 2024 Artmatch. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
