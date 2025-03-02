import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

const recentNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Global Trust Challenge Announces Key Dates',
    date: 'May 15, 2025',
    excerpt: 'The organizing committee has announced the official timeline for the challenge, with registration opening next month.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    category: 'Announcement'
  },
  {
    id: 'news-2',
    title: 'UNESCO Joins as Strategic Partner',
    date: 'May 10, 2025',
    excerpt: 'UNESCO has officially joined the Global Trust Challenge as a strategic partner, bringing expertise in ethical AI governance.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80',
    category: 'Partnership'
  },
  {
    id: 'news-3',
    title: 'Virtual Information Session Scheduled',
    date: 'May 5, 2025',
    excerpt: 'Join us for a virtual information session to learn more about the challenge and how to participate effectively.',
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