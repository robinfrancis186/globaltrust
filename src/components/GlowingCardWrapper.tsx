import React, { useRef, useEffect, useCallback } from 'react';

interface GlowingCardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

type Edge = 'top' | 'right' | 'bottom' | 'left';

const GlowingCardWrapper: React.FC<GlowingCardWrapperProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const isCoarsePointer = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const computeClosestEdge = useCallback((x: number, y: number, rect: DOMRect): Edge => {
    const distances = {
      top: y,
      right: rect.width - x,
      bottom: rect.height - y,
      left: x,
    };
    return Object.entries(distances).reduce((a, b) => 
      distances[a[0] as Edge] < distances[b[0] as Edge] ? a : b
    )[0] as Edge;
  }, []);

  const getEdgeAngle = (edge: Edge): number => {
    const angles = { top: 0, right: 90, bottom: 180, left: 270 };
    return angles[edge] || 0;
  };

  const updateGlow = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    if (!card || isCoarsePointer()) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = computeClosestEdge(x, y, rect);
    const angle = getEdgeAngle(edge);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (card) {
        card.style.setProperty('--px', `${x}px`);
        card.style.setProperty('--py', `${y}px`);
        card.style.setProperty('--edge-angle', `${angle}deg`);
        card.setAttribute('data-edge', edge);
      }
    });
  }, [isCoarsePointer, computeClosestEdge]);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (card && !isCoarsePointer()) {
      card.addEventListener('mousemove', updateGlow);
    }
  }, [updateGlow, isCoarsePointer]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.removeEventListener('mousemove', updateGlow);
      card.style.removeProperty('--px');
      card.style.removeProperty('--py');
      card.style.removeProperty('--edge-angle');
      card.removeAttribute('data-edge');
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  }, [updateGlow]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .glowing-card-wrapper {
          --glow-primary: 259, 94%, 51%;
          --glow-secondary: 271, 81%, 56%;
          --glow-tertiary: 280, 100%, 70%;
          --glow-opacity: 0;
          --edge-angle: 0deg;
          --px: 50%;
          --py: 50%;
          
          position: relative;
          isolation: isolate;
        }

        .glowing-card-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 12px;
          padding: 2px;
          background: linear-gradient(
            var(--edge-angle),
            transparent 0%,
            transparent 35%,
            hsl(var(--glow-primary)) 50%,
            hsl(var(--glow-secondary)) 65%,
            transparent 80%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: var(--glow-opacity);
          filter: blur(12px) brightness(1.3);
          pointer-events: none;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .glowing-card-wrapper::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 12px;
          padding: 1px;
          background: linear-gradient(
            var(--edge-angle),
            transparent 0%,
            transparent 40%,
            hsl(var(--glow-primary)) 50%,
            hsl(var(--glow-secondary)) 60%,
            transparent 70%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: var(--glow-opacity);
          filter: blur(0.5px);
          pointer-events: none;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .glowing-card-wrapper:hover,
        .glowing-card-wrapper:focus-within {
          --glow-opacity: 0.8;
          transform: translateY(-2px);
        }

        .glowing-card-wrapper:focus-within {
          outline: 2px solid hsl(var(--glow-primary));
          outline-offset: 2px;
          border-radius: 12px;
        }

        @media (pointer: coarse) {
          .glowing-card-wrapper:hover,
          .glowing-card-wrapper:focus-within {
            --glow-opacity: 0.5;
          }
          
          .glowing-card-wrapper::before {
            background: conic-gradient(
              from 0deg,
              hsl(var(--glow-primary)) 0deg,
              hsl(var(--glow-secondary)) 90deg,
              hsl(var(--glow-tertiary)) 180deg,
              hsl(var(--glow-secondary)) 270deg,
              hsl(var(--glow-primary)) 360deg
            );
            animation: rotate-glow 8s linear infinite;
          }
        }

        @keyframes rotate-glow {
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glowing-card-wrapper::before,
          .glowing-card-wrapper::after {
            animation: none !important;
            transition: opacity 0.1s ease !important;
          }
          .glowing-card-wrapper:hover,
          .glowing-card-wrapper:focus-within {
            transform: none;
          }
        }

        .glowing-card-wrapper[data-edge="top"]::before,
        .glowing-card-wrapper[data-edge="top"]::after {
          background: linear-gradient(0deg, transparent 0%, transparent 35%, hsl(var(--glow-primary)) 50%, hsl(var(--glow-secondary)) 65%, transparent 80%, transparent 100%);
        }

        .glowing-card-wrapper[data-edge="right"]::before,
        .glowing-card-wrapper[data-edge="right"]::after {
          background: linear-gradient(90deg, transparent 0%, transparent 35%, hsl(var(--glow-primary)) 50%, hsl(var(--glow-secondary)) 65%, transparent 80%, transparent 100%);
        }

        .glowing-card-wrapper[data-edge="bottom"]::before,
        .glowing-card-wrapper[data-edge="bottom"]::after {
          background: linear-gradient(180deg, transparent 0%, transparent 35%, hsl(var(--glow-primary)) 50%, hsl(var(--glow-secondary)) 65%, transparent 80%, transparent 100%);
        }

        .glowing-card-wrapper[data-edge="left"]::before,
        .glowing-card-wrapper[data-edge="left"]::after {
          background: linear-gradient(270deg, transparent 0%, transparent 35%, hsl(var(--glow-primary)) 50%, hsl(var(--glow-secondary)) 65%, transparent 80%, transparent 100%);
        }
      `}</style>
      <div
        ref={cardRef}
        className={`glowing-card-wrapper ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
      >
        {children}
      </div>
    </>
  );
};

export default GlowingCardWrapper;

