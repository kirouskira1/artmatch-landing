import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export type Insignia = {
  id: string;
  titulo: string;
  descricao: string;
  icone: string; // Material icon name
  cor: string; // Cor de fundo
  data: string; // Data de conquista
  nivel?: 'bronze' | 'prata' | 'ouro' | 'platina'; // Nível da conquista
  editalId?: number; // ID do edital relacionado (opcional)
  editalTitulo?: string; // Título do edital relacionado (opcional)
};

interface InsigniasMedalhasProps {
  insignias: Insignia[];
  tamanho?: 'sm' | 'md' | 'lg';
  mostrarTitulo?: boolean;
  layout?: 'grid' | 'lista';
  maxExibir?: number;
}

const InsigniasMedalhas = ({
  insignias,
  tamanho = 'md',
  mostrarTitulo = true,
  layout = 'grid',
  maxExibir = 8
}: InsigniasMedalhasProps) => {
  // Limitar número de insígnias exibidas
  const insigniasExibidas = insignias.slice(0, maxExibir);
  const insigniasRestantes = insignias.length - maxExibir;

  // Definir tamanhos baseados na prop
  const tamanhos = {
    sm: {
      container: "w-12 h-12",
      icone: "text-xl"
    },
    md: {
      container: "w-16 h-16",
      icone: "text-2xl"
    },
    lg: {
      container: "w-20 h-20",
      icone: "text-3xl"
    }
  };

  // Definir cores de borda baseadas no nível
  const getBorderColor = (nivel?: 'bronze' | 'prata' | 'ouro' | 'platina') => {
    switch (nivel) {
      case 'bronze': return "border-amber-600";
      case 'prata': return "border-slate-400";
      case 'ouro': return "border-yellow-400";
      case 'platina': return "border-cyan-400";
      default: return "border-slate-200";
    }
  };

  return (
    <div>
      {mostrarTitulo && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">Insígnias e Conquistas</h3>
          {insigniasRestantes > 0 && (
            <Badge variant="outline">+{insigniasRestantes} mais</Badge>
          )}
        </div>
      )}

      <div className={layout === 'grid' 
        ? `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3` 
        : `flex flex-wrap gap-3`
      }>
        <TooltipProvider>
          {insigniasExibidas.map((insignia) => (
            <Tooltip key={insignia.id}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <div 
                    className={`${tamanhos[tamanho].container} rounded-full flex items-center justify-center 
                    ${insignia.cor} border-2 ${getBorderColor(insignia.nivel)} 
                    shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-help`}
                  >
                    <span className={`material-symbols-outlined ${tamanhos[tamanho].icone} text-white`}>
                      {insignia.icone}
                    </span>
                  </div>
                  {layout === 'lista' && (
                    <span className="text-xs mt-1 text-center">{insignia.titulo}</span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-64">
                <div className="space-y-2">
                  <div className="font-medium">{insignia.titulo}</div>
                  <p className="text-sm">{insignia.descricao}</p>
                  {insignia.editalTitulo && (
                    <div className="text-xs opacity-80">
                      Conquistado em: {insignia.editalTitulo}
                    </div>
                  )}
                  <div className="text-xs opacity-80">
                    Data: {insignia.data}
                  </div>
                  {insignia.nivel && (
                    <Badge 
                      variant={insignia.nivel === 'ouro' || insignia.nivel === 'platina' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      Nível {insignia.nivel}
                    </Badge>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default InsigniasMedalhas;
