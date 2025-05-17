import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, Send, PlusCircle, User, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos para as mensagens
interface Contato {
  id: number;
  nome: string;
  tipo: "artista" | "sistema";
  avatar?: string;
  ultimaMensagem: string;
  dataUltimaMensagem: Date;
  naoLidas: number;
  edital?: string;
}

interface Mensagem {
  id: number;
  remetente: number;
  destinatario: number;
  conteudo: string;
  data: Date;
  lida: boolean;
}

// Dados de exemplo
const contatosIniciais: Contato[] = [
  {
    id: 1,
    nome: "Pedro Oliveira",
    tipo: "artista",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ultimaMensagem: "Obrigado pela confirmação! Estou ansioso para participar do processo seletivo.",
    dataUltimaMensagem: new Date(2025, 4, 15, 10, 30),
    naoLidas: 0,
    edital: "Festival Internacional de Artes Visuais"
  },
  {
    id: 2,
    nome: "Mariana Santos",
    tipo: "artista",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ultimaMensagem: "Gostaria de saber se posso enviar materiais adicionais para complementar minha inscrição.",
    dataUltimaMensagem: new Date(2025, 4, 14, 15, 45),
    naoLidas: 1,
    edital: "Festival Internacional de Artes Visuais"
  },
  {
    id: 3,
    nome: "Carlos Mendes",
    tipo: "artista",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ultimaMensagem: "Enviei minha inscrição, mas não recebi confirmação. Poderia verificar, por favor?",
    dataUltimaMensagem: new Date(2025, 4, 13, 9, 20),
    naoLidas: 1,
    edital: "Prêmio Nacional de Artes Plásticas"
  },
  {
    id: 4,
    nome: "Sistema Artmatch",
    tipo: "sistema",
    ultimaMensagem: "Você tem 10 novas inscrições para revisar no Festival Internacional de Artes Visuais.",
    dataUltimaMensagem: new Date(2025, 4, 12, 11, 10),
    naoLidas: 0
  }
];

const mensagensIniciais: { [key: number]: Mensagem[] } = {
  1: [
    {
      id: 1,
      remetente: 1,
      destinatario: 0, // 0 representa o organizador atual
      conteudo: "Olá! Gostaria de confirmar se minha inscrição no Festival Internacional de Artes Visuais foi recebida corretamente.",
      data: new Date(2025, 4, 15, 9, 30),
      lida: true,
    },
    {
      id: 2,
      remetente: 0,
      destinatario: 1,
      conteudo: "Olá Pedro! Sim, sua inscrição foi recebida e está em análise. Entraremos em contato caso precisemos de informações adicionais.",
      data: new Date(2025, 4, 15, 10, 15),
      lida: true,
    },
    {
      id: 3,
      remetente: 1,
      destinatario: 0,
      conteudo: "Obrigado pela confirmação! Estou ansioso para participar do processo seletivo.",
      data: new Date(2025, 4, 15, 10, 30),
      lida: true,
    }
  ],
  2: [
    {
      id: 4,
      remetente: 2,
      destinatario: 0,
      conteudo: "Gostaria de saber se posso enviar materiais adicionais para complementar minha inscrição.",
      data: new Date(2025, 4, 14, 15, 45),
      lida: false,
    }
  ],
  3: [
    {
      id: 5,
      remetente: 3,
      destinatario: 0,
      conteudo: "Enviei minha inscrição, mas não recebi confirmação. Poderia verificar, por favor?",
      data: new Date(2025, 4, 13, 9, 20),
      lida: false,
    }
  ],
  4: [
    {
      id: 6,
      remetente: 4,
      destinatario: 0,
      conteudo: "Você tem 10 novas inscrições para revisar no Festival Internacional de Artes Visuais.",
      data: new Date(2025, 4, 12, 11, 10),
      lida: true,
    }
  ]
};

const MensagensOrganizadorPage = () => {
  const [contatos, setContatos] = useState<Contato[]>(contatosIniciais);
  const [mensagens, setMensagens] = useState<{ [key: number]: Mensagem[] }>(mensagensIniciais);
  const [contatoAtivo, setContatoAtivo] = useState<Contato | null>(null);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editalFiltro, setEditalFiltro] = useState<string | "todos">("todos");
  const { toast } = useToast();

  // Obter lista de editais únicos para o filtro
  const editaisUnicos = ["todos", ...new Set(contatos
    .filter(c => c.edital)
    .map(c => c.edital as string))];

  // Filtrar contatos com base na busca e no edital selecionado
  const contatosFiltrados = contatos.filter(contato =>
    contato.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (editalFiltro === "todos" || contato.edital === editalFiltro)
  );

  // Selecionar um contato para visualizar a conversa
  const selecionarContato = (contato: Contato) => {
    setContatoAtivo(contato);
    
    // Marcar mensagens como lidas
    if (contato.naoLidas > 0) {
      const novasMensagens = { ...mensagens };
      novasMensagens[contato.id] = novasMensagens[contato.id].map(m => 
        m.remetente === contato.id && !m.lida ? { ...m, lida: true } : m
      );
      setMensagens(novasMensagens);
      
      // Atualizar contato para mostrar 0 mensagens não lidas
      setContatos(contatos.map(c => 
        c.id === contato.id ? { ...c, naoLidas: 0 } : c
      ));
    }
  };

  // Enviar uma nova mensagem
  const enviarMensagem = () => {
    if (!contatoAtivo || !novaMensagem.trim()) return;
    
    const novaMensagemObj: Mensagem = {
      id: Math.max(...Object.values(mensagens).flatMap(m => m.map(msg => msg.id))) + 1,
      remetente: 0, // 0 representa o organizador atual
      destinatario: contatoAtivo.id,
      conteudo: novaMensagem,
      data: new Date(),
      lida: false,
    };
    
    // Adicionar mensagem à conversa
    const novasMensagens = { ...mensagens };
    if (!novasMensagens[contatoAtivo.id]) {
      novasMensagens[contatoAtivo.id] = [];
    }
    novasMensagens[contatoAtivo.id] = [...novasMensagens[contatoAtivo.id], novaMensagemObj];
    setMensagens(novasMensagens);
    
    // Atualizar último contato
    setContatos(contatos.map(c => 
      c.id === contatoAtivo.id 
        ? { 
            ...c, 
            ultimaMensagem: novaMensagem, 
            dataUltimaMensagem: new Date() 
          } 
        : c
    ));
    
    // Limpar campo de mensagem
    setNovaMensagem("");
    
    // Simular resposta automática para fins de demonstração
    if (contatoAtivo.tipo === "sistema") {
      setTimeout(() => {
        const respostaAutomatica: Mensagem = {
          id: Math.max(...Object.values(mensagens).flatMap(m => m.map(msg => msg.id))) + 2,
          remetente: contatoAtivo.id,
          destinatario: 0,
          conteudo: "Obrigado por sua mensagem. Esta é uma notificação automática do sistema.",
          data: new Date(),
          lida: false,
        };
        
        const novasMensagensAtualizadas = { ...novasMensagens };
        novasMensagensAtualizadas[contatoAtivo.id] = [...novasMensagensAtualizadas[contatoAtivo.id], respostaAutomatica];
        setMensagens(novasMensagensAtualizadas);
        
        // Atualizar contato
        setContatos(contatos.map(c => 
          c.id === contatoAtivo.id 
            ? { 
                ...c, 
                ultimaMensagem: respostaAutomatica.conteudo, 
                dataUltimaMensagem: new Date(),
                naoLidas: c.naoLidas + 1
              } 
            : c
        ));
      }, 1000);
    }
  };

  // Iniciar nova conversa
  const iniciarNovaConversa = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A opção de iniciar novas conversas estará disponível em breve.",
    });
  };

  // Formatar a data relativa (ex: "há 2 horas")
  const formatarDataRelativa = (data: Date) => {
    return formatDistanceToNow(data, { addSuffix: true, locale: ptBR });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mensagens</h1>
        <Button onClick={iniciarNovaConversa}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova Mensagem
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        <Card className="lg:col-span-1 flex flex-col h-full">
          <CardHeader className="pb-3">
            <CardTitle>Conversas</CardTitle>
            <CardDescription>
              Gerencie suas mensagens com artistas e candidatos
            </CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Buscar contatos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="mb-4">
              <label htmlFor="edital-filtro" className="block text-sm font-medium mb-1">
                Filtrar por edital
              </label>
              <select
                id="edital-filtro"
                className="w-full p-2 border rounded-md"
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
            
            <div className="space-y-2">
              {contatosFiltrados.length > 0 ? (
                contatosFiltrados.map((contato) => (
                  <div 
                    key={contato.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      contatoAtivo?.id === contato.id 
                        ? 'bg-primary-50 border border-primary-100' 
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                    onClick={() => selecionarContato(contato)}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        {contato.avatar ? (
                          <AvatarImage src={contato.avatar} alt={contato.nome} />
                        ) : (
                          <AvatarFallback>
                            {contato.tipo === "sistema" ? (
                              <MessageSquare className="h-5 w-5" />
                            ) : (
                              <User className="h-5 w-5" />
                            )}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">{contato.nome}</div>
                          <div className="text-xs text-slate-500 whitespace-nowrap ml-2">
                            {formatarDataRelativa(contato.dataUltimaMensagem)}
                          </div>
                        </div>
                        {contato.edital && (
                          <div className="text-xs text-primary-600 mt-1">
                            {contato.edital}
                          </div>
                        )}
                        <div className="text-sm text-slate-600 truncate mt-1">
                          {contato.ultimaMensagem}
                        </div>
                      </div>
                    </div>
                    {contato.naoLidas > 0 && (
                      <div className="flex justify-end mt-1">
                        <Badge className="bg-primary-500">{contato.naoLidas}</Badge>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  Nenhum contato encontrado
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col h-full">
          {contatoAtivo ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {contatoAtivo.avatar ? (
                      <AvatarImage src={contatoAtivo.avatar} alt={contatoAtivo.nome} />
                    ) : (
                      <AvatarFallback>
                        {contatoAtivo.tipo === "sistema" ? (
                          <MessageSquare className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle>{contatoAtivo.nome}</CardTitle>
                    <CardDescription>
                      {contatoAtivo.tipo === "sistema" ? "Sistema" : "Artista"}
                      {contatoAtivo.edital && ` • ${contatoAtivo.edital}`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {mensagens[contatoAtivo.id]?.map((mensagem) => (
                    <div 
                      key={mensagem.id}
                      className={`flex ${mensagem.remetente === 0 ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          mensagem.remetente === 0 
                            ? 'bg-primary-100 text-primary-900' 
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <div className="text-sm">{mensagem.conteudo}</div>
                        <div className="text-xs text-right mt-1 opacity-70">
                          {formatarDataRelativa(mensagem.data)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    className="min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        enviarMensagem();
                      }
                    }}
                  />
                  <Button 
                    className="self-end"
                    onClick={enviarMensagem}
                    disabled={!novaMensagem.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Nenhuma conversa selecionada</h3>
              <p className="text-slate-500 max-w-md">
                Selecione uma conversa à esquerda ou inicie uma nova mensagem para começar a conversar.
              </p>
              <Button className="mt-6" onClick={iniciarNovaConversa}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Mensagem
              </Button>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MensagensOrganizadorPage;
