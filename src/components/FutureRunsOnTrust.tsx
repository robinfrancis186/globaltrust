import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FutureRunsOnTrust = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; alpha: number; velocity: number; lastX: number; lastY: number }>>([]);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set());
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Paragraph content for animation
  const paragraphs = [
    "AI is reshaping how we learn, heal, and innovate. This transformation holds extraordinary promise — but it depends on one essential ingredient: trust.",
    "That's what the Global Trust Challenge (GTC) was created to enable. Born from a G7 call to action, it serves as a global rallying cry to preserve trust in the digital age. The GTC is led by a coalition of changemakers - including IEEE, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation.",
    "We're inviting technologists, policymakers, and innovators worldwide to co-create solutions that make digital environments more transparent, reliable, and empowering for everyone. Together, we're laying the foundations of digital trust - for future generations, for industry, and for society at large."
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  // Floating glow node animation
  useEffect(() => {
    const node = document.querySelector('.floating-node') as HTMLElement;
    if (!node) return;

    const animation = node.animate(
      [
        { transform: "translateX(-10%)", opacity: 0.3 },
        { transform: "translateX(110%)", opacity: 0.6 },
      ],
      { 
        duration: 15000, 
        iterations: Infinity, 
        direction: "alternate", 
        easing: "ease-in-out" 
      }
    );

    return () => {
      animation.cancel();
    };
  }, []);

  // Particle interaction with cursor movement
  useEffect(() => {
    const video = document.querySelector('#backgroundVideo') as HTMLVideoElement;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      video.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive word component with proximity-based highlighting
  const InteractiveWord = ({ 
    children, 
    wordKey, 
    color = '#00AEEF', 
    className = '' 
  }: { 
    children: string; 
    wordKey: string; 
    color?: string; 
    className?: string; 
  }) => {
    const isHighlighted = highlightedWords.has(wordKey);
    
    return (
      <span
        data-highlight-word={wordKey}
        className={`transition-all duration-500 ease-out ${className}`}
        style={{
          textShadow: isHighlighted 
            ? `0 0 12px ${color}30, 0 0 24px ${color}15` 
            : 'none',
          color: isHighlighted ? color : 'inherit',
          filter: isHighlighted ? 'brightness(1.1)' : 'brightness(1)',
        }}
      >
        {children}
      </span>
    );
  };

  // Interactive text highlighting based on cursor proximity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Find all highlightable words and check proximity
      const words = document.querySelectorAll('[data-highlight-word]');
      const newHighlightedWords = new Set<string>();
      
      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const wordCenterX = rect.left + rect.width / 2;
        const wordCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - wordCenterX, 2) + Math.pow(e.clientY - wordCenterY, 2)
        );
        
        // Highlight if within 100px
        if (distance < 100) {
          const wordText = word.getAttribute('data-highlight-word');
          if (wordText) {
            newHighlightedWords.add(wordText);
          }
        }
      });
      
      setHighlightedWords(newHighlightedWords);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas ripple effect with horizontal flow alignment
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const addRipple = (x: number, y: number, velocity: number) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        alpha: Math.min(0.15, velocity * 0.05 + 0.08),
        velocity,
        lastX: x,
        lastY: y,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ripplesRef.current.forEach((ripple, i) => {
        // Expand ripple with more gentle, flowy movement
        ripple.radius += 2 + ripple.velocity * 0.3;
        ripple.alpha -= 0.003;

        // Create horizontal gradient that follows particle flow
        const horizontalStretch = 2.2 + ripple.velocity * 0.4;
        const gradient = ctx.createLinearGradient(
          ripple.x - ripple.radius * horizontalStretch,
          ripple.y,
          ripple.x + ripple.radius * horizontalStretch,
          ripple.y
        );

        // Background-matching gradient: cosmic slate to golden veil hues
        const slateIntensity = Math.min(1, ripple.velocity * 0.1 + 0.3);
        gradient.addColorStop(0, `rgba(0,174,239,${ripple.alpha * 0.8})`); // Turquoise
        gradient.addColorStop(0.3, `rgba(0,174,239,${ripple.alpha * 0.6})`); // Turquoise fade
        gradient.addColorStop(0.7, `rgba(255,217,120,${ripple.alpha * 0.5})`); // Gold
        gradient.addColorStop(1, `rgba(0,174,239,0)`); // Transparent

        // Draw elongated ellipse following horizontal flow
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = gradient;
        
        // Create horizontal ellipse
        ctx.translate(ripple.x, ripple.y);
        ctx.scale(horizontalStretch, 1);
        ctx.arc(0, 0, ripple.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove expired ripples
        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate velocity for dynamic ripple behavior
      const dx = x - lastMouseRef.current.x;
      const dy = y - lastMouseRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy) / 10; // Scale down for reasonable values
      
      // Only add ripple if mouse moved significantly
      if (velocity > 0.5) {
        addRipple(x, y, velocity);
      }
      
      lastMouseRef.current = { x, y };
    };

    // Initialize
    resize();
    animate();

    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <style jsx>{`
        :root {
          --turquoise-glow: #00AEEF;
          --gold-glow: #FFD97A;
          --pulse-opacity: 0.15;
        }
        
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.12; }
        }
        
        .ambient-pulse {
          animation: ambientPulse 10s ease-in-out infinite;
        }
        
        .floating-node {
          position: absolute;
          bottom: 20%;
          left: -10%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,217,120,0.6) 0%, rgba(255,217,120,0) 70%);
          filter: blur(12px);
          pointer-events: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 2s ease-in-out infinite alternate;
        }
        
        @keyframes trustPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0,174,239,0.1), 0 0 40px rgba(0,174,239,0.05); 
          }
          50% { 
            box-shadow: 0 0 60px rgba(255,217,120,0.25), 0 0 80px rgba(255,217,120,0.15); 
          }
        }
        
        @keyframes ambientPulse {
          0%, 100% { 
            opacity: 0.3;
            background: radial-gradient(circle, rgba(0,174,239,0.08) 0%, rgba(0,174,239,0.02) 50%, transparent 70%);
          }
          50% { 
            opacity: 0.6;
            background: radial-gradient(circle, rgba(255,217,120,0.12) 0%, rgba(255,217,120,0.04) 50%, transparent 70%);
          }
        }
        
        .textContainer {
          animation: trustPulse 12s ease-in-out infinite;
          transition: box-shadow 0.3s ease;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
        }
        
        .ambientPulse {
          animation: ambientPulse 10s ease-in-out infinite;
        }
        
        @keyframes progressGlow {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .progressGlow {
          animation: progressGlow 2s ease-out forwards;
        }
      `}</style>
      <section id="trust" className="min-h-[90vh] bg-gradient-to-b from-[#2C3E50] via-[#4A6741] to-[#F4E4BC] relative z-10 overflow-hidden flex items-center justify-center">
      {/* Ambient Background Video */}
      <div className="video-bg-wrapper absolute inset-0 z-0">
        <video
          id="backgroundVideo"
          className="bg-video absolute inset-0 w-full h-full object-cover"
          src="https://maximages.s3.us-west-1.amazonaws.com/Intro+Background.mp4"
          autoPlay
          muted
          playsInline
          loop
          style={{
            mixBlendMode: 'screen',
            filter: 'blur(0.5px)',
          }}
          aria-label="Ambient background animation"
        >
          <source src="https://maximages.s3.us-west-1.amazonaws.com/Intro+Background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay absolute inset-0 z-1 bg-gradient-to-b from-[#2C3E50]/20 via-[#4A6741]/10 to-[#F4E4BC]/30" />
      
      {/* Ambient breathing pulse overlay */}
      <div 
        className="absolute inset-0 ambient-pulse z-1"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,174,239,0.04) 0%, rgba(255,217,122,0.02) 50%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Depth Fog - Atmospheric Perspective */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10222E]/40 to-[#EBD89A]/60 mix-blend-soft-light pointer-events-none z-1" />
      
      {/* Digital Haze - Middle Section Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00AEEF]/5 to-transparent mix-blend-overlay pointer-events-none z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD97A]/3 to-transparent mix-blend-overlay pointer-events-none z-1" />

      {/* Canvas Ripple Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.4,
          }}
        />
      </div>

      {/* Floating Glow Node */}
      <div className="floating-node" />


      <motion.div
        className="max-w-3xl mx-auto px-8 py-12 relative z-30 textContainer"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          y, // Apply parallax drift
          transform: 'translateZ(0)', // Enable hardware acceleration for parallax
        }}
      >
        {/* Enhanced Header with Scroll Progress Glow */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg text-center mb-12"
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,174,239,0.4)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="relative inline-block">
            The Future Runs on Trust
            {/* Scroll Progress Glow Line */}
            <motion.div
              className="h-[3px] bg-gradient-to-r from-[#00AEEF] via-[#FFD97A] to-[#00AEEF] mx-auto mt-4 rounded-full progressGlow"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
            {/* Soft Golden Ambient Ring */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,217,120,0.1) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
            />
          </span>
        </motion.h2>

        {/* Enhanced Paragraphs with Staggered Animation */}
        <div className="space-y-8 text-center max-w-3xl mx-auto px-6">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg md:text-xl text-gray-100 leading-relaxed"
              style={{
                transform: 'translateZ(0)', // Parallax effect
                fontFamily: '"Inter", sans-serif',
                fontWeight: '500',
              }}
            >
              {i === 0 && (
                <>
                  AI is reshaping how we learn, heal, and <InteractiveWord wordKey="innovation" color="#00AEEF" className="font-semibold">innovate</InteractiveWord>. This transformation holds extraordinary promise — but it depends on one essential ingredient: <InteractiveWord wordKey="trust" color="#00AEEF" className="font-semibold">trust</InteractiveWord>.
                </>
              )}
              {i === 1 && (
                <>
                  That's what the <InteractiveWord wordKey="gtc" color="#00AEEF" className="font-semibold">Global Trust Challenge (GTC)</InteractiveWord> was created to enable. Born from a G7 call to action, it serves as a global rallying cry to preserve trust in the digital age. The GTC is led by a <InteractiveWord wordKey="coalition" color="#FFD97A" className="font-semibold">coalition of changemakers</InteractiveWord> - including IEEE, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation.
                </>
              )}
              {i === 2 && (
                <>
                  We're inviting <InteractiveWord wordKey="technologists" color="#FFD97A" className="font-semibold">technologists</InteractiveWord>, <InteractiveWord wordKey="policymakers" color="#FFD97A" className="font-semibold">policymakers</InteractiveWord>, and <InteractiveWord wordKey="innovators" color="#FFD97A" className="font-semibold">innovators</InteractiveWord> worldwide to co-create solutions that make digital environments more transparent, reliable, and empowering for everyone. Together, we're laying the foundations of <InteractiveWord wordKey="digital-trust" color="#00AEEF" className="font-semibold">digital trust</InteractiveWord> - for future generations, for industry, and for society at large.
                </>
              )}
            </motion.p>
          ))}
        </div>

      </motion.div>

      {/* Soft Motion Transition at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F5E2A1]/40 to-transparent animate-fadeIn pointer-events-none" />
    </section>
    </>
  );
};

export default FutureRunsOnTrust;
