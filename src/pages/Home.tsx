import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicCrossfade from '../components/CinematicCrossfade';
import { 
  ArrowRight, 
  Target, 
  Users, 
  Shield, 
  Lightbulb, 
  Calendar, 
  MapPin, 
  Cog, 
  Stamp, 
  Rocket 
} from 'lucide-react';
import HeroSectionV3 from '../components/HeroSectionV3';
import FutureRunsOnTrust from '../components/FutureRunsOnTrust';

// Lazy load below-the-fold components for better initial load performance
const NewsHighlights = lazy(() => import('../components/NewsHighlights'));
const PreRegisterCTA = lazy(() => import('../components/PreRegisterCTA'));
const SponsorsCTA = lazy(() => import('../components/SponsorsCTA'));
const JourneyCTA = lazy(() => import('../components/JourneyCTA'));
import '../styles/card-glow-effect.css';
import { motion } from 'framer-motion';
import '../styles/unique-section-refined.css';
import '../styles/warp-transitions.css';
import '../styles/prototype-unique.css';
import '../styles/floating-cards-3d.css';
import '../styles/is-this-for-you.css';
import WarpSectionTransition from '../components/WarpSectionTransition';
import ScrollArrow from '../components/ScrollArrow';
import SelectionCriteria from '../components/SelectionCriteria';
import ImmersiveBackground from '../components/ImmersiveBackground';


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

  // GSAP refs removed - using Swiper carousel instead
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);



  // Simple setup - no complex GSAP configuration

  // No complex animations - let CSS handle everything

  // GSAP animations removed - using Swiper carousel instead

  // Card data for carousels
  // const topCardsData = [
  //   {
  //     icon: Users,
  //     title: "Inclusive Contribution",
  //     description: "Enables diversity, collaboration, and global scalability. We're crowdsourcing from a distributed braintrust: students, citizens, institutions, and innovators all working together to defend truth and reflect their cultures in the age of AI."
  //   },
  //   {
  //     icon: Globe,
  //     title: "Global Validation",
  //     description: "Designed to create practical prototypes, test them in real-world environments, and measure impact. A growing network of cities and organizations will help host, guide, and scale the winning ideas — validating innovation through pilots."
  //   },
  //   {
  //     icon: Scale,
  //     title: "Building Global Intelligence",
  //     description: "Combining policy and technology solutions — integrated, actionable models. The Global Trust Challenge is a platform for collective insight, civic imagination, and cross-border collaboration to defend truth in the digital age."
  //   }
  // ];

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('scroll') === 'pre-registration') {
      const element = document.getElementById('pre-registration');
      if (element) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          smoothScrollTo(element, 600);
        }, 100);
      }
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  const handlePreRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('pre-registration');
    if (element) {
      smoothScrollTo(element, 600);
    }
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
      <CinematicCrossfade sectionIds={['hero']} />
      
      {/* Warp Section Transition Effect */}
      <WarpSectionTransition sectionIds={['hero']} />

      {/* Hero Section V3 */}
      <HeroSectionV3 />

      {/* The Future Runs on Trust Section */}
      <FutureRunsOnTrust />
      

      {/* What Makes This Challenge Unique & What We Provide Section */}
      <section 
        id="unique"
        className="unique-section relative z-10 overflow-hidden"
       >
        {/* Cinematic animated background */}
        <ImmersiveBackground 
          variant="teal"
          overlayOpacity={0.2}
          className="unique-bg-teal-gold"
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
              <div className="text-contrast-block">
                <p className="section-description">
                  A transformative platform where innovation meets opportunity, backed by world-class institutions and real-world impact.
                </p>
              </div>

            </div>

            <div className="right-col">
              <div className="feature-card feature-cyan" onMouseMove={(e) => {
                const t = e.currentTarget as HTMLDivElement; const r = t.getBoundingClientRect();
                t.style.setProperty('--mx', `${e.clientX - r.left}px`);
                t.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}>
                <div className="icon-badge">🏅</div>
                <div>
                  <h3 className="feature-title">Inclusive Contribution</h3>
                  <p className="feature-sub">Enables diversity, collaboration, and global scalability. We're crowdsourcing from a distributed braintrust: students, citizens, institutions, and innovators all working together to defend truth and reflect their cultures in the age of AI.</p>
                </div>
              </div>
              <div className="feature-card feature-amber" onMouseMove={(e) => {
                const t = e.currentTarget as HTMLDivElement; const r = t.getBoundingClientRect();
                t.style.setProperty('--mx', `${e.clientX - r.left}px`);
                t.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}>
                <div className="icon-badge">🌐</div>
                <div>
                  <h3 className="feature-title">Global Validation</h3>
                  <p className="feature-sub">Designed to create practical prototypes, test them in real-world environments, and measure impact. A growing network of cities and organizations will help host, guide, and scale the winning ideas — validating innovation through pilots.</p>
                </div>
              </div>
              <div className="feature-card feature-blue" onMouseMove={(e) => {
                const t = e.currentTarget as HTMLDivElement; const r = t.getBoundingClientRect();
                t.style.setProperty('--mx', `${e.clientX - r.left}px`);
                t.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}>
                <div className="icon-badge">🏗️</div>
                <div>
                  <h3 className="feature-title">Building Global Intelligence</h3>
                  <p className="feature-sub">Combining policy and technology solutions — integrated, actionable models. The Global Trust Challenge is a platform for collective insight, civic imagination, and cross-border collaboration to defend truth in the digital age.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Provide grid (bottom) - Vercel prototype styling */}
          <div className="title text-center mt-16">
            <h2 className="provide-title">What We Provide</h2>
          </div>
          <div className="provide-cards" aria-label="What we provide cards grid">
            {[
              { ...bottomCardsData[0], accent: '#00AEEF', variant: 'dark' },
              { ...bottomCardsData[1], accent: '#8b7ec8', variant: 'gold' },
              { ...bottomCardsData[2], accent: '#00AEEF', variant: 'dark' },
              { ...bottomCardsData[3], accent: '#8b7ec8', variant: 'gold' },
            ].map((item, index) => (
              <div
                key={index}
                className={`provide-card variant-${item.variant}`}
                style={{ ['--accent' as any]: item.accent }}
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLDivElement; const r = t.getBoundingClientRect();
                  t.style.setProperty('--mx', `${e.clientX - r.left}px`);
                  t.style.setProperty('--my', `${e.clientY - r.top}px`);
                }}
              >
                <div className="provide-icon"><item.icon /></div>
                <div className="provide-content">
                  <h5 className="provide-heading">{item.title}</h5>
                  <p className="provide-text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Scroll arrows - positioned lower to avoid overlapping text boxes */}
        <div className="relative" style={{ marginTop: '8rem', paddingBottom: '4rem' }}>
          <ScrollArrow targetId="#is-this-for-you" />
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
       <section id="is-this-for-you" className="is-this-for-you-section py-20 relative z-10 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="animated-gradient-background absolute inset-0 z-0" style={{
          background: `linear-gradient(
            135deg,
            #007A8A 0%,
            #004D5C 10%,
            #0A1F2A 20%,
            #3B3A7A 35%,
            #554C96 50%,
            #6B5AAB 65%,
            #8B7EC8 80%,
            #A78BFA 100%
          )`
        }} />
        
        {/* Subtle Moving Fog Overlay */}
        <div className="moving-fog-overlay absolute inset-0 z-[1]" style={{
          background: `radial-gradient(
            ellipse at 20% 30%,
            rgba(139, 92, 246, 0.15) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 80% 70%,
            rgba(99, 102, 241, 0.12) 0%,
            transparent 50%
          )`
        }} />
        
        {/* Shimmer Overlay */}
        <div className="shimmer-overlay absolute inset-0 z-[1]" style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(167, 139, 250, 0.1) 50%,
            transparent 100%
          )`
        }} />
        
        {/* Light Particles */}
        {(() => {
          const particleColors = [
            {
              bg: 'radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(99,102,241,0.8) 40%, rgba(167,139,250,0.4) 70%, transparent 100%)',
              shadow: '0 0 30px rgba(139,92,246,1), 0 0 60px rgba(99,102,241,0.6)'
            },
            {
              bg: 'radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(219,39,119,0.8) 40%, rgba(244,114,182,0.4) 70%, transparent 100%)',
              shadow: '0 0 30px rgba(236,72,153,1), 0 0 60px rgba(219,39,119,0.6)'
            },
            {
              bg: 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(37,99,235,0.8) 40%, rgba(96,165,250,0.4) 70%, transparent 100%)',
              shadow: '0 0 30px rgba(59,130,246,1), 0 0 60px rgba(37,99,235,0.6)'
            },
            {
              bg: 'radial-gradient(circle, rgba(34,197,94,1) 0%, rgba(22,163,74,0.8) 40%, rgba(74,222,128,0.4) 70%, transparent 100%)',
              shadow: '0 0 30px rgba(34,197,94,1), 0 0 60px rgba(22,163,74,0.6)'
            }
          ];

          const particles = Array.from({ length: 50 }, (_, i) => {
            const colorSet = particleColors[i % particleColors.length];
            return {
              id: i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 8 + 2,
              delay: Math.random() * 20,
              duration: Math.random() * 12 + 12,
              opacity: Math.random() * 0.8 + 0.6,
              bg: colorSet.bg,
              shadow: colorSet.shadow,
              xMovement: (Math.random() - 0.5) * 100,
              yMovement: (Math.random() - 0.5) * 100,
            };
          });

          return (
            <div className="absolute inset-0 z-[2] pointer-events-none">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: particle.bg,
                    boxShadow: particle.shadow,
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    y: [0, particle.yMovement, 0],
                    x: [0, particle.xMovement, 0],
                    opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
                    scale: [1, 1.8, 1],
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
        })()}
        
        {/* Light Rays */}
        {(() => {
          const rays = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            angle: (Math.random() - 0.5) * 60,
            height: Math.random() * 200 + 150,
            delay: Math.random() * 20,
            duration: Math.random() * 8 + 6,
            opacity: Math.random() * 0.4 + 0.2,
          }));

          return (
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
              {rays.map((ray) => (
                <motion.div
                  key={ray.id}
                  className="absolute origin-bottom"
                  style={{
                    left: `${ray.x}%`,
                    bottom: 0,
                    width: '3px',
                    height: `${ray.height}%`,
                    background: 'linear-gradient(to top, rgba(139,92,246,0.6), rgba(99,102,241,0.3), transparent)',
                    boxShadow: '0 0 15px rgba(139,92,246,0.8), 0 0 30px rgba(99,102,241,0.4)',
                    transform: `rotate(${ray.angle}deg)`,
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    opacity: [ray.opacity, ray.opacity * 1.8, ray.opacity],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: ray.duration,
                    delay: ray.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          );
        })()}
        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Content - Frosted Glass Text Box with Image Background */}
            <div className="lg:col-span-2 relative">
              <div 
                className="header-text-box w-full rounded-2xl overflow-hidden relative p-8 lg:p-10"
                style={{
                  backgroundImage: 'url(https://maximages.s3.us-west-1.amazonaws.com/Isthisforyousection.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '400px'
                }}
              >
                {/* Light ray sweep effect */}
                <div className="light-ray" />
                
                {/* Dark overlay for better text readability - enhanced */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/55" />
                
                {/* Frosted Glass Effect */}
                <div className="absolute inset-0 backdrop-blur-md" />
                
                {/* Light overlay for frosted glass effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
                
                {/* Frame Border */}
                <div className="frame-border absolute inset-0 rounded-2xl border-2 border-white/40 shadow-[0_0_40px_rgba(139,92,246,0.3)]" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="header-title-wrapper relative inline-block">
                    <h2 className="mb-8" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                      Is This for You?
                    </h2>
                  </div>
                  <p className="text-xl text-white/90 mb-8">
                    Anyone with a bold idea - students, startups, nonprofits, researchers, policymakers, designers - if you have something to say or build, we want to hear it.
                  </p>
                  <p className="text-xl text-white/90 mb-8">
                    Whether you're a solo thinker or part of a global team, you're invited.
                  </p>
                  <p className="text-xl text-white/90 mb-12">
                    Bold, practical ideas that tackle the growing risks of AI-generated content. This is your chance to help shape how we defend truth and rebuild trust online - through innovation, collaboration, and vision.
                  </p>
                </div>
              </div>
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
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 {
                   icon: Shield,
                   title: "Impact-Driven",
                   description: "Strengthen how we verify and trust AI-generated content - so people can rely on what they see and hear.",
                   variant: "violet"
                 },
                 {
                   icon: Lightbulb,
                   title: "Ambitious & Visionary",
                   description: "Go beyond today's standard approaches. We're seeking solutions that rethink how we uphold information integrity at global scale.",
                   variant: "indigo"
                 },
                 {
                   icon: Target,
                   title: "Tech + Policy Integration",
                   description: "The best solutions combine technology and policy. Think tools plus rules - practical, holistic, and ready for the real world.",
                   variant: "purple"
                 },
                 {
                   icon: Users,
                   title: "Feasible & Scalable",
                   description: "Your solution doesn't have to be perfect - but it should be realistic, sustainable, and able to grow.",
                   variant: "pink"
                 }
               ].map((item, index) => (
                 <div
                   key={index}
                   className={`feature-card feature-${item.variant}`}
                 >
                   <div className="icon-badge">
                     <item.icon />
                   </div>
                   <div>
                     <h3 className="feature-title">{item.title}</h3>
                     <p className="feature-sub">{item.description}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>

                     {/* Call to Action */}
           <div className="mt-12">
             <div
               className="feature-card feature-violet"
               style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
             >
               <div className="who-can-participate-header-wrapper">
                 <h3 className="who-can-participate-header mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2rem'}}>
                   Who Can Participate?
                 </h3>
               </div>
               <p className="feature-sub mb-6">
                 Anyone with a bold idea - from students and startups to researchers, nonprofits, or companies. Teams from around the globe are encouraged to join. Great ideas can come from anyone, anywhere
               </p>
               <a
                 href="#pre-registration"
                 onClick={handlePreRegisterClick}
                 className="register-team-btn group relative inline-flex items-center justify-center text-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300"
               >
                 <span className="relative z-10 flex items-center">
                   Register Your Team
                   <ArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" size={20} />
                 </span>
                 {/* Animated gradient background */}
                 <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                 {/* Shine effect */}
                 <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
               </a>
             </div>
           </div>
        </div>

        {/* Scroll arrow after "Is This for You" section */}
        <div className="relative" style={{ marginTop: '8rem', paddingBottom: '4rem' }}>
          <ScrollArrow targetId="#phases" />
        </div>
      </section>


{/* The Challenge Section - Redesigned */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <JourneyCTA />
      </Suspense>
      <SelectionCriteria />
      {/* Call to Action Section */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <PreRegisterCTA />
      </Suspense>

     

      {/* Upcoming Events Section - Only show if there are upcoming events */}
      {(() => {
        const upcomingEvents = allEvents
          .sort((a, b) => {
            const dateA = parseEventDate(a.date);
            const dateB = parseEventDate(b.date);
            return dateB.getTime() - dateA.getTime();
          })
          .filter(event => !isPastEvent(event.date));
        
        if (upcomingEvents.length === 0) {
          return null;
        }
        
        return (
          <section className="py-16 pb-8 relative z-10 overflow-hidden" style={{
            background: `linear-gradient(135deg, #1e3a5f 0%, #2d4f6f 12%, #3b3a7a 28%, #554c96 48%, #6b5aab 68%, #8b7ec8 100%)`
          }}>
            {/* Smooth transition overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#8b7ec8]/50 to-[#8b7ec8] pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-white" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
                  Upcoming Events
                </h2>
                <Link 
                  to="/events" 
                  className="flex items-center text-[#00AEEF] hover:text-[#8b7ec8] transition-colors duration-200"
                >
                  View all events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
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
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'rgba(0, 174, 239, 0.15)', color: '#00AEEF' }}>
                          {item.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm ml-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 transition-colors duration-200">
                        <Link to={`/events/${item.id}`} className="text-gray-900 hover:text-[#00AEEF]">{item.title}</Link>
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
                        className="text-[#00AEEF] font-medium hover:text-[#8b7ec8] transition-colors duration-200 flex items-center"
                      >
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* News Highlights Section */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <NewsHighlights />
      </Suspense>

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
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <SponsorsCTA />
        </Suspense>
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