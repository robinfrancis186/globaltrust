import React from 'react';
import { ArrowRight, Target, Trophy, Lightbulb, CheckCircle, Handshake, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Details() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1451187580459-43490279c0fa.webp")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem'}}>
              Challenge Overview
            </h1>
            <p className="text-xl mb-8">
              Building a more trustworthy digital future through innovation and collaboration
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xl mb-6">
                The Global Trust Challenge seeks interdisciplinary solutions that integrate both technology and policy to address the challenges posed by generative AI. Participants are invited to propose novel, forward-thinking approaches that not only develop technology but also propose complementary policies. These solutions should ensure the verification and trustworthiness of AI-generated content, support trustworthy AI deployment, and enhance the resilience of information ecosystems.
              </p>
              
            </div>
            <div className="relative">
              <img
                src="https://maximages.s3.us-west-1.amazonaws.com/photo-1522071820081-009f0129c71c.webp"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Goals */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Challenge Key Goals
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Handshake,
                title: "Enhancing Trust",
                description: "Ensuring that AI-generated content is reliable and verifiable"
              },
              {
                icon: Shield,
                title: "Protecting Users",
                description: "Promoting media literacy and providing tools to identify AI-generated content"
              },
              {
                icon: Users,
                title: "Supporting Governance",
                description: "Encouraging policy mechanisms for transparency and content flagging"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/*Unique Feature */}
      <section className="py-20 relative z-10 bg-white">
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold mb-12 " style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>Unique Features of the Challenge</h2>
          <div className="grid md:grid-cols-1 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Unlike traditional competitions, this challenge integrates both technology solutions with policy approaches. It fosters collaboration across sectors and promotes a holistic approach, recognizing that technology alone cannot address the full spectrum of issues. The initiative encourages teams to develop solutions with a focus on long-term viability, adaptability to diverse contexts, and a “do-no-harm” approach. It aims to build trust not just in technology, but also in the systems and processes surrounding it. The challenge emphasizes cross-sector collaboration, with teams from different fields working together to create scalable solutions that manage and mitigate the risks of AI misuse.
              </p>
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
                title: "Register Your Team",
                description: "Submit your team registration"
              },
              {
                icon: Lightbulb,
                title: "Submit Proposal",
                description: "Submit your innovative solution and implementation plan"
              },
              {
                icon: Target,
                title: "Prototype Development",
                description: "Design and test your prototype"
              },
              {
                icon: Trophy,
                title: "Pilot and Scale",
                description: "Teams develop strategies for scaling their solutions to maximize impact."
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
              View More Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
