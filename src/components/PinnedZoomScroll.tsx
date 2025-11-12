import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinnedZoomScroll: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgVideo = videoRef.current;
    const container = containerRef.current;
    if (!bgVideo || !container) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>('.section'));

    // Ensure starting styles
    gsap.set(bgVideo, { scale: 1, filter: 'brightness(1) contrast(1)', transformOrigin: 'center center' });

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom+=100% top',
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          gsap.to(bgVideo, {
            scale: 1 + i * 0.08, // subtle depth; adjust as needed
            filter: `brightness(${Math.max(0.6, 1 - i * 0.08)}) saturate(${Math.max(0.7, 1 - i * 0.12)})`,
            duration: 1.2,
            ease: 'power3.inOut'
          });
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 0,
            z: -150,
            scale: 0.96,
            duration: 1.0,
            ease: 'power3.out'
          });
        },
        onEnterBack: () => {
          const prevIndex = i - 1;
          gsap.to(bgVideo, {
            scale: 1 + Math.max(0, prevIndex) * 0.08,
            filter: `brightness(${Math.max(0.6, 1 - Math.max(0, prevIndex) * 0.08)}) saturate(${Math.max(0.7, 1 - Math.max(0, prevIndex) * 0.12)})`,
            duration: 1.0,
            ease: 'power3.inOut'
          });
          gsap.to(section, { opacity: 1, z: 0, scale: 1, duration: 0.6, ease: 'power3.inOut' });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="pinned-zoom-container" ref={containerRef}>
      <video
        id="bgVideo"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="pinned-zoom-video"
      >
        <source src="https://maximages.s3.us-west-1.amazonaws.com/Intro+Background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <section className="section" id="hero">
        <div className="pz-content">
          <h1 className="pz-title">GLOBAL TRUST CHALLENGE</h1>
          <p className="pz-sub">Building Trustworthy Digital and Information Ecosystems for Future Generations</p>
        </div>
      </section>

      <section className="section" id="unique-challenge">
        <div className="pz-content">
          <h2 className="pz-title">The Unique Challenge</h2>
          <p className="pz-desc">Coalitions, standards, and technology aligned to preserve trust.</p>
        </div>
      </section>

      <section className="section" id="what-we-provide">
        <div className="pz-content">
          <h2 className="pz-title">What We Provide</h2>
          <p className="pz-desc">A platform for real-world impact, pilots, and scalable solutions.</p>
        </div>
      </section>
    </div>
  );
};

export default PinnedZoomScroll;







