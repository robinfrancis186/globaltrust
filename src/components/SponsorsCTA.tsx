import React from 'react';
import { Handshake, ArrowRight } from 'lucide-react';

export default function SponsorsCTA() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon with glowing effect */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-indigo-400 rounded-full blur-xl opacity-50" />
              <Handshake className="relative h-16 w-16 text-white" />
            </div>
          </div>
          
          {/* Title with custom font and gradient */}
          <h2 
            className="text-4xl font-bold text-white mb-6"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              letterSpacing: '0.05em',
              background: 'linear-gradient(to right, #fff, #e0e7ff)',
              fontSize: '2.5rem',
              textTransform: 'uppercase',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            WHY NOT PARTNER WITH US? 
          </h2>

          {/* Description with improved readability */}
          <p className="text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
            Contact us at <span style={{color: 'white', fontWeight:'500'}}>global-trust-challenge-team@ieee.org</span> to start the conversation or click below to fill out a sponsorship inquiry.
            
          </p>

          {/* Button with unique hover effect */}
          <a
            href="/partners#sponsor-registration"
            className="group relative inline-flex items-center bg-indigo-600  text-white px-8 py-4 rounded-lg overflow-hidden transition-all duration-300 "
          >
            <span className="relative z-10 font-semibold flex items-center">
              Become a Sponsor
              <ArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 " />
          </a>
        </div>
      </div>
    </div>
  );
}