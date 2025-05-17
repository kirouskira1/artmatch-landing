import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificacaoDropdown from "../NotificacaoDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/AuthContext";
import { getCurrentProfile, type Profile } from "@/lib/profile";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, Search as SearchIcon } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Função para lidar com a busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/dashboard/editais?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };
  
  // Carregar perfil do usuário para obter a URL do avatar
  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getCurrentProfile();
        setProfile(profileData);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    }
    
    if (user) {
      loadProfile();
    }
  }, [user]);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 transform transition-transform duration-200 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b bg-white dark:bg-slate-800 dark:border-slate-700 px-4 flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" className="mr-2" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link 
              to="/" 
              className="font-semibold text-primary-900 dark:text-primary-400 hover:underline cursor-pointer"
            >
              Artmatch
            </Link>
          </div>
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar editais, artistas..."
                className="w-full px-4 py-2 pl-10 rounded-lg text-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon 
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              />
            </div>
          </form>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NotificacaoDropdown />
            <Avatar 
              className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all" 
              onClick={() => navigate('/dashboard/perfil')}
              title="Ir para meu perfil"
            >
              <AvatarImage src={profile?.avatar_url || "https://picsum.photos/200/200?random=1"} alt={profile?.full_name || user?.user_metadata?.full_name || 'Usuário'} />
              <AvatarFallback>{(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto p-6 dark:text-slate-200">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
