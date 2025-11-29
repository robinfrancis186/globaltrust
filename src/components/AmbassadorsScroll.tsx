import React from 'react';

interface Partner {
  name: string;
  role: string;
  image: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: "Kay Firth-Butterfield",
    role: "Good Tech Advisory",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Kay Firth Butterfield.webp",
    url: "https://kayfirthbutterfield.com/"
  },
  {
    name: "Tanya Perelmutter",
    role: "Foundation Abeona",
    image: "https://maximages.s3.us-west-1.amazonaws.com/tanya_abeona_hu8746895381734342456.jpg",
    url: "https://www.fondation-abeona.org/collective/tanya-perelmuter/"
  },
  {
    name: "Alessandra Sala",
    role: "Shutterstock ",
    image: "https://maximages.s3.us-west-1.amazonaws.com/AlessandraSalal.jpeg",
    url: "https://www.linkedin.com/in/salaalessandra/"
  },
  {
    name: "Sasha Rubel",
    role: "Amazon / AWS",
    image: "https://maximages.s3.us-west-1.amazonaws.com/sasha-rubel.jpg",
    url: "https://www.linkedin.com/in/sasha-rubel-2517936/"
  },
  {
    name: "Shameek Kundu",
    role: "AI Verify",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Shameek Kundu.jpeg",
    url: "https://www.linkedin.com/in/shameekkundu/"
  },
  {
    name: "Sophie Fallaha",
    role: "CEIMIA",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Sophie-Fallaha.jpg",
    url: "https://italchamber.qc.ca/speakers/sophie-fallaha-ceimia/"
  }

  // Add more partners as needed
];

export default function AmbassadorsScroll() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <a href={partner.url} key={"A" + index} target="new" className="block group">
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-slate-100 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-w-1 aspect-h-1 w-full mb-4 overflow-hidden rounded-lg">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                  style={{ objectFit: 'scale-down' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-slate-900 group-hover:text-blue-600 transition-colors">{partner.name}</h3>
              <p className="text-slate-600 text-center text-sm mt-1">{partner.role}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}