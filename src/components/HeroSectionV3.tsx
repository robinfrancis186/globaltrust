import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ImmersiveBackground from './ImmersiveBackground';
import { throttle } from '../utils/throttle';

// Floating particles component with enhanced atmospheric effects
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 15,
    duration: Math.random() * 20 + 20,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full shadow-lg"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(255,200,120,0.8) 0%, rgba(0,200,255,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 10px rgba(255,200,120,0.5)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced video background with cinematic pan/zoom
const VideoBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer to pause video when off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Ignore autoplay errors
            });
          } else {
            video.pause(); // Pause when not visible
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="video-bg-wrapper absolute inset-0 z-0"
      style={{ y, scale }}
    >
      <video
        ref={videoRef}
        className="bg-video absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'translateX(-50px)' }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Animated globe background"
      >
        <source src="https://maximages.s3.us-west-1.amazonaws.com/Globe+Animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

// Multi-layered overlay with vibrant video visibility
const OverlayLayers = () => {
  return (
    <div className="absolute inset-0 z-10">
      {/* Lighter primary gradient overlay for better video visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000010]/50 via-[#000020]/40 to-[#000030]/60" />
      
      {/* Subtle atmospheric depth layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#000015]/30 via-transparent to-[#000025]/30" />
      
      {/* Animated radial gold glow behind text */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 70%, rgba(255,200,120,0.15), rgba(255,180,80,0.08) 40%, transparent 70%)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional atmospheric layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(0,200,255,0.08), rgba(0,174,239,0.05) 50%, transparent 70%)',
        }}
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Lighter vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
      
      {/* Minimal edge lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000030]/20" />
    </div>
  );
};

// Lens flare effect
const LensFlare = () => {
  return (
    <motion.div
      className="absolute top-1/4 right-1/4 w-32 h-32 z-20 pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(255,200,120,0.3) 0%, rgba(255,200,120,0.1) 30%, transparent 70%)',
        borderRadius: '50%',
        filter: 'none',
      }}
      animate={{
        x: [0, 50, 0],
        y: [0, -30, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Enhanced content component with cinematic effects
const Content = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.4,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const handleJoinChallenge = () => {
    const element = document.getElementById('pre-registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePartnerWithUs = () => {
    window.location.href = '/partners';
  };

  return (
    <motion.div
      className="relative z-20 max-w-6xl mx-auto px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle Background Enhancement Layers */}
      <div className="relative flex justify-center items-center -z-10 mb-8">
        {/* Light Atmospheric Glow */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,174,239,0.12)_0%,rgba(0,120,200,0.08)_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] opacity-50" />
        </div>
        
        {/* Minimal Depth Layer */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,200,120,0.06)_0%,rgba(0,174,239,0.04)_40%,transparent_70%)] opacity-30" />
        </div>
      </div>

      <motion.h1
        className="relative z-20 text-white font-black text-6xl md:text-7xl lg:text-8xl text-center leading-[0.95] uppercase tracking-wide"
        style={{ 
          fontFamily: '"Barlow Condensed", serif',
          textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,174,239,0.4)',
          marginLeft: '50px',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <span className="relative inline-block">
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            GLOBAL TRUST
          </span>
          <br />
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">CHALLENGE</span>
          
          {/* Balanced Underline Accent */}
          <motion.div 
            className="h-[3px] w-[150px] bg-gradient-to-r from-[#00AEEF]/90 via-[#FFD97A]/70 to-transparent mx-auto mt-3 rounded-full shadow-[0_0_15px_rgba(0,174,239,0.5)]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.9, scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.0 }}
          />
          
          {/* Balanced Ambient Reflection */}
          <div className="absolute top-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 w-[75%] h-[55px] bg-gradient-to-b from-white/20 via-white/10 to-transparent opacity-60 rounded-full" />
        </span>
      </motion.h1>

      {/* Professional subheadline */}
      <motion.p
        className="text-2xl md:text-3xl font-medium mt-6 text-white text-center"
        style={{ 
          fontFamily: '"Inter", sans-serif',
          textShadow: '0 2px 4px rgba(0,0,0,0.9)',
          marginLeft: '50px',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        Building Trustworthy Digital and Information Ecosystems
        <br />
        For Future Generations
      </motion.p>

      {/* Description */}
      <motion.p
        className="relative max-w-3xl mx-auto mt-12 text-lg leading-relaxed text-white text-center px-8 py-6 bg-gradient-to-r from-[#000000]/60 via-[#000010]/40 to-[#000000]/60 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
      >
        A worldwide innovation challenge uniting technologists, policymakers, and organizations to secure information integrity in an era of AI-generated content.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      >
        {/* Primary CTA */}
        <motion.button
          onClick={handleJoinChallenge}
          className="bg-[#00AEEF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0088CC] transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center">
            Join the Challenge
            <ArrowRight className="ml-2" size={20} />
          </span>
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          onClick={handlePartnerWithUs}
          className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Partner with Us
          <ArrowRight className="ml-2 inline" size={20} />
        </motion.button>
      </motion.div>

      {/* Partner Logos with enhanced styling */}
      <motion.div
        className="mt-10"
        variants={itemVariants}
        custom={4}
      >
        <motion.p
          className="text-gray-300 text-sm font-medium mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Led by a coalition of global partners
        </motion.p>
        
        <div className="mt-10 flex flex-wrap justify-center items-center gap-10 bg-white/25 rounded-2xl px-8 py-5 shadow-[0_0_40px_rgba(0,180,255,0.2)] border border-white/30">
          {[
            { src: 'https://maximages.s3.us-west-1.amazonaws.com/IEEE_SA-logo-avatar.png', alt: 'IEEE SA', size: 'h-14 md:h-16' },
            { src: 'https://maximages.s3.us-west-1.amazonaws.com/OECD+AI+logo.jpeg', alt: 'OECD AI', size: 'h-12 md:h-14' },
            { src: 'https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg', alt: 'AI Commons', size: 'h-12 md:h-14' },
          ].map((logo, i) => (
            <motion.img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.size} object-contain opacity-100 hover:opacity-100 hover:scale-105 transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(0,180,255,0.8)] hover:shadow-[0_0_25px_rgba(0,180,255,0.6)] brightness-110 contrast-110`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
              style={{
                filter: 'brightness(1.1) contrast(1.1)',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced scroll indicator
const ScrollIndicator = () => {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4, duration: 0.8 }}
    >
      <motion.button
        onClick={handleScrollDown}
        className="text-[#FFD97A] hover:text-white transition-colors duration-300"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </motion.div>
  );
};

// Main HeroSectionV3 component
const HeroSectionV3 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      {/* Embedded CSS animations */}
      <style jsx>{`
        @keyframes lightSweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes buttonShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes pulseLight {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.4; }
        }
        
        .btn-shine {
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% auto;
          animation: buttonShine 4s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .btn-shine {
            animation: none;
          }
        }
      `}</style>

      <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden z-10">
        {/* Background */}
        <VideoBackground />
        
        {/* Gradient Overlay */}
        <div className="gradient-overlay absolute inset-0 z-1 bg-gradient-to-b from-[#000010]/50 via-[#000020]/40 to-[#000030]/60" />
        
        {/* Overlay Layers */}
        <OverlayLayers />
        
        {/* Ambient gradient overlay for cinematic warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD97A]/8 via-transparent to-[#00AEEF]/5 pointer-events-none z-15" />
        
        {/* Content */}
        <Content />
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>
    </>
  );
};

export default HeroSectionV3;
