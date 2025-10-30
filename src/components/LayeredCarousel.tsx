import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Lightbulb, Cog, Stamp } from 'lucide-react';

/**
 * LayeredCarousel
 * Front/Back panel scaffold to mirror MDJAmin-style stacked panels.
 * Back panel provides the sage-green base; front holds the Swiper carousel.
 */
export default function LayeredCarousel() {
  return (
    <div className="layered-viewport">
      {/* BACK PANEL */}
      <div className="layered-back-panel" aria-hidden="true" />

      {/* FRONT CAROUSEL PANEL */}
      <div className="layered-front-panel">
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            1024: { slidesPerView: 2 }
          }}
        >
          <SwiperSlide>
            <div className="glassmorphic-card color-teal">
              <div className="card-icon"><Lightbulb size={48} /></div>
              <h3 className="card-title">Context</h3>
              <p className="card-description">
                Key insights from leading AI and misinformation researchers — grounding ideas in the latest thinking and real-world relevance.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="glassmorphic-card color-white">
              <div className="card-icon"><Cog size={48} /></div>
              <h3 className="card-title">Infrastructure</h3>
              <p className="card-description">
                A platform to prototype, test, and showcase solutions — with tools and pathways to support development.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="glassmorphic-card color-gold">
              <div className="card-icon"><Stamp size={48} /></div>
              <h3 className="card-title">Legitimacy</h3>
              <p className="card-description">
                Backed by global institutions like IEEE, OECD, and more — reinforcing credibility and trust.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}


