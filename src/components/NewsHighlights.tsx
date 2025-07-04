import React from 'react';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  location: string;
  excerpt: string;
  image: string;
  category: string;
}

const recentNews: NewsItem[] = [
  {
    id: 'ENS-AI-Action-Summit-Event',
    title: 'ENS - AI Action Summit Official Side Event',
    date: 'February 11, 2025',
    location: 'École normale supérieure, Paris',
    excerpt: 'As part of the official programming of the AI Action Summit, this Global Trust Challenge side event convened a distinguished panel to explore how generative AI is reshaping the landscape of trust and online information.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    category: 'Event'
  },
  {
    id: 'Global-Trust-Challenge-Side-Event',
    title: 'Global Trust Challenge Side Event',
    date: '10 February 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "This event, co-hosted by the OECD, IEEE, Japan's Ministry of Internal Affairs and Communications (MIC), AI Commons, and Fondation Abeona, addressed the urgent issue of trust in online information in the age of generative AI.",
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event'
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: '15 November 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80',
    category: 'Event'
  }
];

export default function NewsHighlights() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Latest Updates
          </h2>
          <Link 
            to="/events" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            View all updates
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentNews.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm ml-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 transition-colors duration-200">
                  <Link to={`/events/${item.id}`}>{item.title}</Link>
                </h3>
                {item.category === 'Event' && item.location && (
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {item.location}
                </div>
                )}
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link 
                  to={`/events/${item.id}`}
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200 flex items-center"
                >
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}