import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const PARTICLE_COUNT = 90;
const PARTICLE_COLORS = [
  'rgba(0,174,239,0.55)',
  'rgba(255,217,120,0.5)',
  'rgba(200,225,255,0.45)'
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

const FutureRunsOnTrust = () => {
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null);
  const rippleStateRef = useRef<Array<{ x: number; y: number; radius: number; alpha: number; velocity: number; lastX: number; lastY: number }>>([]);
  const rippleLastMouseRef = useRef({ x: 0, y: 0 });
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

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
    const handleMouseMove = (e: MouseEvent) => {
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
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = rippleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const addRipple = (x: number, y: number, velocity: number) => {
      rippleStateRef.current.push({
        x,
        y,
        radius: 0,
        alpha: Math.min(0.15, velocity * 0.05 + 0.08),
        velocity,
        lastX: x,
        lastY: y,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rippleStateRef.current.forEach((ripple, index) => {
        ripple.radius += 2 + ripple.velocity * 0.3;
        ripple.alpha -= 0.003;

        const horizontalStretch = 2.2 + ripple.velocity * 0.4;
        const gradient = ctx.createLinearGradient(
          ripple.x - ripple.radius * horizontalStretch,
          ripple.y,
          ripple.x + ripple.radius * horizontalStretch,
          ripple.y
        );
        gradient.addColorStop(0, `rgba(0,174,239,${ripple.alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(0,174,239,${ripple.alpha * 0.6})`);
        gradient.addColorStop(0.7, `rgba(255,217,120,${ripple.alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0,174,239,0)');

        ctx.save();
        ctx.translate(ripple.x, ripple.y);
        ctx.scale(horizontalStretch, 1);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(0, 0, ripple.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (ripple.alpha <= 0) {
          rippleStateRef.current.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - rippleLastMouseRef.current.x;
      const dy = y - rippleLastMouseRef.current.y;
      const velocity = Math.hypot(dx, dy) / 10;

      if (velocity > 0.5) {
        addRipple(x, y, velocity);
      }

      rippleLastMouseRef.current = { x, y };
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(rect.width, rect.height)
      );
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles();
    };

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -80) particle.x = width + 80;
        if (particle.x > width + 80) particle.x = -80;
        if (particle.y < -80) particle.y = height + 80;
        if (particle.y > height + 80) particle.y = -80;

        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 1;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Aurora/Sky-like dynamic gradient background - teal, violet, gold palette */
        .trust-nebula-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          /* Base gradient - static fallback */
          background: linear-gradient(180deg, 
            #0a1f3d 0%,      /* Deep violet-blue */
            #1a2f4a 20%,     /* Dark teal-violet */
            #2a4d5a 40%,     /* Medium teal */
            #4a6d5a 60%,     /* Teal-gold blend */
            #6a5d3a 80%,     /* Warm gold */
            #5a4d2a 100%     /* Deep gold */
          );
          /* Dynamic aurora gradient animation */
          background-image: 
            linear-gradient(180deg, 
              #0a1f3d 0%,
              #1a2f4a 20%,
              #2a4d5a 40%,
              #4a6d5a 60%,
              #6a5d3a 80%,
              #5a4d2a 100%
            );
          background-size: 100% 200%;
          animation: auroraShift 25s ease-in-out infinite alternate;
        }

        /* Glowing orbs using ::before */
        .trust-nebula-bg::before {
          content: '';
          position: absolute;
          inset: -20%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(129, 140, 248, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(46, 216, 243, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 50% 70%, rgba(245, 195, 109, 0.3) 0%, transparent 50%);
          animation: orbDrift 30s ease-in-out infinite alternate;
          pointer-events: none;
        }

        /* Drifting light particles using ::after */
        .trust-nebula-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 15% 25%, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 35% 40%, rgba(46, 216, 243, 0.7), transparent),
            radial-gradient(2px 2px at 65% 60%, rgba(245, 195, 109, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 85% 75%, rgba(129, 140, 248, 0.5), transparent),
            radial-gradient(2px 2px at 25% 80%, rgba(111, 231, 193, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 75% 20%, rgba(255, 217, 120, 0.6), transparent);
          background-size: 100% 100%, 120% 120%, 110% 110%, 130% 130%, 115% 115%, 125% 125%;
          background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          animation: particleShimmer 40s linear infinite;
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
            box-shadow: 0 0 20px rgba(0,174,239,0.1), 0 0 40px rgba(0,174,239,0.05);
          }
          50% {
            box-shadow: 0 0 60px rgba(255,217,120,0.25), 0 0 80px rgba(255,217,120,0.15);
          }
        }
        .trust-text-container {
          animation: trustPulse 12s ease-in-out infinite;
          transition: box-shadow 0.3s ease;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background: rgba(12, 22, 38, 0.55);
        }
      `}</style>
      <section
        id="trust"
        className="relative z-10 min-h-[90vh] overflow-hidden flex items-center justify-center"
      >
        {/* Custom nebula/haze background */}
        <div className="absolute inset-0 trust-nebula-bg" aria-hidden="true" />
        {/* Dark overlay for text legibility */}
        <div 
          className="absolute inset-0 bg-black/35"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10222E]/40 to-[#EBD89A]/45 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00AEEF]/12 to-transparent mix-blend-screen pointer-events-none" />

        <div className="absolute inset-0 z-10 pointer-events-none">
          <canvas
            ref={particleCanvasRef}
            className="h-full w-full"
            style={{ opacity: 0.6 }}
          />
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <canvas
            ref={rippleCanvasRef}
            className="h-full w-full"
            style={{ mixBlendMode: 'screen', opacity: 0.35 }}
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
                className="mx-auto mt-3 h-[3px] w-[150px] rounded-full bg-gradient-to-r from-[#00AEEF]/90 via-[#FFD97A]/70 to-transparent shadow-[0_0_15px_rgba(0,174,239,0.5)]"
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
                    <InteractiveWord wordKey="coalition" color="#FFD97A" className="font-semibold">
                      coalition of changemakers
                    </InteractiveWord>{' '}
                    - including IEEE SA, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation.
                  </>
                )}
                {i === 2 && (
                  <>
                    We're inviting{' '}
                    <InteractiveWord wordKey="technologists" color="#FFD97A" className="font-semibold">
                      technologists
                    </InteractiveWord>
                    ,{' '}
                    <InteractiveWord wordKey="policymakers" color="#FFD97A" className="font-semibold">
                      policymakers
                    </InteractiveWord>
                    , and{' '}
                    <InteractiveWord wordKey="innovators" color="#FFD97A" className="font-semibold">
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

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F5E2A1]/35 to-transparent" />
        <ScrollArrow targetId="#unique" />
      </section>
    </>
  );
};

export default FutureRunsOnTrust;
