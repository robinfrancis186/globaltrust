import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import PartnersScroll from '../components/PartnersScroll';
import CallToAction from '../components/CallToAction';
import { ArrowRight, CheckCircle, Target, Users, Shield, Lightbulb, Calendar,Trophy } from 'lucide-react';
import Sponsors from '../components/Sponsors';
import NewsHighlights from '../components/NewsHighlights';
import PreRegisterCTA from '../components/PreRegisterCTA';
import SponsorsCTA from '../components/SponsorsCTA';

interface FormData {
  fullName: string;
  email: string;
  areaOfInterest: string;
  yourIdea: string;
}

const topSponsors = [
  {
    name: "IEEE",
    logo: "https://brand-experience.ieee.org/wp-content/uploads/2016/12/LogoTest-e1481836752230.png",
  },
  {
    name: "OECD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/OECD_logo.svg/320px-OECD_logo.svg.png",
  },
  {
    name: "AI Commons",
    logo: "https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg",
  },
  
];

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
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
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('scroll') === 'pre-registration') {
      const element = document.getElementById('pre-registration');
      element?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, document.title, location.pathname);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      const response = await fetch('https://script.google.com/macros/s/AKfycbyZfGY-cxhnhyzrAm8TMEYpWT0xHUl0uXhsDM88uB5h6XbNMp6m2k-7xMhze0ePece8AQ/exec', {
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
          organization: '',
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-[600px] overflow-hidden -mt-16 hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/background1.webp")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between h-full">
            <div className="text-white max-w-3xl pt-16 hero-content" style={{paddingTop: '6rem'}}>
              <h1 className="text-5xl font-bold mb-6 hero-title" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase',fontSize: '5.5rem'}}>Global Trust Challenge</h1>
              <p className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '600',textTransform: 'uppercase',fontSize: '2.5rem'}}>Building Trust in the Age of Generative AI</p>
              <p className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '600',fontSize: '1.5rem'}}>A worldwide innovation challenge uniting technologists, policymakers, and organizations to secure information integrity in an era of AI-generated content</p>
              {/* <p className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '400',fontSize: '1.0rem'}}>Much more than a contest – this is a global call to action. Teams around the world will develop bold tech-and-policy solutions to counter AI-driven misinformation and reinforce trust in our digital ecosystem</p> */}
              <a 
                href="#pre-registration"
                onClick={handlePreRegisterClick}
                className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 mb-8"
                style={{marginRight:'2.5rem'}}
              >
                Join the Challenge
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a 
                href="#pre-registration"
                onClick={handlePreRegisterClick}
                className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 mb-8"
                
                >
                Partner with Us
                <ArrowRight className="ml-2" size={20} />
              </a>

              {/* Mobile Sponsors */}
              <div className="md:hidden">
                <div className="text-white text-sm font-medium mb-4">Brought to you by</div>
                <div className="flex flex-row space-x-4 overflow-x-auto pb-4">
                  {topSponsors.map((sponsor, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 bg-white bg-opacity-90 rounded-lg p-2 w-24 h-12 flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-h-8 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Desktop Sponsors */}
            <div className="hidden md:flex flex-col items-end space-y-4 pt-16" style={{paddingTop: '6rem'}}>
              <div className="text-white text-sm font-medium">Brought to you by</div>
              <div className="flex flex-col space-y-4">
                {topSponsors.map((sponsor, index) => (
                  <div 
                    key={index} 
                    className="bg-white bg-opacity-90 rounded-lg p-2 w-32 h-16 flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Overview */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>Overview</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-6">
              Generative AI is transforming how information is created and shared. While this opens exciting possibilities, it also introduces new risks from deepfakes to disinformation that <span style={{fontWeight:'600'}}> undermine public trust</span> in what we see online.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                <span style={{fontWeight:'600'}}>The Global Trust Challenge</span> was launched to confront this issue head-on. We’re <span style={{fontWeight:'600'}}>rallying innovators worldwide</span> to develop bold solutions combining <span style={{fontWeight:'600'}}>technological tools and policy innovations</span> that can strengthen our defenses against AI-driven misinformation. <span style={{fontWeight:'600'}}>Backed by a global coalition </span> (IEEE, OECD, AI Commons, and more) and born from a G7 call to action, this challenge embodies international collaboration to ensure AI advances with <span style={{fontWeight:'600'}}>integrity, transparency, and accountability</span>.
                </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
                alt="Technology collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

       {/* What Makes This Challenge Unique Section */}
       <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem', marginBottom:'1rem'}}>What Makes This Challenge Unique</h2>
          <p className="text-3xl font-bold mb-12" style={{fontWeight: '600', fontSize:'1.4rem', marginBottom:'1rem'}}>A Global Call — For Everyone</p>
          <p className="text-lg text-gray-600 mb-6"> 
            
This isn't just for governments or tech experts. If you have an idea, a voice, or a vision—you belong here.<br/>
We've built a global platform to support bold ideas from anyone, anywhere. 
Whether you're a coder, a policymaker, a teacher, or a teenager with a big idea—we want to hear from you.

          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              {/* <p className="text-lg text-gray-600 mb-8">
                This is not just a hackathon or a policy competition—it's a global collaboration that bridges the gap between technology and policy. By fostering cross-sector partnerships, we aim to create solutions that are both practical and scalable, ensuring they can be implemented in diverse contexts around the world.
              </p> */}
              <div className="space-y-6">
                  {/*#1 */}
                  <div className="flex items-start">
                    <CheckCircle className="text-indigo-600 mr-3 mt-1" size={24} />
                    <p className="text-gray-700"><span style={{fontWeight:700}}>A Global Coalition:</span> This challenge is <span style={{fontWeight:500}}>organized by leading international organizations</span> and stems from a G7 mandate. It leverages an unprecedented alliance (OECD, UNESCO, IEEE, AI Commons, etc.), giving it <span style={{fontWeight:500}}>global legitimacy and reach</span> that typical competitions lack.</p>
                  </div>
                   {/*#2 */}
                   <div className="flex items-start">
                    <CheckCircle className="text-indigo-600 mr-3 mt-1" size={24} />
                    <p className="text-gray-700"><span style={{fontWeight:700}}>Tech + Policy Integration:</span> We aren’t seeking just tech fixes. <span style={{fontWeight:500}}>Every solution must combine policy and technology</span>. By requiring this interdisciplinary approach, outcomes are more holistic and implementable than a typical tech hackathon’s results. </p>
                  </div>
                  {/*#3 */}
                  <div className="flex items-start">
                    <CheckCircle className="text-indigo-600 mr-3 mt-1" size={24} />
                    <p className="text-gray-700"><span style={{fontWeight:700}}>Worldwide Reach:</span> : Whether you’re in Nairobi, New York, or New Delhi you can compete. <span style={{fontWeight:500}}>Teams from anywhere</span> are invited, ensuring global perspectives shape solutions that work <span style={{fontWeight:500}}>everywhere</span>.</p>
                  </div>
                  {/*#4 */}
                  <div className="flex items-start">
                    <CheckCircle className="text-indigo-600 mr-3 mt-1" size={24} />
                    <p className="text-gray-700"><span style={{fontWeight:700}}>•	Real-World Impact:</span> This isn’t an ideas contest that ends on paper. <span style={{fontWeight:500}}>Top teams will partner with institutions to pilot their solutions</span> in real environments. The best ideas here can directly influence policies and tools adopted worldwide, far beyond the competition itself.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What we are looking for */}
       <section className="py-20 bg-gray-50 relative z-10">
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
      </section>

 <section className="py-10 bg-gray-50">
          {/* Key Phases of the challenge */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>The Challenge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Challenge is divided into three phases, with a rigorous evaluation by a neutral, expert jury at the end of each phase to identify the most promising solutions that will move forward and receive recognition.
            </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  phase: "Phase 1",
                  title: "Proposal",
                  duration: "",
                  description: "Teams propose integrated models combining new policies and technologies, outlining implementation plans, stakeholders, resources, and expected outcomes."
                },
                {
                  icon: Users,
                  phase: "Phase 2",
                  title: "Prototype",
                  duration: "",
                  description: "Teams design and test prototypes based on their policy and technological solutions. Prototypes are evaluated in real-world settings."
                },
                {
                  icon: CheckCircle,
                  phase: "Phase 3",
                  title: "Pilot",
                  duration: "",
                  description: "Successful prototypes are piloted in collaboration with institutional partners. Teams develop strategies for scaling their solutions to maximize impact."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <item.icon className="w-12 h-12 text-indigo-600 mb-4" />
                  <h4 className="text-lg font-semibold text-indigo-600 mb-2">{item.phase}</h4>
                  <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                  {/* <p className="text-gray-600 mb-2">{item.duration}</p> */}
                  <p className="text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
 
      </section>

        {/* How It Works */}
      <section className="py-10 bg-gray-50" style={{paddingTop:'5px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: "Phase 1 Proposal",
                description: "Submit your idea. Teams propose novel policy+tech solutions to build trust. Timeline: Launch Q1 2025; proposals due by end of Q2 2025. For participants: Expert feedback on ideas; ~10 teams advance to Phase 2 and gain recognition on our site and mentorship."
              },
              {
                icon: Lightbulb,
                title: "Phase 2 Prototype",
                description: "Build your solution. Each Phase 1 winner receives $50,000 to develop a prototype. Timeline: Mid 2025 – Early 2026. Teams get a sandbox testing environment and mentorship as they refine their idea. Outcome: Working prototypes submitted; jury selects finalists for Phase 3."
              },
              {
                icon: Target,
                title: "Phase 3 Pilot",
                description: "Test in the real world. Finalist teams each get $250,000 to pilot their solution with partner organizations. Timeline: Mid – Late 2026. This phase validates solutions in real settings and measures impact. Outcome: Final evaluation to choose winners."
              },
              {
                icon: Trophy,
                title: "Final Awards",
                description: "Scale your impact. Up to 5 winning teams share $5 Million in prizes (Early 2027). Winners receive global recognition, present at high-profile events, and feature in international reports – opening doors to scale their solutions globally."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center h-full">
                  <step.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <PreRegisterCTA />

     

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

      <SponsorsCTA />

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
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required>
                  
                </input>
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-indigo-100 mb-1">
                  Tell us a bit about your idea
                </label>
                <textarea
                  id="organization"
                  name="organization"
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