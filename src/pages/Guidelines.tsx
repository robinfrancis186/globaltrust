import React from 'react';
import { CheckCircle, Calendar, Award, Users, ArrowRight } from 'lucide-react';
import PreRegisterCTA from '../components/PreRegisterCTA';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

export default function Guidelines() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1451187580459-43490279c0fa.webp")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase"
            style={{ fontFamily: '"Barlow Condensed", serif' }}
          >
            Challenge <span className="text-[#00AEEF]">Details</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Everything you need to know about participating in the Global Trust Challenge
          </motion.p>
        </div>
      </section>

      {/* What We Are Looking For */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="bg-white/90 backdrop-blur-xl shadow-2xl border-slate-100 p-10 md:p-16 rounded-3xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-black mb-8 text-slate-900 uppercase tracking-tight text-center" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                  What We Are Looking For
                </h2>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed text-center font-light">
                  The Global Trust Challenge seeks groundbreaking solutions that combine technological innovation with policy frameworks to address the challenges of AI-generated content.
                </p>

                <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 mb-10">
                  <h3 className="text-lg font-bold text-blue-900 mb-6 uppercase tracking-wide">Submissions should incorporate:</h3>
                  <ul className="space-y-6">
                    {[
                      { title: "Policy Approaches", desc: "Support the integrity of information in the age of generative AI." },
                      { title: "Technological Solutions", desc: "Align with proposed policies, such as mechanisms for transparency, feedback loops, and content verification." },
                      { title: "Testing and Validation Plans", desc: "Pilot solutions in real-world settings and demonstrate scalability." }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-blue-600 rounded-full p-1 mt-1 mr-4 flex-shrink-0">
                          <CheckCircle className="text-white w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-lg block mb-1">{item.title}</span>
                          <span className="text-slate-600 text-lg">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg text-slate-600 text-center italic">
                  The challenge encourages innovative and forward-thinking solutions, fostering creativity and interdisciplinary collaboration. Teams are expected to offer practical, scalable ideas that can shape the future of digital information integrity.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <PreRegisterCTA />

      {/* Who Can Participate */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-black mb-8 text-slate-900 uppercase tracking-tight leading-none" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                Who Can <br /><span className="text-blue-600">Participate?</span>
              </h2>
              <div className="w-20 h-2 bg-blue-600 mb-8"></div>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
                We welcome multidisciplinary teams from around the world—whether you’re a technologist, policymaker, researcher, or advocate. If you have a bold idea to address the challenges of generative AI, we want to hear from you.
              </p>
              <p className="text-lg text-slate-600 font-medium">
                Don’t have a full team? Start the process and pre-register, and you will have to gather the right team. We’ll support you with experts to bring your vision to life.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="Diverse team collaborating"
                className="relative rounded-3xl shadow-2xl border-4 border-white"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        {/* Timeline Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Key Phases of the Challenge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">{item.phase}</h4>
                <h5 className="text-2xl font-bold mb-3 text-slate-900 leading-tight">{item.title}</h5>
                <p className="text-slate-400 text-sm font-bold mb-4 uppercase tracking-wide">{item.duration}</p>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Submission Requirements */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <GlassCard className="bg-white shadow-xl border-slate-100 p-10 md:p-12 rounded-3xl">
            <h3 className="text-3xl font-black mb-10 text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-6" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Submission Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-bold mb-6 text-slate-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Project Requirements
                </h4>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Policy Approach Formulation",
                      description: "Innovative policy ideas that support technology solutions to ensure trust in AI-generated content."
                    },
                    {
                      title: "Technological Solutions",
                      description: "Technologies that support policy goals, including features for transparency, security, and accountability."
                    },
                    {
                      title: "Testing and Validation Plan",
                      description: "A roadmap for implementing, testing, and scaling the solutions, including stakeholder roles, resource requirements, and evaluation metrics."
                    }
                  ].map((item, index) => (
                    <li key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="text-lg font-bold text-slate-900 block mb-1">{item.title}</span>
                          <span className="text-slate-600 leading-relaxed">{item.description}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-6 text-slate-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Team Requirements
                </h4>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full">
                  <ul className="space-y-4">
                    {[
                      "Members must be 18 years or older",
                      "International teams welcome",
                      "Teams of 2-5 members",
                      "At least one technical member"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="text-green-600 w-4 h-4" />
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Evaluation Criteria */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-6 text-slate-900 uppercase tracking-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
              Evaluation Criteria
            </h3>
          </div>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-wide">{category.title}</h4>
                  <Award className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-blue-600 font-bold mb-6 text-lg">{category.description}</p>
                <ul className="space-y-3">
                  {category.criteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-slate-600 font-medium">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Briefcase(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}