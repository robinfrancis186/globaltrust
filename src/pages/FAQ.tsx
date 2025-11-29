import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is the Global Trust Challenge?",
          a: "The Global Trust Challenge is a worldwide initiative that seeks interdisciplinary solutions combining technology and policy to address challenges posed by generative AI. It aims to develop innovative approaches for ensuring the verification and trustworthiness of AI-generated content."
        },
        {
          q: "Who organizes the Challenge?",
          a: "The challenge is organized by a global coalition, including IEEE SA, OECD-GPAI, AI Commons, UNESCO, VDE, PARIS21, the World Bank, and IDB, bringing together expertise from various sectors and regions."
        }
      ]
    },
    {
      category: "Participation",
      questions: [
        {
          q: "Who can participate?",
          a: "The challenge is open to individuals, teams, and organizations worldwide who are working on innovative solutions in digital trust and security. We welcome participants from diverse backgrounds, including technology, policy, research, and advocacy."
        },
        {
          q: "Is there a team size requirement?",
          a: "Yes, teams should consist of 2-5 members, with at least one technical member. We encourage diverse, multidisciplinary teams that combine different expertise and perspectives."
        },
        {
          q: "How do I register my team?",
          a: "Start by pre-registering through our online form. Once registered, you'll receive detailed information about the full application process and next steps."
        }
      ]
    },
    {
      category: "Challenge Structure",
      questions: [
        {
          q: "How long is the challenge?",
          a: "The challenge runs for 24 months, divided into multiple phases including ideation, development, and final presentations."
        },
        {
          q: "What are the different phases of the challenge?",
          a: "The challenge consists of three main phases: 1) Proposal Submission, where teams submit their integrated solutions, 2) Prototype Development, where selected teams build and test their solutions, and 3) Pilot, where successful prototypes are implemented with institutional partners."
        }
      ]
    },
    {
      category: "Awards & Benefits",
      questions: [
        {
          q: "What can participants win?",
          a: "The challenge offers a comprehensive prize package including monetary awards, mentorship opportunities, and potential investment connections. Winners also gain visibility and networking opportunities with leading organizations in the field."
        },
        {
          q: "What support is provided to participants?",
          a: "Participants receive guidance from industry experts, access to resources and tools, networking opportunities, and feedback throughout the challenge phases."
        }
      ]
    },
    {
      category: "For Partners",
      questions: [
        {
          q: " How do I become a partner?",
          a: "If you are interested in supporting the Challenge as a partner, please get in touch with us via this contact us at global-trust-challenge-team@ieee.org. We are excited to discuss with you the sponsorship role you envision."
        },
        {
          q: "What recognition do partners receive?",
          a: "We are thankful for any partnership in the Global Trust Challenge. Your visibility as a partner will depend on the type and level of contribution. Recognition may thus vary from acknowledgement in press and marketing materials to recognition as title sponsor. In all cases, partners will be acknowledged on the Challenge website."
        },
        {
          q: "What do partners/sponsors do in this Challenge?",
          a: " Partner organizations support the Challenge in various ways – from funding the award pool to providing expertise, hosting pilot programs, or helping reach communities of solvers. In return, partners gain visibility, networking with global experts, and the chance to directly shape solutions. (Learn more on our Partners page.)"
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/FAQ+Background.jpg")',
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
            Frequently Asked <span className="text-[#00AEEF]">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Find answers to common questions about the Global Trust Challenge
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-slate-900 uppercase tracking-tight pl-4 border-l-4 border-blue-500" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const absoluteIndex = categoryIndex * 100 + index;
                  const isOpen = openIndex === absoluteIndex;

                  return (
                    <div key={index} className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200">
                      <button
                        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
                        onClick={() => setOpenIndex(isOpen ? null : absoluteIndex)}
                      >
                        <span className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                          {faq.q}
                        </span>
                        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-100 rotate-180' : 'bg-slate-100 group-hover:bg-blue-50'}`}>
                          {isOpen ? (
                            <Minus className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Plus className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-8 pb-8 pt-0">
                              <p className="text-slate-600 leading-relaxed text-lg border-t border-slate-100 pt-4">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}