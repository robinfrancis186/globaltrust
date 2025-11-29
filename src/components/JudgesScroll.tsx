import React from 'react';

interface Partner {
  name: string;
  role: string;
  image: string;
  url: string;
  bios: string
}

const partners: Partner[] = [
  {
    name: "Stuart Russell",
    role: "UC Berkeley",
    image: "https://maximages.s3.us-west-1.amazonaws.com/stuart Russell.webp",
    url: "https://people.eecs.berkeley.edu/~russell/",
    bios: "Stuart Russell is a world-renowned AI researcher and co-author of “Artificial Intelligence: A Modern Approach,” Stuart is a leading voice on aligning AI with human values and ethics."
  },
  {
    name: "Catherine Regis",
    role: "University of Montreal",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Catherine Regis.jpeg",
    url: "https://droit.umontreal.ca/en/faculty/the-team/professors/details/in/in18868/sg/Catherine%20R%C3%A9gis/",
    bios: "Catherine Regis is an expert in international law and digital health governance, Catherine plays a key role in shaping responsible AI policy at the intersection of law, ethics, and innovation."

  },
  {
    name: "Andy Parsons",
    role: "Adobe",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Andy parsons.jpg",
    url: "https://www.linkedin.com/in/andyparsons/",
    bios: "Andy Parsons is the head of the Content Authenticity Initiative, Andy leads global efforts to bring transparency to digital media and combat misinformation through open standards and technology."
  },
  {
    name: "Margaret Mitchell",
    role: "Hugging Face",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Margaret Mitchell.webp",
    url: "https://www.linkedin.com/in/margaret-mitchell-9b13429/",
    bios: "Margaret Mitchell is a pioneer in ethical AI and fairness research, Margaret is known for championing algorithmic accountability and transparency in machine learning development."
  },
  {
    name: "Vilas Dhar",
    role: "Patrick J. McGovern Foundation",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Vilas Dhar.jpg",
    url: "https://www.mcgovern.org/about-president-vilas-s-dhar/",
    bios: ""
  },
  {
    name: "Gabriela Ramos",
    role: "UNESCO",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Gabriela Ramos.jpeg ",
    url: "https://en.unesco.org/inclusivepolicylab/users/gabriela-ramos",
    bios: ""
  }

  // Add more partners as needed
];

export default function JudgesScroll() {
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