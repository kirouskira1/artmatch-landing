import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import OrgDashboardLayout from "@/components/organizador/OrgDashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Users, PlusCircle } from "lucide-react";

// Dados de exemplo para o dashboard
const editaisAtivos = [
  {
    id: 1,
    titulo: "Festival Internacional de Artes Visuais",
    prazo: "30/06/2025",
    inscritos: 42,
    vagas: 20,
    visualizacoes: 320,
  },
  {
    id: 2,
    titulo: "Residência Artística Municipal",
    prazo: "15/07/2025",
    inscritos: 18,
    vagas: 5,
    visualizacoes: 156,
  },
];

const candidatosRecentes = [
  {
    id: 1,
    nome: "Ana Silva",
    edital: "Festival Internacional de Artes Visuais",
    data: "15/05/2025",
    compatibilidade: 92,
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    edital: "Festival Internacional de Artes Visuais",
    data: "14/05/2025",
    compatibilidade: 88,
  },
  {
    id: 3,
    nome: "Mariana Santos",
    edital: "Residência Artística Municipal",
    data: "13/05/2025",
    compatibilidade: 95,
  },
  {
    id: 4,
    nome: "Pedro Costa",
    edital: "Festival Internacional de Artes Visuais",
    data: "12/05/2025",
    compatibilidade: 78,
  },
];

const OrgDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <OrgDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard do Organizador</h1>
        <div>
          <span className="mr-2 text-slate-600">Olá, {user?.email || 'Organizador'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Editais Ativos</CardTitle>
            <CardDescription>Editais em andamento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{editaisAtivos.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Inscritos</CardTitle>
            <CardDescription>Candidatos em todos os editais</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{editaisAtivos.reduce((acc, edital) => acc + edital.inscritos, 0)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Taxa de Conversão</CardTitle>
            <CardDescription>Visualizações para inscrições</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.round(
                (editaisAtivos.reduce((acc, edital) => acc + edital.inscritos, 0) / 
                editaisAtivos.reduce((acc, edital) => acc + edital.visualizacoes, 0)) * 100
              )}%
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Editais Ativos</CardTitle>
              <CardDescription>
                Acompanhe o progresso dos seus editais em andamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {editaisAtivos.map((edital) => (
                  <div key={edital.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{edital.titulo}</h3>
                        <p className="text-sm text-slate-500">Prazo: {edital.prazo}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/organizador/edital/${edital.id}`)}
                      >
                        Gerenciar
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span>Inscritos: {edital.inscritos} de {edital.vagas}</span>
                      <span className="text-slate-500">{Math.round((edital.inscritos / edital.vagas) * 100)}%</span>
                    </div>
                    <Progress value={(edital.inscritos / edital.vagas) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Visualizações: {edital.visualizacoes}</span>
                      <span>Taxa de conversão: {Math.round((edital.inscritos / edital.visualizacoes) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/organizador/editais")}
                >
                  Ver Todos os Editais
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesse rapidamente as principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start" 
                onClick={() => navigate("/organizador/novo-edital")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Novo Edital
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/organizador/candidatos")}
              >
                <Users className="mr-2 h-4 w-4" />
                Avaliar Candidatos
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/organizador/relatorios")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Gerar Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Candidatos Recentes</CardTitle>
          <CardDescription>
            Últimas inscrições recebidas nos seus editais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Candidato</th>
                  <th className="text-left py-3 px-4 font-medium">Edital</th>
                  <th className="text-left py-3 px-4 font-medium">Data</th>
                  <th className="text-left py-3 px-4 font-medium">Compatibilidade</th>
                  <th className="text-right py-3 px-4 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {candidatosRecentes.map((candidato) => (
                  <tr key={candidato.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4">{candidato.nome}</td>
                    <td className="py-3 px-4">{candidato.edital}</td>
                    <td className="py-3 px-4">{candidato.data}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${
                        candidato.compatibilidade >= 90 
                          ? "bg-green-100 text-green-800" 
                          : candidato.compatibilidade >= 80 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-amber-100 text-amber-800"
                      }`}>
                        {candidato.compatibilidade}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/organizador/candidato/${candidato.id}`)}
                      >
                        Ver Perfil
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/organizador/candidatos")}
          >
            Ver Todos os Candidatos
          </Button>
        </CardFooter>
      </Card>
    </OrgDashboardLayout>
  );
};

export default OrgDashboardPage;
