import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CinematicScroll = () => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    const sections = sectionsRef.current;

    if (!bgVideo || !overlayCanvas || !sections) return;

    // Initialize canvas for particle overlay
    const ctx = overlayCanvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = overlayCanvas.getBoundingClientRect();
      overlayCanvas.width = rect.width;
      overlayCanvas.height = rect.height;
    };

    // Particle system for fog effect
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
    }> = [];

    const createParticle = () => {
      particles.push({
        x: Math.random() * overlayCanvas.width,
        y: Math.random() * overlayCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        life: 1
      });
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.005;
        particle.opacity = particle.life * 0.3;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      // Add new particles occasionally
      if (Math.random() < 0.1) {
        createParticle();
      }

      requestAnimationFrame(animateParticles);
    };

    // Initialize canvas and particles
    resizeCanvas();
    animateParticles();

    // GSAP ScrollTrigger setup
    const sectionElements = gsap.utils.toArray('.cinematic-section');

    sectionElements.forEach((section: any, i: number) => {
      const next = sectionElements[i + 1];
      if (!next) return;

      // Timeline for each transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      // Outgoing section fades and pushes back
      tl.to(section, {
        opacity: 0,
        z: -150,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0);

      // Incoming section fades and pulls forward
      tl.from(next, {
        opacity: 0,
        z: 150,
        scale: 1.05,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0);

      // Background video visual tone shift
      const hueShift = i * 40;
      const brightnessShift = 1 - i * 0.05;
      const contrastShift = 1 + i * 0.1;
      
      tl.to(bgVideo, {
        filter: `hue-rotate(${hueShift}deg) brightness(${brightnessShift}) contrast(${contrastShift})`,
        duration: 1.5,
        ease: "power3.inOut",
      }, 0);

      // Particle overlay opacity modulation
      tl.to(overlayCanvas, {
        opacity: 0.3 + (i * 0.1),
        duration: 1.5,
        ease: "power3.inOut",
      }, 0);
    });

    // Mobile optimization
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Reduce brightness shifts on mobile
      gsap.set(bgVideo, {
        filter: "brightness(0.8) contrast(1.1)"
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="cinematic-scroll-container">
      {/* Fixed Background Video */}
      <video
        ref={bgVideoRef}
        id="bgVideo"
        autoPlay
        muted
        loop
        playsInline
        className="cinematic-bg-video"
      >
        <source src="https://maximages.s3.us-west-1.amazonaws.com/Intro+Background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Particle Overlay Canvas */}
      <canvas
        ref={overlayCanvasRef}
        id="overlayParticles"
        className="cinematic-particle-overlay"
      />

      {/* Scrollable Sections Container */}
      <div ref={sectionsRef} className="cinematic-sections">
        {/* Hero Section */}
        <section className="cinematic-section" id="hero-section">
          <div className="cinematic-content">
            <h1 className="cinematic-title">GLOBAL TRUST CHALLENGE</h1>
            <p className="cinematic-subtitle">Building Trust in the Age of Generative AI</p>
            <div className="cinematic-cta">
              <button className="cinematic-button primary">Learn More</button>
              <button className="cinematic-button secondary">Get Involved</button>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="cinematic-section" id="trust-section">
          <div className="cinematic-content">
            <h2 className="cinematic-title">The Future Runs on Trust</h2>
            <p className="cinematic-description">
              In an era where AI-generated content blurs the line between reality and fabrication, 
              trust becomes the foundation of our digital future. We're building a coalition of 
              changemakers to preserve trust in our increasingly connected world.
            </p>
          </div>
        </section>

        {/* Unique Section */}
        <section className="cinematic-section" id="unique-section">
          <div className="cinematic-content">
            <h2 className="cinematic-title">What Makes This Challenge Unique</h2>
            <div className="cinematic-features">
              <div className="cinematic-feature">
                <h3>Global Coalition</h3>
                <p>Uniting organizations worldwide to tackle trust challenges together</p>
              </div>
              <div className="cinematic-feature">
                <h3>Real-World Impact</h3>
                <p>Solutions that address actual problems in our digital ecosystem</p>
              </div>
              <div className="cinematic-feature">
                <h3>Innovation Focus</h3>
                <p>Pushing the boundaries of what's possible in trust technology</p>
              </div>
            </div>
          </div>
        </section>

        {/* Phases Section */}
        <section className="cinematic-section" id="phases-section">
          <div className="cinematic-content">
            <h2 className="cinematic-title">The Challenge Phases</h2>
            <div className="cinematic-timeline">
              <div className="cinematic-phase">
                <h3>Phase 1: Discovery</h3>
                <p>Understanding the landscape of trust challenges</p>
              </div>
              <div className="cinematic-phase">
                <h3>Phase 2: Innovation</h3>
                <p>Developing breakthrough solutions</p>
              </div>
              <div className="cinematic-phase">
                <h3>Phase 3: Implementation</h3>
                <p>Bringing solutions to life</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="cinematic-section" id="partners-section">
          <div className="cinematic-content">
            <h2 className="cinematic-title">Our Partners</h2>
            <p className="cinematic-description">
              Join leading organizations in building a more trustworthy digital future
            </p>
            <div className="cinematic-partners">
              <div className="cinematic-partner">UNESCO</div>
              <div className="cinematic-partner">OECD AI</div>
              <div className="cinematic-partner">IEEE</div>
              <div className="cinematic-partner">AWS</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CinematicScroll;

