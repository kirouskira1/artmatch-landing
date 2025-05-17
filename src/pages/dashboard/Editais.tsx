import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, MapPin, X, Check, Star, Clock } from "lucide-react";
import EditalCard from "@/components/dashboard/EditalCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Dados de exemplo para editais
// Dados de exemplo para editais abertos
const editaisAbertos = [
  {
    id: 6,
    titulo: "Exposição Arte Urbana",
    organizador: "Centro Cultural Municipal",
    local: "Belo Horizonte, MG",
    prazo: "15/08/2025",
    categoria: "Arte Urbana",
    valor: "R$ 10.000,00",
    capa: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    titulo: "Bienal de Fotografia",
    organizador: "Instituto de Fotografia",
    local: "Curitiba, PR",
    prazo: "30/09/2025",
    categoria: "Fotografia",
    valor: "R$ 18.000,00",
    capa: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    titulo: "Concurso de Ilustração",
    organizador: "Editora Nacional",
    local: "Nacional",
    prazo: "20/07/2025",
    categoria: "Exposição",
    valor: "R$ 8.000,00",
    capa: "https://picsum.photos/1200/600?random=2",
  },
];

// Dados de exemplo para editais inscritos
const editaisInscritos = [
  {
    id: 9,
    titulo: "Festival de Arte Digital",
    organizador: "Secretaria de Inovação",
    local: "Salvador, BA",
    prazo: "10/06/2025",
    status: "Em análise",
    dataInscricao: "05/05/2025",
    categoria: "Arte Digital",
  },
  {
    id: 10,
    titulo: "Mostra de Novos Artistas",
    organizador: "Galeria Contemporânea",
    local: "Fortaleza, CE",
    prazo: "Encerrado",
    status: "Aprovado",
    dataInscricao: "15/04/2025",
    categoria: "Artes Visuais",
  },
  {
    id: 11,
    titulo: "Prêmio de Escultura",
    organizador: "Fundação de Artes",
    local: "Brasília, DF",
    prazo: "Encerrado",
    status: "Não selecionado",
    dataInscricao: "20/03/2025",
    categoria: "Escultura",
  },
];

// Dados de exemplo para editais favoritos
const editaisFavoritos = [
  {
    id: 12,
    titulo: "Residência Artística na Europa",
    organizador: "Aliança Cultural Franco-Brasileira",
    local: "Paris, França",
    prazo: "30/10/2025",
    categoria: "Residência",
    valor: "€ 8.000,00",
    capa: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 13,
    titulo: "Bolsa de Estudos em Arte Contemporânea",
    organizador: "Instituto de Arte Moderna",
    local: "São Paulo, SP",
    prazo: "15/11/2025",
    categoria: "Bolsa de Estudos",
    valor: "R$ 25.000,00",
    capa: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
];

// Dados de exemplo para editais recomendados
const editaisRecomendados = [
  {
    id: 1,
    titulo: "Festival Internacional de Artes Visuais",
    organizador: "Secretaria Municipal de Cultura",
    local: "São Paulo, SP",
    prazo: "30/06/2025",
    compatibilidade: 95,
    categoria: "Artes Visuais",
    valor: "R$ 15.000,00",
    capa: "https://picsum.photos/1200/600?random=1",
  },
  {
    id: 2,
    titulo: "Edital de Ocupação Galeria Municipal",
    organizador: "Fundação Cultural",
    local: "Rio de Janeiro, RJ",
    prazo: "15/07/2025",
    compatibilidade: 87,
    categoria: "Exposição",
    capa: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80", // galeria/exposição
    valor: "R$ 8.000,00",
  },
  {
    id: 3,
    titulo: "Prêmio Nacional de Artes Plásticas",
    organizador: "Ministério da Cultura",
    local: "Nacional",
    prazo: "10/08/2025",
    compatibilidade: 82,
    categoria: "Artes Plásticas",
    capa: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80", // escultura/plástica
    valor: "R$ 25.000,00",
  },
  {
    id: 4,
    titulo: "Residência Artística Internacional",
    organizador: "Instituto de Artes Contemporâneas",
    local: "Berlim, Alemanha",
    prazo: "22/07/2025",
    compatibilidade: 78,
    categoria: "Residência",
    valor: "€ 5.000,00",
    capa: "https://picsum.photos/1200/600?random=4",
  },
  {
    id: 5,
    titulo: "Bolsa de Pesquisa em Arte Digital",
    organizador: "Fundação Tecnologia e Arte",
    local: "Recife, PE",
    prazo: "05/09/2025",
    compatibilidade: 75,
    categoria: "Arte Digital",
    valor: "R$ 12.000,00",
    capa: "https://picsum.photos/1200/600?random=5",
  },
];

const EditaisPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState("recomendados");
  const navigate = useNavigate();

  // Atualizar o parâmetro de busca na URL quando o termo de busca mudar
  useEffect(() => {
    if (searchTerm) {
      searchParams.set('q', searchTerm);
      setSearchParams(searchParams, { replace: true });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchTerm, searchParams, setSearchParams]);
  const [filtroAberto, setFiltroAberto] = useState(false);
  
  // Estados para os filtros
  const [filtros, setFiltros] = useState({
    categorias: [],
    locais: [],
    valorMinimo: 0,
    valorMaximo: 30000,
    prazoMinimo: "",
    apenas_compativeis: true
  });
  
  // Função para aplicar filtros
  const aplicarFiltros = () => {
    setFiltroAberto(false);
    // Aqui implementaríamos a lógica real de filtragem
    // Por enquanto apenas fechamos o diálogo
  };
  
  // Função para resetar filtros
  const resetarFiltros = () => {
    setFiltros({
      categorias: [],
      locais: [],
      valorMinimo: 0,
      valorMaximo: 30000,
      prazoMinimo: "",
      apenas_compativeis: true
    });
  };

  const filteredEditais = editaisRecomendados.filter((edital) =>
    edital.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edital.organizador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edital.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edital.local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Editais</h1>
        <Button>Alertas de Editais</Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <Input
            placeholder="Buscar editais por título, categoria, local..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="recomendados" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="flex w-full justify-between">
          <TabsTrigger value="recomendados">Recomendados</TabsTrigger>
          <TabsTrigger value="abertos">Abertos</TabsTrigger>
          <TabsTrigger value="inscritos">Inscritos</TabsTrigger>
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recomendados" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Mostrando {filteredEditais.length} editais recomendados para você
            </div>
            <Dialog open={filtroAberto} onOpenChange={setFiltroAberto}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filtrar Editais</DialogTitle>
                  <DialogDescription>
                    Personalize sua busca por editais de acordo com suas preferências.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="categorias">Categorias</Label>
                    <Select>
                      <SelectTrigger id="categorias">
                        <SelectValue placeholder="Selecione as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artes-visuais">Artes Visuais</SelectItem>
                        <SelectItem value="fotografia">Fotografia</SelectItem>
                        <SelectItem value="escultura">Escultura</SelectItem>
                        <SelectItem value="arte-digital">Arte Digital</SelectItem>
                        <SelectItem value="pintura">Pintura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="locais">Localização</Label>
                    <Select>
                      <SelectTrigger id="locais">
                        <SelectValue placeholder="Selecione os locais" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sp">São Paulo</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                        <SelectItem value="mg">Minas Gerais</SelectItem>
                        <SelectItem value="nacional">Nacional</SelectItem>
                        <SelectItem value="internacional">Internacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Valor do Prêmio</Label>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 30000]}
                        max={50000}
                        step={1000}
                        className="my-4"
                      />
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>R$ 0</span>
                        <span>R$ 50.000</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compativeis" defaultChecked />
                    <Label htmlFor="compativeis">Mostrar apenas compatíveis com meu perfil</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetarFiltros} className="mr-2">
                    <X className="h-4 w-4 mr-2" />
                    Limpar
                  </Button>
                  <Button onClick={aplicarFiltros}>
                    <Check className="h-4 w-4 mr-2" />
                    Aplicar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {filteredEditais.map((edital) => (
              <EditalCard 
                key={edital.id} 
                edital={edital} 
                isFavorite={false} 
                onToggleFavorite={(id) => console.log(`Favoritar edital ${id}`)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="abertos" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Mostrando {editaisAbertos.length} editais abertos para inscrição
            </div>
            <Button variant="outline" size="sm" onClick={() => setFiltroAberto(true)}>
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
          
          <div className="space-y-4">
            {editaisAbertos.map((edital) => (
              <Card key={edital.id} className="overflow-hidden hover:shadow-md transition-shadow dark:border-slate-700">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{edital.titulo}</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-2">{edital.organizador}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50">
                        Novo
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {edital.local}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Inscrições até {edital.prazo}
                      </div>
                      <div>
                        <Badge variant="outline" className="dark:border-slate-600">{edital.categoria}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">{edital.valor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 flex flex-col justify-center items-center md:w-48">
                    <Button 
                      className="w-full mb-2"
                      onClick={() => navigate(`/dashboard/edital/${edital.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/dashboard/edital/${edital.id}?tab=inscricao`)}
                    >
                      Inscrever-se
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inscritos" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Você está inscrito em {editaisInscritos.length} editais
            </div>
          </div>
          
          <div className="space-y-4">
            {editaisInscritos.map((edital) => (
              <Card key={edital.id} className="overflow-hidden hover:shadow-md transition-shadow dark:border-slate-700">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{edital.titulo}</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-2">{edital.organizador}</p>
                      </div>
                      {edital.status === "Em análise" && (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50">
                          Em análise
                        </Badge>
                      )}
                      {edital.status === "Aprovado" && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50">
                          Aprovado
                        </Badge>
                      )}
                      {edital.status === "Não selecionado" && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50">
                          Não selecionado
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {edital.local}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Inscrito em: {edital.dataInscricao}
                      </div>
                      <div>
                        <Badge variant="outline" className="dark:border-slate-600">{edital.categoria}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 flex flex-col justify-center items-center md:w-48">
                    <Button 
                      className="w-full mb-2"
                      onClick={() => navigate(`/dashboard/edital/${edital.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/dashboard/inscricao/${edital.id}`)}
                    >
                      Acompanhar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favoritos" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Você tem {editaisFavoritos.length} editais favoritos
            </div>
          </div>
          
          <div className="space-y-4">
            {editaisFavoritos.map((edital) => (
              <Card key={edital.id} className="overflow-hidden hover:shadow-md transition-shadow dark:border-slate-700">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{edital.titulo}</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-2">{edital.organizador}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {edital.local}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Inscrições até {edital.prazo}
                      </div>
                      <div>
                        <Badge variant="outline" className="dark:border-slate-600">{edital.categoria}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">{edital.valor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 flex flex-col justify-center items-center md:w-48">
                    <Button 
                      className="w-full mb-2"
                      onClick={() => navigate(`/dashboard/edital/${edital.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/dashboard/edital/${edital.id}?tab=inscricao`)}
                    >
                      Inscrever-se
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EditaisPage;
