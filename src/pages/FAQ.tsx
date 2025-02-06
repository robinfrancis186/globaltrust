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
          a: "The challenge runs for 6 months, divided into multiple phases including ideation, development, and final presentations."
        },
        {
          q: "What are the different phases of the challenge?",
          a: "The challenge consists of three main phases: 1) Proposal Submission, where teams submit their integrated solutions, 2) Prototype Development, where selected teams build and test their solutions, and 3) Pilot and Scale, where successful prototypes are implemented with institutional partners."
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
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem'}}>
              Frequently Asked Questions
            </h1>
            <p className="text-xl mb-8">
              Find answers to common questions about the Global Trust Challenge
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const absoluteIndex = categoryIndex * 100 + index;
                  const isOpen = openIndex === absoluteIndex;
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                        onClick={() => setOpenIndex(isOpen ? null : absoluteIndex)}
                      >
                        <span className="font-semibold text-lg">{faq.q}</span>
                        {isOpen ? (
                          <Minus className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Plus className="h-5 w-5 text-indigo-600" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{faq.a}</p>
                        </div>
                      )}
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