import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  User,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-900 dark:hover:text-primary-400",
      active 
        ? "bg-primary-100 text-primary-900 dark:bg-primary-900/20 dark:text-primary-400" 
        : "text-slate-600 dark:text-slate-300"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-slate-800 dark:border-slate-700">
      <div className="flex h-14 items-center border-b px-4 dark:border-slate-700">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold text-primary-900 dark:text-primary-400">Artmatch</span>
          <span className="rounded bg-primary-100 dark:bg-primary-900/30 px-1.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-300">
            Beta
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            href="/dashboard"
            active={isActive("/dashboard")}
          />
          <SidebarItem
            icon={<FileText size={20} />}
            label="Editais"
            href="/dashboard/editais"
            active={isActive("/dashboard/editais")}
          />
          <SidebarItem
            icon={<User size={20} />}
            label="Meu Perfil"
            href="/dashboard/perfil"
            active={isActive("/dashboard/perfil")}
          />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Mensagens"
            href="/dashboard/mensagens"
            active={isActive("/dashboard/mensagens")}
          />
          {/* Botão de notificações removido */}
        </nav>
      </div>
      <div className="border-t p-2 dark:border-slate-700">
        <nav className="grid gap-1">
          <SidebarItem
            icon={<Settings size={20} />}
            label="Configurações"
            href="/dashboard/configuracoes"
            active={isActive("/dashboard/configuracoes")}
          />
          <SidebarItem
            icon={<HelpCircle size={20} />}
            label="Ajuda"
            href="/dashboard/ajuda"
            active={isActive("/dashboard/ajuda")}
          />
          {/* Botão de sair removido */}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
