import React, { useEffect, useMemo, useRef, useState } from 'react';

type GalaxyColors = {
  deep: string;
  mid: string;
  glow: string;
  nebulaA: string;
  nebulaB: string;
};

type Props = {
  colors?: GalaxyColors;
  density?: number;
  className?: string;
  showVignette?: boolean;
};

type Star = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  twinkle: number;
  twinkleSpeed: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  active: boolean;
};

const DEFAULT_COLORS: GalaxyColors = {
  deep: '#050a18',
  mid: '#0c1935',
  glow: '#80bfff',
  nebulaA: 'rgba(130, 85, 255, 0.22)',
  nebulaB: 'rgba(37, 211, 255, 0.18)',
};

const TWO_PI = Math.PI * 2;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const GalaxyBackground: React.FC<Props> = ({
  colors = DEFAULT_COLORS,
  density = 1,
  className = '',
  showVignette = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const shootingRef = useRef<ShootingStar>({ x: 0, y: 0, vx: 0, vy: 0, life: 0, ttl: 0, active: false });
  const prefersReducedMotion = useReducedMotion();

  const normalizedDensity = useMemo(() => clamp(density, 0.5, 1.5), [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let time = 0;
    let lastFrame = performance.now();
    let nextShooter = lastFrame + 6000 + Math.random() * 4000;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      const base = Math.floor((width * height) / 1200);
      const count = Math.floor(base * normalizedDensity);
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        depth: 0.25 + Math.random() * 0.75,
        radius: 0.4 + Math.random() * 1.2,
        twinkle: Math.random() * TWO_PI,
        twinkleSpeed: 0.002 + Math.random() * 0.006,
      }));
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, colors.mid);
      gradient.addColorStop(1, colors.deep);
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
      g1.addColorStop(0, colors.nebulaA);
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * (0.7 + 0.07 * Math.cos(t * 4));
      const cy2 = height * (0.6 + 0.05 * Math.sin(t * 3));
      const r2 = Math.max(width, height) * 0.85;
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      g2.addColorStop(0, colors.nebulaB);
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
    };

    const drawStars = (dt: number) => {
      for (const star of stars) {
        star.twinkle += star.twinkleSpeed * dt * (prefersReducedMotion ? 0 : 1);
        const twinkle = prefersReducedMotion ? 1 : 0.75 + 0.25 * Math.sin(star.twinkle);
        const depth = star.depth;
        const parallaxX = 0;
        const parallaxY = 0;
        let x = star.x + parallaxX;
        let y = star.y + parallaxY;
        if (x > width) x -= width;
        if (x < 0) x += width;
        if (y > height) y -= height;
        if (y < 0) y += height;
        const radius = star.radius * (1 + (1 - depth) * 0.5) * twinkle;
        ctx.fillStyle = `hsla(210, 90%, ${65 + 15 * twinkle}%, ${0.55 + 0.25 * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TWO_PI);
        ctx.fill();
      }
    };

    const spawnShootingStar = () => {
      const shooter = shootingRef.current;
      if (shooter.active) return;
      shooter.active = true;
      shooter.life = 0;
      shooter.ttl = 0.5 + Math.random() * 0.6;
      if (Math.random() < 0.5) {
        shooter.x = Math.random() * width;
        shooter.y = -40;
        shooter.vx = 120 + Math.random() * 80;
        shooter.vy = 320 + Math.random() * 160;
      } else {
        shooter.x = -40;
        shooter.y = Math.random() * (height * 0.4);
        shooter.vx = 320 + Math.random() * 160;
        shooter.vy = 120 + Math.random() * 80;
      }
    };

    const drawShootingStar = (dt: number) => {
      const shooter = shootingRef.current;
      if (!shooter.active) return;
      shooter.life += dt / 1000;
      if (shooter.life > shooter.ttl) {
        shooter.active = false;
        return;
      }
      shooter.x += shooter.vx * (dt / 1000);
      shooter.y += shooter.vy * (dt / 1000);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const alpha = 1 - shooter.life / shooter.ttl;
      const trail = ctx.createLinearGradient(
        shooter.x - shooter.vx * 0.2,
        shooter.y - shooter.vy * 0.2,
        shooter.x,
        shooter.y
      );
      trail.addColorStop(0, 'rgba(255,255,255,0)');
      trail.addColorStop(1, `rgba(220,235,255,${alpha * 0.75})`);
      ctx.strokeStyle = trail;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shooter.x - shooter.vx * 0.2, shooter.y - shooter.vy * 0.2);
      ctx.lineTo(shooter.x, shooter.y);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(shooter.x, shooter.y, 2.2, 0, TWO_PI);
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      const dt = now - lastFrame;
      lastFrame = now;
      time += dt;

      drawBackground();
      if (!prefersReducedMotion) drawNebula();
      drawStars(dt);
      if (!prefersReducedMotion) {
        drawShootingStar(dt);
        if (now > nextShooter) {
          spawnShootingStar();
          nextShooter = now + 6000 + Math.random() * 4000;
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      // Mouse parallax disabled
    };

    const handlePointerLeave = () => {
      // Mouse parallax disabled
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Mouse parallax disabled - no event listeners needed

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [colors, normalizedDensity, prefersReducedMotion]);

  return (
    <div className={`galaxy-wrap ${className}`}>
      <canvas ref={canvasRef} className="galaxy-canvas" />
      {showVignette && <div className="galaxy-vignette" aria-hidden="true" />}
      <style>
        {`
          .galaxy-wrap {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
          }
          .galaxy-canvas {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            display: block;
            background: ${colors.deep};
          }
          .galaxy-vignette {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(180deg, rgba(0,0,0,0.35), transparent 40%),
              radial-gradient(80% 70% at 50% 10%, rgba(0,0,0,0.0), rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%);
          }
          @media (prefers-reduced-motion: reduce) {
            .galaxy-canvas {
              filter: saturate(0.9) brightness(0.95);
            }
          }
        `}
      </style>
    </div>
  );
};

function useReducedMotion(): boolean {
  const mediaQuery = useMemo(() => (
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
  ), []);
  const [prefers, setPrefers] = useState<boolean>(() => mediaQuery?.matches ?? false);

  useEffect(() => {
    if (!mediaQuery) return;
    const handler = (event: MediaQueryListEvent) => setPrefers(event.matches);
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, [mediaQuery]);

  return prefers;
}

export default GalaxyBackground;
