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
    id: 'Digital-Trust-Convention-Montreal',
    title: 'Digital Trust Convention – Montreal',
    date: 'November 6, 2025',
    location: 'Montreal, Canada',
    excerpt: 'Join us at the Digital Trust Convention in Montreal for an insightful presentation by the Global Trust Consortium (GTC) — a global movement convened by IEEE SA, OECD, UNESCO, GPAI, and AI Commons to restore integrity in the age of AI. The GTC empowers innovators, policymakers, and organizations worldwide to design solutions that strengthen trust in digital ecosystems. This session will explore how resilient, transparent, and user-centric information environments can empower future generations, industry, innovation, and healthcare alike. Discover how the GTC\'s three-phase challenge model is mobilizing global talent to turn this moment into an opportunity to build a more reliable and human-centered digital future.',
    content: '',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+2025.webp',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Upcoming', 'important']
  },
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
    title: 'Trust in Focus: Global Trust Challenge at the Japan Cultural Centre',
    date: 'February 10, 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "In a world where synthetic content can be produced at the click of a button, trust has never been more fragile — or more essential. That urgency set the tone at the Japan Cultural Centre in Paris, where global leaders gathered to confront the risks of generative AI and chart pathways toward a more reliable digital future.",
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: 'November 15, 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    content: '',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+Photo.jpeg',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'AI-For-Good',
    title: 'AI for Good Global Summit 2025',
    date: 'July 9, 2025',
    location: 'Geneva, Switzerland',
    excerpt: 'It started with a simple, unsettling question at the AI for Good Global Summit: If we can no longer tell what’s real online, how do we keep societies from unravelling? On stage, at the International Telecommunication Union’s (ITU) AI for Good, the Global Trust Challenge offered an answer — not in theory, but in action. This global initiative, born from a G7 call to safeguard truth in the digital age, is rallying technologists, policymakers, and innovators to build solutions that blend policy with technology.',
    content: '',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/AI+for+Good+Event+Photo.jpeg',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
  },
  {
    id: 'Lyceum-Project-Event',
    title: 'Empowering Tomorrow’s Citizens: Highlights from The Lyceum Project 2025 - Children in the Age of AI',
    date: 'June 20, 2025',
    location: 'Athens, Greece',
    excerpt: 'On June 20, 2025, an electric gathering took place in Athens. The Lyceum Project 2025 – “Children in the Age of AI” – was explicitly “a day of reflection and dialogue” on how to empower children to flourish in a world guided by algorithms. Leading thinkers, educators, policymakers, and citizens gathered at the historic Athens Conservatoire (next to Aristotle’s Lyceum) to ask: what does it really mean to be a child in the age of AI?',
    content: '',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Screenshot+2025-08-29+210641.png',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
  }

];

// Helper function to parse different date formats
const parseEventDate = (dateString: string): Date => {
  // Remove ordinal suffixes (st, nd, rd, th)
  const cleanDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
  
  // Try to parse the date
  const parsed = new Date(cleanDate);
  
  // If parsing fails or we only have month/year, handle specially
  if (isNaN(parsed.getTime())) {
    // Handle "Month YYYY" format by setting to first of month
    const parts = cleanDate.split(' ');
    if (parts.length === 2) {
      return new Date(`${parts[0]} 1, ${parts[1]}`);
    }
  }
  
  return parsed;
};

// Helper function to determine if an event is past
const isPastEvent = (dateString: string): boolean => {
  const eventDate = parseEventDate(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  return eventDate < today;
};

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'event' | 'news' | 'update'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = allItems
    .filter(item => {
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
          item.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      return dateB.getTime() - dateA.getTime(); // Newest first
    });

  // Split events into upcoming and past
  const upcomingEvents = filteredItems.filter(event => !isPastEvent(event.date));
  const pastEvents = filteredItems.filter(event => isPastEvent(event.date));

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
          {/* Upcoming Events Section */}
          <h2 className="text-3xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
            Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {upcomingEvents.map((item) => (
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
                      {item.tags?.map((tag, index) => (
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
            <div className="text-center py-12 bg-gray-50 rounded-lg mb-16">
              <p className="text-xl text-gray-600">
                No upcoming events at this time. Check back soon!
              </p>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((item) => (
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
                        {item.tags?.map((tag, index) => (
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
            </>
          )}

          {/* Show message if no events at all */}
          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
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