import React from 'react';
import PartnersScroll from '../components/PartnersScroll';
import Sponsors from '../components/Sponsors';

const sponsors = [
  {
    name: "UNESCO",
    logo: "https://upload.wikimedia.org/wikipedia/wikimania/thumb/5/56/UNESCO_logo.png/320px-UNESCO_logo.png",
  },
  {
    name: "OECD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/OECD_logo.svg/320px-OECD_logo.svg.png",
  },
  {
    name: "IEEE",
    logo: "https://brand-experience.ieee.org/wp-content/uploads/2016/12/LogoTest-e1481836752230.png",
  },
  {
    name: "World Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/320px-The_World_Bank_logo.svg.png",
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
            <p className="text-xl mb-8">The challenge is brought to you by a coalition of organizations caring about how AI is impacting our future and how we can evolve with AI.
</p>
          </div>
        </div>
      </section>
      

      {/* Sponsors Section */}
      <Sponsors />
      
    </div>
  );
}