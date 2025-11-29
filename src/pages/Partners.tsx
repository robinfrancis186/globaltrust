import React, { useState } from 'react';
import PartnersScroll from '../components/PartnersScroll';
import Sponsors from '../components/Sponsors';
import SponsorsCTA from '../components/SponsorsCTA';
import { CheckCircle, Globe, Award, Eye, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sponsors = [
  {
    name: "IEEE",
    logo: "https://maximages.s3.us-west-1.amazonaws.com/IEEE_SA-logo-avatar.png",
  },
  {
    name: "OECD",
    logo: "https://maximages.s3.us-west-1.amazonaws.com/OECD_logo.svg.png",
  },
  {
    name: "AI Commons",
    logo: "https://maximages.s3.us-west-1.amazonaws.com/aicommonlogo.svg",
  },
];

interface SponsorshipFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType?: string;
  sponsorshipLevel?: string;
  interests?: string[];
  message: string;
  website?: string;
}

export default function Partners() {
  //**Form Code */
  const [formData, setFormData] = useState<SponsorshipFormData>({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: '',
    sponsorshipLevel: '',
    interests: [],
    message: '',
    website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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
      const response = await fetch('https://script.google.com/macros/s/AKfycbw-06QMrD8ssijtEB-JyxoYpAHFF_ZKNdSSmCVnAfArfHxSCUxFN_7dHVcDI8aFGuMooQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'sponsorship'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your sponsorship inquiry! Our partnerships team will contact you soon.',
        });
        setFormData({
          organizationName: '',
          contactName: '',
          email: '',
          phone: '',
          organizationType: '',
          sponsorshipLevel: '',
          interests: [],
          message: '',
          website: ''
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Cinematic Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Background Video with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            src="https://maximages.s3.us-west-1.amazonaws.com/Partners+%26+Sponrsors+Animation.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight uppercase"
            style={{ fontFamily: '"Barlow Condensed", serif' }}
          >
            Partners & <span className="text-[#00AEEF]">Sponsors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            The Global Trust Challenge is enabled by leading organizations worldwide committed to shaping a trustworthy AI future.
          </motion.p>
        </div>
      </section>

      {/* Sponsors Section */}
      <Sponsors />

      {/* Partnership Benefits Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-100 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Why Partner With Us?
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Our partners don't just endorse the Challenge — they help make it possible.
              From hosting pilot programs to providing infrastructure, each partner contributes to building an ecosystem of trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Global Impact",
                description: "Support a worldwide initiative tackling a pressing issue. Your sponsorship helps mobilize multi-disciplinary teams across the globe to restore trust in information.",
                color: "bg-blue-500"
              },
              {
                icon: Award,
                title: "Innovation & Leadership",
                description: "Align your brand with cutting-edge innovation and policy leadership. You'll be at the forefront of shaping how society combats AI-driven misinformation.",
                color: "bg-purple-500"
              },
              {
                icon: Eye,
                title: "Visibility & Recognition",
                description: "Gain prominent recognition among international experts, governments, and tech leaders. Partners are featured on our website and at high-profile events.",
                color: "bg-cyan-500"
              },
              {
                icon: Heart,
                title: "Ethical Commitment",
                description: "Demonstrate your commitment to ethical AI, transparency, and societal well-being. Supporting this challenge visibly shows you are part of the solution.",
                color: "bg-pink-500"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-start bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className={`flex-shrink-0 p-4 rounded-xl ${benefit.color} bg-opacity-10`}>
                  <benefit.icon className={`w-8 h-8 ${benefit.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 uppercase" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SponsorsCTA />

      {/* Sponsorship Form */}
      <section id="sponsor-registration" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Join Us as a Partner
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Let's discuss how your organization can make a meaningful impact in the global information ecosystem.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-xl ${submitStatus.type === 'success'
                    ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                    : 'bg-red-500/20 text-red-100 border border-red-500/30'
                    }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Organization Information */}
                <div className="md:col-span-2 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                    Organization Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <label htmlFor="organizationName" className="block text-sm font-medium text-blue-100">
                    Organization Name *
                  </label>
                  <input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium text-blue-100">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="organizationType" className="block text-sm font-medium text-blue-100">
                    Organization Type *
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none [&>option]:text-slate-900"
                    required
                  >
                    <option value="">Select organization type</option>
                    <option value="corporation">Corporation</option>
                    <option value="nonprofit">Non-profit</option>
                    <option value="government">Government Agency</option>
                    <option value="academic">Academic Institution</option>
                    <option value="foundation">Foundation</option>
                    <option value="association">Professional Association</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2 border-b border-white/10 pb-4 mt-4">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactName" className="block text-sm font-medium text-blue-100">
                    Contact Name *
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-blue-100">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Areas of Interest */}
                <div className="md:col-span-2 border-b border-white/10 pb-4 mt-4">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                    Areas of Interest
                  </h3>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <input
                    id="interests"
                    name="interests"
                    type="text"
                    value={formData.interests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                    placeholder="E.g., Brand Visibility, Thought Leadership..."
                    required
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-blue-100">
                    Tell us about your goals
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Describe your organization's objectives..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-blue-500/25 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'
                    }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  <ArrowRight className="ml-2" size={24} />
                </button>
              </div>

              <p className="text-sm text-blue-200/60 text-center">
                Our partnerships team will review your inquiry and contact you within 2 business days.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}