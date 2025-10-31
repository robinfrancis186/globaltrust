import React from 'react';

interface Sponsor {
  name: string;
  logo: string;
}

const sponsors = [
    {
    name: "IEEE",
    logo: "https://maximages.s3.us-west-1.amazonaws.com/IEEE_SA-logo-avatar.png",
  },
   {
    name: "OECD",
    logo: "https://maximages.s3.us-west-1.amazonaws.com/QECDLogo.png",
  },
  {
    name: "AI Commons",
    logo: "https://maximages.s3.us-west-1.amazonaws.com/aicommonlogo.svg",
  },
  {
    name: "UNESCO",
    logo: "https://upload.wikimedia.org/wikipedia/wikimania/thumb/5/56/UNESCO_logo.png/320px-UNESCO_logo.png",
  },
  {
    name: "World Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/320px-The_World_Bank_logo.svg.png",
  },
  {
    name: "IDB",
    logo: "https://www.greenclimate.fund/sites/default/files/styles/small/public/organisation/logo-idb.png",
  }
  
];

const supportingSponsors = [
  {
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/320px-Adobe_Corporate_logo.svg.png",
  },
  {
    name: "C2PA",
    logo: "https://blog.adobe.com/en/publish/2022/01/26/media_1013a0a4473e0e4630c994f59c16f071c7145f5fc.jpeg?width=2000&format=webply&optimize=medium",
  },
  {
    name: "CAI",
    logo: "https://adobe-cai-contentauthenticity-backend-prod.s3.us-east-1.amazonaws.com/CAI_Logo_322a6a374f.svg",
  },
  {
    name: "CEIMIA",
    logo: "https://www.scaleai.ca/wp-content/uploads/2022/08/ceimia_logo_fondblanc_rgb_bil_rev-e1662475989317-1920x1296.png",
  },
  {
    name: "ITU",
    logo: "https://www.un.org/sites/un2.un.org/files/field/image/ituv2-01.jpg",
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png",
  }
];

export default function Sponsors() {
  return (
    <div className="w-full bg-white">
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Founding Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-white rounded-lg p-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center h-24">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-16 w-auto object-contain filter hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black bg-opacity-50 text-white text-sm py-1 px-3 rounded-full">
                    {sponsor.name}
                  </div>
                </div>
                <div className=" flex items-center justify-center" style={{color: 'grey', fontSize: '0.8rem'}}>{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Supporting Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center">
            {supportingSponsors.map((sponsor, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-white rounded-lg p-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center h-24">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-16 w-auto object-contain filter hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black bg-opacity-50 text-white text-sm py-1 px-3 rounded-full">
                    {sponsor.name}
                  </div>
                </div>
                <div className=" flex items-center justify-center" style={{color: 'grey', fontSize: '0.8rem'}}>{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}