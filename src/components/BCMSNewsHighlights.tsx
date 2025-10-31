import React from 'react';
import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BCMSService } from '../services/bcms';
import { NewsItem } from '../types/bcms';


export default function BCMSNewsHighlights({ maxRecords = 3, isHomePage = true }) {
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const allEvents = await BCMSService.getAllEvents();
        // Get the 3 most recent items
        setRecentNews(allEvents.slice(0, maxRecords));
      } catch (error) {
        console.error('Error fetching recent news:', error);
        // Fallback to empty array if BCMS fails
        setRecentNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest updates...</p>
          </div>
        </div>
      </section>
    );
  }

  // Always render the section, even if no news items
  if (recentNews.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              Latest Updates
            </h2>
            {isHomePage && <Link to="/events" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">View all updates<ArrowRight className="ml-2 h-5 w-5" /></Link>}
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No events available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Latest Updates
          </h2>
           {isHomePage && <Link to="/events" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">View all updates<ArrowRight className="ml-2 h-5 w-5" /></Link>}
          
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