import React from 'react';
import { ArrowRight, Target, Trophy, Lightbulb, CheckCircle, Handshake, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Details() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Cinematic Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Background Video/Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1451187580459-43490279c0fa.webp")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase"
            style={{ fontFamily: '"Barlow Condensed", serif' }}
          >
            Challenge <span className="text-[#00AEEF]">Overview</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Building a more trustworthy digital future through innovation and collaboration
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                Our Mission
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                The Global Trust Challenge seeks interdisciplinary solutions that integrate both technology and policy to address the challenges posed by generative AI. Participants are invited to propose novel, forward-thinking approaches that not only develop technology but also propose complementary policies.
              </p>
              <div className="flex items-center space-x-4 text-blue-600 font-semibold">
                <CheckCircle className="w-6 h-6" />
                <span>Verify AI-generated content</span>
              </div>
              <div className="flex items-center space-x-4 text-blue-600 font-semibold mt-4">
                <CheckCircle className="w-6 h-6" />
                <span>Support trustworthy AI deployment</span>
              </div>
              <div className="flex items-center space-x-4 text-blue-600 font-semibold mt-4">
                <CheckCircle className="w-6 h-6" />
                <span>Enhance information ecosystem resilience</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-10" />
              <img
                src="https://maximages.s3.us-west-1.amazonaws.com/photo-1522071820081-009f0129c71c.webp"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Goals */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Challenge Key Goals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Handshake,
                title: "Enhancing Trust",
                description: "Ensuring that AI-generated content is reliable and verifiable",
                color: "bg-blue-500"
              },
              {
                icon: Shield,
                title: "Protecting Users",
                description: "Promoting media literacy and providing tools to identify AI-generated content",
                color: "bg-purple-500"
              },
              {
                icon: Users,
                title: "Supporting Governance",
                description: "Encouraging policy mechanisms for transparency and content flagging",
                color: "bg-cyan-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${item.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-10 h-10 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 uppercase" style={{ fontFamily: '"Barlow Condensed", serif' }}>{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Unique Feature */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                Unique Features of the Challenge
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed font-light">
                Unlike traditional competitions, this challenge integrates both technology solutions with policy approaches. It fosters collaboration across sectors and promotes a holistic approach, recognizing that technology alone cannot address the full spectrum of issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Phase 1 Proposal",
                description: "Submit your idea. Teams propose novel policy+tech solutions to build trust. Timeline: Launch Q1 2025.",
                step: "01"
              },
              {
                icon: Lightbulb,
                title: "Phase 2 Prototype",
                description: "Build your solution. Each Phase 1 winner receives $50,000 to develop a prototype. Timeline: Mid 2025.",
                step: "02"
              },
              {
                icon: Target,
                title: "Phase 3 Pilot",
                description: "Test in the real world. Finalist teams each get $250,000 to pilot their solution. Timeline: Mid 2026.",
                step: "03"
              },
              {
                icon: Trophy,
                title: "Final Awards",
                description: "Scale your impact. Up to 5 winning teams share $5 Million in prizes. Timeline: Early 2027.",
                step: "04"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 h-full relative overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black text-slate-900" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                    {step.step}
                  </div>
                  <step.icon className="w-12 h-12 text-blue-600 mb-6" />
                  <h3 className="text-xl font-bold mb-4 text-slate-900 uppercase" style={{ fontFamily: '"Barlow Condensed", serif' }}>{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-blue-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
            Be Part of the Solution
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 font-light">
            Submit Your Innovative Policy and Technology Proposals Today!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/?scroll=pre-registration"
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-lg uppercase tracking-wide hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
            >
              Pre-register Now
              <ArrowRight className="ml-2" size={24} />
            </Link>
            <Link
              to="/guidelines"
              className="px-10 py-5 border-2 border-slate-200 text-slate-700 rounded-full font-bold text-lg uppercase tracking-wide hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              View More Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}