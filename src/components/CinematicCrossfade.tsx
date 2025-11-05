import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicCrossfadeProps {
  sectionIds: string[];
}

export const CinematicCrossfade: React.FC<CinematicCrossfadeProps> = ({ sectionIds }) => {
  const initializedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;
    
    timerRef.current = setTimeout(() => {
      const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;
      initializedRef.current = true;

      // Apply 3D perspective to body for cinematic depth
      const body = document.body;
      body.style.perspective = '1200px';
      body.style.perspectiveOrigin = 'center center';

      // Ensure sections have proper structure for 3D depth-push transitions
      sections.forEach((section, i) => {
        if (window.getComputedStyle(section).position === 'static') {
          section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        section.style.transformStyle = 'preserve-3d';
        section.style.backfaceVisibility = 'hidden';
        section.style.willChange = 'transform, opacity';
        
        // Only set height if not already set
        const currentHeight = window.getComputedStyle(section).height;
        if (currentHeight === 'auto' || currentHeight === '0px') {
          section.style.height = '100vh';
        }
        
        // Only set display if not already flex/grid
        const currentDisplay = window.getComputedStyle(section).display;
        if (currentDisplay !== 'flex' && currentDisplay !== 'grid') {
          section.style.display = 'flex';
          section.style.alignItems = 'center';
          section.style.justifyContent = 'center';
        }

        // Find video and add bg-video class
        const video = section.querySelector('video');
        if (video) {
          video.classList.add('bg-video');
          
          // Position video absolutely
          const wrapper = video.parentElement;
          if (wrapper?.classList.contains('video-bg-wrapper')) {
            video.style.cssText = `
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 0;
              filter: brightness(1);
              transform-origin: center center;
            `;
          } else {
            video.style.cssText = `
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 0;
              filter: brightness(1);
              transform-origin: center center;
            `;
          }
          
          // Set initial opacity via GSAP
          gsap.set(video, { opacity: i === 0 ? 1 : 0 });
          
          // Ensure video properties
          if (!video.hasAttribute('autoplay')) video.setAttribute('autoplay', '');
          if (!video.hasAttribute('loop')) video.setAttribute('loop', '');
          if (!video.hasAttribute('muted')) video.setAttribute('muted', '');
          if (!video.hasAttribute('playsinline')) video.setAttribute('playsinline', '');
        }

        // Ensure gradient overlay exists
        let gradientOverlay = section.querySelector('.gradient-overlay') as HTMLElement;
        if (!gradientOverlay) {
          gradientOverlay = document.createElement('div');
          gradientOverlay.className = 'gradient-overlay';
          
          // Set gradient based on section ID
          const gradients: Record<string, string> = {
            hero: 'linear-gradient(to bottom, #0E1A2A, #144D4A)',
            trust: 'linear-gradient(to bottom, #144D4A, #D9C878)',
            unique: 'linear-gradient(to bottom, #E8D89A, #C2E1D6)',
            phases: 'linear-gradient(to bottom, #97D0D4, #4E6EAF)',
            partners: 'linear-gradient(to bottom, #4E6EAF, #0E1A2A)'
          };
          
          gradientOverlay.style.cssText = `
            position: absolute;
            inset: 0;
            z-index: 1;
            mix-blend-mode: soft-light;
            opacity: ${i === 0 ? '0.5' : '0'};
            pointer-events: none;
            background: ${gradients[section.id] || 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2))'};
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
          `;
          
          // Insert after video
          if (video) {
            video.parentNode?.insertBefore(gradientOverlay, video.nextSibling);
          } else {
            section.insertBefore(gradientOverlay, section.firstChild);
          }
        } else {
          // Update existing gradient overlay
          if (!gradientOverlay.style.mixBlendMode) {
            gradientOverlay.style.mixBlendMode = 'soft-light';
          }
          if (!gradientOverlay.style.pointerEvents) {
            gradientOverlay.style.pointerEvents = 'none';
          }
          if (!gradientOverlay.style.backgroundAttachment) {
            gradientOverlay.style.backgroundAttachment = 'fixed';
            gradientOverlay.style.backgroundSize = 'cover';
            gradientOverlay.style.backgroundPosition = 'center';
          }
          
          // Set initial opacity via GSAP
          gsap.set(gradientOverlay, { opacity: i === 0 ? 0.5 : 0 });
        }

        // Add fog/particle layer (Leonardo-style 10s loop)
        let fogLayer = section.querySelector('.fog-layer') as HTMLElement;
        const fogVideoUrl = 'https://maximages.s3.us-west-1.amazonaws.com/Leonardo+Fog+Particle+Loop.mp4';
        if (!fogLayer) {
          fogLayer = document.createElement('div');
          fogLayer.className = 'fog-layer';
          fogLayer.style.cssText = `
            position: absolute;
            inset: 0;
            z-index: 1.5;
            pointer-events: none;
            mix-blend-mode: soft-light;
            filter: blur(0.5px);
          `;
          
          // Use video for fog
          const fogVideo = document.createElement('video');
          fogVideo.src = fogVideoUrl;
          fogVideo.autoplay = true;
          fogVideo.loop = true;
          fogVideo.muted = true;
          fogVideo.playsInline = true;
          fogVideo.style.cssText = `
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 1;
            mix-blend-mode: soft-light;
            filter: blur(0.5px);
          `;
          fogLayer.appendChild(fogVideo);
          
          // Insert fog layer after gradient
          if (gradientOverlay) {
            gradientOverlay.parentNode?.insertBefore(fogLayer, gradientOverlay.nextSibling);
          } else {
            section.insertBefore(fogLayer, section.firstChild);
          }
          
          // Set initial opacity via GSAP
          gsap.set(fogLayer, { opacity: i === 0 ? 0.15 : 0 });
        } else {
          // Update existing fog layer
          if (!fogLayer.style.mixBlendMode) {
            fogLayer.style.mixBlendMode = 'soft-light';
          }
          if (!fogLayer.style.pointerEvents) {
            fogLayer.style.pointerEvents = 'none';
          }
          
          // Set initial opacity via GSAP
          gsap.set(fogLayer, { opacity: i === 0 ? 0.15 : 0 });
        }

        // Ensure content has proper z-index and transform-style
        const contentElements = section.querySelectorAll('*:not(.bg-video):not(.gradient-overlay):not(.fog-layer)');
        contentElements.forEach((el) => {
          const elStyle = window.getComputedStyle(el as HTMLElement);
          if (elStyle.position === 'relative' || elStyle.position === 'absolute' || elStyle.position === 'fixed') {
            const currentZ = parseInt(elStyle.zIndex) || 0;
            if (currentZ < 5) {
              (el as HTMLElement).style.zIndex = '5';
            }
          }
          // Add transform-style for 3D effects
          (el as HTMLElement).style.transformStyle = 'preserve-3d';
        });
      });

      // Set initial states - only apply masks after they're created
      sections.forEach((section, i) => {
        gsap.set(section, { 
          scale: 1, 
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          transformOrigin: "center center",
          willChange: "transform, opacity, filter"
        });
      });

      // Ensure hero section is always clear when at top
      const heroSection = sections.find(s => s.id === 'hero');
      if (heroSection) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          onEnter: () => {
            gsap.set(heroSection, {
              opacity: 1,
              scale: 1,
              z: 0,
              filter: 'blur(0px)'
            });
            const heroVideo = heroSection.querySelector('video.bg-video') as HTMLVideoElement;
            const heroGradient = heroSection.querySelector('.gradient-overlay') as HTMLElement;
            const heroFog = heroSection.querySelector('.fog-layer') as HTMLElement;
            if (heroVideo) gsap.set(heroVideo, { opacity: 1 });
            if (heroGradient) gsap.set(heroGradient, { opacity: 0.5 });
            if (heroFog) gsap.set(heroFog, { opacity: 0.15 });
          },
          onEnterBack: () => {
            gsap.set(heroSection, {
              opacity: 1,
              scale: 1,
              z: 0,
              filter: 'blur(0px)'
            });
            const heroVideo = heroSection.querySelector('video.bg-video') as HTMLVideoElement;
            const heroGradient = heroSection.querySelector('.gradient-overlay') as HTMLElement;
            const heroFog = heroSection.querySelector('.fog-layer') as HTMLElement;
            if (heroVideo) gsap.set(heroVideo, { opacity: 1 });
            if (heroGradient) gsap.set(heroGradient, { opacity: 0.5 });
            if (heroFog) gsap.set(heroFog, { opacity: 0.15 });
          }
        });
      }

      // Create cinematic push-through transitions
      sections.forEach((currentSection, i) => {
        const nextSection = sections[i + 1];
        if (!nextSection) return;

        const currentVideo = currentSection.querySelector('video.bg-video') as HTMLVideoElement;
        const nextVideo = nextSection.querySelector('video.bg-video') as HTMLVideoElement;
        const currentGradient = currentSection.querySelector('.gradient-overlay') as HTMLElement;
        const nextGradient = nextSection.querySelector('.gradient-overlay') as HTMLElement;
        const currentFog = currentSection.querySelector('.fog-layer') as HTMLElement;
        const nextFog = nextSection.querySelector('.fog-layer') as HTMLElement;

        // Set initial state for next section: positioned behind current
        gsap.set(nextSection, {
          opacity: 0,
          scale: 1.08,
          z: 200, // Start in back of 3D space
          filter: "blur(1px)",
          transformOrigin: "center center"
        });

        if (nextVideo) {
          gsap.set(nextVideo, { opacity: 0 });
        }

        if (nextGradient) {
          gsap.set(nextGradient, { opacity: 0 });
        }

        if (nextFog) {
          gsap.set(nextFog, { opacity: 0 });
        }

        // Crossfade and depth-push timeline
        // Starts when next section enters viewport, ends at mid-screen
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom", // Begin when next section enters viewport
            end: "top 50%", // End when it reaches mid-screen
            scrub: true,
            onLeaveBack: () => {
              // Reset current section (especially hero) when scrolling back up
              if (currentSection.id === 'hero') {
                gsap.set(currentSection, {
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  filter: 'blur(0px)'
                });
                if (currentVideo) gsap.set(currentVideo, { opacity: 1 });
                if (currentGradient) gsap.set(currentGradient, { opacity: 0.5 });
                if (currentFog) gsap.set(currentFog, { opacity: 0.15 });
              }
            }
          },
        });

        // Current section: fade out and move backward in 3D space
        tl.to(currentSection, {
          opacity: 0.3,
          scale: 0.92,
          z: -200, // Move backward in 3D space
          filter: "blur(1px)",
          transformOrigin: "center center",
          ease: "power3.inOut",
        }, 0);

        // Video crossfade synchronized with section transition
        if (currentVideo) {
          currentVideo.style.opacity = ''; // Remove inline styles
          tl.to(currentVideo, { 
            opacity: 0.2, 
            ease: "power3.inOut" 
          }, 0);
        }
        
        if (nextVideo) {
          nextVideo.style.opacity = ''; // Remove inline styles
          tl.to(nextVideo, { 
            opacity: 1, 
            ease: "power3.inOut" 
          }, 0);
        }

        // Gradient blending synchronized with section transition
        if (currentGradient) {
          tl.to(currentGradient, { 
            opacity: 0.2,
            ease: "power3.inOut"
          }, 0);
        }
        
        if (nextGradient) {
          tl.to(nextGradient, { 
            opacity: 0.6,
            ease: "power3.inOut"
          }, 0);
        }

        // Fog layer blending synchronized with section transition
        if (currentFog) {
          tl.to(currentFog, { 
            opacity: 0.05,
            ease: "power3.inOut"
          }, 0);
        }
        
        if (nextFog) {
          tl.to(nextFog, { 
            opacity: 0.15,
            ease: "power3.inOut"
          }, 0);
        }

        // Next section: fade in and move forward in 3D space
        tl.fromTo(nextSection, {
          opacity: 0,
          scale: 1.08,
          z: 200, // Start further back in 3D space
          filter: "blur(1px)",
          transformOrigin: "center center",
        }, {
          opacity: 1,
          scale: 1,
          z: 0, // Move to front
          filter: "blur(0px)",
          transformOrigin: "center center",
          ease: "power3.inOut",
        }, 0); // Same time as current section animation


        // Parallax content motion (foreground lags)
        const nextContent = nextSection.querySelector('.content') || 
                            nextSection.querySelector('[class*="content"]') ||
                            nextSection.querySelector('h1, h2, h3, p')?.parentElement;
        
        if (nextContent) {
          gsap.set(nextContent, {
            yPercent: 10,
            opacity: 0.8,
            willChange: "transform, opacity"
          });

          gsap.to(nextContent, {
            yPercent: -5,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: nextSection,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 200);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sectionIds]);

  return null;
};

export default CinematicCrossfade;
