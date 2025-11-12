import { RefObject, useEffect } from 'react';

type StardustParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

const MAX_DPR = 2;
const STARDUST_PER_MOVE = 4;
const PARTICLE_SPEED = 90;
const LIFE_RANGE: [number, number] = [220, 360]; // ms
const SIZE_RANGE: [number, number] = [1.1, 2.7];
const HUE_BASE = 200;
const HUE_VARIATION = 60;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const useCursorStardust = (
  containerRef: RefObject<HTMLElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const particles: StardustParticle[] = [];
    let rafId = 0;
    let lastTs = 0;

    const clearCanvas = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.restore();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const addParticles = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (let i = 0; i < STARDUST_PER_MOVE; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = PARTICLE_SPEED * (0.35 + Math.random() * 0.65);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: randomInRange(LIFE_RANGE[0], LIFE_RANGE[1]),
          size: randomInRange(SIZE_RANGE[0], SIZE_RANGE[1]),
          hue: HUE_BASE + Math.random() * HUE_VARIATION,
        });
      }

      if (!rafId) {
        lastTs = performance.now();
        rafId = window.requestAnimationFrame(render);
      }
    };

    const render = (timestamp: number) => {
      const delta = Math.min(timestamp - lastTs, 64); // clamp to avoid big jumps
      lastTs = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += delta;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI);
        const moveFactor = delta / 1000;
        p.x += p.vx * moveFactor;
        p.y += p.vy * moveFactor;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${65 + progress * 20}%, ${alpha * 0.75})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 80%, ${alpha * 0.85})`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        rafId = window.requestAnimationFrame(render);
      } else {
        clearCanvas();
        rafId = 0;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    const handlePointerLeave = () => {
      particles.length = 0;
      clearCanvas();
    };

    const supportsPointerRawUpdate = 'onpointerrawupdate' in window;

    container.addEventListener('pointermove', addParticles);
    container.addEventListener('pointerdown', addParticles);
    if (supportsPointerRawUpdate) {
      container.addEventListener('pointerrawupdate' as any, addParticles as EventListener);
    }
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', addParticles);
      container.removeEventListener('pointerdown', addParticles);
      if (supportsPointerRawUpdate) {
        container.removeEventListener('pointerrawupdate' as any, addParticles as EventListener);
      }
      container.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
      clearCanvas();
    };
  }, [canvasRef, containerRef]);
};

export default useCursorStardust;
