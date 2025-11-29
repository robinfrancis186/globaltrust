import React from 'react';
import { Plus, Minus } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/FAQ+Background.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem' }}>
              Frequently Asked Questions
            </h1>
            <p className="text-xl mb-8 text-slate-100">
              Find answers to common questions about the Global Trust Challenge
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-slate-900" style={{ fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const absoluteIndex = categoryIndex * 100 + index;
                  const isOpen = openIndex === absoluteIndex;

                  return (
                    <div key={index} className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                      <button
                        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                        onClick={() => setOpenIndex(isOpen ? null : absoluteIndex)}
                      >
                        <span className="font-semibold text-lg text-slate-900">{faq.q}</span>
                        {isOpen ? (
                          <Minus className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Plus className="h-5 w-5 text-blue-600" />
                        )}
                      </button>
                      <div
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}