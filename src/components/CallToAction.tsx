import React from 'react';
import { ArrowRight, Calendar, Users, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/card-glow-effect.css';

export default function CallToAction() {
  return (
    <section className="relative py-20 bg-indigo-700">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>Be Part of the Solution</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
           Submit Your Innovative Policy and Technology Proposals Today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Calendar,
              title: "24 Month Program",
              description: "Structured program with expert guidance and milestones"
            },
            {
              icon: Users,
              title: "Global Influence",
              description: "influence emerging standards, shape global regulations"
            },
            
            {
              icon: Target,
              title: "Real Impact",
              description: "Gain visibility as leader in ethical AI innovation"
            }
          ].map((item, index) => (
            <div key={index} className="glow-card text-center" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <item.icon className="glow-icon w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="glow-text text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="glow-text text-indigo-100">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center"
          >
            Register Now
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            to="/guidelines"
            className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}