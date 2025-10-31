import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Parallax3D: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const layerBgRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const layerBg = layerBgRef.current;
    const layerMid = layerMidRef.current;
    const layerFg = layerFgRef.current;
    const title = titleRef.current;

    if (!hero || !layerBg || !layerMid || !layerFg || !title) return;

    // Calculate responsive depth scaling based on screen width
    const getDepthScale = () => {
      const width = window.innerWidth;
      if (width < 768) return 0.4; // Mobile: reduced depth
      if (width < 1024) return 0.7; // Tablet: medium depth
      return 1; // Desktop: full depth
    };

    // Set initial states
    gsap.set([layerBg, layerMid, layerFg, title], {
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d',
      opacity: 0
    });

    // Fade in on load
    gsap.to([layerBg, layerMid, layerFg, title], {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    });

    // Create single ScrollTrigger for smooth, synchronized animations (CodePen style)
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = getDepthScale();
        
        // Calculate fade-in/out at start and end
        const fadeProgress = progress < 0.1 ? progress / 0.1 : 
                           progress > 0.9 ? (1 - progress) / 0.1 : 1;
        
        // Background layer - slowest movement, most depth
        gsap.set(layerBg, {
          y: 150 * scale * progress,
          rotationY: 8 * scale * progress,
          z: -200 * scale,
          scale: 1 + progress * 0.05 * scale,
          opacity: fadeProgress
        });

        // Mid layer - medium movement
        gsap.set(layerMid, {
          y: 250 * scale * progress,
          rotationY: 15 * scale * progress,
          z: -100 * scale,
          scale: 1 + progress * 0.1 * scale,
          opacity: fadeProgress
        });

        // Foreground layer - fastest movement, closest to viewer
        gsap.set(layerFg, {
          y: 350 * scale * progress,
          rotationY: 20 * scale * progress,
          z: 0,
          scale: 1 + progress * 0.15 * scale,
          opacity: fadeProgress
        });

        // Title - moves upward and forward
        gsap.set(title, {
          y: -50 * scale * progress,
          rotationY: -5 * scale * progress,
          z: 150 * scale * (1 + progress),
          opacity: fadeProgress * Math.max(0.7, 1 - progress * 0.2)
        });
      }
    });

    // Handle window resize for responsive scaling
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="layer layer-bg" ref={layerBgRef}></div>
      <div className="layer layer-mid" ref={layerMidRef}></div>
      <div className="layer layer-fg" ref={layerFgRef}></div>
      <h1 className="hero-title" ref={titleRef}>Global Trust Challenge</h1>
    </section>
  );
};

export default Parallax3D;
