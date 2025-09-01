import React from 'react';
import PartnersScroll from '../components/PartnersScroll';
import AmbassaordsScroll from '../components/AmbassadorsScroll';
import Sponsors from '../components/Sponsors';
import { Users, Award, Gavel, Heart } from 'lucide-react';
import AmbassadorsScroll from '../components/AmbassadorsScroll';
import JudgesScroll from '../components/JudgesScroll';

const sections = [
  { id: 'judges', name: 'Judges', icon: Gavel },
  { id: 'ambassadors', name: 'Ambassadors', icon: Award },
  { id: 'experts', name: 'Contributing Experts', icon: Users },
  { id: 'volunteers', name: 'Volunteers', icon: Heart }
];

export default function People() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/People+Page+Photo.webp")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem'}}>
              People
            </h1>
            <p className="text-xl mb-8">People contributing to trust in technology</p>
          </div>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                <section.icon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

{/* People Intro Section */}
     <section id="intro" className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.2rem'}}>
            Our People
          </h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            The Global Trust Challenge is powered by a diverse group of dedicated individuals — from policy specialists and technologists to educators, designers, and community leaders. Together, they bring wide-ranging perspectives and skills to a shared mission: fostering collaboration and developing solutions that can strengthen trust in the digital age.

          </p>
         
        </div>
      </section>
     

     {/* Judges Section */}
     <section id="judges" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.2rem'}}>
            Judges
          </h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            The Global Trust Challenge has been shaped with the insight and support of world-leading experts across AI, policy, law, and media.
Each of our judges brings deep experience in advancing responsible innovation and a commitment to restoring trust in the digital age.

          </p>
          <JudgesScroll />
        </div>
      </section>

      {/* Ambassadors Section */}
      <section id="ambassadors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.2rem'}}>
            Ambassadors
          </h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Challenge Ambassadors help bring the Global Trust Challenge to life by championing its mission in their regions, mobilizing local networks, and spotlighting solutions that uphold trust and integrity in the age of AI.
          </p>
          <AmbassadorsScroll/>
        </div>
      </section>

      {/* Expert Section */}
      <section id="experts" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.2rem'}}>
                  Contributing Experts
                </h2>
                <p className="text-xl text-center max-w-3xl mx-auto mb-12">
                  The Global Trust Challenge has been developed with the support and collaboration of a multi-disciplinary group of experts from around the world.
                </p>
                <PartnersScroll />
              </div>
        </section>
 

      {/* Volunteers Section */}
      <section id="volunteers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.2rem'}}>
            Want to help shape a more trustworthy digital future?
          </h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            We’re looking for passionate volunteers to support the Global Trust Challenge across outreach, mentorship, coordination, and more. Whatever your background, there’s a role for you.
            Volunteers will support outreach, mentorship, coordination, and event facilitation to help participants and partners throughout the Challenge.

          </p>
          {/* Place content here */}
        </div>
      </section>
    </div>
  );
}