import React, { useEffect, useState, useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ImmersiveBackground from './ImmersiveBackground';
import { throttle } from '../utils/throttle';
import { getOptimizedParticleCount, getPerformanceConfig } from '../utils/performance';

// Floating particles component with CSS animations (more performant than Framer Motion)
const FloatingParticles = () => {
  const config = getPerformanceConfig();
  // Optimized particle counts: 5-8 on mobile, 10-12 on desktop
  const BASE_PARTICLE_COUNT = config.isMobile ? 6 : config.isTablet ? 10 : 12;
  const particleCount = getOptimizedParticleCount(BASE_PARTICLE_COUNT);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause animations when off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting && entry.intersectionRatio > 0.1;
          setIsVisible(visible);
          
          // Pause/resume CSS animations
          const particles = containerRef.current?.querySelectorAll('.floating-particle');
          particles?.forEach(particle => {
            (particle as HTMLElement).style.animationPlayState = visible ? 'running' : 'paused';
          });
        });
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    const heroSection = containerRef.current.closest('#hero') || containerRef.current.parentElement;
    if (heroSection) {
      observer.observe(heroSection);
      return () => observer.disconnect();
    }
  }, []);

  // Disable particles on mobile if configured
  if (config.shouldDisableCanvas) {
    return null;
  }

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 15,
    duration: Math.random() * 20 + 20,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <>
      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: var(--particle-opacity);
          }
          50% {
            transform: translate(15px, -30px) scale(1.2);
            opacity: calc(var(--particle-opacity) * 1.5);
          }
        }
        .floating-particle {
          animation: floatParticle var(--particle-duration, 20s) ease-in-out infinite;
          animation-delay: var(--particle-delay, 0s);
          animation-play-state: running;
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-particle {
            animation: none;
          }
        }
      `}</style>
      <div ref={containerRef} className="absolute inset-0 z-10 opacity-40 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="floating-particle absolute rounded-full shadow-lg"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, rgba(255,200,120,0.8) 0%, rgba(0,200,255,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 10px rgba(255,200,120,0.5)',
              '--particle-opacity': particle.opacity,
              '--particle-duration': `${particle.duration}s`,
              '--particle-delay': `${particle.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};

const VideoBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Lazy-load del video: solo asigna el src cuando el componente entra al viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            // Cargar el src SOLO cuando es visible
            if (!videoSrc) {
              setVideoSrc(
                "https://maximages.s3.us-west-1.amazonaws.com/Globe+Animation.mp4"
              );
            }

            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <motion.div
      className="video-bg-wrapper absolute inset-0 z-0"
      style={{ y, scale }}
    >
      <video
        ref={videoRef}
        className="bg-video absolute inset-0 w-full h-full object-cover"
        style={{ transform: "translateX(-50px)" }}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-label="Animated globe background"
      >
        {videoSrc && (
          <source src={videoSrc} type="video/mp4" />
        )}
      </video>
    </motion.div>
  );
};


// Multi-layered overlay with vibrant video visibility
const OverlayLayers = () => {
  return (
    <div className="absolute inset-0 z-10">
      {/* Lighter primary gradient overlay for better video visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000010]/50 via-[#000020]/40 to-[#000030]/60" />
      
      {/* Subtle atmospheric depth layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#000015]/30 via-transparent to-[#000025]/30" />
      
      {/* Animated radial gold glow behind text */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 70%, rgba(255,200,120,0.15), rgba(255,180,80,0.08) 40%, transparent 70%)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional atmospheric layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(0,200,255,0.08), rgba(0,174,239,0.05) 50%, transparent 70%)',
        }}
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Lighter vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
      
      {/* Minimal edge lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000030]/20" />
    </div>
  );
};

// Lens flare effect with CSS animations (more performant)
const LensFlare = () => {
  return (
    <>
      <style>{`
        @keyframes lensFlare {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(50px, -30px) scale(1.2);
            opacity: 0.6;
          }
        }
        .lens-flare {
          animation: lensFlare 15s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lens-flare {
            animation: none;
            opacity: 0.3;
          }
        }
      `}</style>
      <div
        className="lens-flare absolute top-1/4 right-1/4 w-32 h-32 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,200,120,0.3) 0%, rgba(255,200,120,0.1) 30%, transparent 70%)',
          borderRadius: '50%',
          filter: 'none',
        }}
      />
    </>
  );
};

// Enhanced content component with cinematic effects
const Content = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        duration: 0,
        ease: "easeOut",
      },
    }),
  };

  const smoothScrollTo = (targetElement: HTMLElement, duration: number = 600) => {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleJoinChallenge = () => {
    const element = document.getElementById('pre-registration');
    if (element) {
      smoothScrollTo(element, 600);
    }
  };

  const handlePartnerWithUs = () => {
    window.location.href = '/partners';
  };

  return (
    <motion.div
      className="relative z-20 max-w-6xl mx-auto px-6"
      variants={containerVariants}
      initial="visible"
      animate="visible"
      style={{ willChange: 'auto' }}
    >
      {/* Subtle Background Enhancement Layers */}
      <div className="relative flex justify-center items-center -z-10 mb-8">
        {/* Light Atmospheric Glow */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,174,239,0.12)_0%,rgba(0,120,200,0.08)_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] opacity-50" />
        </div>
        
        {/* Minimal Depth Layer */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,200,120,0.06)_0%,rgba(0,174,239,0.04)_40%,transparent_70%)] opacity-30" />
        </div>
      </div>

      <h1
        className="relative z-20 text-white font-black text-6xl md:text-7xl lg:text-8xl text-center leading-[0.95] uppercase tracking-wide"
        style={{ 
          fontFamily: '"Barlow Condensed", serif',
          textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,174,239,0.4)',
          marginLeft: '50px',
          willChange: 'auto',
        }}
      >
        <span className="relative inline-block">
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            GLOBAL TRUST
          </span>
          <br />
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">CHALLENGE</span>
          
          {/* Balanced Underline Accent */}
          <div 
            className="h-[3px] w-[150px] bg-gradient-to-r from-[#00AEEF]/90 via-[#FFD97A]/70 to-transparent mx-auto mt-3 rounded-full shadow-[0_0_15px_rgba(0,174,239,0.5)]"
          />
          
          {/* Balanced Ambient Reflection */}
          <div className="absolute top-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 w-[75%] h-[55px] bg-gradient-to-b from-white/20 via-white/10 to-transparent opacity-60 rounded-full" />
        </span>
      </h1>

      {/* Professional subheadline */}
      <p
        className="text-2xl md:text-3xl font-medium mt-6 text-white text-center"
        style={{ 
          fontFamily: '"Inter", sans-serif',
          textShadow: '0 2px 4px rgba(0,0,0,0.9)',
          marginLeft: '50px',
          willChange: 'auto',
        }}
      >
        Building Trustworthy Digital and Information Ecosystems
        <br />
        For Future Generations
      </p>

      {/* Description */}
      <p
        className="relative max-w-3xl mx-auto mt-12 text-lg leading-relaxed text-white text-center px-8 py-6 bg-gradient-to-r from-[#000000]/60 via-[#000010]/40 to-[#000000]/60 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-white/10"
        style={{ willChange: 'auto' }}
      >
        A worldwide innovation challenge uniting technologists, policymakers, and organizations to secure information integrity in an era of AI-generated content.
      </p>

      {/* CTA buttons */}
      <div
        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        style={{ willChange: 'auto' }}
      >
        {/* Primary CTA */}
        <motion.button
          onClick={handleJoinChallenge}
          className="bg-[#00AEEF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0088CC] transition-colors duration-300 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center">
            Join the Challenge
            <ArrowRight className="ml-2" size={20} />
          </span>
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          onClick={handlePartnerWithUs}
          className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Partner with Us
          <ArrowRight className="ml-2 inline" size={20} />
        </motion.button>
      </div>

      {/* Partner Logos with enhanced styling */}
      <motion.div
        className="mt-10"
        variants={itemVariants}
        custom={4}
      >
        <p className="text-gray-300 text-sm font-medium mb-6">
          Led by a coalition of global partners
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center items-center gap-10 bg-white/25 rounded-2xl px-8 py-5 shadow-[0_0_40px_rgba(0,180,255,0.2)] border border-white/30">
          {[
            { src: 'https://maximages.s3.us-west-1.amazonaws.com/IEEE_SA-logo-avatar.png', alt: 'IEEE SA', size: 'h-14 md:h-16' },
            { src: 'https://maximages.s3.us-west-1.amazonaws.com/OECD+AI+logo.jpeg', alt: 'OECD AI', size: 'h-12 md:h-14' },
            { src: 'https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg', alt: 'AI Commons', size: 'h-12 md:h-14' },
          ].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.size} object-contain opacity-100 hover:opacity-100 hover:scale-105 transition-transform duration-500 hover:drop-shadow-[0_0_20px_rgba(0,180,255,0.8)] hover:shadow-[0_0_25px_rgba(0,180,255,0.6)] brightness-110 contrast-110`}
              style={{
                filter: 'brightness(1.1) contrast(1.1)',
                willChange: 'auto',
              }}
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced scroll indicator with CSS animations (more performant)
const ScrollIndicator = () => {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes bounceDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        .scroll-indicator-button {
          animation: bounceDown 2s ease-in-out infinite;
        }
        .scroll-indicator-button:hover {
          transform: scale(1.2);
        }
        .scroll-indicator-button:active {
          transform: scale(0.9);
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-indicator-button {
            animation: none;
          }
        }
      `}</style>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={handleScrollDown}
          className="scroll-indicator-button text-[#FFD97A] hover:text-white transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </>
  );
};

// Main HeroSectionV3 component (memoized for performance)
const HeroSectionV3 = memo(() => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Ensure hero section never gets blurred when scrolling back to it
  useEffect(() => {
    const heroSection = heroSectionRef.current || document.getElementById('hero');
    if (!heroSection) return;

    // Intersection Observer to ensure hero section stays clear when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Hero section is prominently in view - ensure no blur
            const heroContent = Array.from(entry.target.querySelectorAll('h1, h2, h3, p, button, a, .relative')) as HTMLElement[];
            heroContent.forEach((content) => {
              content.style.filter = 'none';
              content.style.opacity = '1';
              content.style.transform = 'translateZ(0)';
            });
            
            // Ensure section itself has no blur
            (entry.target as HTMLElement).style.filter = 'blur(0px) brightness(1)';
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(heroSection);

    // Throttled scroll handler using requestAnimationFrame for better performance
    let rafId: number | null = null;
    let lastScrollTime = 0;
    const SCROLL_THROTTLE_MS = 16; // ~60fps
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < SCROLL_THROTTLE_MS) {
        return;
      }
      lastScrollTime = now;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const rect = heroSection.getBoundingClientRect();
        const isHeroInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.3;
        
        if (isHeroInView) {
          // Cache DOM query result
          const heroContent = Array.from(heroSection.querySelectorAll('h1, h2, h3, p, button, a, .relative')) as HTMLElement[];
          heroContent.forEach((content) => {
            content.style.filter = 'none';
            content.style.opacity = '1';
          });
          heroSection.style.filter = 'blur(0px) brightness(1)';
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      {/* Embedded CSS animations */}
      <style jsx>{`
        @keyframes lightSweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes buttonShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes pulseLight {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.4; }
        }
        
        .btn-shine {
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% auto;
          animation: buttonShine 4s linear infinite;
        }
        
        /* Ensure crisp text rendering */
        #hero h1,
        #hero p {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: auto;
        }
        
        /* Prevent text blur during load and scroll - ensure text is always sharp */
        #hero h1,
        #hero h1 *,
        #hero p,
        #hero button,
        #hero a,
        #hero .relative {
          filter: none !important;
        }
        
        /* Ensure hero section never gets blurred when scrolling back */
        #hero[style*="blur"] {
          filter: blur(0px) !important;
        }
        
        #hero h1[style*="blur"],
        #hero p[style*="blur"],
        #hero button[style*="blur"] {
          filter: none !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .btn-shine {
            animation: none;
          }
        }
      `}</style>

      <section id="hero" ref={heroSectionRef} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden z-10">
        {/* Background */}
        <VideoBackground />
        
        {/* Gradient Overlay */}
        <div className="gradient-overlay absolute inset-0 z-1 bg-gradient-to-b from-[#000010]/50 via-[#000020]/40 to-[#000030]/60" />
        
        {/* Overlay Layers */}
        <OverlayLayers />
        
        {/* Ambient gradient overlay for cinematic warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD97A]/8 via-transparent to-[#00AEEF]/5 pointer-events-none z-15" />
        
        {/* Content */}
        <Content />
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>
      </>
    );
});

export default HeroSectionV3;
