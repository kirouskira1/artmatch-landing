import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Search, Trash2, Settings } from "lucide-react";
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
  },
  {
    id: 5,
    tipo: "edital",
    titulo: "Edital prestes a encerrar",
    descricao: "O prazo para inscrição no Prêmio de Fotografia termina em 3 dias",
    data: new Date(2025, 4, 11, 14, 25),
    lida: true,
    link: "/dashboard/edital/2"
  },
  {
    id: 6,
    tipo: "inscricao",
    titulo: "Inscrição aprovada",
    descricao: "Parabéns! Sua inscrição no Festival de Arte Urbana foi aprovada",
    data: new Date(2025, 4, 10, 16, 40),
    lida: true,
    link: "/dashboard/inscricoes"
  },
  {
    id: 7,
    tipo: "sistema",
    titulo: "Atualização do sistema",
    descricao: "O Artmatch foi atualizado com novas funcionalidades",
    data: new Date(2025, 4, 9, 8, 15),
    lida: true
  },
  {
    id: 8,
    tipo: "mensagem",
    titulo: "Mensagem de Mariana Santos",
    descricao: "Adorei seu trabalho! Você estará participando do Festival de Artes este ano?",
    data: new Date(2025, 4, 8, 17, 30),
    lida: true,
    link: "/dashboard/mensagens"
  }
];

// Configurações de notificação
interface ConfiguracaoNotificacao {
  tipo: TipoNotificacao;
  titulo: string;
  descricao: string;
  email: boolean;
  push: boolean;
  site: boolean;
}

const configuracoesIniciais: ConfiguracaoNotificacao[] = [
  {
    tipo: "edital",
    titulo: "Editais",
    descricao: "Novos editais compatíveis, prazos e atualizações",
    email: true,
    push: true,
    site: true
  },
  {
    tipo: "inscricao",
    titulo: "Inscrições",
    descricao: "Status de inscrições, aprovações e rejeições",
    email: true,
    push: true,
    site: true
  },
  {
    tipo: "mensagem",
    titulo: "Mensagens",
    descricao: "Novas mensagens de organizadores e artistas",
    email: true,
    push: true,
    site: true
  },
  {
    tipo: "sistema",
    titulo: "Sistema",
    descricao: "Atualizações do sistema e informações importantes",
    email: false,
    push: true,
    site: true
  }
];

const NotificacoesPage = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(notificacoesIniciais);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracaoNotificacao[]>(configuracoesIniciais);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<"todas" | "nao-lidas" | "lidas">("todas");
  const [categoriaFiltro, setCategoriaFiltro] = useState<"todas" | TipoNotificacao>("todas");

  // Filtrar notificações com base na busca e filtros
  const notificacoesFiltradas = notificacoes
    .filter(notificacao => 
      notificacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notificacao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(notificacao => {
      if (tipoFiltro === "nao-lidas") return !notificacao.lida;
      if (tipoFiltro === "lidas") return notificacao.lida;
      return true;
    })
    .filter(notificacao => {
      if (categoriaFiltro === "todas") return true;
      return notificacao.tipo === categoriaFiltro;
    })
    .sort((a, b) => b.data.getTime() - a.data.getTime());

  // Marcar uma notificação como lida
  const marcarComoLida = (id: number) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ));
  };

  // Marcar todas como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  };

  // Excluir uma notificação
  const excluirNotificacao = (id: number) => {
    setNotificacoes(notificacoes.filter(n => n.id !== id));
  };

  // Limpar todas as notificações
  const limparTodasNotificacoes = () => {
    setNotificacoes([]);
  };

  // Atualizar configuração de notificação
  const atualizarConfiguracao = (tipo: TipoNotificacao, campo: "email" | "push" | "site", valor: boolean) => {
    setConfiguracoes(configuracoes.map(config => 
      config.tipo === tipo ? { ...config, [campo]: valor } : config
    ));
  };

  // Formatar a data relativa (ex: "há 2 horas")
  const formatarDataRelativa = (data: Date) => {
    return formatDistanceToNow(data, { addSuffix: true, locale: ptBR });
  };

  // Obter a cor com base no tipo de notificação
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
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notificações</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={marcarTodasComoLidas}>
            Marcar todas como lidas
          </Button>
          <Button variant="outline" onClick={limparTodasNotificacoes}>
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar todas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Suas notificações</CardTitle>
                <div className="flex gap-2">
                  <Tabs 
                    value={tipoFiltro} 
                    onValueChange={(v) => setTipoFiltro(v as "todas" | "nao-lidas" | "lidas")}
                    className="w-[300px]"
                  >
                    <TabsList className="flex w-full justify-between">
                      <TabsTrigger value="todas">Todas</TabsTrigger>
                      <TabsTrigger value="nao-lidas">Não lidas</TabsTrigger>
                      <TabsTrigger value="lidas">Lidas</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="Buscar notificações..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs 
                  value={categoriaFiltro} 
                  onValueChange={(v) => setCategoriaFiltro(v as "todas" | TipoNotificacao)}
                  className="w-full"
                >
                  <TabsList className="flex w-full justify-between">
                    <TabsTrigger value="todas">Todas</TabsTrigger>
                    <TabsTrigger value="edital">Editais</TabsTrigger>
                    <TabsTrigger value="inscricao">Inscrições</TabsTrigger>
                    <TabsTrigger value="mensagem">Mensagens</TabsTrigger>
                    <TabsTrigger value="sistema">Sistema</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {notificacoesFiltradas.length > 0 ? (
                <div className="space-y-4">
                  {notificacoesFiltradas.map((notificacao) => (
                    <div 
                      key={notificacao.id} 
                      className={`p-4 rounded-lg border dark:border-slate-700 ${!notificacao.lida ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <Badge className={`${obterCorTipo(notificacao.tipo)}`}>
                          {notificacao.tipo === "edital" && "Edital"}
                          {notificacao.tipo === "inscricao" && "Inscrição"}
                          {notificacao.tipo === "mensagem" && "Mensagem"}
                          {notificacao.tipo === "sistema" && "Sistema"}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {formatarDataRelativa(notificacao.data)}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => excluirNotificacao(notificacao.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium text-lg mt-2">{notificacao.titulo}</h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">{notificacao.descricao}</p>
                      <div className="flex justify-between items-center mt-3">
                        {notificacao.link && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto"
                            onClick={() => {
                              marcarComoLida(notificacao.id);
                              // Aqui você pode adicionar a navegação para o link
                            }}
                          >
                            Ver detalhes
                          </Button>
                        )}
                        {!notificacao.lida && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="ml-auto"
                            onClick={() => marcarComoLida(notificacao.id)}
                          >
                            Marcar como lida
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma notificação encontrada</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    {searchTerm || tipoFiltro !== "todas" || categoriaFiltro !== "todas" 
                      ? "Tente ajustar seus filtros de busca" 
                      : "Você não tem notificações no momento"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações
              </CardTitle>
              <CardDescription>
                Gerencie suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {configuracoes.map((config) => (
                  <div key={config.tipo} className="space-y-3">
                    <div>
                      <h3 className="font-medium">{config.titulo}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{config.descricao}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={`${config.tipo}-email`} 
                          checked={config.email}
                          onCheckedChange={(checked) => 
                            atualizarConfiguracao(config.tipo, "email", checked)
                          }
                        />
                        <Label htmlFor={`${config.tipo}-email`}>Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={`${config.tipo}-push`} 
                          checked={config.push}
                          onCheckedChange={(checked) => 
                            atualizarConfiguracao(config.tipo, "push", checked)
                          }
                        />
                        <Label htmlFor={`${config.tipo}-push`}>Push</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={`${config.tipo}-site`} 
                          checked={config.site}
                          onCheckedChange={(checked) => 
                            atualizarConfiguracao(config.tipo, "site", checked)
                          }
                        />
                        <Label htmlFor={`${config.tipo}-site`}>Site</Label>
                      </div>
                    </div>
                    {config.tipo !== "sistema" && <hr className="dark:border-slate-700" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificacoesPage;
