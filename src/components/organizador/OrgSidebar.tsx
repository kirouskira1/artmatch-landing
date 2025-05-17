import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  PlusCircle,
  BarChart2,
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
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-indigo-100 hover:text-indigo-900",
      active ? "bg-indigo-100 text-indigo-900" : "text-slate-600"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export function OrgSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/organizador/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold text-indigo-900">Artmatch</span>
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-800">
            Organizador
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            href="/organizador/dashboard"
            active={isActive("/organizador/dashboard")}
          />
          <SidebarItem
            icon={<FileText size={20} />}
            label="Meus Editais"
            href="/organizador/editais"
            active={isActive("/organizador/editais")}
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Candidatos"
            href="/organizador/candidatos"
            active={isActive("/organizador/candidatos")}
          />
          <SidebarItem
            icon={<PlusCircle size={20} />}
            label="Novo Edital"
            href="/organizador/novo-edital"
            active={isActive("/organizador/novo-edital")}
          />
          <SidebarItem
            icon={<BarChart2 size={20} />}
            label="Relatórios"
            href="/organizador/relatorios"
            active={isActive("/organizador/relatorios")}
          />
        </nav>
      </div>
      <div className="border-t p-2">
        <nav className="grid gap-1">
          <SidebarItem
            icon={<Settings size={20} />}
            label="Configurações"
            href="/organizador/configuracoes"
            active={isActive("/organizador/configuracoes")}
          />
          <SidebarItem
            icon={<HelpCircle size={20} />}
            label="Ajuda"
            href="/organizador/ajuda"
            active={isActive("/organizador/ajuda")}
          />
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default OrgSidebar;
