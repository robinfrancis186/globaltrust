import React from 'react';
import { ArrowRight, Target, Users, Trophy, Lightbulb, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Details() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem'}}>
              Challenge Details
            </h1>
            <p className="text-xl mb-8">
              Building a more trustworthy digital future through innovation and collaboration
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Challenge Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Target,
                title: "Focus Areas",
                description: "AI Trust & Safety, Content Verification, Digital Identity"
              },
              {
                icon: Trophy,
                title: "Prize Pool",
                description: "$250,000 in prizes, mentorship, and investment opportunities"
              },
              {
                icon: Users,
                title: "Who Can Participate",
                description: "Open to teams worldwide with innovative trust solutions"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl mb-8">
                The Global Trust Challenge aims to catalyze innovative solutions that address the growing challenges of digital trust in an AI-powered world. We bring together technologists, policymakers, and thought leaders to develop practical solutions that enhance trust, safety, and transparency in digital systems.
              </p>
              <ul className="space-y-4">
                {[
                  "Foster innovation in trust and safety technologies",
                  "Promote responsible AI development and deployment",
                  "Build global collaboration networks",
                  "Drive policy and technical standards development"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-white mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            How to Participate
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: "Form Your Team",
                description: "Build a team of 2-5 members with diverse skills"
              },
              {
                icon: Lightbulb,
                title: "Submit Proposal",
                description: "Present your innovative solution and implementation plan"
              },
              {
                icon: Target,
                title: "Development",
                description: "Work with mentors to develop your solution"
              },
              {
                icon: Trophy,
                title: "Final Presentation",
                description: "Showcase your solution to industry leaders"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center h-full">
                  <step.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join innovators worldwide in shaping the future of digital trust. Pre-register now to access exclusive resources and connect with industry leaders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/?scroll=pre-registration"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            >
              Pre-register Now
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/guidelines"
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              View Guidelines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}