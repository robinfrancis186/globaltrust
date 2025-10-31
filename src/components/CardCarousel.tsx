import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CardCarouselProps {
  cards: React.ReactNode[];
  slidesPerView?: number;
  autoplay?: boolean;
  className?: string;
  showNav?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  navVariant?: 'light' | 'dark';
}

export default function CardCarousel({ 
  cards, 
  slidesPerView = 3, 
  autoplay = false,
  className = "",
  showNav = true,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  navVariant = 'light'
}: CardCarouselProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;
    if (!swiperInstance.params) return;
    // Attach external navigation elements while preserving default options
    swiperInstance.params.navigation = {
      ...(swiperInstance.params.navigation || {}),
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };
    // Some Swiper builds require explicit re-init
    if (swiperInstance.navigation) {
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className={`carousel-wrapper ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        loop={false}
        nested
        watchOverflow
        preventInteractionOnTransition
        onSwiper={setSwiperInstance}
        navigation={false}
        breakpoints={{
          768: { 
            slidesPerView: slidesPerView,
            spaceBetween: 24
          }
        }}
        className="card-carousel"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            {card}
          </SwiperSlide>
        ))}
      </Swiper>

      {showNav && (
        <div className={`carousel-nav ${navVariant === 'dark' ? 'variant-dark' : 'variant-light'}`}>
          <button
            ref={prevRef}
            type="button"
            className="carousel-nav-btn prev"
            aria-label="Previous slide"
          >
            {prevLabel}
          </button>
          <button
            ref={nextRef}
            type="button"
            className="carousel-nav-btn next"
            aria-label="Next slide"
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  );
}
