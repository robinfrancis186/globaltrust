import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreRegisterCTA from '../components/PreRegisterCTA';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  type: 'event' | 'news' | 'update';
  location?: string;
  time?: string;
  tags?: string[];
  link?: string;
}


const allItems: NewsItem[] = [
  {
    id: 'ENS-AI-Action-Summit-Event',
    title: 'ENS - AI Action Summit Official Side Event',
    date: 'February 11, 2025',
    location: 'École normale supérieure, Paris',
    excerpt: 'As part of the official programming of the AI Action Summit, this Global Trust Challenge side event convened a distinguished panel to explore how generative AI is reshaping the landscape of trust and online information.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/ENS.jpg',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Global-Trust-Challenge-Side-Event',
    title: 'Global Trust Challenge Side Event',
    date: '10 February 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "This event, co-hosted by the OECD, IEEE, Japan's Ministry of Internal Affairs and Communications (MIC), AI Commons, and Fondation Abeona, addressed the urgent issue of trust in online information in the age of generative AI.",
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: '15 November 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    content: '',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
  }

];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'event' | 'news' | 'update'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = allItems.filter(item => {
    // Filter by type
    if (activeFilter !== 'all' && item.type !== activeFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '5.5rem'}}>
              Events & News
            </h1>
            <p className="text-xl mb-8">
              Stay updated with the latest announcements, events, and news about the Global Trust Challenge
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
{/*       <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  activeFilter === 'all' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('event')}
                className={`px-4 py-2 rounded-lg ${
                  activeFilter === 'event' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveFilter('news')}
                className={`px-4 py-2 rounded-lg ${
                  activeFilter === 'news' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                News
              </button>
              <button
                onClick={() => setActiveFilter('update')}
                className={`px-4 py-2 rounded-lg ${
                  activeFilter === 'update' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                Updates
              </button>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section> */}

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center mb-3 gap-2">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        item.type === 'event' 
                          ? 'bg-green-100 text-green-800' 
                          : item.type === 'news'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 transition-colors duration-200">
                      <Link to={`/events/${item.id}`}>{item.title}</Link>
                    </h3>
                    
                    {item.type === 'event' && item.location && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {item.location}
                      </div>
                    )}
                    
                    {item.type === 'event' && item.time && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {item.time}
                      </div>
                    )}
                    
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <PreRegisterCTA />
    </div>
  );
}