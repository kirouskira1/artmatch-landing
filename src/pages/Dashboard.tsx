import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <span className="mr-2 text-slate-600 dark:text-slate-300">Olá, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Artista'}</span>
        </div>
      </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Editais Compatíveis</CardTitle>
              <CardDescription>Oportunidades com alta compatibilidade</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Inscrições Ativas</CardTitle>
              <CardDescription>Editais em que você está participando</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Nível de completude do seu perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">65%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Editais Recomendados</CardTitle>
              <CardDescription>Baseados no seu perfil artístico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Festival Internacional de Artes Visuais</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">São Paulo, SP • Inscrições até 30/06/2025</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">95% compatível</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Edital de Ocupação Galeria Municipal</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Rio de Janeiro, RJ • Inscrições até 15/07/2025</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">87% compatível</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Prêmio Nacional de Artes Plásticas</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Nacional • Inscrições até 10/08/2025</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">82% compatível</span>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="mt-4 w-full" onClick={() => navigate("/dashboard/editais")}>Ver todos os editais</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Complete seu Perfil</CardTitle>
              <CardDescription>Aumente suas chances de aprovação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-800 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Adicione seu currículo artístico</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Inclua formação, exposições e premiações</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Carregue imagens do seu portfólio</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Adicione pelo menos 5 obras para melhorar seu perfil</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 text-purple-800 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Complete suas informações pessoais</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Adicione biografia, área de atuação e localização</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="mt-4 w-full">Editar perfil completo</Button>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default Dashboard;
