import React from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function PreRegisterCTA() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/?scroll=pre-registration');
    } else {
      const element = document.getElementById('pre-registration');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-indigo-600 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Lightbulb className="h-8 w-8 text-indigo-200" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', 
    fontSize: '2.5rem'}}>
          Got an Idea?
        </h2>
        <p className="text-indigo-100 mb-6 text-xl">
          Pre-register now to be among the first to submit your innovative solution
        </p>
        <a
          href="#pre-registration"
          onClick={handleClick}
          className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200"
        >
          Pre-register Now
          <ArrowRight className="ml-2" size={20} />
        </a>
      </div>
    </div>
  );
}