import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrgDashboardLayout from "@/components/organizador/OrgDashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, MapPin, DollarSign, Users, Info, Plus, Trash2 } from "lucide-react";

const NovoEditalPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("informacoes");
  
  // Estados para o formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prazoInscricao, setPrazoInscricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [local, setLocal] = useState("");
  const [vagas, setVagas] = useState("");
  const [valor, setValor] = useState("");
  
  // Estados para requisitos
  const [requisitos, setRequisitos] = useState([
    { id: 1, descricao: "" }
  ]);
  
  // Estados para documentos
  const [documentos, setDocumentos] = useState([
    { id: 1, nome: "", obrigatorio: true }
  ]);
  
  // Estados para etapas
  const [etapas, setEtapas] = useState([
    { id: 1, nome: "Inscrição online", dataInicio: "", dataFim: "" }
  ]);
  
  // Estados para critérios de avaliação
  const [criterios, setCriterios] = useState([
    { id: 1, nome: "", peso: 0 }
  ]);

  // Funções para adicionar e remover itens
  const adicionarRequisito = () => {
    const novoId = requisitos.length > 0 ? Math.max(...requisitos.map(r => r.id)) + 1 : 1;
    setRequisitos([...requisitos, { id: novoId, descricao: "" }]);
  };

  const removerRequisito = (id: number) => {
    if (requisitos.length > 1) {
      setRequisitos(requisitos.filter(r => r.id !== id));
    }
  };

  const atualizarRequisito = (id: number, descricao: string) => {
    setRequisitos(requisitos.map(r => r.id === id ? { ...r, descricao } : r));
  };

  const adicionarDocumento = () => {
    const novoId = documentos.length > 0 ? Math.max(...documentos.map(d => d.id)) + 1 : 1;
    setDocumentos([...documentos, { id: novoId, nome: "", obrigatorio: true }]);
  };

  const removerDocumento = (id: number) => {
    if (documentos.length > 1) {
      setDocumentos(documentos.filter(d => d.id !== id));
    }
  };

  const atualizarDocumento = (id: number, campo: string, valor: any) => {
    setDocumentos(documentos.map(d => d.id === id ? { ...d, [campo]: valor } : d));
  };

  const adicionarEtapa = () => {
    const novoId = etapas.length > 0 ? Math.max(...etapas.map(e => e.id)) + 1 : 1;
    setEtapas([...etapas, { id: novoId, nome: "", dataInicio: "", dataFim: "" }]);
  };

  const removerEtapa = (id: number) => {
    if (etapas.length > 1) {
      setEtapas(etapas.filter(e => e.id !== id));
    }
  };

  const atualizarEtapa = (id: number, campo: string, valor: string) => {
    setEtapas(etapas.map(e => e.id === id ? { ...e, [campo]: valor } : e));
  };

  const adicionarCriterio = () => {
    const novoId = criterios.length > 0 ? Math.max(...criterios.map(c => c.id)) + 1 : 1;
    setCriterios([...criterios, { id: novoId, nome: "", peso: 0 }]);
  };

  const removerCriterio = (id: number) => {
    if (criterios.length > 1) {
      setCriterios(criterios.filter(c => c.id !== id));
    }
  };

  const atualizarCriterio = (id: number, campo: string, valor: any) => {
    setCriterios(criterios.map(c => c.id === id ? { ...c, [campo]: valor } : c));
  };

  // Função para salvar o edital
  const salvarEdital = () => {
    // Aqui seria implementada a lógica para salvar o edital no banco de dados
    toast({
      title: "Edital criado com sucesso!",
      description: "Seu edital foi publicado e já está disponível para inscrições.",
    });
    navigate("/organizador/editais");
  };

  // Função para publicar o edital
  const publicarEdital = () => {
    // Validação básica
    if (!titulo || !descricao || !categoria || !prazoInscricao) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Aqui seria implementada a lógica para publicar o edital
    toast({
      title: "Edital publicado com sucesso!",
      description: "Seu edital foi publicado e já está disponível para inscrições.",
    });
    navigate("/organizador/editais");
  };

  return (
    <OrgDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Criar Novo Edital</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/organizador/editais")}>
            Cancelar
          </Button>
          <Button onClick={salvarEdital}>
            Salvar Rascunho
          </Button>
        </div>
      </div>

      <Tabs defaultValue="informacoes" onValueChange={setActiveTab} value={activeTab} className="mb-6">
        <TabsList className="flex w-full justify-between">
          <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
          <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
          <TabsTrigger value="etapas">Etapas</TabsTrigger>
          <TabsTrigger value="avaliacao">Avaliação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="informacoes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas do Edital</CardTitle>
              <CardDescription>
                Preencha as informações essenciais sobre o edital
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título do Edital *</Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Festival Internacional de Artes Visuais"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o edital, seus objetivos e informações gerais"
                  rows={5}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artes_visuais">Artes Visuais</SelectItem>
                      <SelectItem value="musica">Música</SelectItem>
                      <SelectItem value="teatro">Teatro</SelectItem>
                      <SelectItem value="danca">Dança</SelectItem>
                      <SelectItem value="literatura">Literatura</SelectItem>
                      <SelectItem value="audiovisual">Audiovisual</SelectItem>
                      <SelectItem value="fotografia">Fotografia</SelectItem>
                      <SelectItem value="multimidia">Multimídia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prazo">Prazo de Inscrição *</Label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    <Input
                      id="prazo"
                      type="date"
                      value={prazoInscricao}
                      onChange={(e) => setPrazoInscricao(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início do Evento</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    <Input
                      id="dataInicio"
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Término do Evento</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    <Input
                      id="dataFim"
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="local">Local</Label>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                    <Input
                      id="local"
                      value={local}
                      onChange={(e) => setLocal(e.target.value)}
                      placeholder="Ex: São Paulo, SP"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vagas">Número de Vagas</Label>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-slate-500" />
                    <Input
                      id="vagas"
                      type="number"
                      value={vagas}
                      onChange={(e) => setVagas(e.target.value)}
                      placeholder="Ex: 20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor do Prêmio/Bolsa</Label>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-slate-500" />
                    <Input
                      id="valor"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                      placeholder="Ex: R$ 15.000,00"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div></div>
              <Button onClick={() => setActiveTab("requisitos")}>
                Próximo: Requisitos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="requisitos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Requisitos e Documentos</CardTitle>
              <CardDescription>
                Defina os requisitos para participação e documentos necessários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Requisitos para Participação</h3>
                  <Button variant="outline" size="sm" onClick={adicionarRequisito}>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {requisitos.map((requisito) => (
                    <div key={requisito.id} className="flex items-start gap-2">
                      <div className="flex-1">
                        <Input
                          value={requisito.descricao}
                          onChange={(e) => atualizarRequisito(requisito.id, e.target.value)}
                          placeholder="Ex: Ser artista visual com pelo menos 2 anos de experiência"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removerRequisito(requisito.id)}
                        disabled={requisitos.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Documentos Necessários</h3>
                  <Button variant="outline" size="sm" onClick={adicionarDocumento}>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {documentos.map((documento) => (
                    <div key={documento.id} className="flex items-start gap-2">
                      <div className="flex-1 grid grid-cols-5 gap-2">
                        <div className="col-span-4">
                          <Input
                            value={documento.nome}
                            onChange={(e) => atualizarDocumento(documento.id, "nome", e.target.value)}
                            placeholder="Ex: Portfólio digital"
                          />
                        </div>
                        <div className="col-span-1">
                          <Select 
                            value={documento.obrigatorio ? "sim" : "nao"}
                            onValueChange={(value) => atualizarDocumento(documento.id, "obrigatorio", value === "sim")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Obrigatório?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removerDocumento(documento.id)}
                        disabled={documentos.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("informacoes")}>
                Voltar
              </Button>
              <Button onClick={() => setActiveTab("etapas")}>
                Próximo: Etapas
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="etapas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Etapas do Processo</CardTitle>
              <CardDescription>
                Defina as etapas do processo seletivo e suas datas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Cronograma</h3>
                <Button variant="outline" size="sm" onClick={adicionarEtapa}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Etapa
                </Button>
              </div>
              
              <div className="space-y-4">
                {etapas.map((etapa, index) => (
                  <div key={etapa.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input
                            value={etapa.nome}
                            onChange={(e) => atualizarEtapa(etapa.id, "nome", e.target.value)}
                            placeholder="Nome da etapa"
                            className="mb-2"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`inicio-${etapa.id}`} className="text-sm">Data de Início</Label>
                              <Input
                                id={`inicio-${etapa.id}`}
                                type="date"
                                value={etapa.dataInicio}
                                onChange={(e) => atualizarEtapa(etapa.id, "dataInicio", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`fim-${etapa.id}`} className="text-sm">Data de Término</Label>
                              <Input
                                id={`fim-${etapa.id}`}
                                type="date"
                                value={etapa.dataFim}
                                onChange={(e) => atualizarEtapa(etapa.id, "dataFim", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removerEtapa(etapa.id)}
                        disabled={etapas.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("requisitos")}>
                Voltar
              </Button>
              <Button onClick={() => setActiveTab("avaliacao")}>
                Próximo: Avaliação
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="avaliacao" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Critérios de Avaliação</CardTitle>
              <CardDescription>
                Defina como os candidatos serão avaliados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Critérios</h3>
                  <Button variant="outline" size="sm" onClick={adicionarCriterio}>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {criterios.map((criterio) => (
                    <div key={criterio.id} className="flex items-start gap-2">
                      <div className="flex-1 grid grid-cols-5 gap-2">
                        <div className="col-span-4">
                          <Input
                            value={criterio.nome}
                            onChange={(e) => atualizarCriterio(criterio.id, "nome", e.target.value)}
                            placeholder="Ex: Originalidade"
                          />
                        </div>
                        <div className="col-span-1">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={criterio.peso}
                            onChange={(e) => atualizarCriterio(criterio.id, "peso", parseInt(e.target.value))}
                            placeholder="Peso (%)"
                          />
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removerCriterio(criterio.id)}
                        disabled={criterios.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-slate-500">
                  <Info className="h-4 w-4 inline-block mr-1" />
                  A soma dos pesos deve ser igual a 100%.
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Resumo do Edital</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Título:</p>
                      <p className="text-slate-600">{titulo || "Não definido"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Categoria:</p>
                      <p className="text-slate-600">{categoria || "Não definida"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Prazo de Inscrição:</p>
                      <p className="text-slate-600">{prazoInscricao || "Não definido"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Local:</p>
                      <p className="text-slate-600">{local || "Não definido"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Requisitos:</p>
                      <p className="text-slate-600">{requisitos.filter(r => r.descricao).length} definidos</p>
                    </div>
                    <div>
                      <p className="font-medium">Documentos:</p>
                      <p className="text-slate-600">{documentos.filter(d => d.nome).length} definidos</p>
                    </div>
                    <div>
                      <p className="font-medium">Etapas:</p>
                      <p className="text-slate-600">{etapas.filter(e => e.nome).length} definidas</p>
                    </div>
                    <div>
                      <p className="font-medium">Critérios:</p>
                      <p className="text-slate-600">{criterios.filter(c => c.nome).length} definidos</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("etapas")}>
                Voltar
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={salvarEdital}>
                  Salvar Rascunho
                </Button>
                <Button onClick={publicarEdital}>
                  Publicar Edital
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </OrgDashboardLayout>
  );
};

export default NovoEditalPage;
