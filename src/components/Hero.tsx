import React, { useEffect, useState, useRef, memo } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const VideoBackground = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -100]);
    const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    // Lazy-load del video: solo asigna el src cuando el componente entra al viewport
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {

                        // Cargar el src SOLO cuando es visible
                        if (!videoSrc) {
                            setVideoSrc(
                                "https://maximages.s3.us-west-1.amazonaws.com/Globe+Animation.mp4"
                            );
                        }

                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [videoSrc]);

    return (
        <motion.div
            className="video-bg-wrapper absolute inset-0 z-0"
            style={{ y, scale }}
        >
            <video
                ref={videoRef}
                className="bg-video absolute inset-0 w-full h-full object-cover"
                style={{ transform: "translateX(-50px)" }}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                aria-label="Animated globe background"
            >
                {videoSrc && (
                    <source src={videoSrc} type="video/mp4" />
                )}
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

// Enhanced content component with cinematic effects
const Content = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0,
                delayChildren: 0,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 1, y: 0 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0,
                duration: 0,
                ease: "easeOut",
            },
        }),
    };

    const smoothScrollTo = (targetElement: HTMLElement, duration: number = 600) => {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const handleJoinChallenge = () => {
        const element = document.getElementById('pre-registration');
        if (element) {
            smoothScrollTo(element, 600);
        }
    };

    const handlePartnerWithUs = () => {
        window.location.href = '/partners';
    };

    return (
        <motion.div
            className="relative z-20 max-w-6xl mx-auto px-6"
            variants={containerVariants}
            initial="visible"
            animate="visible"
            style={{ willChange: 'auto' }}
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

            <h1
                className="relative z-20 text-white font-black text-5xl md:text-7xl lg:text-8xl text-center leading-[0.9] uppercase tracking-widest"
                style={{
                    fontFamily: '"Barlow Condensed", serif',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 40px rgba(0,174,239,0.3)',
                    marginLeft: '0', // Removed left margin for perfect centering
                    willChange: 'auto',
                }}
            >
                <span className="relative inline-block">
                    <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                        GLOBAL TRUST
                    </span>
                    <br />
                    <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">CHALLENGE</span>

                    {/* Balanced Underline Accent */}
                    <div
                        className="h-[4px] w-[120px] bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(0,174,239,0.8)]"
                    />
                </span>
            </h1>

            {/* Professional subheadline */}
            <p
                className="text-xl md:text-2xl font-light mt-8 text-white/90 text-center tracking-wide max-w-2xl mx-auto"
                style={{
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    willChange: 'auto',
                }}
            >
                Building Trustworthy Digital and Information Ecosystems
                <span className="block mt-1 text-white/70">For Future Generations</span>
            </p>

            {/* Description with Glassmorphism */}
            <div
                className="relative max-w-3xl mx-auto mt-12 px-8 py-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    willChange: 'auto'
                }}
            >
                <p className="text-lg md:text-xl leading-relaxed text-white/90 text-center font-light">
                    A worldwide innovation challenge uniting technologists, policymakers, and organizations to secure information integrity in an era of AI-generated content.
                </p>
            </div>

            {/* CTA buttons */}
            <div
                className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
                style={{ willChange: 'auto' }}
            >
                {/* Primary CTA */}
                <motion.button
                    onClick={handleJoinChallenge}
                    className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,174,239,0.6)]"
                    style={{
                        background: 'linear-gradient(90deg, #00AEEF 0%, #0077CC 100%)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative flex items-center tracking-wide">
                        JOIN THE CHALLENGE
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                    onClick={handlePartnerWithUs}
                    className="group px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="flex items-center tracking-wide">
                        PARTNER WITH US
                        <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" size={20} />
                    </span>
                </motion.button>
            </div>

            {/* Partner Logos with Glassmorphism */}
            <motion.div
                className="mt-16"
                variants={itemVariants}
                custom={4}
            >
                <p className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                    Led by a coalition of global partners
                </p>

                <div
                    className="inline-flex flex-wrap justify-center items-center gap-12 px-10 py-6 rounded-2xl border border-white/10 backdrop-blur-md"
                    style={{
                        background: 'rgba(255, 255, 255, 0.15)', // Increased opacity for visibility
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {[
                        { src: 'https://maximages.s3.us-west-1.amazonaws.com/IEEE_SA-logo-avatar.png', alt: 'IEEE SA', size: 'h-12 md:h-14' },
                        { src: 'https://maximages.s3.us-west-1.amazonaws.com/OECD+AI+logo.jpeg', alt: 'OECD AI', size: 'h-10 md:h-12' },
                        { src: 'https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg', alt: 'AI Commons', size: 'h-10 md:h-12' },
                    ].map((logo, i) => (
                        <img
                            key={i}
                            src={logo.src}
                            alt={logo.alt}
                            className={`${logo.size} object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105 drop-shadow-sm`} // Removed grayscale, increased opacity
                            loading="lazy"
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Main Hero component (memoized for performance)
const Hero = memo(() => {
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const heroSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Ensure hero section never gets blurred when scrolling back to it
    useEffect(() => {
        const heroSection = heroSectionRef.current || document.getElementById('hero');
        if (!heroSection) return;

        // Intersection Observer to ensure hero section stays clear when in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        // Hero section is prominently in view - ensure no blur
                        const heroContent = Array.from(entry.target.querySelectorAll('h1, h2, h3, p, button, a, .relative')) as HTMLElement[];
                        heroContent.forEach((content) => {
                            content.style.filter = 'none';
                            content.style.opacity = '1';
                            content.style.transform = 'translateZ(0)';
                        });

                        // Ensure section itself has no blur
                        (entry.target as HTMLElement).style.filter = 'blur(0px) brightness(1)';
                    }
                });
            },
            { threshold: [0, 0.5, 1] }
        );

        observer.observe(heroSection);

        // Throttled scroll handler using requestAnimationFrame for better performance
        let rafId: number | null = null;
        let lastScrollTime = 0;
        const SCROLL_THROTTLE_MS = 16; // ~60fps

        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime < SCROLL_THROTTLE_MS) {
                return;
            }
            lastScrollTime = now;

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                const rect = heroSection.getBoundingClientRect();
                const isHeroInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.3;

                if (isHeroInView) {
                    // Cache DOM query result
                    const heroContent = Array.from(heroSection.querySelectorAll('h1, h2, h3, p, button, a, .relative')) as HTMLElement[];
                    heroContent.forEach((content) => {
                        content.style.filter = 'none';
                        content.style.opacity = '1';
                    });
                    heroSection.style.filter = 'blur(0px) brightness(1)';
                }
                rafId = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, []);

    return (
        <>
            {/* Embedded CSS animations */}
            <style>{`
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
        
        /* Ensure crisp text rendering */
        #hero h1,
        #hero p {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: auto;
        }
        
        /* Prevent text blur during load and scroll - ensure text is always sharp */
        #hero h1,
        #hero h1 *,
        #hero p,
        #hero button,
        #hero a,
        #hero .relative {
          filter: none !important;
        }
        
        /* Ensure hero section never gets blurred when scrolling back */
        #hero[style*="blur"] {
          filter: blur(0px) !important;
        }
        
        #hero h1[style*="blur"],
        #hero p[style*="blur"],
        #hero button[style*="blur"] {
          filter: none !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .btn-shine {
            animation: none;
          }
        }
      `}</style>

            <section id="hero" ref={heroSectionRef} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden z-10">
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
            </section>
        </>
    );
});

export default Hero;
