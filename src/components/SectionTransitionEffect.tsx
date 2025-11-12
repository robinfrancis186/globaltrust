import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionEffectProps {
  triggerSection: string;
  nextSection: string;
  transitionId: string;
}

const SectionTransitionEffect: React.FC<SectionTransitionEffectProps> = ({
  triggerSection,
  nextSection,
  transitionId
}) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const rectanglesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!transitionRef.current) return;

    const rectangles = rectanglesRef.current.filter(Boolean);
    if (rectangles.length === 0) return;

    // Different heights for each rectangle to create organic effect
    const heights = [120, 200, 160, 240, 180, 220, 140, 200];
    
    // Create timeline for smooth transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${triggerSection}`,
        start: 'bottom bottom',
        end: 'bottom +=200',
        scrub: 1,
        onEnter: () => {
          // Ensure next section is ready
          const nextSectionEl = document.querySelector(`.${nextSection}`);
          if (nextSectionEl) {
            gsap.set(nextSectionEl, { zIndex: 2 });
          }
        }
      }
    });

    // Animate each rectangle with different timing
    rectangles.forEach((rect, index) => {
      const height = heights[index % heights.length];
      const delay = index * 0.05; // Stagger the animations
      
      tl.to(rect, {
        height: `${height}px`,
        duration: 0.8,
        ease: 'power2.out',
        delay: delay
      }, 0);
    });

    // Fade out trigger section
    tl.to(`.${triggerSection}`, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.2);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === document.querySelector(`.${triggerSection}`)) {
          trigger.kill();
        }
      });
    };
  }, [triggerSection, nextSection]);

  return (
    <div 
      ref={transitionRef}
      className={`section-transition-${transitionId} absolute w-full left-0 bottom-full z-10`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        height: 'auto',
        alignItems: 'end'
      }}
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) rectanglesRef.current[index] = el;
          }}
          className={`transition-rect-${index}`}
          style={{
            height: '0px',
            background: 'linear-gradient(135deg, #00AEEF 0%, #FFD97A 50%, #53BC28 100%)',
            opacity: 0.9,
            transformOrigin: 'bottom',
            willChange: 'height'
          }}
        />
      ))}
    </div>
  );
};

export default SectionTransitionEffect;








