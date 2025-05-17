import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

// Dados de exemplo para inscrições
const inscricoesAtivas = [
  {
    id: 1,
    editalId: 1,
    titulo: "Festival Internacional de Artes Visuais",
    organizador: "Secretaria Municipal de Cultura",
    local: "São Paulo, SP",
    prazo: "30/06/2025",
    dataInscricao: "15/05/2025",
    status: "em_analise",
    etapaAtual: "Análise de portfólio",
    progresso: 40,
  },
  {
    id: 2,
    editalId: 3,
    titulo: "Prêmio Nacional de Artes Plásticas",
    organizador: "Ministério da Cultura",
    local: "Nacional",
    prazo: "10/08/2025",
    dataInscricao: "01/05/2025",
    status: "pendente",
    etapaAtual: "Documentação em análise",
    progresso: 25,
  }
];

const inscricoesAnteriores = [
  {
    id: 3,
    editalId: 5,
    titulo: "Residência Artística Municipal",
    organizador: "Fundação Cultural",
    local: "Belo Horizonte, MG",
    dataInscricao: "10/01/2025",
    dataResultado: "15/02/2025",
    status: "aprovado",
    feedback: "Excelente portfólio e proposta alinhada com os objetivos da residência."
  },
  {
    id: 4,
    editalId: 8,
    titulo: "Exposição Coletiva Novos Talentos",
    organizador: "Galeria de Arte Contemporânea",
    local: "Rio de Janeiro, RJ",
    dataInscricao: "05/12/2024",
    dataResultado: "20/01/2025",
    status: "reprovado",
    feedback: "Proposta interessante, mas não se adequou ao tema da exposição."
  }
];

const InscricoesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ativas");

  const filteredInscricoesAtivas = inscricoesAtivas.filter((inscricao) =>
    inscricao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inscricao.organizador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inscricao.local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInscricoesAnteriores = inscricoesAnteriores.filter((inscricao) =>
    inscricao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inscricao.organizador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inscricao.local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_analise":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Em análise</Badge>;
      case "pendente":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pendente</Badge>;
      case "aprovado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Aprovado</Badge>;
      case "reprovado":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Não selecionado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "em_analise":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "pendente":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "aprovado":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "reprovado":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Inscrições</h1>
        <Button onClick={() => navigate("/dashboard/editais")}>
          Buscar Novos Editais
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Buscar inscrições por título, organizador, local..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="ativas" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="flex w-full justify-between">
          <TabsTrigger value="ativas">Inscrições Ativas</TabsTrigger>
          <TabsTrigger value="anteriores">Inscrições Anteriores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ativas" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500">
              Mostrando {filteredInscricoesAtivas.length} inscrições ativas
            </div>
          </div>
          
          {filteredInscricoesAtivas.length > 0 ? (
            <div className="space-y-4">
              {filteredInscricoesAtivas.map((inscricao) => (
                <Card key={inscricao.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{inscricao.titulo}</h3>
                          <p className="text-slate-600 mb-2">{inscricao.organizador}</p>
                        </div>
                        {getStatusBadge(inscricao.status)}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {inscricao.local}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Inscrito em {inscricao.dataInscricao}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Progresso: {inscricao.etapaAtual}</span>
                          <span className="text-sm text-slate-500">{inscricao.progresso}%</span>
                        </div>
                        <Progress value={inscricao.progresso} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-6 flex flex-col justify-center items-center md:w-48">
                      <Button 
                        className="w-full mb-2"
                        onClick={() => navigate(`/dashboard/edital/${inscricao.editalId}`)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" className="w-full">
                        Acompanhar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <div className="mb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-slate-500" />
                </div>
              </div>
              <CardTitle className="mb-2">Nenhuma inscrição ativa</CardTitle>
              <CardDescription>
                Você ainda não tem inscrições ativas em editais.
              </CardDescription>
              <Button className="mt-4" onClick={() => navigate("/dashboard/editais")}>
                Explorar Editais
              </Button>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="anteriores" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500">
              Mostrando {filteredInscricoesAnteriores.length} inscrições anteriores
            </div>
          </div>
          
          {filteredInscricoesAnteriores.length > 0 ? (
            <div className="space-y-4">
              {filteredInscricoesAnteriores.map((inscricao) => (
                <Card key={inscricao.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{inscricao.titulo}</h3>
                        <p className="text-slate-600">{inscricao.organizador}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(inscricao.status)}
                        {getStatusBadge(inscricao.status)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {inscricao.local}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Inscrito em {inscricao.dataInscricao}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Resultado em {inscricao.dataResultado}
                      </div>
                    </div>
                    
                    {inscricao.feedback && (
                      <div className={`p-4 rounded-lg ${
                        inscricao.status === "aprovado" 
                          ? "bg-green-50 border border-green-100" 
                          : "bg-slate-50 border border-slate-100"
                      }`}>
                        <h4 className="font-medium mb-1">Feedback</h4>
                        <p className="text-sm">{inscricao.feedback}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/dashboard/edital/${inscricao.editalId}`)}
                      >
                        Ver Edital
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <div className="mb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-slate-500" />
                </div>
              </div>
              <CardTitle className="mb-2">Nenhuma inscrição anterior</CardTitle>
              <CardDescription>
                Você ainda não tem histórico de inscrições em editais.
              </CardDescription>
              <Button className="mt-4" onClick={() => navigate("/dashboard/editais")}>
                Explorar Editais
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default InscricoesPage;
