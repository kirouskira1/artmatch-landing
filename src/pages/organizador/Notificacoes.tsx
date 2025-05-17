import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Search, Trash2, Settings, Users, Calendar, FileText, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos para as notificações
type TipoNotificacao = "inscricao" | "edital" | "mensagem" | "sistema";

interface Notificacao {
  id: number;
  tipo: TipoNotificacao;
  titulo: string;
  descricao: string;
  data: Date;
  lida: boolean;
  link?: string;
  edital?: string;
}

// Dados de exemplo para notificações
const notificacoesIniciais: Notificacao[] = [
  {
    id: 1,
    tipo: "inscricao",
    titulo: "Nova inscrição recebida",
    descricao: "Pedro Oliveira se inscreveu no Festival Internacional de Artes Visuais",
    data: new Date(2025, 4, 15, 10, 30),
    lida: false,
    link: "/organizador/inscricoes/1",
    edital: "Festival Internacional de Artes Visuais"
  },
  {
    id: 2,
    tipo: "inscricao",
    titulo: "Nova inscrição recebida",
    descricao: "Mariana Santos se inscreveu no Festival Internacional de Artes Visuais",
    data: new Date(2025, 4, 14, 15, 45),
    lida: false,
    link: "/organizador/inscricoes/2",
    edital: "Festival Internacional de Artes Visuais"
  },
  {
    id: 3,
    tipo: "mensagem",
    titulo: "Nova mensagem",
    descricao: "Carlos Mendes enviou uma mensagem sobre sua inscrição",
    data: new Date(2025, 4, 13, 9, 20),
    lida: true,
    link: "/organizador/mensagens",
    edital: "Prêmio Nacional de Artes Plásticas"
  },
  {
    id: 4,
    tipo: "edital",
    titulo: "Prazo de inscrição próximo do fim",
    descricao: "O prazo para inscrições no Festival Internacional de Artes Visuais termina em 3 dias",
    data: new Date(2025, 4, 12, 11, 10),
    lida: true,
    link: "/organizador/editais/1",
    edital: "Festival Internacional de Artes Visuais"
  },
  {
    id: 5,
    tipo: "sistema",
    titulo: "Relatório semanal disponível",
    descricao: "O relatório semanal de inscrições está disponível para visualização",
    data: new Date(2025, 4, 11, 8, 0),
    lida: true,
    link: "/organizador/relatorios"
  },
  {
    id: 6,
    tipo: "inscricao",
    titulo: "Inscrição atualizada",
    descricao: "Ana Silva atualizou sua inscrição no Prêmio Nacional de Artes Plásticas",
    data: new Date(2025, 4, 10, 14, 20),
    lida: true,
    link: "/organizador/inscricoes/3",
    edital: "Prêmio Nacional de Artes Plásticas"
  },
  {
    id: 7,
    tipo: "edital",
    titulo: "Edital publicado",
    descricao: "Seu novo edital 'Residência Artística Municipal' foi publicado com sucesso",
    data: new Date(2025, 4, 9, 16, 45),
    lida: true,
    link: "/organizador/editais/2",
    edital: "Residência Artística Municipal"
  },
  {
    id: 8,
    tipo: "sistema",
    titulo: "Atualização do sistema",
    descricao: "O Artmatch foi atualizado com novas funcionalidades para organizadores",
    data: new Date(2025, 4, 8, 9, 30),
    lida: true
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
    tipo: "inscricao",
    titulo: "Inscrições",
    descricao: "Novas inscrições e atualizações",
    email: true,
    push: true,
    site: true
  },
  {
    tipo: "edital",
    titulo: "Editais",
    descricao: "Prazos e atualizações de editais",
    email: true,
    push: true,
    site: true
  },
  {
    tipo: "mensagem",
    titulo: "Mensagens",
    descricao: "Novas mensagens de artistas",
    email: true,
    push: true,
    site: true
  },
  {
    tipo: "sistema",
    titulo: "Sistema",
    descricao: "Atualizações do sistema e relatórios",
    email: false,
    push: true,
    site: true
  }
];

const NotificacoesOrganizadorPage = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(notificacoesIniciais);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracaoNotificacao[]>(configuracoesIniciais);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<"todas" | "nao-lidas" | "lidas">("todas");
  const [categoriaFiltro, setCategoriaFiltro] = useState<"todas" | TipoNotificacao>("todas");
  const [editalFiltro, setEditalFiltro] = useState<string | "todos">("todos");

  // Obter lista de editais únicos para o filtro
  const editaisUnicos = ["todos", ...new Set(notificacoes
    .filter(n => n.edital)
    .map(n => n.edital as string))];

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
    .filter(notificacao => {
      if (editalFiltro === "todos") return true;
      return notificacao.edital === editalFiltro;
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

  // Obter a cor e ícone com base no tipo de notificação
  const obterCorTipo = (tipo: TipoNotificacao) => {
    switch (tipo) {
      case "inscricao":
        return "bg-green-100 text-green-800";
      case "edital":
        return "bg-blue-100 text-blue-800";
      case "mensagem":
        return "bg-purple-100 text-purple-800";
      case "sistema":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const obterIconeTipo = (tipo: TipoNotificacao) => {
    switch (tipo) {
      case "inscricao":
        return <Users className="h-4 w-4 mr-2" />;
      case "edital":
        return <FileText className="h-4 w-4 mr-2" />;
      case "mensagem":
        return <MessageSquare className="h-4 w-4 mr-2" />;
      case "sistema":
        return <Bell className="h-4 w-4 mr-2" />;
      default:
        return null;
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="Buscar notificações..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="p-2 border rounded-md"
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value as "todas" | TipoNotificacao)}
                  >
                    <option value="todas">Todas as categorias</option>
                    <option value="inscricao">Inscrições</option>
                    <option value="edital">Editais</option>
                    <option value="mensagem">Mensagens</option>
                    <option value="sistema">Sistema</option>
                  </select>
                  <select
                    className="p-2 border rounded-md"
                    value={editalFiltro}
                    onChange={(e) => setEditalFiltro(e.target.value)}
                  >
                    {editaisUnicos.map((edital, index) => (
                      <option key={index} value={edital}>
                        {edital === "todos" ? "Todos os editais" : edital}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {notificacoesFiltradas.length > 0 ? (
                <div className="space-y-4">
                  {notificacoesFiltradas.map((notificacao) => (
                    <div 
                      key={notificacao.id} 
                      className={`p-4 rounded-lg border ${!notificacao.lida ? 'bg-slate-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <Badge className={`flex items-center ${obterCorTipo(notificacao.tipo)}`}>
                          {obterIconeTipo(notificacao.tipo)}
                          {notificacao.tipo === "inscricao" && "Inscrição"}
                          {notificacao.tipo === "edital" && "Edital"}
                          {notificacao.tipo === "mensagem" && "Mensagem"}
                          {notificacao.tipo === "sistema" && "Sistema"}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">
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
                      <p className="text-slate-600 mt-1">{notificacao.descricao}</p>
                      {notificacao.edital && (
                        <div className="mt-2">
                          <Badge variant="outline" className="bg-slate-50">
                            {notificacao.edital}
                          </Badge>
                        </div>
                      )}
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
                  <Bell className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma notificação encontrada</h3>
                  <p className="text-slate-500">
                    {searchTerm || tipoFiltro !== "todas" || categoriaFiltro !== "todas" || editalFiltro !== "todos"
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
                      <p className="text-sm text-slate-500">{config.descricao}</p>
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
                    {config.tipo !== "sistema" && <hr />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>Estatísticas de notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total de notificações:</span>
                  <span className="font-medium">{notificacoes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Não lidas:</span>
                  <span className="font-medium">{notificacoes.filter(n => !n.lida).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inscrições:</span>
                  <span className="font-medium">{notificacoes.filter(n => n.tipo === "inscricao").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Editais:</span>
                  <span className="font-medium">{notificacoes.filter(n => n.tipo === "edital").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mensagens:</span>
                  <span className="font-medium">{notificacoes.filter(n => n.tipo === "mensagem").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sistema:</span>
                  <span className="font-medium">{notificacoes.filter(n => n.tipo === "sistema").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificacoesOrganizadorPage;
