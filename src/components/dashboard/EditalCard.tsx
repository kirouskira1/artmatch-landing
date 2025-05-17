import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star } from 'lucide-react';

interface EditalCardProps {
  edital: {
    id: number;
    titulo: string;
    organizador: string;
    local: string;
    prazo: string;
    categoria: string;
    valor: string;
    compatibilidade?: number;
    capa?: string;
  };
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

const EditalCard: React.FC<EditalCardProps> = ({ edital, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  // Função para obter imagem contextualizada com base no título e categoria do edital
  const getContextImage = (titulo: string, categoria: string) => {
    // Mapeamento de títulos específicos para imagens contextualizadas brasileiras
    const editalImages: {[key: string]: string} = {
      // Editais com nomes específicos
      'Festival Internacional de Artes Visuais': 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?auto=compress&cs=tinysrgb&w=400', // Bienal de São Paulo
      'Edital de Ocupação Galeria Municipal': 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?auto=compress&cs=tinysrgb&w=400', // MASP
      'Prêmio Nacional de Artes Plásticas': 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg?auto=compress&cs=tinysrgb&w=400', // Esculturas brasileiras
      'Residência Artística Internacional': 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400', // Casa de artista brasileiro
      'Mostra de Arte Digital': 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400', // Arte digital brasileira
      'Exposição Arte Urbana': 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=400', // Grafite em São Paulo
      'Festival de Fotografia Documental': 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=400', // Fotografia documental brasileira
      'Concurso de Ilustração Editorial': 'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&w=400', // Ilustração brasileira
      'Mostra de Arte Sertaneja': 'https://images.pexels.com/photos/2539076/pexels-photo-2539076.jpeg?auto=compress&cs=tinysrgb&w=400', // Arte do sertão nordestino
      'Festival de Artes Amazônicas': 'https://images.pexels.com/photos/2869565/pexels-photo-2869565.jpeg?auto=compress&cs=tinysrgb&w=400' // Arte indígena amazônica
    };
    
    // Mapeamento de categorias para imagens contextualizadas brasileiras (fallback)
    const categoryImages: {[key: string]: string} = {
      'Artes Visuais': 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=400', // Pintura brasileira
      'Exposição': 'https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=400', // Galeria de arte brasileira
      'Artes Plásticas': 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg?auto=compress&cs=tinysrgb&w=400', // Escultura brasileira
      'Residência': 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400', // Ateliê brasileiro
      'Arte Digital': 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400', // Arte digital brasileira
      'Arte Urbana': 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=400', // Grafite brasileiro
      'Fotografia': 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=400', // Fotografia brasileira
      'Ilustração': 'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&w=400', // Ilustração brasileira
      'Artes Integradas': 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=400', // Performance brasileira
      'Literatura': 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=400' // Literatura brasileira
    };
    
    // Primeiro tenta encontrar uma imagem específica para o título do edital
    if (editalImages[titulo]) {
      return editalImages[titulo];
    }
    
    // Se não encontrar, usa a imagem da categoria
    if (categoryImages[categoria]) {
      return categoryImages[categoria];
    }
    
    // Fallback para uma imagem genérica de arte brasileira
    return 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow dark:border-slate-700">
      <div className="flex flex-col md:flex-row">
        {edital.capa ? (
          <div className="md:w-48 w-full h-40 md:h-auto flex-shrink-0 bg-slate-100 dark:bg-slate-700">
            <img
              src={edital.capa}
              alt={`Capa do edital ${edital.titulo}`}
              className="object-cover w-full h-full md:rounded-l-md md:rounded-t-none"
              loading="lazy"
              onError={(e) => {
                // Fallback para uma imagem contextualizada com base no título e categoria do edital
                e.currentTarget.src = getContextImage(edital.titulo, edital.categoria);
              }}
            />
          </div>
        ) : (
          // Fallback visual com imagem contextualizada caso não haja URL de capa
          <div className="md:w-48 w-full h-40 md:h-auto flex-shrink-0 bg-slate-100 dark:bg-slate-700">
            <img
              src={getContextImage(edital.titulo, edital.categoria)}
              alt={`Imagem representativa de ${edital.categoria}`}
              className="object-cover w-full h-full md:rounded-l-md md:rounded-t-none opacity-90"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-1">{edital.titulo}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-2">{edital.organizador}</p>
            </div>
            {edital.compatibilidade && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50">
                {edital.compatibilidade}% compatível
              </Badge>
            )}
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
            onClick={() => onToggleFavorite && onToggleFavorite(edital.id)}
          >
            <Star className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            {isFavorite ? 'Favoritado' : 'Favoritar'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditalCard;
