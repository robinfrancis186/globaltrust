import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
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

// Video background component with parallax
const VideoBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ y }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Animated globe background"
      >
        <source src="https://maximages.s3.us-west-1.amazonaws.com/Globe+Animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

// Dynamic gradient overlay with breathing light effect
const OverlayGradient = () => {
  return (
    <div className="absolute inset-0 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000014]/80 via-[#000020]/70 to-[#000030]/60" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-blue-500/10 to-purple-500/5"
        animate={{
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Content component with Framer Motion animations
const Content = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.3,
        duration: 0.6,
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
      {/* Headline */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-[0_0_10px_rgba(0,150,255,0.4)]"
        style={{ fontFamily: '"Barlow Condensed", serif' }}
        variants={itemVariants}
        custom={0}
      >
        GLOBAL TRUST CHALLENGE
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        className="text-2xl md:text-3xl text-[#E8C96A] mt-3 drop-shadow-[0_0_6px_rgba(232,201,106,0.4)]"
        style={{ fontFamily: '"Inter", sans-serif' }}
        variants={itemVariants}
        custom={1}
      >
        Building Trust in the Age of Generative AI
      </motion.p>

      {/* Description */}
      <motion.div
        className="max-w-2xl mx-auto mt-4 text-gray-100/90 text-lg leading-relaxed backdrop-blur-sm bg-black/20 rounded-xl px-6 py-4"
        variants={itemVariants}
        custom={2}
      >
        A worldwide innovation challenge uniting technologists, policymakers, and organizations to secure information integrity in an era of AI-generated content.
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        variants={itemVariants}
        custom={3}
      >
        {/* Primary CTA */}
        <motion.button
          onClick={handleJoinChallenge}
          className="group relative bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center">
            Join the Challenge
            <ArrowRight className="ml-2" size={20} />
          </span>
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeInOut",
            }}
          />
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          onClick={handlePartnerWithUs}
          className="border border-[#E8C96A] text-[#E8C96A] px-8 py-3 rounded-lg font-semibold hover:bg-[#E8C96A]/10 hover:shadow-[0_0_15px_rgba(232,201,106,0.3)] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Partner with Us
          <ArrowRight className="ml-2 inline" size={20} />
        </motion.button>
      </motion.div>

      {/* Partner Logos */}
      <motion.div
        className="mt-10"
        variants={itemVariants}
        custom={4}
      >
        <motion.p
          className="text-gray-300 text-sm font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
        >
          Led by a coalition of global partners
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 backdrop-blur-md bg-black/40 rounded-xl px-6 py-4 shadow-inner border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          {[
            { name: 'IEEE SA', logo: 'https://maximages.s3.us-west-1.amazonaws.com/IEEE_SA-logo-avatar.png' },
            { name: 'OECD', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/OECD_logo.svg/320px-OECD_logo.svg.png' },
            { name: 'AI Commons', logo: 'https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg' },
          ].map((partner, index) => (
            <motion.div
              key={partner.name}
              className="h-12 w-24 flex items-center justify-center bg-white/10 rounded-lg p-2 hover:bg-white/20 hover:brightness-125 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 2.7 + index * 0.2,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Scroll indicator component
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
      transition={{ delay: 3, duration: 0.6 }}
    >
      <motion.button
        onClick={handleScrollDown}
        className="text-white/70 hover:text-white transition-colors duration-300"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </motion.div>
  );
};

// Main HeroSection component
const HeroSection = () => {
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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background */}
      <VideoBackground />
      
      {/* Overlay */}
      <OverlayGradient />
      
      {/* Floating Particles - only show if motion is not reduced */}
      {!isReducedMotion && <FloatingParticles />}
      
      {/* Content */}
      <Content />
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
