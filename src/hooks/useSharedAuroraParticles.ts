import { RefObject, useEffect } from 'react';

type Particle = {
  u: number;
  v: number;
  velocityU: number;
  velocityV: number;
  size: number;
  alpha: number;
  hue: number;
};

type Listener = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

const MAX_DEVICE_PIXEL_RATIO = 2;
const BASE_PARTICLE_COUNT = 60;
const PARTICLE_SIZE_RANGE: [number, number] = [0.9, 2.1];
const PARTICLE_VELOCITY_RANGE: [number, number] = [-0.02, 0.02];
const PARTICLE_OPACITY_RANGE: [number, number] = [0.25, 0.65];
const PARTICLE_HUE_BASE = 195;
const PARTICLE_HUE_VARIANCE = 80;
const WRAP_MARGIN = 0.08;

const state = {
  particles: [] as Particle[],
  listeners: new Set<Listener>(),
  rafId: 0 as number | 0,
  lastTime: 0,
  resizeHandlerAttached: false,
};

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const createParticles = (particleCount: number = BASE_PARTICLE_COUNT) => {
  if (state.particles.length > 0) return;
  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i += 1) {
    particles.push({
      u: Math.random(),
      v: Math.random(),
      velocityU: randomInRange(PARTICLE_VELOCITY_RANGE[0], PARTICLE_VELOCITY_RANGE[1]),
      velocityV: randomInRange(PARTICLE_VELOCITY_RANGE[0], PARTICLE_VELOCITY_RANGE[1]),
      size: randomInRange(PARTICLE_SIZE_RANGE[0], PARTICLE_SIZE_RANGE[1]),
      alpha: randomInRange(PARTICLE_OPACITY_RANGE[0], PARTICLE_OPACITY_RANGE[1]),
      hue: PARTICLE_HUE_BASE + Math.random() * PARTICLE_HUE_VARIANCE,
    });
  }
  state.particles = particles;
};

const resizeCanvas = ({ canvas, ctx }: Listener) => {
  // Optimize devicePixelRatio based on device capabilities
  const baseDpr = window.devicePixelRatio || 1;
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  
  // Limit DPR on mobile/low-end devices
  let optimizedDpr = baseDpr;
  if (isMobile) {
    optimizedDpr = Math.min(baseDpr, 1.5); // Cap at 1.5x on mobile
  } else if (isTablet) {
    optimizedDpr = Math.min(baseDpr, 2); // Cap at 2x on tablets
  } else {
    optimizedDpr = Math.min(baseDpr, MAX_DEVICE_PIXEL_RATIO); // Cap at 2x on desktop
  }
  
  const { offsetWidth, offsetHeight } = canvas;
  const width = Math.floor(offsetWidth * optimizedDpr);
  const height = Math.floor(offsetHeight * optimizedDpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(optimizedDpr, optimizedDpr);
  }
};

// Debounce resize handler for better performance
let resizeTimeout: number | null = null;
const resizeAll = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = window.setTimeout(() => {
    state.listeners.forEach((listener) => resizeCanvas(listener));
    resizeTimeout = null;
  }, 150);
};

const wrapCoordinate = (value: number) => {
  if (value < -WRAP_MARGIN) return 1 + WRAP_MARGIN;
  if (value > 1 + WRAP_MARGIN) return -WRAP_MARGIN;
  return value;
};

const renderFrame = (timestamp: number) => {
  if (state.lastTime === 0) state.lastTime = timestamp;
  const deltaSeconds = Math.min((timestamp - state.lastTime) / 1000, 0.08); // clamp to avoid jumps
  state.lastTime = timestamp;

  // Update all particles first (no DOM operations)
  state.particles.forEach((particle) => {
    particle.u = wrapCoordinate(particle.u + particle.velocityU * deltaSeconds);
    particle.v = wrapCoordinate(particle.v + particle.velocityV * deltaSeconds);
  });

  // Render to all canvases
  state.listeners.forEach(({ canvas, ctx }) => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Clear canvas efficiently
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Group particles by color to reduce fillStyle changes
    const particlesByColor = new Map<string, typeof state.particles>();
    state.particles.forEach(particle => {
      const color = `hsla(${particle.hue}, 75%, 70%, ${particle.alpha})`;
      if (!particlesByColor.has(color)) {
        particlesByColor.set(color, []);
      }
      particlesByColor.get(color)!.push(particle);
    });

    // Render particles grouped by color (reduces fillStyle changes)
    particlesByColor.forEach((colorParticles, color) => {
      ctx.beginPath();
      colorParticles.forEach(particle => {
        const x = particle.u * width;
        const y = particle.v * height;
        const size = particle.size;
        ctx.moveTo(x + size, y);
        ctx.arc(x, y, size, 0, Math.PI * 2);
      });
      ctx.fillStyle = color;
      ctx.fill();
    });
  });

  state.rafId = window.requestAnimationFrame(renderFrame);
};

const start = () => {
  if (state.rafId) return;
  state.lastTime = 0;
  state.rafId = window.requestAnimationFrame(renderFrame);
};

const stop = () => {
  if (!state.rafId) return;
  window.cancelAnimationFrame(state.rafId);
  state.rafId = 0;
};

const addListener = (listener: Listener) => {
  state.listeners.add(listener);
  resizeCanvas(listener);
  if (!state.resizeHandlerAttached) {
    window.addEventListener('resize', resizeAll, { passive: true });
    state.resizeHandlerAttached = true;
  }
  createParticles();
  start();
};

const removeListener = (listener: Listener) => {
  state.listeners.delete(listener);
  if (state.listeners.size === 0) {
    stop();
    if (state.resizeHandlerAttached) {
      window.removeEventListener('resize', resizeAll);
      state.resizeHandlerAttached = false;
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
      resizeTimeout = null;
    }
  }
};

export const useSharedAuroraParticles = (
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const listener: Listener = { canvas, ctx };
    let isVisible = true;

    // IntersectionObserver to pause animations when off-screen
    const section = canvas.closest('section') || canvas.parentElement;
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1;
            
            // Pause/resume the shared animation based on visibility
            // Only pause if ALL sections using this hook are off-screen
            // For now, we'll pause when this specific section is off-screen
            if (!isVisible) {
              // Remove listener temporarily (will be re-added when visible)
              removeListener(listener);
            } else {
              // Re-add listener when visible
              addListener(listener);
            }
          });
        },
        { threshold: [0, 0.1, 0.5, 1] }
      );
      
      observer.observe(section);
      addListener(listener);

      return () => {
        observer.disconnect();
        removeListener(listener);
      };
    } else {
      addListener(listener);
      return () => {
        removeListener(listener);
      };
    }
  }, [canvasRef]);
};

export default useSharedAuroraParticles;




