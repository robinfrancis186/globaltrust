import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Tag, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreRegisterCTA from '../components/PreRegisterCTA';
import axios from 'axios';

// Update interface to match Strapi's structure
interface NewsItem {
  id: number;
  attributes: {
    title: string;
    date: string;
    excerpt: string;
    content: string;
    category: string;
    type: 'event' | 'news' | 'update';
    location?: string;
    time?: string;
    tags: string[];
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export default function EventsStrapi() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'event' | 'news' | 'update'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Strapi
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/news-items`, {
          params: {
            // Strapi query parameters
            populate: '*', // Include all relations (like images)
            filters: {
              ...(activeFilter !== 'all' && { type: activeFilter }),
              ...(searchQuery && {
                $or: [
                  { title: { $containsi: searchQuery } },
                  { excerpt: { $containsi: searchQuery } },
                  { category: { $containsi: searchQuery } },
                  { tags: { $containsi: searchQuery } }
                ]
              })
            }
          }
        });
        setItems(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events and news. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeFilter, searchQuery]);

  // ... existing hero section JSX ...

  {/* Content Section */}
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2 text-red-600">{error}</h3>
          <button 
            onClick={() => window.location.reload()} 
            className="text-indigo-600 hover:text-indigo-800"
          >
            Try again
          </button>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`${process.env.REACT_APP_STRAPI_URL}${item.attributes.image.data.attributes.url}`}
                  alt={item.attributes.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center mb-3 gap-2">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    item.attributes.type === 'event' 
                      ? 'bg-green-100 text-green-800' 
                      : item.attributes.type === 'news'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.attributes.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.attributes.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 transition-colors duration-200">
                  <Link to={`/events/${item.id}`}>{item.attributes.title}</Link>
                </h3>
                
                {item.attributes.type === 'event' && item.attributes.location && (
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {item.attributes.location}
                  </div>
                )}
                
                {/* ... rest of the card content ... */}
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

  {/* ... rest of the component ... */}
} 