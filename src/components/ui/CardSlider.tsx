import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Importar estilos do Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CardSlider.css';

interface CardSliderProps {
  children: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  showNavigation?: boolean;
}

const CardSlider = ({
  children,
  slidesPerView = 1,
  spaceBetween = 20,
  autoplay = true,
  loop = true,
  className = '',
  showNavigation = true
}: CardSliderProps) => {
  // Desativar o loop se não houver slides suficientes
  const shouldEnableLoop = loop && children.length > slidesPerView + 1;
  return (
    <div className={`card-slider-container ${className}`}>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        navigation={showNavigation}
        loop={shouldEnableLoop}
        autoplay={autoplay ? {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        } : false}
        breakpoints={{
          // Mobile
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // Tablet
          640: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          // Desktop
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween
          }
        }}
        className="w-full py-8"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
