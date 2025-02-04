import React from 'react';

interface Sponsor {
  name: string;
  logo: string;
}
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
  {
    name: "AI Commons",
    logo: "https://superfluid.io/ai-commons/images/new/Asset12-AI-Icon.svg",
  },
  {
    name: "IDB",
    logo: "https://www.greenclimate.fund/sites/default/files/styles/small/public/organisation/logo-idb.png",
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png",
  },
  // Add more sponsors as needed
];
export default function Sponsors() {
  return (
    <div className="w-full">
       <section className="py-20"  style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.5rem'}}> Founding Partners</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            We are grateful for the support of our sponsors who make this challenge possible.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}