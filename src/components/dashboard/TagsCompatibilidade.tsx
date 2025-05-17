import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type TagCompatibilidade = {
  nome: string;
  compatibilidade: number; // 0-100
  descricao: string;
  categoria?: string; // Opcional: categoria da tag (ex: "Linguagem", "Região", "Técnica")
  icone?: string; // Opcional: ícone do Material Symbols
};

interface TagsCompatibilidadeProps {
  tags: TagCompatibilidade[];
  maxTags?: number;
  showAll?: boolean;
  layout?: 'compact' | 'detalhado' | 'grid';
  tamanho?: 'sm' | 'md' | 'lg';
  mostrarBarraProgresso?: boolean;
  onClick?: (tag: TagCompatibilidade) => void;
}

const TagsCompatibilidade = ({ 
  tags, 
  maxTags = 5, 
  showAll = false,
  layout = 'compact',
  tamanho = 'md',
  mostrarBarraProgresso = false,
  onClick
}: TagsCompatibilidadeProps) => {
  const [expandido, setExpandido] = useState(false);
  
  // Ordenar tags por compatibilidade (maior para menor)
  const sortedTags = [...tags].sort((a, b) => b.compatibilidade - a.compatibilidade);
  
  // Limitar número de tags se não estiver mostrando todas e não estiver expandido
  const tagsToShow = (showAll || expandido) ? sortedTags : sortedTags.slice(0, maxTags);
  
  // Número de tags restantes
  const remainingTags = sortedTags.length - maxTags;

  // Agrupar tags por categoria se o layout for grid
  const tagsPorCategoria = sortedTags.reduce((acc, tag) => {
    const categoria = tag.categoria || 'Geral';
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(tag);
    return acc;
  }, {} as Record<string, TagCompatibilidade[]>);

  // Definir classes baseadas no tamanho
  const tamanhoClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-2.5",
    lg: "text-base py-1.5 px-3"
  };

  // Renderizar layout compacto (padrão)
  if (layout === 'compact') {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            {tagsToShow.map((tag, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Badge 
                    variant={getVariantByCompatibility(tag.compatibilidade)}
                    className={`cursor-help transition-all hover:scale-105 ${tamanhoClasses[tamanho]} ${getTextColorClass(tag.compatibilidade)}`}
                    onClick={() => onClick?.(tag)}
                  >
                    {tag.icone && (
                      <span className="material-symbols-outlined mr-1" style={{fontSize: tamanho === 'sm' ? '14px' : tamanho === 'md' ? '16px' : '18px'}}>
                        {tag.icone}
                      </span>
                    )}
                    {tag.nome}
                    {tag.compatibilidade > 0 && (
                      <span className="ml-1 font-normal bg-white/20 rounded px-1 text-xs font-medium">
                        {tag.compatibilidade}%
                      </span>
                    )}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-3">
                  <div className="space-y-2">
                    <div className="font-medium">{tag.nome}</div>
                    <p>{tag.descricao}</p>
                    {mostrarBarraProgresso && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Compatibilidade</span>
                          <span className="font-medium">{tag.compatibilidade}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={getProgressBarColor(tag.compatibilidade)}
                            style={{ width: `${tag.compatibilidade}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {tag.categoria && (
                      <div className="text-xs text-slate-500 mt-1">
                        Categoria: {tag.categoria}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
            
            {!showAll && !expandido && remainingTags > 0 && (
              <Badge 
                variant="outline" 
                className={`cursor-pointer hover:bg-slate-100 ${tamanhoClasses[tamanho]} text-slate-600 font-medium`}
                onClick={() => setExpandido(true)}
              >
                +{remainingTags} mais
              </Badge>
            )}

            {expandido && (
              <Badge 
                variant="outline" 
                className={`cursor-pointer hover:bg-slate-100 ${tamanhoClasses[tamanho]} text-slate-600 font-medium`}
                onClick={() => setExpandido(false)}
              >
                Mostrar menos
              </Badge>
            )}
          </TooltipProvider>
        </div>
      </div>
    );
  }

  // Renderizar layout detalhado
  if (layout === 'detalhado') {
    return (
      <div className="space-y-3">
        {tagsToShow.map((tag, index) => (
          <Card key={index} className="p-3 hover:shadow-md transition-all cursor-pointer" onClick={() => onClick?.(tag)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {tag.icone && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getBackgroundColor(tag.compatibilidade)}`}>
                    <span className="material-symbols-outlined text-white">
                      {tag.icone}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium flex items-center gap-1">
                    {tag.nome}
                    <Badge variant={getVariantByCompatibility(tag.compatibilidade)} className="ml-1 text-xs font-medium text-white">
                      {tag.compatibilidade}%
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-1">{tag.descricao}</p>
                </div>
              </div>
            </div>
            {mostrarBarraProgresso && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={getProgressBarColor(tag.compatibilidade)}
                    style={{ width: `${tag.compatibilidade}%` }}
                  ></div>
                </div>
              </div>
            )}
          </Card>
        ))}
        
        {!showAll && !expandido && remainingTags > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => setExpandido(true)}
          >
            Mostrar mais {remainingTags} tags
          </Button>
        )}

        {expandido && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => setExpandido(false)}
          >
            Mostrar menos
          </Button>
        )}
      </div>
    );
  }

  // Renderizar layout grid (agrupado por categoria)
  return (
    <div className="space-y-6">
      {Object.entries(tagsPorCategoria).map(([categoria, categoriaTags]) => (
        <div key={categoria} className="space-y-2">
          <h3 className="text-sm font-medium">{categoria}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categoriaTags.slice(0, expandido ? undefined : 6).map((tag, index) => (
              <Card 
                key={index} 
                className="p-2 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
                onClick={() => onClick?.(tag)}
              >
                {tag.icone && (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${getBackgroundColor(tag.compatibilidade)}`}>
                    <span className="material-symbols-outlined text-white">
                      {tag.icone}
                    </span>
                  </div>
                )}
                <div className="font-medium text-sm">{tag.nome}</div>
                <Badge variant={getVariantByCompatibility(tag.compatibilidade)} className="mt-1 text-xs font-medium text-white">
                  {tag.compatibilidade}%
                </Badge>
              </Card>
            ))}
          </div>
          
          {!expandido && categoriaTags.length > 6 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-1 text-xs h-8"
              onClick={() => setExpandido(true)}
            >
              +{categoriaTags.length - 6} tags em {categoria}
            </Button>
          )}
        </div>
      ))}
      
      {expandido && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={() => setExpandido(false)}
        >
          Mostrar menos
        </Button>
      )}
    </div>
  );
};

// Função para determinar a variante do badge baseado na compatibilidade
const getVariantByCompatibility = (compatibilidade: number): "default" | "secondary" | "destructive" | "outline" => {
  if (compatibilidade >= 80) return "default"; // Verde (primário)
  if (compatibilidade >= 60) return "secondary"; // Roxo (secundário)
  if (compatibilidade >= 40) return "outline"; // Outline
  return "destructive"; // Vermelho (baixa compatibilidade)
};

// Função para determinar a cor do texto baseado na compatibilidade
const getTextColorClass = (compatibilidade: number): string => {
  if (compatibilidade >= 80) return "text-white font-medium"; 
  if (compatibilidade >= 60) return "text-white font-medium";
  if (compatibilidade >= 40) return "text-slate-800 font-medium";
  return "text-white font-medium";
};

// Função para determinar a cor de fundo baseado na compatibilidade
const getBackgroundColor = (compatibilidade: number): string => {
  if (compatibilidade >= 80) return "bg-green-600"; 
  if (compatibilidade >= 60) return "bg-purple-600";
  if (compatibilidade >= 40) return "bg-amber-600";
  return "bg-red-600";
};

// Função para determinar a cor da barra de progresso baseado na compatibilidade
const getProgressBarColor = (compatibilidade: number): string => {
  if (compatibilidade >= 80) return "bg-green-600 h-full rounded-full";
  if (compatibilidade >= 60) return "bg-purple-600 h-full rounded-full";
  if (compatibilidade >= 40) return "bg-amber-600 h-full rounded-full";
  return "bg-red-600 h-full rounded-full";
};

export default TagsCompatibilidade;
