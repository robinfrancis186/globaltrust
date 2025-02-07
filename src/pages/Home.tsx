import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PartnersScroll from '../components/PartnersScroll';
import CallToAction from '../components/CallToAction';
import { ArrowRight, CheckCircle, Target, Users, Shield, Lightbulb } from 'lucide-react';
import Sponsors from '../components/Sponsors';

import PreRegisterCTA from '../components/PreRegisterCTA';

interface FormData {
  fullName: string;
  email: string;
  organization: string;
  areaOfInterest: string;
}

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    organization: '',
    areaOfInterest: '',
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
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16 hero-content">
            <h1 className="text-5xl font-bold mb-6 hero-title" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase',fontSize: '5.5rem'}}>Global Trust Challenge</h1>
            <p className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '600',textTransform: 'uppercase',fontSize: '2.5rem'}}>Building Trust in the Age of AI</p>
            {/*<p className="text-xl mb-8">Join the Movement to Strengthen Information Ecosystems, Foster Transparency, and Safeguard Democratic Values
</p>*/}
            <a 
              href="#pre-registration"
              onClick={handlePreRegisterClick}
              className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Pre-register Now
              <ArrowRight className="ml-2" size={20} />
            </a>
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
                Generative AI is transforming how information is created, shared, and consumed. While these systems enhance the speed and diversity of information flow, they also pose risks of misuse, such as disinformation, deepfakes, and cyberattacks. The Global Challenge to Build Trust in the Age of Generative AI aims to tackle these issues by developing policies and technologies to ensure the public can trust the information they consume online. This initiative seeks to build a trustworthy, transparent, and resilient information ecosystem that supports democratic values and societal well-being.</p>
<p className="text-lg text-gray-600 mb-6">
The challenge is organized by a global coalition, including IEEE SA, OECD-GPAI, AI Commons, UNESCO, VDE, PARIS21, the World Bank, and IDB. Its focus is on promoting global collaboration to combat the threats posed by generative AI with regards to information integrity online and ensuring that content online is verifiable, accurate, and trustworthy.
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

      {/* What We're Looking For Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>What We're Looking For</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-8">
                We seek innovative, integrated solutions that combine policy frameworks and technological advancements to address the risks of AI-generated content. Whether you're proposing new tools for content verification, policies to promote transparency, or strategies to enhance media literacy, your ideas can shape the future of trustworthy information ecosystems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Content Verification",
                    description: "Tools and frameworks for validating AI-generated content"
                  },
                  {
                    icon: Lightbulb,
                    title: "Policy Innovation",
                    description: "Novel approaches to regulatory frameworks"
                  },
                  {
                    icon: Target,
                    title: "Media Literacy",
                    description: "Solutions for enhanced digital awareness"
                  },
                  {
                    icon: Users,
                    title: "Collaborative Approach",
                    description: "Cross-sector partnership solutions"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <item.icon className="w-12 h-12 text-indigo-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
                alt="Innovation collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <PreRegisterCTA />

      {/* What Makes This Challenge Unique Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>What Makes This Challenge Unique</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-8">
                This is not just a hackathon or a policy competition—it's a global collaboration that bridges the gap between technology and policy. By fostering cross-sector partnerships, we aim to create solutions that are both practical and scalable, ensuring they can be implemented in diverse contexts around the world.
              </p>
              <div className="space-y-6">
                {[
                  "Integration of technology and policy solutions",
                  "Global collaboration across sectors",
                  "Focus on practical, scalable implementations",
                  "Support from leading international organizations"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-indigo-600 mr-3 mt-1" size={24} />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Mission */}
      <section className="py-20 bg-gray-100 relative z-10">
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
      </section>

      {/* Call to Action Section */}
      <CallToAction />

      {/* Partners Section */}
      <section className="py-20 bg-grey-100 relative z-10" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
         <Sponsors />
      </section> 

     

      {/* Pre-registration Form */}
      <section id="pre-registration" className="py-20 relative z-10 bg-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem', color:'#ffffff'}}>Pre-registration Form</h2>
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
                <label htmlFor="organization" className="block text-sm font-medium text-indigo-100 mb-1">
                  Organization
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-medium text-indigo-100 mb-1">
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select an area</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="privacy">Privacy</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="ai">Artificial Intelligence</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 border-2 border-white text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Pre-register Now'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}