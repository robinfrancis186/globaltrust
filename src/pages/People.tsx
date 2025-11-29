import React from 'react';
import PartnersScroll from '../components/PartnersScroll';
import AmbassadorsScroll from '../components/AmbassadorsScroll';
import JudgesScroll from '../components/JudgesScroll';
import { Users, Award, Gavel, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'judges', name: 'Judges', icon: Gavel },
  { id: 'ambassadors', name: 'Ambassadors', icon: Award },
  { id: 'experts', name: 'Contributing Experts', icon: Users },
  { id: 'volunteers', name: 'Volunteers', icon: Heart }
];

export default function People() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/People+Page+Photo.webp")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-50" />
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
            Our <span className="text-[#00AEEF]">People</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            People contributing to trust in technology
          </motion.p>
        </div>
      </section>

      {/* Section Navigation */}
      <div className="sticky top-20 z-40 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-2 flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 group"
              >
                <section.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700 uppercase tracking-wide">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* People Intro Section */}
      <section id="intro" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black mb-8 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Our Community
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              The Global Trust Challenge is powered by a diverse group of dedicated individuals — from policy specialists and technologists to educators, designers, and community leaders. Together, they bring wide-ranging perspectives and skills to a shared mission: fostering collaboration and developing solutions that can strengthen trust in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Judges Section */}
      <section id="judges" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Judges
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              The Global Trust Challenge has been shaped with the insight and support of world-leading experts across AI, policy, law, and media.
              Each of our judges brings deep experience in advancing responsible innovation and a commitment to restoring trust in the digital age.
            </p>
          </div>
          <JudgesScroll />
        </div>
      </section>

      {/* Ambassadors Section */}
      <section id="ambassadors" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Ambassadors
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Challenge Ambassadors help bring the Global Trust Challenge to life by championing its mission in their regions, mobilizing local networks, and spotlighting solutions that uphold trust and integrity in the age of AI.
            </p>
          </div>
          <AmbassadorsScroll />
        </div>
      </section>

      {/* Expert Section */}
      <section id="experts" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Contributing Experts
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              The Global Trust Challenge has been developed with the support and collaboration of a multi-disciplinary group of experts from around the world.
            </p>
          </div>
          <PartnersScroll />
        </div>
      </section>

      {/* Volunteers Section */}
      <section id="volunteers" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100"
          >
            <h2 className="text-4xl font-black mb-8 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Want to help shape a more trustworthy digital future?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              We’re looking for passionate volunteers to support the Global Trust Challenge across outreach, mentorship, coordination, and more. Whatever your background, there’s a role for you.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
              Join as a Volunteer
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}