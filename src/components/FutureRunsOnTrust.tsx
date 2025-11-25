import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollArrow from './ScrollArrow';
import { getOptimizedParticleCount, getOptimizedCanvasResolution, shouldDisableCanvasEffects, getPerformanceConfig } from '../utils/performance';

const BASE_PARTICLE_COUNT = 90;
const PARTICLE_COLORS = [
  'rgba(0,174,239,0.55)',
  'rgba(139,126,200,0.5)',
  'rgba(107,90,171,0.45)',
  'rgba(46,216,243,0.4)'
];

const paragraphs = [
  "AI is reshaping how we learn, heal, and innovate. This transformation holds extraordinary promise — but it depends on one essential ingredient: trust.",
  "That's what the Global Trust Challenge (GTC) was created to enable. Born from a G7 call to action, it serves as a global rallying cry to preserve trust in the digital age. The GTC is led by a coalition of changemakers - including IEEE SA, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation.",
  "We're inviting technologists, policymakers, and innovators worldwide to co-create solutions that make digital environments more transparent, reliable, and empowering for everyone. Together, we're laying the foundations of digital trust - for future generations, for industry, and for society at large."
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
};

const createParticle = (width: number, height: number): Particle => {
  const speedMultiplier = 0.28;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1.5 + Math.random() * 3.5,
    speedX: (Math.random() - 0.5) * speedMultiplier,
    speedY: (Math.random() - 0.5) * speedMultiplier,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  };
};

const FutureRunsOnTrust = memo(() => {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set());

  const InteractiveWord = ({
    children,
    wordKey,
    color = '#00AEEF',
    className = '',
  }: {
    children: string;
    wordKey: string;
    color?: string;
    className?: string;
  }) => {
    const isHighlighted = highlightedWords.has(wordKey);

    return (
      <span
        data-highlight-word={wordKey}
        className={`transition-all duration-500 ease-out ${className}`}
        style={{
          textShadow: isHighlighted ? `0 0 12px ${color}30, 0 0 24px ${color}15` : 'none',
          color: isHighlighted ? color : 'inherit',
          filter: isHighlighted ? 'brightness(1.1)' : 'brightness(1)',
        }}
      >
        {children}
      </span>
    );
  };

  useEffect(() => {
    let rafId: number | null = null;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Skip if mouse hasn't moved significantly (reduces unnecessary calculations)
      const deltaX = Math.abs(e.clientX - lastMouseX);
      const deltaY = Math.abs(e.clientY - lastMouseY);
      if (deltaX < 5 && deltaY < 5) return;
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      // Throttle using requestAnimationFrame
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const words = document.querySelectorAll('[data-highlight-word]');
        const nextHighlighted = new Set<string>();

        words.forEach((word) => {
          const rect = word.getBoundingClientRect();
          const distance = Math.hypot(
            e.clientX - (rect.left + rect.width / 2),
            e.clientY - (rect.top + rect.height / 2)
          );
          if (distance < 100) {
            const key = word.getAttribute('data-highlight-word');
            if (key) nextHighlighted.add(key);
          }
        });

        setHighlightedWords(nextHighlighted);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // IntersectionObserver to pause CSS animations when off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting && entry.intersectionRatio > 0.1;
          setIsVisible(visible);
          
          // Pause/resume CSS animations by setting animation-play-state
          const bgElement = section.querySelector('.trust-nebula-bg') as HTMLElement;
          if (bgElement) {
            bgElement.style.setProperty('animation-play-state', visible ? 'running' : 'paused');
            // For pseudo-elements, we use CSS variable
            bgElement.style.setProperty('--animation-state', visible ? 'running' : 'paused');
          }
          
          const textContainer = section.querySelector('.trust-text-container') as HTMLElement;
          if (textContainer) {
            textContainer.style.setProperty('animation-play-state', visible ? 'running' : 'paused');
          }
        });
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    
    // Disable canvas on mobile and low-end devices
    const config = getPerformanceConfig();
    if (config.shouldDisableCanvas) {
      canvas.style.display = 'none';
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number | null = null;
    let isVisible = true;

    let canvasDpr = 1;

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const optimizedRes = getOptimizedCanvasResolution(rect.width, rect.height);
      canvasDpr = optimizedRes.dpr;
      
      // Limit maximum particles for performance
      const maxParticles = config.isMobile ? 30 : config.isTablet ? 60 : BASE_PARTICLE_COUNT;
      const particleCount = Math.min(
        getOptimizedParticleCount(BASE_PARTICLE_COUNT),
        maxParticles
      );
      
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(rect.width, rect.height) // Use display size, not canvas size
      );
    };

    // Debounce resize handler for better performance
    let resizeTimeout: number | null = null;
    const resize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        const optimizedRes = getOptimizedCanvasResolution(rect.width, rect.height);
        canvasDpr = optimizedRes.dpr;
        
        // Set canvas internal resolution (for high-DPI)
        canvas.width = optimizedRes.width;
        canvas.height = optimizedRes.height;
        
        // Set canvas display size (CSS pixels)
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        // Scale context to match devicePixelRatio
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(canvasDpr, canvasDpr);
        
        initParticles();
        resizeTimeout = null;
      }, 150);
    };

    const animate = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }
      
      // Use display size for calculations (already scaled by DPR in resize)
      const displayWidth = canvas.offsetWidth;
      const displayHeight = canvas.offsetHeight;
      
      // Clear entire canvas efficiently
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch particle updates for better performance
      const particles = particlesRef.current;
      const particleCount = particles.length;
      
      // Group particles by color to reduce fillStyle changes (major performance win)
      const particlesByColor = new Map<string, typeof particles>();
      particles.forEach(particle => {
        if (!particlesByColor.has(particle.color)) {
          particlesByColor.set(particle.color, []);
        }
        particlesByColor.get(particle.color)!.push(particle);
      });
      
      // Update positions first (no DOM/context operations)
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges (using display dimensions)
        if (particle.x < -80) particle.x = displayWidth + 80;
        if (particle.x > displayWidth + 80) particle.x = -80;
        if (particle.y < -80) particle.y = displayHeight + 80;
        if (particle.y > displayHeight + 80) particle.y = -80;
      });
      
      // Render particles grouped by color (reduces fillStyle changes)
      particlesByColor.forEach((colorParticles, color) => {
        ctx.beginPath();
        colorParticles.forEach(particle => {
          ctx.moveTo(particle.x + particle.radius, particle.y);
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        });
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause animations when off-screen
    const section = canvas.closest('section') || canvas.parentElement;
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1;
            if (isVisible && !animationId) {
              animate();
            } else if (!isVisible && animationId) {
              cancelAnimationFrame(animationId);
              animationId = null;
            }
          });
        },
        { threshold: [0, 0.1, 0.5, 1] }
      );
      observer.observe(section);

      resize();
      if (isVisible) {
        animate();
      }
      window.addEventListener('resize', resize, { passive: true });

      return () => {
        observer.disconnect();
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        window.removeEventListener('resize', resize);
      };
    } else {
      resize();
      animate();
      window.addEventListener('resize', resize, { passive: true });

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        window.removeEventListener('resize', resize);
      };
    }
  }, []);

  return (
    <>
      <style>{`
        /* Aurora/Sky-like dynamic gradient background - blue/violet/turquoise palette */
        .trust-nebula-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          /* Base gradient - static fallback */
          background: linear-gradient(180deg, 
            #0a1f2a 0%,      /* Deep blue */
            #1e3a5f 15%,     /* Dark blue */
            #2d4f6f 30%,     /* Medium blue */
            #3b3a7a 50%,     /* Violet-blue */
            #554c96 70%,     /* Medium violet */
            #6b5aab 85%,     /* Light violet */
            #8b7ec8 100%     /* Pale violet */
          );
          /* Dynamic aurora gradient animation */
          background-image: 
            linear-gradient(180deg, 
              #0a1f2a 0%,
              #1e3a5f 15%,
              #2d4f6f 30%,
              #3b3a7a 50%,
              #554c96 70%,
              #6b5aab 85%,
              #8b7ec8 100%
            );
          background-size: 100% 200%;
          animation: auroraShift 25s ease-in-out infinite alternate;
          animation-play-state: running;
        }

        /* Glowing orbs using ::before */
        .trust-nebula-bg::before {
          content: '';
          position: absolute;
          inset: -20%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(139, 126, 200, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 174, 239, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 50% 70%, rgba(107, 90, 171, 0.3) 0%, transparent 50%);
          animation: orbDrift 30s ease-in-out infinite alternate;
          animation-play-state: var(--animation-state, running);
          pointer-events: none;
        }

        /* Drifting light particles using ::after */
        .trust-nebula-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 15% 25%, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 35% 40%, rgba(0, 174, 239, 0.7), transparent),
            radial-gradient(2px 2px at 65% 60%, rgba(139, 126, 200, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 85% 75%, rgba(107, 90, 171, 0.5), transparent),
            radial-gradient(2px 2px at 25% 80%, rgba(46, 216, 243, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 75% 20%, rgba(167, 139, 250, 0.6), transparent);
          background-size: 100% 100%, 120% 120%, 110% 110%, 130% 130%, 115% 115%, 125% 125%;
          background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          animation: particleShimmer 40s linear infinite;
          animation-play-state: var(--animation-state, running);
          opacity: 0.7;
          pointer-events: none;
        }

        /* Aurora gradient shift animation */
        @keyframes auroraShift {
          0% {
            background-position: 0% 0%;
            filter: hue-rotate(0deg);
          }
          33% {
            background-position: 0% 25%;
            filter: hue-rotate(5deg);
          }
          66% {
            background-position: 0% 50%;
            filter: hue-rotate(-3deg);
          }
          100% {
            background-position: 0% 0%;
            filter: hue-rotate(0deg);
          }
        }

        /* Orb drift animation */
        @keyframes orbDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(2%, -1%, 0) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translate3d(-1%, 1%, 0) scale(0.95);
            opacity: 0.85;
          }
        }

        /* Particle shimmer animation */
        @keyframes particleShimmer {
          0% {
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            opacity: 0.7;
          }
          50% {
            background-position: 5% 10%, -3% 8%, 4% -5%, -2% 12%, 3% 7%, -4% 9%;
            opacity: 0.9;
          }
          100% {
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            opacity: 0.7;
          }
        }

        /* Reduced motion - static gradient fallback */
        @media (prefers-reduced-motion: reduce) {
          .trust-nebula-bg {
            animation: none !important;
            background-size: 100% 100% !important;
          }
          .trust-nebula-bg::before,
          .trust-nebula-bg::after {
            animation: none !important;
            opacity: 0.5;
          }
        }

        /* Low-power device fallback - disable animations */
        @media (prefers-reduced-motion: reduce), (max-width: 768px) {
          .trust-nebula-bg {
            background-size: 100% 100%;
          }
        }

        @keyframes trustPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0,174,239,0.15), 0 0 40px rgba(0,174,239,0.08);
          }
          50% {
            box-shadow: 0 0 60px rgba(139,126,200,0.25), 0 0 80px rgba(107,90,171,0.15);
          }
        }
        .trust-text-container {
          animation: trustPulse 12s ease-in-out infinite;
          animation-play-state: running;
          transition: box-shadow 0.3s ease;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(139,126,200,0.2);
          border-radius: 18px;
          background: rgba(30, 58, 95, 0.65);
        }
      `}</style>
      <section
        ref={sectionRef}
        id="trust"
        className="relative z-10 min-h-[90vh] overflow-hidden flex items-center justify-center"
      >
        {/* Custom nebula/haze background */}
        <div className="absolute inset-0 trust-nebula-bg" aria-hidden="true" />
        {/* Dark overlay for text legibility */}
        <div 
          className="absolute inset-0 bg-black/30"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b3a7a]/30 to-[#8b7ec8]/25 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00AEEF]/15 to-transparent mix-blend-screen pointer-events-none" />

        <div className="absolute inset-0 z-10 pointer-events-none">
          <canvas
            ref={particleCanvasRef}
            className="h-full w-full"
            style={{ opacity: 0.6 }}
          />
        </div>


        <motion.div
          className="trust-text-container relative z-30 mx-auto max-w-3xl px-8 py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ y, transform: 'translateZ(0)' }}
        >
          <motion.h2
            className="mb-12 text-center text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,174,239,0.4)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              The Future Runs on Trust
              <motion.div
                className="mx-auto mt-3 h-[3px] w-[150px] rounded-full bg-gradient-to-r from-[#00AEEF]/90 via-[#8b7ec8]/70 to-transparent shadow-[0_0_15px_rgba(0,174,239,0.5)]"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 0.9, scaleX: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 1 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>

          <div className="space-y-8 px-6 text-center text-gray-100">
            {paragraphs.map((_, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-lg md:text-xl"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 500 }}
              >
                {i === 0 && (
                  <>
                    AI is reshaping how we learn, heal, and{' '}
                    <InteractiveWord wordKey="innovation" color="#00AEEF" className="font-semibold">
                      innovate
                    </InteractiveWord>
                    . This transformation holds extraordinary promise — but it depends on one essential ingredient:{' '}
                    <InteractiveWord wordKey="trust" color="#00AEEF" className="font-semibold">
                      trust
                    </InteractiveWord>
                    .
                  </>
                )}
                {i === 1 && (
                  <>
                    That's what the{' '}
                    <InteractiveWord wordKey="gtc" color="#00AEEF" className="font-semibold">
                      Global Trust Challenge (GTC)
                    </InteractiveWord>{' '}
                    was created to enable. Born from a G7 call to action, it serves as a global rallying cry to preserve trust in the digital age. The GTC is led by a{' '}
                    <InteractiveWord wordKey="coalition" color="#8b7ec8" className="font-semibold">
                      coalition of changemakers
                    </InteractiveWord>{' '}
                    - including IEEE SA, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation.
                  </>
                )}
                {i === 2 && (
                  <>
                    We're inviting{' '}
                    <InteractiveWord wordKey="technologists" color="#8b7ec8" className="font-semibold">
                      technologists
                    </InteractiveWord>
                    ,{' '}
                    <InteractiveWord wordKey="policymakers" color="#8b7ec8" className="font-semibold">
                      policymakers
                    </InteractiveWord>
                    , and{' '}
                    <InteractiveWord wordKey="innovators" color="#8b7ec8" className="font-semibold">
                      innovators
                    </InteractiveWord>{' '}
                    worldwide to co-create solutions that make digital environments more transparent, reliable, and empowering for everyone. Together, we're laying the foundations of{' '}
                    <InteractiveWord wordKey="digital-trust" color="#00AEEF" className="font-semibold">
                      digital trust
                    </InteractiveWord>{' '}
                    - for future generations, for industry, and for society at large.
                  </>
                )}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#8b7ec8]/30 to-transparent" />
        <ScrollArrow targetId="#unique" />
      </section>
    </>
  );
});

export default FutureRunsOnTrust;
