import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ElegantTransitionProps {
  sectionIds: string[];
}

export const ElegantTransition: React.FC<ElegantTransitionProps> = ({ sectionIds }) => {
  const initializedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;
    
    // Wait for React to render all sections
    timerRef.current = setTimeout(() => {
      const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;
      initializedRef.current = true;

      // Ensure sections have proper structure
      sections.forEach((section) => {
        // Ensure section is positioned relative with overflow hidden
        if (window.getComputedStyle(section).position === 'static') {
          section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        
        // Find or create background element
        let bg = section.querySelector('.section-bg') as HTMLElement;
        
        if (!bg) {
          // Check for existing video
          const video = section.querySelector('video');
          
          if (video) {
            // If video is already positioned absolutely, add .section-bg class
            const videoStyle = window.getComputedStyle(video);
            if (videoStyle.position === 'absolute' || video.parentElement?.classList.contains('absolute')) {
              video.classList.add('section-bg');
              bg = video as HTMLElement;
            } else {
              // Wrap video in .section-bg div
              const wrapper = document.createElement('div');
              wrapper.className = 'section-bg';
              wrapper.style.cssText = `
                position: absolute;
                inset: 0;
                z-index: 0;
                transform-origin: center center;
                will-change: transform;
              `;
              video.parentNode?.insertBefore(wrapper, video);
              wrapper.appendChild(video);
              bg = wrapper;
            }
          } else {
            // Check for gradient backgrounds
            const computedStyle = window.getComputedStyle(section);
            const bgImage = computedStyle.backgroundImage;
            
            if (bgImage && bgImage !== 'none') {
              // Create .section-bg wrapper for gradient
              bg = document.createElement('div');
              bg.className = 'section-bg';
              bg.style.cssText = `
                position: absolute;
                inset: 0;
                z-index: 0;
                background: ${computedStyle.background};
                background-size: cover;
                background-position: center;
                transform-origin: center center;
                will-change: transform;
              `;
              section.insertBefore(bg, section.firstChild);
            }
          }
        }

        // Ensure background has proper styling
        if (bg) {
          bg.style.transformOrigin = 'center center';
          bg.style.willChange = 'transform';
        }

        // Ensure content has proper z-index
        const contentElements = section.querySelectorAll('*:not(.section-bg)');
        contentElements.forEach((el) => {
          const elStyle = window.getComputedStyle(el as HTMLElement);
          if (elStyle.position === 'relative' || elStyle.position === 'absolute' || elStyle.position === 'fixed') {
            const currentZ = parseInt(elStyle.zIndex) || 0;
            if (currentZ < 10) {
              (el as HTMLElement).style.zIndex = '10';
            }
          }
        });
      });

      // Set initial states - first section visible, others hidden
      sections.forEach((section, i) => {
        const bg = section.querySelector('.section-bg') as HTMLElement;
        
        if (i === 0) {
          gsap.set(section, { 
            scale: 1, 
            opacity: 1, 
            filter: "blur(0px)",
            willChange: "transform, opacity, filter"
          });
          if (bg) {
            gsap.set(bg, { scale: 1, y: "0%" });
          }
        } else {
          gsap.set(section, { 
            scale: 0.96, 
            opacity: 0, 
            filter: "blur(8px)",
            willChange: "transform, opacity, filter"
          });
          if (bg) {
            gsap.set(bg, { scale: 0.95, y: "-10%" });
          }
        }
      });

      // Create elegant transitions between sections
      sections.forEach((currentSection, i) => {
        const nextSection = sections[i + 1];
        if (!nextSection) return;

        const currentBG = currentSection.querySelector('.section-bg') as HTMLElement;
        const nextBG = nextSection.querySelector('.section-bg') as HTMLElement;

        // Cinematic timeline with synchronized animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });

        // 1️⃣ Previous section scales back and blurs
        tl.to(currentSection, {
          scale: 0.96,
          ease: "power2.inOut",
        }, 0);

        tl.to(currentSection, {
          filter: "blur(8px)",
          opacity: 0.4,
          ease: "power2.inOut",
        }, 0);

        // 2️⃣ Previous background parallax (moves slower, creates depth)
        if (currentBG) {
          tl.to(currentBG, {
            scale: 1.05,
            y: "20%",
            ease: "power2.inOut",
          }, 0);
        }

        // 3️⃣ Next section jumps forward (cinematic entrance)
        tl.fromTo(
          nextSection,
          {
            scale: 0.96,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "<" // Synchronized with previous animations
        );

        // 4️⃣ Next background parallax (comes into position)
        if (nextBG) {
          tl.fromTo(
            nextBG,
            {
              scale: 0.95,
              y: "-10%",
            },
            {
              scale: 1,
              y: "0%",
              ease: "power3.out",
            },
            "<"
          );
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 200); // Delay for React rendering

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sectionIds]);

  return null;
};

export default ElegantTransition;
