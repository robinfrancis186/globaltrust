import React from 'react';
import { CheckCircle, Calendar, Award, Users } from 'lucide-react';

export default function Guidelines() {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero Section with Parallax */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            minHeight: '100vh',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase'}}>Challenge Guidelines</h1>
            <p className="text-xl mb-8">Everything you need to know about participating in the Global Trust Challenge</p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          
          {/* Timeline Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Calendar,
                  phase: "Phase 1",
                  title: "Registration",
                  duration: "March - April 2024",
                  description: "Team formation and project proposal submission"
                },
                {
                  icon: Users,
                  phase: "Phase 2",
                  title: "Development",
                  duration: "May - July 2024",
                  description: "Solution development with mentor support"
                },
                {
                  icon: CheckCircle,
                  phase: "Phase 3",
                  title: "Testing",
                  duration: "August 2024",
                  description: "Solution testing and refinement"
                },
                {
                  icon: Award,
                  phase: "Phase 4",
                  title: "Finals",
                  duration: "September 2024",
                  description: "Final presentations and awards"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <item.icon className="w-12 h-12 text-indigo-600 mb-4" />
                  <h4 className="text-lg font-semibold text-indigo-600 mb-2">{item.phase}</h4>
                  <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                  <p className="text-gray-600 mb-2">{item.duration}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Eligibility & Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Team Requirements</h4>
                <ul className="space-y-3">
                  {[
                    "Teams of 2-5 members",
                    "At least one technical member",
                    "Members must be 18 years or older",
                    "International teams welcome"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Project Requirements</h4>
                <ul className="space-y-3">
                  {[
                    "Original solution addressing trust challenges",
                    "Technical implementation required",
                    "Open source preferred",
                    "Must include policy considerations"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Evaluation Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  weight: "30%",
                  criteria: [
                    "Originality of solution",
                    "Technical innovation",
                    "Creative approach"
                  ]
                },
                {
                  title: "Impact",
                  weight: "40%",
                  criteria: [
                    "Potential for scale",
                    "Societal benefit",
                    "Feasibility"
                  ]
                },
                {
                  title: "Implementation",
                  weight: "30%",
                  criteria: [
                    "Technical excellence",
                    "User experience",
                    "Security considerations"
                  ]
                }
              ].map((category, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-2">{category.title}</h4>
                  <p className="text-indigo-600 font-bold mb-4">{category.weight}</p>
                  <ul className="space-y-2">
                    {category.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                        <span className="text-gray-600">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
