import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Editais from "./pages/dashboard/Editais";
import DetalheEdital from "./pages/dashboard/DetalheEdital";
import Perfil from "./pages/dashboard/Perfil";
import Mensagens from "./pages/dashboard/Mensagens";
import Notificacoes from "./pages/dashboard/Notificacoes";
import OrganizadorDashboard from "./pages/organizador/Dashboard";
import OrganizadorMensagens from "./pages/organizador/Mensagens";
import OrganizadorNotificacoes from "./pages/organizador/Notificacoes";
import NotFound from "./pages/NotFound";
import Configuracoes from "./pages/dashboard/Configuracoes";
import Ajuda from "./pages/dashboard/Ajuda";

// Protected route component
type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'artist' | 'organizer' | 'admin';
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
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
  
  // Redirecionar para login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Verificar se o usuário tem o papel necessário
  if (requiredRole) {
    const userRole = user.role || 'artist'; // Papel padrão é artista
    
    if (requiredRole === 'organizer' && userRole !== 'organizer' && userRole !== 'admin') {
      // Redirecionar para dashboard de artista se tentar acessar área de organizador
      return <Navigate to="/dashboard" replace />;
    }
    
    if (requiredRole === 'artist' && userRole === 'organizer') {
      // Redirecionar para dashboard de organizador se tentar acessar área de artista
      return <Navigate to="/organizador/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  // Aplicar o modo escuro em toda a aplicação com base na preferência salva
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);
  
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/editais" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Editais />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/edital/:id" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <DetalheEdital />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/perfil" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Perfil />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/mensagens" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Mensagens />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/notificacoes" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Notificacoes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizador/dashboard" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizadorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizador/mensagens" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizadorMensagens />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizador/notificacoes" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizadorNotificacoes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/configuracoes" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Configuracoes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/ajuda" 
              element={
                <ProtectedRoute requiredRole="artist">
                  <Ajuda />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
