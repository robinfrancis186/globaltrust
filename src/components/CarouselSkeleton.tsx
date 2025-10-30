import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Lightbulb, Cog, Stamp } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type CarouselSkeletonProps = {
  className?: string;
};

export default function CarouselSkeleton({ className = '' }: CarouselSkeletonProps) {
  return (
    <div className={`carousel-wrapper ${className}`}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {/* Context */}
        <SwiperSlide>
          <div className="glassmorphic-card">
            <div className="card-icon">
              <Lightbulb size={48} />
            </div>
            <h3 className="card-title">Context</h3>
            <p className="card-description">
              Key insights from leading AI and misinformation researchers — grounding ideas in the latest thinking and real-world relevance.
            </p>
          </div>
        </SwiperSlide>
        {/* Infrastructure */}
        <SwiperSlide>
          <div className="glassmorphic-card">
            <div className="card-icon">
              <Cog size={48} />
            </div>
            <h3 className="card-title">Infrastructure</h3>
            <p className="card-description">
              A platform to prototype, test, and showcase solutions — with tools and pathways to support development.
            </p>
          </div>
        </SwiperSlide>
        {/* Legitimacy */}
        <SwiperSlide>
          <div className="glassmorphic-card">
            <div className="card-icon">
              <Stamp size={48} />
            </div>
            <h3 className="card-title">Legitimacy</h3>
            <p className="card-description">
              Backed by global institutions like IEEE, OECD, and more — reinforcing credibility and trust.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}


