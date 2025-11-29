import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Users, MapPin, Briefcase } from 'lucide-react';

const teams = [
  {
    name: "Team Alpha",
    members: ["John Doe", "Jane Smith"],
    country: "United States",
    project: "AI Content Verification System",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
  },
  {
    name: "Digital Trust Labs",
    members: ["Maria Garcia", "Alex Chen"],
    country: "Singapore",
    project: "Blockchain-based Trust Protocol",
    image: "https://maximages.s3.us-west-1.amazonaws.com/photo-1600880292203-757bb62b4baf.webp"
  },
  // Add more teams as needed
];

export default function Teams() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80")',
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
            Competing <span className="text-[#00AEEF]">Teams</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Meet the innovators shaping the future of digital trust
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Registered Teams
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Meet the innovative teams working to solve the challenges of digital trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col group hover:border-blue-500/30 transition-all duration-300 bg-white shadow-xl border-slate-100 rounded-3xl overflow-hidden hover:-translate-y-2">
                  <div className="h-56 -mx-6 -mt-6 mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                    <img
                      src={team.image}
                      alt={team.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="flex items-center text-white/90 text-sm font-medium backdrop-blur-md bg-black/30 px-3 py-1 rounded-full border border-white/20">
                        <MapPin className="h-3 w-3 mr-1.5 text-blue-400" />
                        {team.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                      {team.name}
                    </h3>

                    <div className="mb-6">
                      <h4 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Project
                      </h4>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {team.project}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                        <Users className="h-4 w-4 mr-2" />
                        Team Members
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map((member, idx) => (
                          <span key={idx} className="text-sm bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-medium border border-slate-200">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}