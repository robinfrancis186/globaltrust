import React, { useEffect, useRef } from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PreRegisterCTA() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/?scroll=pre-registration');
    } else {
      const element = document.getElementById('pre-registration');
      if (element) {
        smoothScrollTo(element, 600);
      }
    }
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Array<{ x: number; y: number; depth: number; radius: number; twinkle: number; twinkleSpeed: number }> = [];
    let time = 0;
    let animationFrame: number;

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      if (width === 0 || height === 0) {
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
      }
      
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      const base = Math.floor((width * height) / 1200);
      stars = new Array(base).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        depth: 0.25 + Math.random() * 0.75,
        radius: 0.4 + Math.random() * 1.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.002 + Math.random() * 0.006,
      }));
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a1a2e');
      gradient.addColorStop(1, '#040815');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawNebula = () => {
      const t = time * 0.00004;
      ctx.globalCompositeOperation = 'lighter';

      const cx1 = width * (0.25 + 0.05 * Math.sin(t * 6));
      const cy1 = height * (0.35 + 0.04 * Math.cos(t * 5));
      const r1 = Math.max(width, height) * 0.75;
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      g1.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * (0.7 + 0.07 * Math.cos(t * 4));
      const cy2 = height * (0.6 + 0.05 * Math.sin(t * 3));
      const r2 = Math.max(width, height) * 0.85;
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      g2.addColorStop(0, 'rgba(59, 197, 255, 0.18)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
    };

    const drawStars = (dt: number) => {
      for (const star of stars) {
        star.twinkle += star.twinkleSpeed * dt;
        const twinkle = 0.75 + 0.25 * Math.sin(star.twinkle);
        const radius = star.radius * (1 + (1 - star.depth) * 0.5) * twinkle;
        ctx.fillStyle = `hsla(210, 90%, ${65 + 15 * twinkle}%, ${0.55 + 0.25 * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let lastFrame = performance.now();
    
    const render = (now: number) => {
      const dt = now - lastFrame;
      lastFrame = now;
      time += dt;

      drawBackground();
      drawNebula();
      drawStars(dt);

      animationFrame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }
    
    // Initial resize with a small delay to ensure container is ready
    setTimeout(() => {
      resize();
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(render);
    }, 0);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="idea-cta">
      <canvas ref={canvasRef} className="idea-cta-canvas" />
      <div className="idea-cta-vignette" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center idea-cta__content">
        <div className="idea-cta__iconWrap">
          <span className="idea-cta__iconGlow" aria-hidden />
          <Lightbulb className="idea-cta__icon" strokeWidth={1.6} />
        </div>
        <h2 className="idea-cta__title">Got an Idea?</h2>
        <p className="idea-cta__subtitle">
          Pre-register now to be among the first to submit your innovative solution
        </p>
        <a
          href="#pre-registration"
          onClick={handleClick}
          className="idea-cta__chip"
        >
          Pre-register now
          <span className="idea-cta__chipArrow">
            <ArrowRight size={20} strokeWidth={2.4} />
          </span>
          <span className="idea-cta__chipHalo" aria-hidden />
        </a>
      </div>
      <style>
        {`
          .idea-cta {
            position: relative;
            padding: clamp(3rem, 6vw, 5.5rem) 0;
            color: #fff;
            overflow: hidden;
            background: #040815;
          }
          .idea-cta-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: block;
            pointer-events: none;
            z-index: 0;
          }
          .idea-cta-vignette {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            background:
              linear-gradient(180deg, rgba(0,0,0,0.35), transparent 40%),
              radial-gradient(80% 70% at 50% 10%, rgba(0,0,0,0.0), rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%);
          }
          .idea-cta__content {
            min-height: clamp(18rem, 36vw, 24rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            z-index: 10;
          }
          .idea-cta__iconWrap {
            position: relative;
            width: 4.1rem;
            height: 4.1rem;
            margin: clamp(0.3rem, 1.4vw, 1.25rem) auto clamp(1.4rem, 2.2vw, 1.8rem);
            display: flex;
            align-items: center;
            justify-content: center;
            isolation: isolate;
          }
          .idea-cta__iconGlow {
            position: absolute;
            inset: -40%;
            border-radius: 50%;
            background:
              radial-gradient(circle at 40% 35%, rgba(136, 197, 255, 0.45) 0%, transparent 72%),
              radial-gradient(circle at 70% 70%, rgba(72, 233, 192, 0.28) 0%, transparent 80%);
            filter: blur(16px);
            animation: ideaIconBloom 5.5s ease-in-out infinite alternate;
            opacity: 0.75;
          }
          .idea-cta__icon {
            position: relative;
            width: 2.5rem;
            height: 2.5rem;
            color: #f6fcff;
            filter:
              drop-shadow(0 10px 20px rgba(17, 24, 39, 0.4))
              drop-shadow(0 0 18px rgba(82, 236, 255, 0.65));
            animation: ideaIconPulse 3s ease-in-out infinite;
          }
          .idea-cta__title {
            margin: 0 0 0.85rem 0;
            font-family: "Barlow Condensed", "Inter", sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: clamp(2.45rem, 6.5vw, 3.75rem);
            background: linear-gradient(92deg, #bb6bff 0%, #6f8cff 38%, #3fd7ff 72%, #6affd2 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow:
              0 -2px 8px rgba(255, 255, 255, 0.25),
              0 10px 18px rgba(13, 20, 35, 0.55),
              0 0 35px rgba(90, 239, 255, 0.3);
          }
          .idea-cta__subtitle {
            margin: 0 auto clamp(1.1rem, 2.4vw, 1.8rem);
            max-width: 46rem;
            color: rgba(255,255,255,0.85);
            font-family: "Inter", "Barlow", sans-serif;
            font-size: clamp(1.1rem, 2.2vw, 1.25rem);
            line-height: 1.7;
            letter-spacing: 0.02em;
            text-shadow: 0 6px 18px rgba(10, 20, 35, 0.45);
          }
          .idea-cta__chip {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.95rem 1.9rem;
            border-radius: 999px;
            font-family: "Inter", system-ui, sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #0b1727;
            background: linear-gradient(120deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.76));
            box-shadow: 0 18px 44px rgba(15, 23, 42, 0.28);
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, color 0.35s ease;
            isolation: isolate;
          }
          .idea-cta__chip::before {
            content: "";
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(120deg, #8bffe2, #7ed0ff, #b598ff);
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            pointer-events: none;
            opacity: 0.95;
          }
          .idea-cta__chip::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4), transparent 65%);
            opacity: 0;
            transition: opacity 0.35s ease;
            pointer-events: none;
          }
          .idea-cta__chipArrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.35s ease;
          }
          .idea-cta__chipHalo {
            position: absolute;
            inset: -25%;
            border-radius: inherit;
            background:
              radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, transparent 45%),
              radial-gradient(circle, rgba(124, 236, 255, 0.45) 0%, transparent 70%);
            filter: blur(12px);
            opacity: 0.55;
            transition: opacity 0.35s ease, transform 0.35s ease;
            z-index: -1;
          }
          .idea-cta__chip:hover,
          .idea-cta__chip:focus-visible {
            transform: translateY(-4px);
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.32);
            color: #091323;
          }
          .idea-cta__chip:hover::after,
          .idea-cta__chip:focus-visible::after {
            opacity: 1;
          }
          .idea-cta__chip:hover .idea-cta__chipHalo,
          .idea-cta__chip:focus-visible .idea-cta__chipHalo {
            opacity: 0.7;
            transform: scale(1.05);
          }
          .idea-cta__chip:hover .idea-cta__chipArrow,
          .idea-cta__chip:focus-visible .idea-cta__chipArrow {
            transform: translateX(4px);
          }
          @keyframes ideaIconPulse {
            0%, 100% { opacity: 0.7; transform: scale(0.97); }
            50% { opacity: 1; transform: scale(1.04); }
          }
          @keyframes ideaIconBloom {
            0% { transform: scale(0.95); opacity: 0.65; }
            100% { transform: scale(1.05); opacity: 0.85; }
          }
          @media (prefers-reduced-motion: reduce) {
            .idea-cta__icon,
            .idea-cta__iconGlow,
            .idea-cta__chip {
              animation: none !important;
            }
            .idea-cta__chip {
              transition: none;
            }
          }
        `}
      </style>
    </div>
  );
}