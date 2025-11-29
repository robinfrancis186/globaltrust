import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target,
  Users,
  Shield,
  Lightbulb,
  Award,
  Rocket
} from 'lucide-react';
import Hero from '../components/Hero';
import GlassCard from '../components/GlassCard';
import ShinyButton from '../components/ShinyButton';
import { AuroraText } from '@/components/ui/aurora-text';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import CardFlip from '@/components/ui/card-flip';

// Lazy load below-the-fold components
const FutureRunsOnTrust = lazy(() => import('../components/FutureRunsOnTrust'));

interface FormData {
  fullName: string;
  email: string;
  areaOfInterest: string;
  yourIdea: string;
}

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

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
        setTimeout(() => {
          smoothScrollTo(element, 600);
        }, 100);
      }
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    <div className="flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* Hero Section */}
      <Hero />

      {/* Unique Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">
              What Makes This <br />
              <AuroraText>Challenge Unique</AuroraText>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A transformative platform where innovation meets opportunity, backed by world-class institutions and real-world impact.
            </p>
          </div>

          <BentoGrid className="lg:grid-rows-1 lg:grid-cols-3">
            <BentoCard
              name="Inclusive Contribution"
              className="col-span-3 lg:col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50" />}
              Icon={Users}
              description="Enables diversity, collaboration, and global scalability. We're crowdsourcing from a distributed braintrust: students, citizens, institutions, and innovators all working together."
              href="#"
              cta="Learn More"
            />
            <BentoCard
              name="Global Validation"
              className="col-span-3 lg:col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50" />}
              Icon={Target}
              description="Designed to create practical prototypes, test them in real-world environments, and measure impact. A growing network of cities and organizations will help host and scale."
              href="#"
              cta="Learn More"
            />
            <BentoCard
              name="Building Global Intelligence"
              className="col-span-3 lg:col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-50" />}
              Icon={Shield}
              description="Combining policy and technology solutions. The Global Trust Challenge is a platform for collective insight, civic imagination, and cross-border collaboration."
              href="#"
              cta="Learn More"
            />
          </BentoGrid>
        </div>
      </section>

      {/* What We Provide Section - Replaced with Apple Cards Carousel */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">What We Provide</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive support to turn your ideas into reality.
            </p>
          </div>

          <Carousel items={[
            {
              category: "Context",
              title: "Expert Insights",
              src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
              content: (
                <div className="bg-slate-50 p-8 md:p-14 rounded-3xl mb-4">
                  <p className="text-slate-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-slate-900">Access key insights</span> from leading AI and misinformation researchers. We provide the context you need to build relevant solutions.
                  </p>
                </div>
              ),
            },
            {
              category: "Infrastructure",
              title: "Prototyping Platform",
              src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop",
              content: (
                <div className="bg-slate-50 p-8 md:p-14 rounded-3xl mb-4">
                  <p className="text-slate-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-slate-900">A robust platform</span> to prototype, test, and showcase your solutions. We handle the infrastructure so you can focus on innovation.
                  </p>
                </div>
              ),
            },
            {
              category: "Legitimacy",
              title: "Global Backing",
              src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2968&auto=format&fit=crop",
              content: (
                <div className="bg-slate-50 p-8 md:p-14 rounded-3xl mb-4">
                  <p className="text-slate-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-slate-900">Backed by global institutions</span> like IEEE, OECD, and more. Your participation carries weight and recognition.
                  </p>
                </div>
              ),
            },
            {
              category: "Opportunity",
              title: "Real Impact",
              src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop",
              content: (
                <div className="bg-slate-50 p-8 md:p-14 rounded-3xl mb-4">
                  <p className="text-slate-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-slate-900">Routes to real impact</span>, policy dialogue, and funding. We connect you with the people who can make things happen.
                  </p>
                </div>
              ),
            }
          ].map((card, index) => (
            <Card key={card.src} card={card} index={index} />
          ))} />
        </div>
      </section>

      {/* Text Hover Effect Section */}
      <section className="py-20 bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="h-[20rem] flex items-center justify-center w-full">
          <TextHoverEffect text="TRUST" />
        </div>
      </section>

      {/* Glowing Effect Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">
              Why Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Challenge</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the unique opportunities and benefits that make this challenge transformative.
            </p>
          </div>

          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <li className="min-h-[14rem] list-none md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]">
              <div className="relative h-full rounded-2xl border border-slate-200 p-2 md:rounded-3xl md:p-3 bg-white">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-slate-50 to-white">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-slate-900 md:text-2xl/[1.875rem]">
                        Innovation & Trust
                      </h3>
                      <p className="font-sans text-sm/[1.125rem] text-slate-600 md:text-base/[1.375rem]">
                        Building solutions that redefine digital trust in the AI age.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="min-h-[14rem] list-none md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]">
              <div className="relative h-full rounded-2xl border border-slate-200 p-2 md:rounded-3xl md:p-3 bg-white">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-slate-50 to-white">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-slate-900 md:text-2xl/[1.875rem]">
                        Global Collaboration
                      </h3>
                      <p className="font-sans text-sm/[1.125rem] text-slate-600 md:text-base/[1.375rem]">
                        Connect with innovative minds from around the world to create impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="min-h-[14rem] list-none md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]">
              <div className="relative h-full rounded-2xl border border-slate-200 p-2 md:rounded-3xl md:p-3 bg-white">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-slate-50 to-white">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                      <Target className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-slate-900 md:text-2xl/[1.875rem]">
                        Challenge the Status Quo
                      </h3>
                      <p className="font-sans text-sm/[1.125rem] text-slate-600 md:text-base/[1.375rem]">
                        Tackle the growing risks of AI-generated content with bold ideas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="min-h-[14rem] list-none md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]">
              <div className="relative h-full rounded-2xl border border-slate-200 p-2 md:rounded-3xl md:p-3 bg-white">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-slate-50 to-white">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                      <Award className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-slate-900 md:text-2xl/[1.875rem]">
                        Recognition & Rewards
                      </h3>
                      <p className="font-sans text-sm/[1.125rem] text-slate-600 md:text-base/[1.375rem]">
                        Get recognized for your contributions to building digital trust.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="min-h-[14rem] list-none md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]">
              <div className="relative h-full rounded-2xl border border-slate-200 p-2 md:rounded-3xl md:p-3 bg-white">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-slate-50 to-white">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                      <Rocket className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-slate-900 md:text-2xl/[1.875rem]">
                        Launch Your Ideas
                      </h3>
                      <p className="font-sans text-sm/[1.125rem] text-slate-600 md:text-base/[1.375rem]">
                        Turn your concepts into reality with expert support and resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge Phases Section - Card Flip */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">
              Challenge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Phases</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Navigate through the key stages of the Global Trust Challenge.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <CardFlip
              title="Phase 1: Ideation"
              subtitle="Concept Development"
              description="Form teams and brainstorm innovative solutions to address trust deficits in the digital age."
              features={["Team Formation", "Problem Statement", "Initial Proposal", "Mentorship"]}
            />
            <CardFlip
              title="Phase 2: Prototyping"
              subtitle="Build & Refine"
              description="Develop your ideas into tangible prototypes. Test, iterate, and refine your solution."
              features={["MVP Development", "User Testing", "Technical Workshop", "Mid-term Review"]}
            />
            <CardFlip
              title="Phase 3: Showcase"
              subtitle="Final Presentation"
              description="Present your solution to a global panel of judges and industry leaders at the summit."
              features={["Final Pitch", "Live Demo", "Networking", "Awards Ceremony"]}
            />
          </div>
        </div>
      </section>

      {/* Is This For You Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 text-slate-900">
                Is This <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">For You?</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  Anyone with a bold idea - students, startups, nonprofits, researchers, policymakers, designers - if you have something to say or build, we want to hear it.
                </p>
                <p>
                  Whether you're a solo thinker or part of a global team, you're invited.
                </p>
                <p>
                  Bold, practical ideas that tackle the growing risks of AI-generated content. This is your chance to help shape how we defend truth and rebuild trust online.
                </p>
              </div>
              <div className="mt-10">
                <ShinyButton onClick={() => {
                  const element = document.getElementById('pre-registration');
                  if (element) smoothScrollTo(element, 600);
                }}>
                  Register Your Team
                </ShinyButton>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Impact-Driven", desc: "Strengthen how we verify and trust AI-generated content." },
                { icon: Lightbulb, title: "Visionary", desc: "Go beyond today's standard approaches." },
                { icon: Target, title: "Tech + Policy", desc: "The best solutions combine technology and policy." },
                { icon: Users, title: "Scalable", desc: "Realistic, sustainable, and able to grow." }
              ].map((item, index) => (
                <GlassCard key={index} className="border-l-4 border-l-purple-500 bg-white shadow-md">
                  <item.icon className="text-purple-500 mb-4" size={24} />
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form */}
      <section id="pre-registration" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-white shadow-2xl border-slate-100">
            <BackgroundBeams className="opacity-30" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 z-10"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900">Pre-Register Now</h2>
              <p className="text-slate-500">Be the first to know when the challenge launches.</p>
            </div>

            {submitStatus.message && (
              <div className={`mb-8 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Area of Interest</label>
                <select
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900"
                >
                  <option value="" className="text-slate-400">Select an area...</option>
                  <option value="AI Policy">AI Policy</option>
                  <option value="Technology/Development">Technology/Development</option>
                  <option value="Research">Research</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Your Idea (Optional)</label>
                <textarea
                  name="yourIdea"
                  value={formData.yourIdea}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="Tell us briefly about your interest or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Pre-Registration'}
              </button>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* Lazy Loaded Components */}
      <Suspense fallback={<div className="h-20"></div>}>
        <FutureRunsOnTrust />
      </Suspense>

    </div>
  );
}