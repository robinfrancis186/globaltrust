import React from 'react';
import { ArrowRight, Target, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JourneyCTA() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
          From Proposal to Prototype to Pilot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Target,
              title: "Proposal",
              description: "Submit your innovative solution"
            },
            {
              icon: Users,
              title: "Prototype",
              description: "Develop and test your ideas"
            },
            {
              icon: Trophy,
              title: "Pilot",
              description: "Scale your impact globally"
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                <step.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/guidelines"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            See How Your Ideas Can Make an Impact
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}