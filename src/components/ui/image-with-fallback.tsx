import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackColor = 'bg-gradient-to-r from-primary-800 to-primary-600'
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  // Cores temáticas para as regiões
  const regionGradients = {
    norte: 'bg-gradient-to-r from-emerald-800 to-emerald-600',
    nordeste: 'bg-gradient-to-r from-amber-700 to-orange-500',
    default: fallbackColor
  };

  // Extrai a região do src se possível (para demonstração)
  const getRegionFromSrc = (src: string): keyof typeof regionGradients => {
    if (src.includes('random=1') || src.includes('nordeste')) return 'nordeste';
    if (src.includes('random=2') || src.includes('norte')) return 'norte';
    return 'default';
  };

  const gradient = regionGradients[getRegionFromSrc(src)];

  if (error) {
    return (
      <div 
        className={`${gradient} ${className} flex items-center justify-center`}
        aria-label={alt}
      >
        <div className="text-white text-opacity-80 text-center p-4">
          <span className="material-symbols-outlined text-4xl mb-2">image</span>
          <p className="text-sm">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
