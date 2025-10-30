import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Global fog layer breathing effect
    const fogLayer = document.querySelector('.global-fog-layer') as HTMLElement;
    if (!fogLayer) return;

    // Initial opacity
    gsap.set(fogLayer, { opacity: 0.35 });

    // Breathing effect on scroll
    gsap.to(fogLayer, {
      opacity: 0.5,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Subtle opacity variations for different sections
    gsap.to(fogLayer, {
      opacity: 0.4,
      scrollTrigger: {
        trigger: "[id='trust']",
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
    });

    gsap.to(fogLayer, {
      opacity: 0.45,
      scrollTrigger: {
        trigger: "[id='unique']",
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
    });

    gsap.to(fogLayer, {
      opacity: 0.3,
      scrollTrigger: {
        trigger: "[id='partners']",
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global fog layer */}
      <video
        className="global-fog-layer"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.35,
          mixBlendMode: 'soft-light',
          filter: 'blur(2px) brightness(1.1)',
          transition: 'opacity 2s ease',
        }}
      >
        <source src="https://maximages.s3.us-west-1.amazonaws.com/Global+Overlay.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar />
      <main className="flex-grow pt-16"> {/* Added pt-16 to account for fixed navbar */}
        {children}
      </main>
      <Footer />
    </div>
  );
}