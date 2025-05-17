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
import { Search, Send, PlusCircle, User, Building, Clock, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos para as mensagens
interface Contato {
  id: number;
  nome: string;
  tipo: "organizador" | "artista" | "sistema";
  avatar?: string;
  ultimaMensagem: string;
  dataUltimaMensagem: Date;
  naoLidas: number;
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
    nome: "Secretaria Municipal de Cultura",
    tipo: "organizador",
    avatar: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ultimaMensagem: "Olá! Gostaríamos de confirmar alguns detalhes sobre sua inscrição no Festival Internacional de Artes Visuais.",
    dataUltimaMensagem: new Date(2025, 4, 15, 10, 30),
    naoLidas: 2,
  },
  {
    id: 2,
    nome: "Fundação Cultural",
    tipo: "organizador",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ultimaMensagem: "Sua inscrição na Residência Artística Municipal foi recebida. Aguarde nosso contato para as próximas etapas.",
    dataUltimaMensagem: new Date(2025, 4, 13, 15, 45),
    naoLidas: 0,
  },
  {
    id: 3,
    nome: "Mariana Santos",
    tipo: "artista",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ultimaMensagem: "Adorei seu trabalho! Você estará participando do Festival de Artes este ano?",
    dataUltimaMensagem: new Date(2025, 4, 10, 9, 20),
    naoLidas: 0,
  },
  {
    id: 4,
    nome: "Sistema Artmatch",
    tipo: "sistema",
    ultimaMensagem: "Detectamos 3 novos editais compatíveis com seu perfil. Clique aqui para ver.",
    dataUltimaMensagem: new Date(2025, 4, 8, 11, 10),
    naoLidas: 1,
  }
];

const mensagensIniciais: { [key: number]: Mensagem[] } = {
  1: [
    {
      id: 1,
      remetente: 1,
      destinatario: 0, // 0 representa o usuário atual
      conteudo: "Olá! Gostaríamos de confirmar alguns detalhes sobre sua inscrição no Festival Internacional de Artes Visuais.",
      data: new Date(2025, 4, 15, 10, 30),
      lida: false,
    },
    {
      id: 2,
      remetente: 1,
      destinatario: 0,
      conteudo: "Precisamos que você envie uma descrição mais detalhada da obra que pretende apresentar, incluindo dimensões e materiais utilizados.",
      data: new Date(2025, 4, 15, 10, 32),
      lida: false,
    }
  ],
  2: [
    {
      id: 3,
      remetente: 2,
      destinatario: 0,
      conteudo: "Sua inscrição na Residência Artística Municipal foi recebida. Aguarde nosso contato para as próximas etapas.",
      data: new Date(2025, 4, 13, 15, 45),
      lida: true,
    },
    {
      id: 4,
      remetente: 0,
      destinatario: 2,
      conteudo: "Obrigado pela confirmação! Estou ansioso para participar do processo seletivo.",
      data: new Date(2025, 4, 13, 16, 20),
      lida: true,
    }
  ],
  3: [
    {
      id: 5,
      remetente: 3,
      destinatario: 0,
      conteudo: "Adorei seu trabalho! Você estará participando do Festival de Artes este ano?",
      data: new Date(2025, 4, 10, 9, 20),
      lida: true,
    },
    {
      id: 6,
      remetente: 0,
      destinatario: 3,
      conteudo: "Olá Mariana! Obrigado pelo elogio. Sim, me inscrevi no Festival Internacional de Artes Visuais. Você também vai participar?",
      data: new Date(2025, 4, 10, 10, 15),
      lida: true,
    },
    {
      id: 7,
      remetente: 3,
      destinatario: 0,
      conteudo: "Sim! Também me inscrevi. Quem sabe podemos nos encontrar por lá e trocar experiências!",
      data: new Date(2025, 4, 10, 10, 30),
      lida: true,
    }
  ],
  4: [
    {
      id: 8,
      remetente: 4,
      destinatario: 0,
      conteudo: "Detectamos 3 novos editais compatíveis com seu perfil. Clique aqui para ver.",
      data: new Date(2025, 4, 8, 11, 10),
      lida: false,
    }
  ]
};

const MensagensPage = () => {
  const [contatos, setContatos] = useState<Contato[]>(contatosIniciais);
  const [mensagens, setMensagens] = useState<{ [key: number]: Mensagem[] }>(mensagensIniciais);
  const [contatoAtivo, setContatoAtivo] = useState<Contato | null>(null);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Filtrar contatos com base na busca
  const contatosFiltrados = contatos.filter(contato =>
    contato.nome.toLowerCase().includes(searchTerm.toLowerCase())
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
      remetente: 0, // 0 representa o usuário atual
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
              Gerencie suas mensagens com organizadores e outros artistas
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
            <Tabs defaultValue="todos" className="mb-4">
              <TabsList className="flex w-full justify-between">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="organizadores">Organizadores</TabsTrigger>
                <TabsTrigger value="artistas">Artistas</TabsTrigger>
              </TabsList>
            </Tabs>
            
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
                            {contato.tipo === "organizador" ? (
                              <Building className="h-5 w-5" />
                            ) : contato.tipo === "sistema" ? (
                              <Clock className="h-5 w-5" />
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
                        {contatoAtivo.tipo === "organizador" ? (
                          <Building className="h-5 w-5" />
                        ) : contatoAtivo.tipo === "sistema" ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle>{contatoAtivo.nome}</CardTitle>
                    <CardDescription>
                      {contatoAtivo.tipo === "organizador" ? "Organizador" : 
                       contatoAtivo.tipo === "sistema" ? "Sistema" : "Artista"}
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

export default MensagensPage;
