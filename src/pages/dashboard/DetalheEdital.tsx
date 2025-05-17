import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getEditalById } from "@/data/editais";
import TagsCompatibilidade, { type TagCompatibilidade } from "@/components/dashboard/TagsCompatibilidade";
import InsigniasMedalhas, { type Insignia } from "@/components/dashboard/InsigniasMedalhas";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, MapPin, Clock, Users, Award, DollarSign, FileText, Info, CheckCircle2, AlertCircle, Upload } from "lucide-react";

// Verificação de compatibilidade do perfil

// Verificação de compatibilidade do perfil
const perfilCompatibilidade = [
  { item: "Categoria artística", status: true },
  { item: "Experiência mínima", status: true },
  { item: "Portfólio completo", status: true },
  { item: "Localização", status: false },
  { item: "Documentação", status: true }
];

// Tags de compatibilidade do usuário com este edital
const tagsCompatibilidadeEdital: TagCompatibilidade[] = [
  { nome: "Artes Visuais", compatibilidade: 92, descricao: "Você tem alta compatibilidade com este edital de Artes Visuais", categoria: "Linguagem", icone: "palette" },
  { nome: "Pintura", compatibilidade: 88, descricao: "Sua experiência em pintura é compatível com os requisitos deste edital", categoria: "Técnica", icone: "brush" },
  { nome: "Exposições", compatibilidade: 85, descricao: "Seu perfil é adequado para este tipo de exposição artística", categoria: "Tipo", icone: "gallery_thumbnail" },
  { nome: "Nordeste", compatibilidade: 90, descricao: "Sua localização é compatível com este edital regional", categoria: "Região", icone: "location_on" },
];

// Insígnias que podem ser conquistadas com este edital
const insigniasDisponiveis: Insignia[] = [
  {
    id: "edital-1",
    titulo: "Artista Internacional",
    descricao: "Conquistada ao participar com sucesso deste edital internacional",
    icone: "public",
    cor: "bg-primary-600",
    data: "Disponível após aprovação",
    nivel: "ouro"
  },
  {
    id: "edital-2",
    titulo: "Expositor Cultural",
    descricao: "Conquistada ao ter seu trabalho exposto em um festival internacional",
    icone: "gallery_thumbnail",
    cor: "bg-purple-600",
    data: "Disponível após aprovação",
    nivel: "prata"
  }
];

const DetalheEditalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("detalhes");
  const [etapaInscricao, setEtapaInscricao] = useState(0);
  
  // Verificar se há um parâmetro de consulta 'tab' na URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['detalhes', 'inscricao', 'regulamento'].includes(tabParam)) {
      setActiveTab(tabParam);
      if (tabParam === 'inscricao' && etapaInscricao === 0) {
        setEtapaInscricao(1);
      }
    }
  }, [location.search, etapaInscricao]);

  // Obter dados do edital baseado no ID do parâmetro da URL
  const editalId = id ? parseInt(id) : 1;
  const edital = getEditalById(editalId);

  // Calcular a porcentagem de compatibilidade do perfil
  const compatibilidadePerfil = perfilCompatibilidade.filter(item => item.status).length / perfilCompatibilidade.length * 100;

  const handleIniciarInscricao = () => {
    setEtapaInscricao(1);
    setActiveTab("inscricao");
  };

  const handleAvancarEtapa = () => {
    if (etapaInscricao < 3) {
      setEtapaInscricao(etapaInscricao + 1);
    } else {
      // Finalizar inscrição
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Sua inscrição foi enviada e está em análise.",
      });
      navigate("/dashboard/inscricoes");
    }
  };

  const handleVoltarEtapa = () => {
    if (etapaInscricao > 0) {
      setEtapaInscricao(etapaInscricao - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/editais")}>
          Voltar para Editais
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          {/* Imagem de capa com elementos culturais */}
          <div className="relative rounded-xl overflow-hidden mb-6 h-64 md:h-80">
            <ImageWithFallback
              src={edital.imagemCapa} 
              alt={`Imagem de capa do edital ${edital.titulo}`}
              className="w-full h-full object-cover"
              fallbackColor={edital.regiaoTema === "Norte" ? "bg-gradient-to-r from-emerald-800 to-emerald-600" : "bg-gradient-to-r from-amber-700 to-orange-500"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-white/20 text-white border-none">
                  Região {edital.regiaoTema}
                </Badge>
                <Badge variant="outline" className="bg-green-500/30 text-white border-none flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  {edital.compatibilidade}% compatível
                </Badge>
                {edital.elementosCulturais?.map((elemento, index) => (
                  <Badge key={index} variant="outline" className="bg-primary-500/80 text-white border-none">
                    {elemento}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{edital.titulo}</h1>
              <p className="text-white/80">{edital.organizador}</p>
            </div>
          </div>
          
          <Card className="mb-6 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{edital.titulo}</CardTitle>
                  <CardDescription className="text-base mt-1">{edital.organizador}</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {edital.compatibilidade}% compatível
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex w-full justify-between dark:bg-slate-700">
                  <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                  <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                  <TabsTrigger value="inscricao">Inscrição</TabsTrigger>
                </TabsList>
                
                <TabsContent value="detalhes" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Sobre o Edital</h3>
                      <p className="text-slate-600">{edital.descricao}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Prazo de Inscrição</div>
                          <div className="text-slate-600">Até {edital.prazo}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Período do Evento</div>
                          <div className="text-slate-600">{edital.dataEvento}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Localização</div>
                          <div className="text-slate-600">{edital.local}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Vagas Disponíveis</div>
                          <div className="text-slate-600">{edital.vagas} vagas ({edital.inscricoes} inscritos)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Categoria</div>
                          <div className="text-slate-600">{edital.categoria}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Valor do Prêmio</div>
                          <div className="text-slate-600">{edital.valor}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Cronograma</h3>
                      <div className="space-y-3">
                        {edital.etapas.map((etapa, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              etapa.status === 'atual' 
                                ? 'bg-primary-100 text-primary-700' 
                                : etapa.status === 'concluido' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-slate-100 text-slate-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{etapa.nome}</div>
                              <div className="text-sm text-slate-500">{etapa.data}</div>
                            </div>
                            {etapa.status === 'atual' && (
                              <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                                Atual
                              </Badge>
                            )}
                            {etapa.status === 'concluido' && (
                              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                                Concluído
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="requisitos" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Requisitos para Participação</h3>
                      <ul className="space-y-2">
                        {edital.requisitos.map((requisito, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <span>{requisito}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Documentos Necessários</h3>
                      <ul className="space-y-2">
                        {edital.documentos.map((documento, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FileText className="h-5 w-5 text-slate-500 mt-0.5" />
                            <span>
                              {documento.nome}
                              {documento.obrigatorio ? (
                                <span className="text-red-500 ml-1">*</span>
                              ) : (
                                <span className="text-slate-400 ml-1">(opcional)</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Critérios de Avaliação</h3>
                      <div className="space-y-3">
                        {edital.criterios.map((criterio, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span>{criterio.nome}</span>
                              <span className="text-slate-500">{criterio.peso}%</span>
                            </div>
                            <Progress value={criterio.peso} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="inscricao" className="mt-6">
                  {etapaInscricao === 0 ? (
                    <div className="text-center py-8">
                      <div className="mb-6">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                          <Info className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Pronto para se inscrever?</h3>
                        <p className="text-slate-600 max-w-md mx-auto mb-6">
                          Antes de iniciar sua inscrição, verifique se você atende a todos os requisitos e tem os documentos necessários.
                        </p>
                      </div>
                      
                      <Button size="lg" onClick={handleIniciarInscricao}>
                        Iniciar Inscrição
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium">Etapa {etapaInscricao} de 3</h3>
                          <span className="text-sm text-slate-500">
                            {etapaInscricao === 1 && "Verificação de Compatibilidade"}
                            {etapaInscricao === 2 && "Documentos"}
                            {etapaInscricao === 3 && "Confirmação"}
                          </span>
                        </div>
                        <Progress value={etapaInscricao * 33.33} className="h-2" />
                      </div>
                      
                      {etapaInscricao === 1 && (
                        <div>
                          <div className="space-y-4 mb-6">
                            <h3 className="text-lg font-medium">Compatibilidade do seu perfil</h3>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex-1">
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${compatibilidadePerfil >= 80 ? 'bg-green-500' : compatibilidadePerfil >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${compatibilidadePerfil}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="font-medium text-sm">{compatibilidadePerfil}%</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                                <span className="material-symbols-outlined text-green-600 text-sm">local_offer</span>
                                Suas tags compatíveis com este edital:
                              </h4>
                              <TagsCompatibilidade 
                                tags={tagsCompatibilidadeEdital} 
                                showAll={true} 
                                layout="detalhado"
                                mostrarBarraProgresso={true}
                              />
                            </div>
                            <Card className="mb-4">
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-center mb-4">
                                  <div>
                                    <h4 className="font-medium">Compatibilidade do Perfil</h4>
                                    <p className="text-sm text-slate-500">
                                      Seu perfil atende a {perfilCompatibilidade.filter(item => item.status).length} de {perfilCompatibilidade.length} requisitos
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold">{Math.round(compatibilidadePerfil)}%</div>
                                  </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                  {perfilCompatibilidade.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      {item.status ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                      ) : (
                                        <AlertCircle className="h-5 w-5 text-amber-500" />
                                      )}
                                      <span className={item.status ? "text-slate-800" : "text-slate-600"}>
                                        {item.item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                              <div className="flex gap-2">
                                <AlertCircle className="h-5 w-5 mt-0.5" />
                                <div>
                                  <p className="font-medium">Atenção</p>
                                  <p className="text-sm">
                                    Você pode prosseguir com a inscrição mesmo com compatibilidade parcial, 
                                    mas recomendamos atualizar seu perfil para aumentar suas chances.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {etapaInscricao === 2 && (
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Documentos Necessários</h3>
                            <p className="text-slate-600 mb-4">
                              Envie os documentos necessários para sua inscrição.
                            </p>
                            
                            <div className="space-y-4 dark:text-slate-300">
                              {edital.documentos.map((documento, index) => (
                                <Card key={index}>
                                  <CardContent className="pt-6">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-start gap-2">
                                        <FileText className="h-5 w-5 text-slate-500 mt-0.5" />
                                        <div>
                                          <div className="font-medium">{documento.nome}</div>
                                          <div className="text-sm text-slate-500">
                                            {documento.obrigatorio ? "Obrigatório" : "Opcional"}
                                          </div>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {etapaInscricao === 3 && (
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Confirmação da Inscrição</h3>
                            <p className="text-slate-600 mb-4">
                              Revise suas informações antes de finalizar a inscrição.
                            </p>
                            
                            <Card className="mb-4">
                              <CardContent className="pt-6">
                                <h4 className="font-medium mb-3">Resumo da Inscrição</h4>
                                
                                <div className="space-y-3">
                                  <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Edital</span>
                                    <span className="font-medium">{edital.titulo}</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Organizador</span>
                                    <span>{edital.organizador}</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Prazo</span>
                                    <span>{edital.prazo}</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Compatibilidade</span>
                                    <span className="font-medium text-green-600">{edital.compatibilidade}%</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Documentos</span>
                                    <span>{edital.documentos.length} enviados</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                              <div className="flex gap-2">
                                <CheckCircle2 className="h-5 w-5 mt-0.5" />
                                <div>
                                  <p className="font-medium">Tudo pronto!</p>
                                  <p className="text-sm">
                                    Sua inscrição está pronta para ser enviada. Após o envio, você poderá acompanhar o status no seu painel.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={handleVoltarEtapa} disabled={etapaInscricao === 1}>
                          Voltar
                        </Button>
                        <Button onClick={handleAvancarEtapa}>
                          {etapaInscricao < 3 ? "Continuar" : "Finalizar Inscrição"}
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-1/3">
          <Card className="sticky top-6 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-2">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-green-600 text-base">verified</span>
                  Tags Compatíveis
                </h3>
                <TagsCompatibilidade 
                  tags={tagsCompatibilidadeEdital} 
                  maxTags={3} 
                  tamanho="sm"
                  layout="compact"
                  mostrarBarraProgresso={true}
                />
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-medium mb-2">Insígnias Disponíveis</h3>
                  <InsigniasMedalhas 
                    insignias={insigniasDisponiveis}
                    tamanho="sm"
                    layout="lista"
                    mostrarTitulo={false}
                    maxExibir={2}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={() => setActiveTab("inscricao")}>
                Inscrever-se
              </Button>
              <Button variant="outline" className="w-full">
                Salvar nos Favoritos
              </Button>
              <Button variant="outline" className="w-full">
                Compartilhar
              </Button>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Informações de Contato</h3>
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Email:</span> contato@festivalartes.com.br
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Telefone:</span> (11) 3333-4444
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Dúvidas sobre este edital? Entre em contato com o organizador ou acesse o regulamento completo.
              </p>
              <Button variant="link" className="h-auto p-0 dark:text-primary-400">
                Baixar Regulamento Completo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetalheEditalPage;
