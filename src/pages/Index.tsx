import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import CardSlider from "@/components/ui/CardSlider";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-sans transition-colors duration-300">
      <header className="relative bg-primary-900 text-white transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 dark:from-primary-900 dark:via-primary-800 dark:to-primary-700 opacity-95 transition-colors duration-300"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-2 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">Artmatch</span>
                <span className="bg-yellow-400 text-primary-900 px-2 py-1 rounded-md text-xs font-bold">Beta</span>
              </div>
              <div className="flex items-center ml-2 space-x-3 md:space-x-4">
                <img 
                  src="/partners/porto-digital-white.svg" 
                  alt="Porto Digital" 
                  className="h-4 md:h-6" 
                  title="Porto Digital"
                />
                <div className="h-4 md:h-6 w-px bg-white/30"></div>
                <img 
                  src="/partners/prefeitura-recife-white.png" 
                  alt="Prefeitura do Recife" 
                  className="h-5 md:h-8" 
                  title="Prefeitura do Recife"
                />
              </div>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#features" className="hover:text-yellow-300 transition duration-300 font-semibold text-lg group">
                Como Funciona
                <span className="block h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#sobre" className="hover:text-yellow-300 transition duration-300 font-semibold text-lg group">
                Sobre Nós
                <span className="block h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#testimonials" className="hover:text-yellow-300 transition duration-300 font-semibold text-lg group">
                Depoimentos
                <span className="block h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              {/* Campo de busca removido */}
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="ml-4 bg-yellow-400 text-primary-900 px-6 py-2.5 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30 flex items-center"
                >
                  <span>Meu Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="ml-4 bg-white text-primary-900 px-6 py-2.5 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-white/20 flex items-center">
                    <span>Entrar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link to="/register" className="bg-yellow-400 text-slate-900 px-5 py-2 rounded-lg font-semibold text-lg hover:bg-yellow-300 transform hover:-translate-y-1 transition duration-300">
                    Cadastrar
                  </Link>
                </>
              )}
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

                <a href="#features" className="hover:text-primary-200 transition duration-300 py-2 font-semibold text-lg">
                  Como Funciona
                </a>
                <a href="#sobre" className="hover:text-primary-200 transition duration-300 py-2 font-semibold text-lg">
                  Sobre Nós
                </a>
                <a href="#testimonials" className="hover:text-primary-200 transition duration-300 py-2 font-semibold text-lg">
                  Depoimentos
                </a>
                {user ? (
                  <Link to="/dashboard" className="bg-white text-primary-900 px-5 py-2 rounded-lg font-semibold text-lg hover:bg-primary-50 transform hover:-translate-y-1 transition duration-300">
                    Meu Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="bg-white text-primary-900 px-5 py-2 rounded-lg font-semibold text-lg hover:bg-primary-50 transform hover:-translate-y-1 transition duration-300">
                      Entrar
                    </Link>
                    <Link to="/register" className="bg-yellow-400 text-slate-900 px-5 py-2 rounded-lg font-semibold text-lg hover:bg-yellow-300 transform hover:-translate-y-1 transition duration-300">
                      Cadastrar
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-10 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Conexão Inteligente entre Artistas e Editais
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white font-medium drop-shadow-sm">
                Encontre editais culturais compatíveis com seu perfil artístico ou descubra os
                melhores talentos para seus projetos, tudo através de um sistema inteligente de
                compatibilidade.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="relative overflow-hidden group bg-yellow-400 text-primary-900 hover:bg-yellow-300 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-yellow-400/40 flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Comece Agora
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </Link>
                <a 
                  href="#features" 
                  className="relative overflow-hidden group bg-transparent border-2 border-white/40 text-white hover:border-yellow-400 hover:text-yellow-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Saiba Mais
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </a>
              </div>
              <div className="mt-8 flex items-center text-white">
                <span className="material-symbols-outlined mr-2 text-primary-200">verified</span>
                <span>Mais de 500 artistas conectados a oportunidades ideais</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1747423643454-40bcc8db102a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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

      {/* Seção de Estatísticas */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl shadow-xl p-8 transform -mt-20 relative z-20 transition-all duration-500 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 hover:bg-white/10 rounded-xl transition duration-300 group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-4xl text-white">analytics</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2 transition-colors duration-300">90%</div>
                <div className="text-xl font-medium text-white/90 transition-colors duration-300">Taxa de Compatibilidade</div>
                <p className="text-white/80 mt-2 text-sm">
                  Algoritmo de IA que conecta perfis com editais de alta relevância
                </p>
              </div>
              <div className="text-center p-6 hover:bg-white/10 rounded-xl transition duration-300 group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-4xl text-white">description</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">2.500+</div>
                <div className="text-xl font-medium text-white/90">Editais Publicados</div>
                <p className="text-white/80 mt-2 text-sm">
                  Oportunidades verificadas de prefeituras e instituições culturais
                </p>
              </div>
              <div className="text-center p-6 hover:bg-white/10 rounded-xl transition duration-300 group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-4xl text-white">groups</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">10.000+</div>
                <div className="text-xl font-medium text-white/90">Artistas Cadastrados</div>
                <p className="text-white/80 mt-2 text-sm">Aumente suas chances de aprovação em até 3x</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0xNiAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0yNCAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00eiIvPjwvZz48L2c+PC9zdmc+')]" style={{ backgroundPosition: '0 0', backgroundSize: '60px 60px' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Processo Intuitivo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Como funciona a plataforma?
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-slate-300 leading-relaxed">
              Em poucos passos, você estará conectado às melhores <span className="font-medium text-slate-800 dark:text-white">oportunidades culturais</span> do Brasil.
            </p>
          </div>
          
          {/* Versão mobile: slider */}
          <div className="md:hidden mb-12">
            <CardSlider slidesPerView={1.2} spaceBetween={20}>
              {/* Card 1 - Para Artistas */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden h-full border border-slate-100 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-3 bg-yellow-500"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-3xl text-yellow-600">palette</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">Para Artistas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Crie um perfil e portfólio completo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Receba editais com alta compatibilidade</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Inscreva-se diretamente pela plataforma</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Card 2 - Para Organizadores */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden h-full border border-slate-100 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-3xl text-indigo-600 dark:text-indigo-400">account_balance</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">Para Organizadores</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Crie e publique editais estruturados</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Encontre artistas altamente compatíveis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Use ferramentas avançadas de triagem</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Card 3 - Algoritmo Inteligente */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden h-full border border-slate-100 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-3 bg-emerald-500"></div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-3xl text-emerald-600 dark:text-emerald-400">hub</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">Algoritmo Inteligente</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Matching baseado em múltiplos critérios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">Análise de compatibilidade de 0-100%</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                      <span className="text-slate-800">Considera localização e experiência</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardSlider>
          </div>
          
          {/* Versão desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-yellow-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-yellow-600">palette</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Para Artistas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-yellow-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Crie um perfil e portfólio completo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-yellow-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Receba editais com alta compatibilidade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-yellow-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Inscreva-se diretamente pela plataforma</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-yellow-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Acompanhe o status das inscrições</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-yellow-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Receba feedback e melhore seu perfil</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-indigo-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-indigo-600">account_balance</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Para Organizadores</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Crie e publique editais estruturados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Encontre artistas altamente compatíveis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Use ferramentas avançadas de triagem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Gerencie inscrições em um só lugar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-2 mt-1">check_circle</span>
                    <span className="text-slate-800">Acesse relatórios e métricas detalhadas</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="h-3 bg-emerald-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">hub</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-black">Algoritmo Inteligente</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span className="text-black dark:text-black">Matching baseado em múltiplos critérios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span className="text-black dark:text-black">Análise de compatibilidade de 0-100%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span className="text-black dark:text-black">Considera localização e experiência</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span className="text-black dark:text-black">Aprende com dados históricos de aprovações</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-emerald-500 mr-2 mt-1">check_circle</span>
                    <span className="text-black dark:text-black">Transparência na explicação dos resultados</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA */}
      <section id="cta-section" className="py-20 px-4 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Conectando <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">artistas</span> a oportunidades de <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">editais culturais</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Cadastre-se gratuitamente e comece a receber as melhores oportunidades do mercado cultural.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/register')} 
                className="w-full sm:w-auto px-10 py-5 bg-white text-primary-600 hover:bg-slate-100 font-semibold rounded-xl transition-all duration-300 text-lg cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Criar Conta Grátis
              </button>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300 text-lg cursor-pointer"
              >
                Como Funciona
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4 text-white/80 text-sm">
              <div className="flex items-center">
                <span className="material-symbols-outlined text-green-300 mr-1">check_circle</span>
                <span>Sem custo de cadastro</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-green-300 mr-1">check_circle</span>
                <span>Suporte 24/7</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-green-300 mr-1">check_circle</span>
                <span>Cancelamento fácil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section id="sobre" className="py-20 px-4 relative overflow-hidden">
        {/* Fundo artístico com gradiente e formas orgânicas */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-500">Sobre Nós</h2>
              <div className="space-y-4 text-lg text-slate-700">
                <p>
                  O Artmatch nasceu da vivência de Adriano Rodrigues, CEO da startup, desenvolvedor e aluno do Embarque Digital do Porto Digital. 
                  A ideia surgiu ao ver de perto a dificuldade da sua esposa — artista — e de muitos amigos para encontrar e entender editais culturais.
                </p>
                <p>
                  Ao unir tecnologia com propósito, ele criou uma plataforma que conecta artistas às oportunidades certas, 
                  com linguagem acessível, compatibilidade inteligente e foco na inclusão cultural.
                </p>
                <p className="font-medium text-pink-600">
                  Mais do que um app, o Artmatch é uma ponte entre talento e oportunidade.
                  Faça parte dessa transformação.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center items-center p-4">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <div className="relative z-10 rounded-3xl shadow-2xl w-full aspect-square overflow-hidden border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1747424980298-0590739f663b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Adriano Rodrigues, CEO do Artmatch" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder-user.svg';
                      target.className = 'w-full h-full object-cover';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium text-lg">Adriano Rodrigues</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Funcionalidades da Plataforma</h2>
            <p className="text-xl text-slate-700 dark:text-white max-w-3xl mx-auto font-medium">
              Uma plataforma completa desenvolvida para transformar a maneira como artistas e
              organizadores se conectam.
            </p>
          </div>
          {/* Versão desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">person</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Perfil e Portfólio</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Crie um perfil profissional completo com portfólio visual, documentos e links.
                Mostre seu trabalho no melhor formato.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">find_in_page</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Descoberta Inteligente</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Feed personalizado de oportunidades com porcentagem clara de compatibilidade.
                Encontre editais que realmente combinam com você.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">edit_document</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Inscrição Simplificada</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Inscreva-se diretamente na plataforma com formulários inteligentes que preenchem
                automaticamente dados do seu perfil.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">dashboard</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Dashboard Completo</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Acesse métricas, estatísticas e relatórios detalhados sobre seu perfil, inscrições e
                desempenho na plataforma.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">notifications</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Notificações Personalizadas</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Receba alertas sobre novos editais compatíveis, prazos, atualizações de status e
                feedback de organizadores.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">psychology_alt</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Assistente de IA</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Conte com um assistente inteligente que ajuda a melhorar seu perfil e responde
                dúvidas sobre a plataforma e editais.
              </p>
            </div>
          </div>

          {/* Versão mobile: slider */}
          <div className="block md:hidden">
            <CardSlider
              slidesPerView={1}
              spaceBetween={16}
              autoplay={true}
              loop={true}
              showNavigation={false}
            >
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">person</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Perfil e Portfólio</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Crie um perfil profissional completo com portfólio visual, documentos e links.
                  Mostre seu trabalho no melhor formato.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">find_in_page</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Descoberta Inteligente</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Feed personalizado de oportunidades com porcentagem clara de compatibilidade.
                  Encontre editais que realmente combinam com você.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">edit_document</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Inscrição Simplificada</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Inscreva-se diretamente na plataforma com formulários inteligentes que preenchem
                  automaticamente dados do seu perfil.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">dashboard</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Dashboard Completo</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Acesse métricas, estatísticas e relatórios detalhados sobre seu perfil, inscrições e
                  desempenho na plataforma.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">notifications</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Notificações Personalizadas</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Receba alertas sobre novos editais compatíveis, prazos, atualizações de status e
                  feedback de organizadores.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-transparent dark:border-slate-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600 dark:text-primary-400">psychology_alt</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Assistente de IA</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Conte com um assistente inteligente que ajuda a melhorar seu perfil e responde
                  dúvidas sobre a plataforma e editais.
                </p>
              </div>
            </CardSlider>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Histórias de Sucesso
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">
              Transformando <span className="text-primary-600">vidas</span> através da arte
            </h2>
            <div className="w-24 h-1.5 bg-primary-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Veja como artistas e organizadores estão alcançando novos patamares com nossa plataforma.
            </p>
          </div>
          
          {/* Grid de Depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl mr-4 overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Ana M." 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://ui-avatars.com/api/?name=Ana+M&background=4f46e5&color=fff';
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg dark:text-white">Ana M.</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Artista Plástica</div>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg">star</span>
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">5.0</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-6 before:w-0.5 before:bg-primary-500">
                &quot;A Artmatch revolucionou minha carreira! Em apenas 3 meses, consegui 4 oportunidades incríveis que mudaram completamente minha trajetória como artista. A plataforma é intuitiva e o sistema de compatibilidade realmente funciona!&quot;
              </p>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary-500 mr-1 text-base">location_on</span>
                <span>Recife, PE</span>
                <span className="mx-2">•</span>
                <span className="material-symbols-outlined text-primary-500 mr-1 text-base">work</span>
                <span>Pintura e Ilustração</span>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl mr-4 overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Carlos P." 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://ui-avatars.com/api/?name=Carlos+P&background=4f46e5&color=fff';
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg dark:text-white">Carlos P.</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Fotógrafo Profissional</div>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                  <div className="text-yellow-400 flex">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg">star</span>
                    ))}
                    <span className="material-symbols-outlined text-lg">star_half</span>
                  </div>
                  <span className="ml-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">4.5</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-6 before:w-0.5 before:bg-primary-500">
                &quot;Como fotógrafo, sempre foi desafiador encontrar editais que valorizassem meu trabalho. Com a Artmatch, em apenas dois meses, recebi três propostas incríveis que se alinham perfeitamente ao meu estilo. A recomendação por IA é impressionante!&quot;
              </p>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary-500 mr-1 text-base">location_on</span>
                <span>Salvador, BA</span>
                <span className="mx-2">•</span>
                <span className="material-symbols-outlined text-primary-500 mr-1 text-base">work</span>
                <span>Fotografia Documental</span>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl mr-4 overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/women/68.jpg" 
                      alt="Mariana P." 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://ui-avatars.com/api/?name=Mariana+P&background=4f46e5&color=fff';
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg dark:text-white">Mariana P.</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Curadora Cultural</div>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg">star</span>
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">5.0</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-6 before:w-0.5 before:bg-primary-500">
                &quot;Como curadora, o Artmatch transformou completamente nosso processo de seleção. Encontramos artistas incríveis que nunca teríamos descoberto de outra forma. A qualidade dos portfólios e o sistema de compatibilidade economizam incontáveis horas de trabalho.&quot;
              </p>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary-500 mr-1 text-base">location_on</span>
                <span>São Paulo, SP</span>
                <span className="mx-2">•</span>
                <span className="material-symbols-outlined text-primary-500 mr-1 text-base">work</span>
                <span>Galeria de Arte Contemporânea</span>
              </div>
            </div>
          </div>

              {/* Versão Mobile */}
              <div className="block md:hidden mt-8">
                <CardSlider
                  slidesPerView={1.1}
                  spaceBetween={16}
                  autoplay={true}
                  loop={true}
                  showNavigation={true}
                  className="px-4"
                >
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg mr-3 overflow-hidden">
                          <img 
                            src="https://randomuser.me/api/portraits/women/44.jpg" 
                            alt="Ana M." 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://ui-avatars.com/api/?name=Ana+M&background=4f46e5&color=fff';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base dark:text-white">Ana M.</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Artista Plástica</div>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                        <div className="text-yellow-400 flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={`mobile-star-${i}`} className="material-symbols-outlined text-base">star</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 pl-4 border-l-2 border-primary-500">
                      &quot;A Artmatch revolucionou minha carreira! Em apenas 3 meses, consegui 4 oportunidades incríveis que mudaram completamente minha trajetória como artista.&quot;
                    </p>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-primary-500 mr-1 text-sm">location_on</span>
                      <span>Recife, PE</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg mr-3 overflow-hidden">
                          <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                            alt="Carlos P." 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://ui-avatars.com/api/?name=Carlos+P&background=4f46e5&color=fff';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base dark:text-white">Carlos P.</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Fotógrafo</div>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                        <div className="text-yellow-400 flex">
                          {[...Array(4)].map((_, i) => (
                            <span key={`mobile-star2-${i}`} className="material-symbols-outlined text-base">star</span>
                          ))}
                          <span className="material-symbols-outlined text-base">star_half</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 pl-4 border-l-2 border-primary-500">
                      &quot;Como fotógrafo, sempre foi desafiador encontrar editais que valorizassem meu trabalho. Com a Artmatch, em apenas dois meses, recebi três propostas incríveis!&quot;
                    </p>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-primary-500 mr-1 text-sm">location_on</span>
                      <span>Salvador, BA</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg mr-3 overflow-hidden">
                          <img 
                            src="https://randomuser.me/api/portraits/women/68.jpg" 
                            alt="Mariana P." 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://ui-avatars.com/api/?name=Mariana+P&background=4f46e5&color=fff';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base dark:text-white">Mariana P.</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Curadora Cultural</div>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                        <div className="text-yellow-400 flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={`mobile-star3-${i}`} className="material-symbols-outlined text-base">star</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 pl-4 border-l-2 border-primary-500">
                      &quot;Como curadora, o Artmatch transformou nosso processo de seleção. Encontramos artistas incríveis que nunca teríamos descoberto de outra forma.&quot;
                    </p>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-primary-500 mr-1 text-sm">location_on</span>
                      <span>São Paulo, SP</span>
                    </div>
                  </div>
                </CardSlider>
              </div>
            </div>
          </section>

      <footer className="bg-slate-800 dark:bg-slate-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  work.adrian.rodrigues@gmail.com
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (81) 99721-0724
                </li>
              </ul>
              
              {/* Seção de parceiros/apoiadores */}
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <h3 className="text-lg font-bold mb-3 text-slate-300">Apoio e Parceria</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-all duration-300 flex items-center justify-center h-20 w-40">
                    <img 
                      src="/partners/porto-digital-white.svg" 
                      alt="Porto Digital" 
                      className="h-12 max-w-full brightness-100"
                      title="Porto Digital"
                    />
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-all duration-300 flex items-center justify-center h-20 w-40">
                    <img 
                      src="/partners/prefeitura-recife-white.png" 
                      alt="Prefeitura do Recife" 
                      className="h-12 max-w-full brightness-100"
                      title="Prefeitura do Recife"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://www.instagram.com/tantofazdjow/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @tantofazdjow
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/adriano-rodrigues-ads/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Adriano Rodrigues
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/BugRed" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-slate-700/50 text-xs text-slate-400">
                <p className="mb-1">Iniciativa apoiada por instituições<br />que acreditam na transformação através<br />da tecnologia e cultura</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Entre em Contato</h3>
              <p className="text-slate-300 mb-4">
                Precisa de ajuda ou tem alguma dúvida? Envie-nos uma mensagem!
              </p>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = 'work.adrian.rodrigues@gmail.com';
                const subject = `Contato do Site - ${formData.get('name')}`;
                const body = `Nome: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0A%0D%0AMensagem:%0D%0A${formData.get('message')}`;
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
              }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Artmatch. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
