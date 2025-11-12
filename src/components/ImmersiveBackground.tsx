import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import './ImmersiveBackground.css';

type ImmersiveBackgroundProps = {
  variant?: 'violet' | 'teal' | 'gold' | 'midnight';
  overlayOpacity?: number;        // 0 – 1, default 0.35
  className?: string;             // extra classes for container
  videoSrcWebm?: string;          // optional progressive enhancement video
  posterSrc?: string;             // LQ poster for the video
  reduceMotionOverride?: boolean; // force static (for testing)
};

type VideoRefs = {
  node: HTMLVideoElement;
  observer?: IntersectionObserver;
};

const VARIANTS: ImmersiveBackgroundProps['variant'][] = ['violet', 'teal', 'gold', 'midnight'];
const DEFAULT_OVERLAY = 0.35;

const prefersReducedMotionQuery = () =>
  typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

const canUseVideo = () => {
  if (typeof window === 'undefined') return false;

  const mediaQuery = prefersReducedMotionQuery();
  if (mediaQuery?.matches) return false;

  const connection = (navigator as any).connection;
  const deviceMemory = (navigator as any).deviceMemory ?? 4;
  const effectiveType = connection?.effectiveType;

  // Require 4g specifically (fallback safe if API missing)
  const hasGoodNetwork = !effectiveType || effectiveType === '4g';

  return hasGoodNetwork && deviceMemory >= 4;
};

const ImmersiveBackground: React.FC<ImmersiveBackgroundProps> = memo(
  ({
    variant = 'violet',
    overlayOpacity = DEFAULT_OVERLAY,
    className,
    videoSrcWebm,
    posterSrc,
    reduceMotionOverride,
  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<VideoRefs | null>(null);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    const prefersReducedMotion = useMemo(() => {
      if (reduceMotionOverride != null) return reduceMotionOverride;
      const query = prefersReducedMotionQuery();
      return query?.matches ?? false;
    }, [reduceMotionOverride]);

    const safeVariant = VARIANTS.includes(variant) ? variant : 'violet';

    useEffect(() => {
      // Progressive enhancement: only load video if all conditions are met
      if (
        prefersReducedMotion ||
        !videoSrcWebm || // Only WebM required per spec
        !canUseVideo() ||
        !containerRef.current
      ) {
        return;
      }

      const node = containerRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
              setShouldLoadVideo(true);
            }
          });
        },
        { threshold: [0, 0.35, 0.65] }
      );

      observer.observe(node);

      return () => observer.disconnect();
    }, [prefersReducedMotion, videoSrcWebm]);

    useEffect(() => {
      const videoNode = videoRef.current?.node;
      if (!videoNode || !shouldLoadVideo || !containerRef.current || prefersReducedMotion) return;

      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          // Pause when section not visible, play when visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            const playPromise = videoNode.play();
            if (playPromise) {
              playPromise.catch(() => undefined);
            }
          } else {
            videoNode.pause();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, {
        threshold: [0, 0.1, 0.35],
      });

      observer.observe(containerRef.current);
      videoRef.current = { node: videoNode, observer };

      return () => {
        observer.disconnect();
        if (videoRef.current) {
          videoRef.current.observer = undefined;
        }
      };
    }, [shouldLoadVideo, prefersReducedMotion]);

    const overlayValue = Math.min(Math.max(overlayOpacity, 0), 1);

    return (
      <div
        ref={containerRef}
        className={[
          'ibg-container',
          `ibg--${safeVariant}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ '--overlay-opacity': overlayValue } as React.CSSProperties}
        aria-hidden
      >
        <div className="ibg-gradient" />

        {shouldLoadVideo && videoSrcWebm && !prefersReducedMotion ? (
          <video
            ref={(node) => {
              if (!node) {
                videoRef.current = null;
              } else {
                videoRef.current = { node };
              }
            }}
            className="ibg-video"
            playsInline
            autoPlay
            muted
            loop
            preload="none"
            loading="lazy"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrcWebm} type="video/webm" />
          </video>
        ) : null}

        <div className="ibg-overlay" />
      </div>
    );
  }
);

ImmersiveBackground.displayName = 'ImmersiveBackground';

export type { ImmersiveBackgroundProps };
export default ImmersiveBackground;


