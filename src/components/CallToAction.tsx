import React from 'react';
import { ArrowRight, Calendar, Users, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <h2 className="text-4xl font-bold text-white mb-4" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>Ready to Make an Impact?</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Join innovators worldwide in shaping the future of digital trust. Pre-Register now to access exclusive resources and connect with industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            {
              icon: Calendar,
              title: "6 Month Program",
              description: "Structured program with expert guidance and milestones"
            },
            {
              icon: Users,
              title: "Global Network",
              description: "Connect with participants and mentors worldwide"
            },
            {
              icon: Trophy,
              title: "Prize Pool",
              description: "Compete for substantial rewards and recognition"
            },
            {
              icon: Target,
              title: "Real Impact",
              description: "Develop solutions for real-world trust challenges"
            }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <item.icon className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-indigo-100">{item.description}</p>
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