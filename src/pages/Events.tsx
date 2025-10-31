import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreRegisterCTA from '../components/PreRegisterCTA';
import BCMSNewsHighlights from '../components/BCMSNewsHighlights';


export default function Events() {
 

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem'}}>
              Events & News
            </h1>
            <p className="text-xl mb-8">
              Stay updated with the latest announcements, events, and news about the Global Trust Challenge
            </p>
          </div>
        </div>
      </section>

     

      {/* Content Section */}
      <BCMSNewsHighlights maxRecords={12} isHomePage={false}/>

      

      {/* CTA Section */}
      <PreRegisterCTA />
    </div>
  );
}