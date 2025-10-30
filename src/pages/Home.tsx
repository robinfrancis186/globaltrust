import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicCrossfade from '../components/CinematicCrossfade';
// import PartnersScroll from '../components/PartnersScroll';
import { ArrowRight, CheckCircle, Target, Users, Shield, Lightbulb, Calendar,Trophy, Globe, Scale, Cog, Stamp, Rocket, BookCheck, Scaling, PersonStanding, MapPin } from 'lucide-react';
import NewsHighlights from '../components/NewsHighlights';
import PreRegisterCTA from '../components/PreRegisterCTA';
import SponsorsCTA from '../components/SponsorsCTA';
//import parse from 'html-react-parser';
import HeroSectionV3 from '../components/HeroSectionV3';
import FutureRunsOnTrust from '../components/FutureRunsOnTrust';
// import CinematicScroll from '../components/CinematicScroll';
// import '../styles/cinematic-scroll.css';
import '../styles/card-glow-effect.css';
import '../styles/unique-section-refined.css';
import '../styles/warp-transitions.css';
import '../styles/prototype-unique.css';
import '../styles/floating-cards-3d.css';
import WarpSectionTransition from '../components/WarpSectionTransition';
import CardCarousel from '../components/CardCarousel';
import CarouselSkeleton from '../components/CarouselSkeleton';
import LayeredCarousel from '../components/LayeredCarousel';
import '../styles/carousel-custom.css';


interface FormData {
  fullName: string;
  email: string;
  areaOfInterest: string;
  yourIdea: string;
}


// Events data (same as in Events.tsx)
const allEvents = [
  {
    id: 'Digital-Trust-Convention-Montreal',
    title: 'Digital Trust Convention – Montreal',
    date: 'November 6, 2025',
    location: 'Montreal, Canada',
    excerpt: 'Join the Global Trust Challenge at the Digital Trust Convention in Montreal for a forward-looking session on how we can build resilient information ecosystems in the age of AI. The GTC will spotlight how trustworthy digital environments can unlock new opportunities for future generations, drive innovation across industries, and strengthen public trust in sectors such as healthcare and education.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+2025.webp',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Upcoming', 'important']
  },
  {
    id: 'ENS-AI-Action-Summit-Event',
    title: 'ENS - AI Action Summit Official Side Event',
    date: 'February 11, 2025',
    location: 'École normale supérieure, Paris',
    excerpt: 'As part of the official programming of the AI Action Summit, this Global Trust Challenge side event convened a distinguished panel to explore how generative AI is reshaping the landscape of trust and online information.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/ENS.jpg',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Global-Trust-Challenge-Side-Event',
    title: 'Trust in Focus: Global Trust Challenge at the Japan Cultural Centre',
    date: 'February 10, 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "In a world where synthetic content can be produced at the click of a button, trust has never been more fragile — or more essential. That urgency set the tone at the Japan Cultural Centre in Paris, where global leaders gathered to confront the risks of generative AI and chart pathways toward a more reliable digital future.",
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: 'November 15, 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+Photo.jpeg',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'AI-For-Good',
    title: 'AI for Good Global Summit 2025',
    date: 'July 9, 2025',
    location: 'Geneva, Switzerland',
    excerpt: 'It started with a simple, unsettling question at the AI for Good Global Summit: If we can no longer tell what\'s real online, how do we keep societies from unravelling? On stage, at the International Telecommunication Union\'s (ITU) AI for Good, the Global Trust Challenge offered an answer — not in theory, but in action. This global initiative, born from a G7 call to safeguard truth in the digital age, is rallying technologists, policymakers, and innovators to build solutions that blend policy with technology.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/AI+for+Good+Event+Photo.jpeg',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Lyceum-Project-Event',
    title: 'Empowering Tomorrow\'s Citizens: Highlights from The Lyceum Project 2025 - Children in the Age of AI',
    date: 'June 20, 2025',
    location: 'Athens, Greece',
    excerpt: 'On June 20, 2025, an electric gathering took place in Athens. The Lyceum Project 2025 – "Children in the Age of AI" – was explicitly "a day of reflection and dialogue" on how to empower children to flourish in a world guided by algorithms. Leading thinkers, educators, policymakers, and citizens gathered at the historic Athens Conservatoire (next to Aristotle\'s Lyceum) to ask: what does it really mean to be a child in the age of AI?',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Screenshot+2025-08-29+210641.png',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Announcement', 'important']
  }
];

// Helper function to parse different date formats
const parseEventDate = (dateString: string | undefined): Date => {
  if (!dateString || typeof dateString !== 'string') {
    return new Date(0);
  }
  // Remove ordinal suffixes (st, nd, rd, th)
  const cleanDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
  
  // Try to parse the date
  const parsed = new Date(cleanDate);
  
  // If parsing fails or we only have month/year, handle specially
  if (isNaN(parsed.getTime())) {
    // Handle "Month YYYY" format by setting to first of month
    const parts = (cleanDate || '').split(' ');
    if (parts.length === 2) {
      return new Date(`${parts[0]} 1, ${parts[1]}`);
    }
  }
  
  return parsed;
};

// Helper function to determine if an event is past
const isPastEvent = (dateString: string): boolean => {
  const eventDate = parseEventDate(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  return eventDate < today;
};

export default function Home() {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    areaOfInterest: '',
    yourIdea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Mouse ripple effect for Unique section
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; alpha: number; velocity: number; lastX: number; lastY: number }>>([]);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  
  // GSAP refs removed - using Swiper carousel instead
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);


  // Simple setup - no complex GSAP configuration

  // No complex animations - let CSS handle everything

  // Set video playback rate to 50% for slower animation
  useEffect(() => {
    const setPlaybackRate = () => {
      const video1 = document.getElementById('video1') as HTMLVideoElement;
      const video2 = document.getElementById('video2') as HTMLVideoElement;
      if (video1) video1.playbackRate = 0.5;
      if (video2) video2.playbackRate = 0.5;
    };

    // Set immediately if videos are already loaded
    setPlaybackRate();

    // Also set when videos are ready
    const video1 = document.getElementById('video1') as HTMLVideoElement;
    const video2 = document.getElementById('video2') as HTMLVideoElement;
    
    if (video1) {
      video1.addEventListener('loadedmetadata', setPlaybackRate);
      video1.addEventListener('canplay', setPlaybackRate);
    }
    if (video2) {
      video2.addEventListener('loadedmetadata', setPlaybackRate);
      video2.addEventListener('canplay', setPlaybackRate);
    }

    return () => {
      if (video1) {
        video1.removeEventListener('loadedmetadata', setPlaybackRate);
        video1.removeEventListener('canplay', setPlaybackRate);
      }
      if (video2) {
        video2.removeEventListener('loadedmetadata', setPlaybackRate);
        video2.removeEventListener('canplay', setPlaybackRate);
      }
    };
  }, []);

  // Canvas ripple effect
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
        // Simplified ripple animation for better performance
        ripple.radius += 2;
        ripple.alpha -= 0.008;

        // Simple circle instead of complex gradient
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,174,239,${ripple.alpha * 0.3})`;
        ctx.fill();

        // Remove expired ripples
        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
        }
      });

      // Reduce animation frequency
      animationId = requestAnimationFrame(() => {
        setTimeout(animate, 16); // ~60fps instead of unlimited
      });
    };

    let mouseMoveThrottle: number | null = null;
    let isScrolling = false;
    let scrollTimeout: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Skip if scrolling for better performance
      if (isScrolling) return;
      
      // Throttle mouse move events to improve performance
      if (mouseMoveThrottle) return;
      
      mouseMoveThrottle = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate velocity for dynamic ripple behavior
        const dx = x - lastMouseRef.current.x;
        const dy = y - lastMouseRef.current.y;
        const velocity = Math.sqrt(dx * dx + dy * dy) / 10;

        // Only add ripple if mouse moved significantly and reduce frequency
        if (velocity > 1.5) {
          addRipple(x, y, velocity);
        }

        lastMouseRef.current = { x, y };
        mouseMoveThrottle = null;
      });
    };

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Initialize
    resize();
    animate();

    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // GSAP animations removed - using Swiper carousel instead

  // Card data for carousels
  const topCardsData = [
    {
      icon: Users,
      title: "Inclusive Contribution",
      description: "Enables diversity, collaboration, and global scalability. We're crowdsourcing from a distributed braintrust: students, citizens, institutions, and innovators all working together to defend truth and reflect their cultures in the age of AI."
    },
    {
      icon: Globe,
      title: "Global Validation",
      description: "Designed to create practical prototypes, test them in real-world environments, and measure impact. A growing network of cities and organizations will help host, guide, and scale the winning ideas — validating innovation through pilots."
    },
    {
      icon: Scale,
      title: "Building Global Intelligence",
      description: "Combining policy and technology solutions — integrated, actionable models. The Global Trust Challenge is a platform for collective insight, civic imagination, and cross-border collaboration to defend truth in the digital age."
    }
  ];

  const bottomCardsData = [
    {
      icon: Lightbulb,
      phase: "Phase 1",
      title: "Context",
      description: "Key insights from leading AI and misinformation researchers — grounding ideas in the latest thinking and real-world relevance."
    },
    {
      icon: Cog,
      phase: "Phase 2",
      title: "Infrastructure",
      description: "A platform to prototype, test, and showcase solutions — with tools and pathways to support development."
    },
    {
      icon: Stamp,
      phase: "Phase 3",
      title: "Legitimacy",
      description: "Backed by global institutions like IEEE, OECD, and more — reinforcing credibility and trust."
    },
    {
      icon: Rocket,
      phase: "Phase 3",
      title: "Opportunity",
      description: "Routes to real impact, policy dialogue, and funding — helping your solution grow beyond the challenge."
    }
  ];

  // Section 3 uses immediate visibility (no container fade)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('scroll') === 'pre-registration') {
      const element = document.getElementById('pre-registration');
      element?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  const handlePreRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('pre-registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
   const handleInputChangetextArea = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwxW-f0CXDsKnEOzWu9CKCyiDfJoaxYCWEA4fXCo_Yghftow2lW7NH4IoZYT56zlrPzGg/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for pre-registering! We will be in touch soon.',
        });
        setFormData({
          fullName: '',
          email: '',
          yourIdea: '',
          areaOfInterest: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Cinematic Crossfade Depth Push */}
      <CinematicCrossfade sectionIds={['hero', 'trust', 'unique', 'partners']} />
      
      {/* Warp Section Transition Effect */}
      <WarpSectionTransition sectionIds={['hero', 'trust', 'unique', 'partners']} />

      {/* Hero Section V3 */}
      <HeroSectionV3 />

      {/* The Future Runs on Trust Section */}
      <FutureRunsOnTrust />
      

      {/* What Makes This Challenge Unique & What We Provide Section */}
      <section 
        id="unique"
        className="unique-section relative z-10 overflow-hidden"
          style={{
           background: `linear-gradient(
             135deg,
             #0A1F2A 0%,     /* deeper navy base */
             #004D5C 20%,    /* rich teal */
             #007A8A 40%,    /* vibrant turquoise */
             #00B4D8 60%,    /* bright cyan */
             #FFD700 80%,    /* pure gold */
             #FFE55C 100%    /* bright golden yellow */
           )`
          }}
       >
        {/* Animated Particle Background - Smooth Loop Transition */}
        <div className="video-bg-wrapper absolute inset-0 z-0">
          <video
            id="video1"
            className="bg-video absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            style={{ 
              mixBlendMode: 'normal',
              opacity: 1,
              transition: 'opacity 4s ease-in-out',
              filter: 'blur(0.5px) brightness(1.1) contrast(1.05)'
            }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.5; // 50% speed
            }}
            onPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.5; // Ensure 50% speed is maintained
            }}
            onTimeUpdate={(e) => {
              const video = e.target as HTMLVideoElement;
              const duration = video.duration;
              const currentTime = video.currentTime;
              
              // Start crossfade 3 seconds before the end for smoother transition
              if (duration > 0 && currentTime >= duration - 3) {
                const video2 = document.getElementById('video2') as HTMLVideoElement;
                if (video2) {
                  // Calculate crossfade progress (0 to 1 over last 3 seconds)
                  const fadeProgress = (currentTime - (duration - 3)) / 3;
                  video.style.opacity = (1 - fadeProgress).toString();
                  video2.style.opacity = fadeProgress.toString();
                  
                  // Start video2 when we're 2 seconds from the end
                  if (currentTime >= duration - 2 && video2.paused) {
                    video2.currentTime = 0;
                    video2.playbackRate = 0.5; // Set 50% speed
                    video2.play();
                  }
                }
              }
            }}
            onEnded={() => {
              const video1 = document.getElementById('video1') as HTMLVideoElement;
              const video2 = document.getElementById('video2') as HTMLVideoElement;
              if (video1 && video2) {
                video1.style.opacity = '0';
                video2.style.opacity = '1';
                video1.currentTime = 0;
                video1.playbackRate = 0.5; // Maintain 50% speed
              }
            }}
          >
            <source src="https://maximages.s3.us-west-1.amazonaws.com/Unique+Section+v4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <video
            id="video2"
            className="bg-video absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            style={{ 
              mixBlendMode: 'normal',
              opacity: 0,
              transition: 'opacity 4s ease-in-out',
              filter: 'blur(0.5px) brightness(1.1) contrast(1.05)'
            }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.5; // 50% speed
            }}
            onPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.5; // Ensure 50% speed is maintained
            }}
            onTimeUpdate={(e) => {
              const video = e.target as HTMLVideoElement;
              const duration = video.duration;
              const currentTime = video.currentTime;
              
              // Start crossfade 3 seconds before the end for smoother transition
              if (duration > 0 && currentTime >= duration - 3) {
                const video1 = document.getElementById('video1') as HTMLVideoElement;
                if (video1) {
                  // Calculate crossfade progress (0 to 1 over last 3 seconds)
                  const fadeProgress = (currentTime - (duration - 3)) / 3;
                  video.style.opacity = (1 - fadeProgress).toString();
                  video1.style.opacity = fadeProgress.toString();
                  
                  // Start video1 when we're 2 seconds from the end
                  if (currentTime >= duration - 2 && video1.paused) {
                    video1.currentTime = 0;
                    video1.playbackRate = 0.5; // Set 50% speed
                    video1.play();
                  }
                }
              }
            }}
            onEnded={() => {
              const video1 = document.getElementById('video1') as HTMLVideoElement;
              const video2 = document.getElementById('video2') as HTMLVideoElement;
              if (video1 && video2) {
                video2.style.opacity = '0';
                video1.style.opacity = '1';
                video2.currentTime = 0;
                video2.playbackRate = 0.5; // Maintain 50% speed
              }
            }}
          >
            <source src="https://maximages.s3.us-west-1.amazonaws.com/Unique+Section+v4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
                  </div>
        
        {/* Gradient Overlay */}
        <div className="gradient-overlay absolute inset-0 z-1" />
        
        {/* Mouse Ripple Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.6
          }}
        />
            
        {/* Seamless Digital Aurora Focal Area */}
        <div 
          className="absolute inset-0 z-5"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255,255,255,0.4) 0%,
              rgba(227,200,90,0.15) 30%,
              rgba(143,166,138,0.1) 60%,
              rgba(0,110,128,0.08) 100%
            )`,
            filter: 'blur(0.5px)'
          }}
        />
            
        <div className="unique-proto">
        <div className="unique-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Two-column layout: left headline, right stacked feature cards */}
          <div className="unique-layout">
            <div className="left-col">
              <h2 className="section-title unique-heading">
                What Makes This
                <br />
                Challenge <span className="text-gradient-unique">Unique</span>
              </h2>
              <p className="section-description">
                A transformative platform where innovation meets opportunity, backed by world-class institutions and real-world impact.
              </p>

            </div>

            <div className="right-col">
              <div className="feature-card feature-cyan">
                <div className="icon-badge">🏅</div>
                <div>
                  <h3 className="feature-title">Inclusive Contribution</h3>
                  <p className="feature-sub">Enables diversity, collaboration, and global scalability. We're crowdsourcing from a distributed braintrust: students, citizens, institutions, and innovators all working together to defend truth and reflect their cultures in the age of AI.</p>
                </div>
              </div>
              <div className="feature-card feature-amber">
                <div className="icon-badge">🌐</div>
                <div>
                  <h3 className="feature-title">Global Validation</h3>
                  <p className="feature-sub">Designed to create practical prototypes, test them in real-world environments, and measure impact. A growing network of cities and organizations will help host, guide, and scale the winning ideas — validating innovation through pilots.</p>
                </div>
              </div>
              <div className="feature-card feature-blue">
                <div className="icon-badge">🏗️</div>
                <div>
                  <h3 className="feature-title">Building Global Intelligence</h3>
                  <p className="feature-sub">Combining policy and technology solutions — integrated, actionable models. The Global Trust Challenge is a platform for collective insight, civic imagination, and cross-border collaboration to defend truth in the digital age.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Provide grid (bottom) */}
          <div className="title text-center mt-16">
            <h2 
              className="text-3xl font-bold mb-6"
              style={{
                fontFamily: '"Barlow Condensed", serif',
                fontWeight: '800',
                textTransform: 'uppercase',
                fontSize: '2.5rem',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              What We Provide
            </h2>
          </div>
          <div className="cards" aria-label="What we provide cards grid">
            {bottomCardsData.map((item, index) => (
              <div key={index} className="card">
                <item.icon className="icon" />
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

        </div>
        </div>
      </section>
      



      {/* Is This for You Section */}
       {/* <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              Is This for You?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Anyone with a bold idea - students, startups, nonprofits, researchers, policymakers, designer - if you have something to say or build, we want to hear it.
              </p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto py-5">
              Whether you're a solo thinker or part of a global team, you're invited.
                </p>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bold, practical ideas that tackle the growing risks of AI-generated content. This is your chance to help shape how we defend truth and rebuild trust online - through innovation, collaboration, and vision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                    icon: Shield,
                    title: "Impact-Driven",
                    description: "Strengthen how we verify and trust AI-generated content - so people can rely on what they see and hear."
                  },
                  {
                    icon: Lightbulb,
                    title: "Ambitious & Visionary",
                    description: "Go beyond today's standard approaches. We're seeking solutions that rethink how we uphold information integrity at global scale."
                  },
                  {
                    icon: Target,
                    title: "Tech + Policy Integration",
                    description: "The best solutions combine technology and policy. Think tools plus rules - practical, holistic, and ready for the real world."
                  },
                  {
                    icon: Users,
                    title: "Feasible & Scalable",
                    description: "Your solution doesn't have to be perfect - but it should be realistic, sustainable, and able to grow."
                  }
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <item.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:pl-8">
              <div className="sticky top-24">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="Innovation collaboration"
                  className="rounded-lg shadow-xl mb-8"
                />
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                    Who Can Participate?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Anyone with a bold idea - from students and startups to researchers, nonprofits, or companies. Teams from around the globe are encouraged to join. Great ideas can come from anyone, anywhere
                  </p>
                  
                  <div className="mt-8">
                    <a
                      href="#pre-registration"
                      onClick={handlePreRegisterClick}
                      className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Register Your Team
                      <ArrowRight className="ml-2" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

       {/* Is This for You Section - Redesigned */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
                Is This for You?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Anyone with a bold idea - students, startups, nonprofits, researchers, policymakers, designers - if you have something to say or build, we want to hear it.
              </p>
              <p className="text-xl text-gray-600 mb-8">
                Whether you're a solo thinker or part of a global team, you're invited.
              </p>
              <p className="text-xl text-gray-600 mb-12">
                Bold, practical ideas that tackle the growing risks of AI-generated content. This is your chance to help shape how we defend truth and rebuild trust online - through innovation, collaboration, and vision.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-1">
              <img
                src="https://maximages.s3.us-west-1.amazonaws.com/Isthisforyousection.jpg"
                alt="Innovation collaboration"
                className="rounded-lg shadow-xl w-full h-64 lg:h-80 object-cover"
              />
            </div>
          </div>

          {/* Criteria Cards - Full Width Below */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Impact-Driven",
                  description: "Strengthen how we verify and trust AI-generated content - so people can rely on what they see and hear."
                },
                {
                  icon: Lightbulb,
                  title: "Ambitious & Visionary",
                  description: "Go beyond today's standard approaches. We're seeking solutions that rethink how we uphold information integrity at global scale."
                },
                {
                  icon: Target,
                  title: "Tech + Policy Integration",
                  description: "The best solutions combine technology and policy. Think tools plus rules - practical, holistic, and ready for the real world."
                },
                {
                  icon: Users,
                  title: "Feasible & Scalable",
                  description: "Your solution doesn't have to be perfect - but it should be realistic, sustainable, and able to grow."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <item.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
              Who Can Participate?
            </h3>
            <p className="text-gray-600 mb-6">
              Anyone with a bold idea - from students and startups to researchers, nonprofits, or companies. Teams from around the globe are encouraged to join. Great ideas can come from anyone, anywhere
            </p>
            <a
              href="#pre-registration"
              onClick={handlePreRegisterClick}
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Register Your Team
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>


{/* The Challenge Section - Redesigned */}
      <section id="phases" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              The Challenge
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              The Challenge is divided into three phases, with a rigorous evaluation by a neutral, expert jury at the end of each phase to identify the most promising solutions that will move forward and receive recognition.
            </p>
          </div>
          
          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Calendar,
                phase: "Phase 1",
                title: "Proposal",
                description: "Submit your idea — policy + tech solutions to build trust.",
                benefits: [
                  "Expert feedback",
                  "~10 teams advance",
                  "Recognition & mentorship"
                ]
              },
              {
                icon: Users,
                phase: "Phase 2", 
                title: "Prototype",
                description: "Build it with support.",
                benefits: [
                  "$50K funding per team",
                  "Mentorship + sandbox",
                  "Submit working prototype"
                ]
              },
              {
                icon: CheckCircle,
                phase: "Phase 3",
                title: "Pilot",
                description: "Test in real-world settings.",
                benefits: [
                  "$250K per finalist team",
                  "Partner-led pilots",
                  "Impact measured"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {item.phase}
                  </div>
                </div>
                <item.icon className="w-16 h-16 text-indigo-600 mx-auto mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center justify-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Final Awards Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
              Final Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Cash prize for winning teams</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Present at major events</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Spotlight in global reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* How Ideas Are Selected Section */}
      <section className="py-10 bg-gray-50" style={{paddingTop:'5px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            How Ideas Are Selected
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto py-5">
            Submissions will be reviewed by an independent panel of global experts — spanning AI, law, digital policy, civil society, and ethics. Ideas will be assessed based on:
          
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Target,
                title: "Relevance",
                description: "Does it meaningfully tackle AI-driven mistrust?"
              },
              {
                icon: Lightbulb,
                title: "Originality",
                description: "Is the idea novel or visionary?"
              },
              {
                icon: BookCheck,
                title: "Feasibility",
                description: "Could it be implemented or piloted?"
              },
              {
                icon: Scaling,
                title: "Scalability",
                description: "Can it grow or inform larger systems?"
              },
              {
                icon: PersonStanding,
                title: "Values",
                description: "Does it promote transparency, equity, and accountability?"
              }
              
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center h-full">
                  <step.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
              </div>
            ))}

          </div>

          
        </div>

        
      </section>
      {/* Call to Action Section */}
      <PreRegisterCTA />

     

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              Upcoming Events
            </h2>
            <Link 
              to="/events" 
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
              View all events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Display upcoming events or message if none */}
          {(() => {
            const upcomingEvents = allEvents
              .sort((a, b) => {
                const dateA = parseEventDate(a.date);
                const dateB = parseEventDate(b.date);
                return dateB.getTime() - dateA.getTime();
              })
              .filter(event => !isPastEvent(event.date));
            
            return upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingEvents.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
                          {item.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm ml-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 transition-colors duration-200">
                        <Link to={`/events/${item.id}`}>{item.title}</Link>
                      </h3>
                      {item.category === 'Event' && item.location && (
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {item.location}
                        </div>
                      )}
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <Link 
                        to={`/events/${item.id}`}
                        className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200 flex items-center"
                      >
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-600">
                  No upcoming events at this time. Check back soon!
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* News Highlights Section */}
      <NewsHighlights />

      {/* Challenge Mission */}
      {/* <section className="py-20 bg-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>Challenge Mission</h2>
          <div className="grid md:grid-cols-1 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                The Global Trust Challenge seeks interdisciplinary solutions that integrate both technology and policy to address the challenges posed by generative AI. Participants are invited to propose novel, forward-thinking approaches that not only develop technology but also propose complementary policies. These solutions should ensure the verification and trustworthiness of AI-generated content, support trustworthy AI deployment, and enhance the resilience of information ecosystems. 
              </p><p className="text-lg text-gray-600 mb-6" style={{marginBottom:'10px'}}>Key Goals include:</p>
              <ul className="space-y-4 text-lg text-gray-600">
                {[
                  "Enhancing Trust: Ensuring that AI-generated content is reliable and verifiable. ",
                  "Protecting Users: Promoting media literacy and providing tools to identify AI-generated content.",
                  "Supporting Governance: Encouraging policy mechanisms for transparency and content flagging."   
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-indigo-600 mr-2" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      <section id="partners" className="relative z-10">
      <SponsorsCTA />
      </section>

      {/* Pre-registration Form */}
      <section id="pre-registration" className="py-20 relative z-10 bg-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem', color:'#ffffff'}}>Bring your idea to life. Join the Challenge.</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">Please complete this form to register your interest in competing as part of the Global Challenge to Build Trust in the Age of Generative AI. We will be in touch when the official launch is approaching.</p>
          <form onSubmit={handleSubmit} className="p-8 rounded-lg ">
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-indigo-100 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-medium text-indigo-100 mb-1">
                  What are you interested in?
                </label>
                <input
                  id="areaOfInterest"
                  name="areaOfInterest"
                  type="text"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required>
                  
                </input>
              </div>
              <div>
                <label htmlFor="yourIdea" className="block text-sm font-medium text-indigo-100 mb-1">
                  Tell us a bit about your idea
                </label>
                <textarea
                  id="yourIdea"
                  name="yourIdea"
                  rows={4}
                  placeholder="Share a short description or question about your idea"
                  value={formData.yourIdea}
                  onChange={handleInputChangetextArea}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 border-2 border-white text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Pre-register'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}