import React from 'react';
import { CheckCircle, Calendar, Award, Users } from 'lucide-react';

export default function Guidelines() {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero Section with Parallax */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1454165804606-c3d57bc86b40.webp")',
            
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase',fontSize: '5.5rem'}}>Challenge Details</h1>
            <p className="text-xl mb-8">Everything you need to know about participating in the Global Trust Challenge</p>
          </div>
        </div>
      </section>
{/*What we are looking for */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}>What We Are Looking For</h2>
          <div className="grid md:grid-cols-1 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Unlike traditional competitions, this challenge integrates both technology solutions with policy approaches. It fosters collaboration across sectors and promotes a holistic approach, recognizing that technology alone cannot address the full spectrum of issues. The initiative encourages teams to develop solutions with a focus on long-term viability, adaptability to diverse contexts, and a “do-no-harm” approach. It aims to build trust not just in technology, but also in the systems and processes surrounding it. The challenge emphasizes cross-sector collaboration, with teams from different fields working together to create scalable solutions that manage and mitigate the risks of AI misuse. 
              </p>
              <p className="text-lg text-gray-600 mb-6" style={{marginBottom:'20px'}}>Submissions should incorporate:</p>
              <ul className="space-y-4 text-lg text-gray-600">
                {[
                  "Policy Approaches that support the integrity of information in the age of generative AI. ",
                  "Technological Solutions that align with proposed policies, such as mechanisms for transparency, feedback loops, and content verification.",
                  "Testing and Validation Plans to pilot solutions in real-world settings and demonstrate scalability."   
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-indigo-600 mr-2" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-gray-600 mb-6" style={{marginBottom:'10px', marginTop:'20px'}}>The challenge encourages innovative and forward-thinking solutions, fostering creativity and interdisciplinary collaboration. Teams are expected to offer practical, scalable ideas that can shape the future of digital information integrity.</p>
            </div>
            
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          
          {/* Timeline Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Key Phases of the Challenge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  phase: "Phase 1",
                  title: "Proposal Submission",
                  duration: "[Date TBD]",
                  description: "Teams propose integrated models combining new policies and technologies, outlining implementation plans, stakeholders, resources, and expected outcomes."
                },
                {
                  icon: Users,
                  phase: "Phase 2",
                  title: "Prototype Development",
                  duration: "[Date TBD]",
                  description: "Teams design and test prototypes based on their policy and technological solutions. Prototypes are evaluated in real-world settings."
                },
                {
                  icon: CheckCircle,
                  phase: "Phase 3",
                  title: "Pilot and Scale",
                  duration: "[Date TBD]",
                  description: "Successful prototypes are piloted in collaboration with institutional partners. Teams develop strategies for scaling their solutions to maximize impact."
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

          {/* Submission Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}} >Submission Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Project Requirements</h4>
                <ul className="space-y-3">
                  {[
                    {title:"Policy Approach Formulation",
                    description:"Innovative policy ideas that support technology solutions to ensure trust in AI-generated content."},
                    {title:"Technological Solutions",
                    description:"Technologies that support policy goals, including features for transparency, security, and accountability."},
                    {title:"Testing and Validation Plan",
                    description:"A roadmap for implementing, testing, and scaling the solutions, including stakeholder roles, resource requirements, and evaluation metrics."}
                  ].map((item, index) => (
                    <li key={index} className="bg-white p-3 rounded-lg">    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" style={{    display: 'inline'}} size={20} />
                   <span className="text-m font-bold ">{item.title}: </span>
                  <span className="text-gray-500">{item.description}</span>
                </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Team Requirements</h4>
                <ul className="space-y-3">
                  {[
                    "Members must be 18 years or older",
                    "International teams welcome",
                    "Teams of 2-5 members",
                    "At least one technical member"
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
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Evaluation Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Phase 1",
                  description: "Proposal Evaluation",
                  criteria: [
                    "Relevance",
                    "Feasibility",
                    "Innovation",
                    "Risk Management"
                  ]
                },
                {
                  title: "Phase 2",
                  description: "Prototype Evaluation",
                  criteria: [
                    "Usability",
                    "Scalability",
                    "Technical innovation",
                    "Ethical compliance"
                  ]
                },
                {
                  title: "Phase 3",
                  description: "Pilot and Scale Evaluation",
                  criteria: [
                    "Pilot execution",
                    "Resilience against threats",
                    "Long-term viability"
                  ]
                }
              ].map((category, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-2">{category.title}</h4>
                  <p className="text-indigo-600 font-bold mb-4">{category.description}</p>
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

            {/* Eligibility*/}
           <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Eligibility</h3>
            <div className="grid md:grid-cols-1 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Open to anyone with a policy or technological solution to address the challenges posed by generative AI. Ideally, teams will bring together experts from diverse fields, including digital technology and public policy. 
              </p>              
            </div>   
          </div>
        </div>  

          {/* Terms*/}
           <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Terms</h3>
            <div className="grid md:grid-cols-1 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                The challenge encourages innovative and forward-thinking solutions, fostering creativity and interdisciplinary collaboration. Teams are expected to offer practical, scalable ideas that can shape the future of digital information integrity. 
              </p>              
            </div>   
          </div>
        </div>  

          
        </div>


        
      </section>
    </div>
  );
}