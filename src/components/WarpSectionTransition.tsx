import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WarpSectionTransitionProps {
  sectionIds: string[];
}

const WarpSectionTransition: React.FC<WarpSectionTransitionProps> = ({ sectionIds }) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initializedRef.current) return;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setupTransitions();
      initializedRef.current = true;
    }, 500);

    return () => {
      clearTimeout(timer);
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (sectionIds.some(id => trigger.trigger === document.querySelector(`#${id}`))) {
          trigger.kill();
        }
      });
    };
  }, [sectionIds]);

  const setupTransitions = () => {
    const sections = sectionIds
      .map(id => document.querySelector(`#${id}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length < 2) return;

    // Ensure all sections start without blur, especially hero section
    sections.forEach((section) => {
      gsap.set(section, { filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1 });
      
      // Special handling for hero section - ensure it's always clear at the top
      if (section.id === 'hero') {
        // Create a ScrollTrigger that resets hero section when at top
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          onEnter: () => {
            gsap.set(section, { filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1 });
            const heroBg = section.querySelector('.bg-video, .gradient-overlay, .video-bg-wrapper') as HTMLElement;
            if (heroBg) {
              gsap.set(heroBg, { filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1 });
            }
          },
          onEnterBack: () => {
            gsap.set(section, { filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1 });
            const heroBg = section.querySelector('.bg-video, .gradient-overlay, .video-bg-wrapper') as HTMLElement;
            if (heroBg) {
              gsap.set(heroBg, { filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1 });
            }
            const heroContent = Array.from(section.querySelectorAll('h1, h2, h3, p, button, a')) as HTMLElement[];
            heroContent.forEach(content => {
              gsap.set(content, { opacity: 1, y: 0, scale: 1 });
            });
          }
        });
      }
    });

    sections.forEach((currentSection, index) => {
      const nextSection = sections[index + 1];
      if (!nextSection) return;

      // Get background elements (video or gradient overlay)
      const currentBg = currentSection.querySelector('.bg-video, .gradient-overlay, .video-bg-wrapper') as HTMLElement;
      const nextBg = nextSection.querySelector('.bg-video, .gradient-overlay, .video-bg-wrapper') as HTMLElement;

      // Get content elements
      const currentContent = Array.from(currentSection.querySelectorAll('h1, h2, h3, p, button, a, .glassmorphic-card, .section-title, .section-subtitle')) as HTMLElement[];
      const nextContent = Array.from(nextSection.querySelectorAll('h1, h2, h3, p, button, a, .glassmorphic-card, .section-title, .section-subtitle')) as HTMLElement[];

      // Set initial states for smoother merging
      gsap.set(nextSection, {
        opacity: 0.2, // Start slightly visible for better merging
        scale: 0.98, // Closer to final scale
        filter: 'blur(0px) brightness(0.8)'
      });

      gsap.set(nextContent, {
        opacity: 0,
        y: 20 // Reduced initial offset
      });

      // Create ScrollTrigger for the smooth warp transition
      // Extended overlap for much better merging effect
      ScrollTrigger.create({
        trigger: currentSection,
        start: 'bottom bottom',
        end: 'top -=100px', // Extended even further for longer overlap
        scrub: 1.2, // Reduced for faster, more readable transitions
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Apply easing curves for smoother merging
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3); // Cubic ease-out
          const easeIn = (t: number) => t * t * t; // Cubic ease-in
          
          // Current section - warps out much more gradually
          const currentOpacity = easeOut(1 - progress * 0.5); // Much slower fade (0.5x speed)
          const currentScale = 1 + (easeOut(progress) * 0.04); // Even gentler scale
          // No blur - removed for clarity
          
          gsap.set(currentSection, {
            opacity: currentOpacity,
            scale: currentScale,
            filter: `blur(0px) brightness(${1 - progress * 0.3})`
          });

          if (currentBg) {
            gsap.set(currentBg, {
              scale: 1 + (easeOut(progress) * 0.08), // Even gentler background warp
              opacity: 1 - (progress * 0.3), // Much slower background fade
              filter: `blur(0px) brightness(${1 - progress * 0.25})`
            });
          }

          // Current content - fades out much more gradually
          currentContent.forEach((content, i) => {
            const delay = i * 0.01; // Even smaller delay
            const contentProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
            const easedProgress = easeOut(contentProgress * 0.6); // Much slower content fade
            
            gsap.set(content, {
              opacity: 1 - easedProgress,
              y: easedProgress * -6, // Even less movement
              scale: 1 - (easedProgress * 0.02) // Even gentler scale
            });
          });

          // Next section - warps in much more gradually
          const nextOpacity = easeIn(progress * 0.8); // Slower appearance for better overlap
          const nextScale = 0.98 + (easeIn(progress) * 0.015); // Even gentler scale
          // No blur - removed for clarity
          
          gsap.set(nextSection, {
            opacity: nextOpacity,
            scale: nextScale,
            filter: `blur(0px) brightness(${0.8 + progress * 0.2})`
          });

          if (nextBg) {
            gsap.set(nextBg, {
              scale: 1.03 - ((1 - easeIn(progress)) * 0.03), // Even gentler background scale
              opacity: progress * 0.4 + 0.6, // Starts even more visible
              filter: `blur(0px) brightness(${0.8 + progress * 0.2})`
            });
          }

          // Next content - fades in with much smoother timing
          nextContent.forEach((content, i) => {
            const delay = i * 0.015 + 0.03; // Even smaller delay
            const contentProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
            const easedProgress = easeIn(contentProgress * 0.7); // Slower content appearance
            
            gsap.set(content, {
              opacity: easedProgress,
              y: (1 - easedProgress) * 15, // Even less movement
              scale: 0.99 + (easedProgress * 0.01) // Even gentler scale
            });
          });
        },
        onEnter: () => {
          // Ensure proper z-index layering during transition
          const currentZ = parseInt(getComputedStyle(currentSection).zIndex) || 1;
          gsap.set(nextSection, { 
            zIndex: currentZ + 1,
            position: 'relative'
          });
        },
        onLeaveBack: () => {
          // Reset states when scrolling back up with smooth transition
          gsap.to(currentSection, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
            duration: 0.8,
            ease: 'power2.out',
            immediateRender: false
          });
          
          if (currentBg) {
            gsap.to(currentBg, {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px) brightness(1)',
              duration: 0.8,
              ease: 'power2.out',
              immediateRender: false
            });
          }
          
          gsap.to(currentContent, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.02,
            immediateRender: false
          });
        },
        onEnterBack: () => {
          // Ensure hero section (first section) is completely reset when scrolling back to it
          if (index === 0 && currentSection.id === 'hero') {
            gsap.set(currentSection, {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px) brightness(1)'
            });
            
            if (currentBg) {
              gsap.set(currentBg, {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px) brightness(1)'
              });
            }
            
            currentContent.forEach(content => {
              gsap.set(content, {
                opacity: 1,
                y: 0,
                scale: 1
              });
            });
          }
        }
      });
    });
  };

  return null; // This component doesn't render anything
};

export default WarpSectionTransition;
