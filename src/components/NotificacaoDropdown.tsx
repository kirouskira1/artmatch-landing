import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos para as notificações
type TipoNotificacao = "edital" | "inscricao" | "mensagem" | "sistema";

interface Notificacao {
  id: number;
  tipo: TipoNotificacao;
  titulo: string;
  descricao: string;
  data: Date;
  lida: boolean;
  link?: string;
}

// Dados de exemplo para notificações
const notificacoesIniciais: Notificacao[] = [
  {
    id: 1,
    tipo: "edital",
    titulo: "Novo edital compatível",
    descricao: "Festival Internacional de Artes Visuais - 95% de compatibilidade",
    data: new Date(2025, 4, 15, 10, 30),
    lida: false,
    link: "/dashboard/edital/1"
  },
  {
    id: 2,
    tipo: "inscricao",
    titulo: "Inscrição recebida",
    descricao: "Sua inscrição no Prêmio Nacional de Artes Plásticas foi recebida",
    data: new Date(2025, 4, 14, 15, 45),
    lida: false,
    link: "/dashboard/inscricoes"
  },
  {
    id: 3,
    tipo: "mensagem",
    titulo: "Nova mensagem",
    descricao: "Secretaria Municipal de Cultura enviou uma mensagem",
    data: new Date(2025, 4, 13, 9, 20),
    lida: true,
    link: "/dashboard/mensagens"
  },
  {
    id: 4,
    tipo: "sistema",
    titulo: "Perfil incompleto",
    descricao: "Complete seu perfil para aumentar suas chances de aprovação",
    data: new Date(2025, 4, 12, 11, 10),
    lida: true,
    link: "/dashboard/perfil"
  }
];

export function NotificacaoDropdown() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(notificacoesIniciais);
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();

  // Contagem de notificações não lidas
  const naoLidas = notificacoes.filter(n => !n.lida).length;

  // Função para marcar uma notificação como lida
  const marcarComoLida = (id: number) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ));
  };

  // Função para marcar todas como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  };

  // Função para lidar com o clique em uma notificação
  const handleClick = (notificacao: Notificacao) => {
    marcarComoLida(notificacao.id);
    setAberto(false);
    if (notificacao.link) {
      navigate(notificacao.link);
    }
  };

  // Formatar a data relativa (ex: "há 2 horas")
  const formatarDataRelativa = (data: Date) => {
    return formatDistanceToNow(data, { addSuffix: true, locale: ptBR });
  };

  // Obter o ícone com base no tipo de notificação
  const obterCorTipo = (tipo: TipoNotificacao) => {
    switch (tipo) {
      case "edital":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "inscricao":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "mensagem":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "sistema":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <DropdownMenu open={aberto} onOpenChange={setAberto}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {naoLidas > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
              variant="destructive"
            >
              {naoLidas}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notificações</span>
          {naoLidas > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto py-1 px-2 text-xs"
              onClick={marcarTodasComoLidas}
            >
              Marcar todas como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notificacoes.length > 0 ? (
            notificacoes.map((notificacao) => (
              <DropdownMenuItem 
                key={notificacao.id} 
                className={`p-0 focus:bg-slate-50 dark:focus:bg-slate-800 ${!notificacao.lida ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                onSelect={(e) => e.preventDefault()}
              >
                <button 
                  className="w-full text-left p-3 flex flex-col"
                  onClick={() => handleClick(notificacao)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge className={`${obterCorTipo(notificacao.tipo)}`}>
                      {notificacao.tipo === "edital" && "Edital"}
                      {notificacao.tipo === "inscricao" && "Inscrição"}
                      {notificacao.tipo === "mensagem" && "Mensagem"}
                      {notificacao.tipo === "sistema" && "Sistema"}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatarDataRelativa(notificacao.data)}
                    </span>
                  </div>
                  <div className="font-medium dark:text-slate-200">{notificacao.titulo}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{notificacao.descricao}</div>
                </button>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-6 text-center text-slate-500 dark:text-slate-400">
              Nenhuma notificação
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="justify-center text-center"
          onSelect={(e) => {
            e.preventDefault();
            navigate("/dashboard/notificacoes");
            setAberto(false);
          }}
        >
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificacaoDropdown;
