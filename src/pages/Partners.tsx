import React from 'react';
import PartnersScroll from '../components/PartnersScroll';
import Sponsors from '../components/Sponsors';
import SponsorsCTA from '../components/SponsorsCTA';
import { CheckCircle, Globe, Award, Eye, Heart } from 'lucide-react';


const sponsors = [
   {
    name: "IEEE",
    logo: "https://brand-experience.ieee.org/wp-content/uploads/2016/12/LogoTest-e1481836752230.png",
  },
  {
    name: "OECD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/OECD_logo.svg/320px-OECD_logo.svg.png",
  },
  {
    name: "AI Commons",
    logo: "https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg",
  },
  // Add more sponsors as needed
];

export default function Partners() {
  return (
    <div className="flex flex-col min-h-screen">
           {/* Hero Section with Parallax */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1556761175-b413da4baf72.webp")',
           
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase',fontSize: '5.5rem'}}>Partners & Sponsors</h1>
            <h2 className="text-3xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>Coalition of Trust-Builders</h2>
            <p className="text-xl mb-8">The Global Trust Challenge is enabled by leading organizations worldwide committed to shaping a trustworthy AI future.
</p>
          </div>
        </div>
      </section>
      

      {/* Sponsors Section */}
      <Sponsors />

      {/* Partnership Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our partners don’t just endorse the Challenge — they help make it possible.
From hosting pilot programs and mentoring teams to providing infrastructure, outreach, or visibility, each partner contributes in ways that align with their mission and strengths.
</p><p className="text-xl text-gray-600 max-w-4xl mx-auto">Whether you’re a city government, tech platform, multilateral body, or grassroots organization — you can play a vital role in shaping how the world responds to AI-driven misinformation.
Together, we’re building an ecosystem of trust.
 
            </p>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Global Impact",
                description: "Support a worldwide initiative tackling a pressing issue. Your sponsorship helps mobilize multi-disciplinary teams across the globe to restore trust in information."
              },
              {
                icon: Award,
                title: "Innovation & Leadership",
                description: "Align your brand with cutting-edge innovation and policy leadership. You'll be at the forefront of shaping how society combats AI-driven misinformation."
              },
              {
                icon: Eye,
                title: "Visibility & Recognition",
                description: "Gain prominent recognition among international experts, governments, and tech leaders. Partners are featured on our website, in media coverage, and at high-profile events associated with the Challenge."
              },
              {
                icon: Heart,
                title: "Ethical Commitment",
                description: "Demonstrate your commitment to ethical AI, transparency, and societal well-being. Supporting this challenge visibly shows you are part of the solution to one of AI's biggest challenges."
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start bg-gray-50 p-8 rounded-lg shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <benefit.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-3" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*/CTA */}
      <SponsorsCTA />

    </div>
  );
}