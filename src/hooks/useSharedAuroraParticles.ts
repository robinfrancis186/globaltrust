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
const PARTICLE_COUNT = 60;
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

const createParticles = () => {
  if (state.particles.length > 0) return;
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
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
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
  const { offsetWidth, offsetHeight } = canvas;
  const width = Math.floor(offsetWidth * dpr);
  const height = Math.floor(offsetHeight * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
};

const resizeAll = () => {
  state.listeners.forEach((listener) => resizeCanvas(listener));
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

  state.particles.forEach((particle) => {
    particle.u = wrapCoordinate(particle.u + particle.velocityU * deltaSeconds);
    particle.v = wrapCoordinate(particle.v + particle.velocityV * deltaSeconds);
  });

  state.listeners.forEach(({ canvas, ctx }) => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    ctx.clearRect(0, 0, width, height);

    state.particles.forEach((particle) => {
      const x = particle.u * width;
      const y = particle.v * height;
      const size = particle.size;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 75%, 70%, ${particle.alpha})`;
      ctx.arc(x, y, size, 0, Math.PI * 2);
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
    window.addEventListener('resize', resizeAll);
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
    addListener(listener);

    return () => {
      removeListener(listener);
    };
  }, [canvasRef]);
};

export default useSharedAuroraParticles;



