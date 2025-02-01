import React from 'react';

const teams = [
  {
    name: "Team Alpha",
    members: ["John Doe", "Jane Smith"],
    country: "United States",
    project: "AI Content Verification System",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
  },
  {
    name: "Digital Trust Labs",
    members: ["Maria Garcia", "Alex Chen"],
    country: "Singapore",
    project: "Blockchain-based Trust Protocol",
    image: "https://maximages.s3.us-west-1.amazonaws.com/photo-1600880292203-757bb62b4baf.webp"
  },
  // Add more teams as needed
];

export default function Teams() {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero Section with Parallax */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80")',
            
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase',fontSize: '5.5rem'}}>Competing Teams</h1>
            <p className="text-xl mb-8">Meet the innovators shaping the future of digital trust</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-center mb-12" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2.2rem'}}>Registered Teams</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Meet the innovative teams working to solve the challenges of digital trust.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                  <p className="text-gray-600 mb-4">{team.country}</p>
                  <h4 className="font-semibold mb-2">Project:</h4>
                  <p className="text-gray-600 mb-4">{team.project}</p>
                  <h4 className="font-semibold mb-2">Team Members:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {team.members.map((member, idx) => (
                      <li key={idx}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}