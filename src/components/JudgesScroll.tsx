import React from 'react';

interface Partner {
  name: string;
  role: string;
  image: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: "Stuart Russell",
    role: "UC Berkeley",
    image: "https://maximages.s3.us-west-1.amazonaws.com/stuart Russell.webp",
    url: "https://people.eecs.berkeley.edu/~russell/"
  },
  {
    name: "Catherine Regis",
    role: "University of Montreal",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Catherine Regis.jpeg",
    url: "https://droit.umontreal.ca/en/faculty/the-team/professors/details/in/in18868/sg/Catherine%20R%C3%A9gis/"
  },
  {
    name: "Andy Parsons",
    role: "Adobe",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Andy parsons.jpg",
    url: "https://www.linkedin.com/in/andyparsons/"
  },
  {
    name: "Margaret Mitchell",
    role: "Hugging Face",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Margaret Mitchell.webp",
    url: "https://www.linkedin.com/in/margaret-mitchell-9b13429/"
  },
  {
    name: "Vilas Dhar",
    role: "Patrick J. McGovern Foundation",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Vilas Dhar.jpg",
    url: "https://www.mcgovern.org/about-president-vilas-s-dhar/"
  },
  {
    name: "Gabriela Ramos",
    role: "UNESCO",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Gabriela Ramos.jpeg ",
    url: "https://en.unesco.org/inclusivepolicylab/users/gabriela-ramos"
  }
  
  // Add more partners as needed
];

export default function JudgesScroll() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <a href={partner.url} key={"A" + index} target="new"><div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105"
          >
            <div className="aspect-w-1 aspect-h-1 w-full mb-4">
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-48 object-cover rounded-lg"
                style={{objectFit: 'scale-down'}}
              />
            </div>
            <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
            <p className="text-gray-600 text-center">{partner.role}</p>
          </div>
            </a>
        ))}
      </div>
    </div>
  );
}