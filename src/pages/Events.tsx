import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreRegisterCTA from '../components/PreRegisterCTA';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  type: 'event' | 'news' | 'update';
  location?: string;
  time?: string;
  tags: string[];
}

const allItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Global Trust Challenge Announces Key Dates',
    date: 'May 15, 2025',
    excerpt: 'The organizing committee has announced the official timeline for the challenge, with registration opening next month.',
    content: 'The Global Trust Challenge organizing committee is pleased to announce the official timeline for the upcoming challenge. Registration will open on June 15, 2025, and teams will have until July 31, 2025, to submit their initial proposals. The first phase of the challenge will begin in August, with selected teams advancing to the prototype development phase in October. Final presentations and awards are scheduled for December 2025. Stay tuned for more details and prepare your teams for this exciting opportunity to shape the future of digital trust.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    category: 'Announcement',
    type: 'news',
    tags: ['timeline', 'registration', 'important']
  },
  {
    id: 'news-2',
    title: 'UNESCO Joins as Strategic Partner',
    date: 'May 10, 2025',
    excerpt: 'UNESCO has officially joined the Global Trust Challenge as a strategic partner, bringing expertise in ethical AI governance.',
    content: 'We are thrilled to announce that UNESCO has officially joined the Global Trust Challenge as a strategic partner. This collaboration brings UNESCO\'s extensive expertise in ethical AI governance and international policy frameworks to the challenge. UNESCO will provide guidance on aligning technological solutions with ethical principles and human rights considerations. This partnership strengthens our commitment to developing solutions that are not only technically sound but also ethically responsible and globally applicable. UNESCO representatives will participate in mentoring sessions and evaluation panels throughout the challenge.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80',
    category: 'Partnership',
    type: 'news',
    tags: ['partnership', 'UNESCO', 'ethics']
  },
  {
    id: 'event-1',
    title: 'Virtual Information Session',
    date: 'June 5, 2025',
    excerpt: 'Join us for a virtual information session to learn more about the challenge and how to participate effectively.',
    content: 'The Global Trust Challenge team invites all interested participants to join our virtual information session on June 5, 2025. This session will provide detailed information about the challenge structure, evaluation criteria, and tips for successful participation. Our panel of experts will discuss key focus areas and answer questions from potential participants. Whether you\'re already planning to participate or still considering your options, this session will provide valuable insights to help you prepare. Registration is required, and a recording will be available for those unable to attend live.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80',
    category: 'Event',
    type: 'event',
    location: 'Online (Zoom)',
    time: '10:00 AM - 12:00 PM EDT',
    tags: ['virtual', 'information', 'registration']
  },
  {
    id: 'update-1',
    title: 'Challenge Framework Document Released',
    date: 'May 1, 2025',
    excerpt: 'The comprehensive framework document for the Global Trust Challenge is now available for download.',
    content: 'We are pleased to announce that the comprehensive framework document for the Global Trust Challenge is now available for download from our website. This document provides detailed information about the challenge objectives, evaluation criteria, submission requirements, and timeline. It also includes background information on the key issues related to trust in AI-generated content and potential approaches to addressing these challenges. We encourage all potential participants to review this document carefully as they prepare their teams and proposals. The framework has been developed in consultation with our expert advisory panel to ensure that the challenge addresses the most critical aspects of building trust in the age of generative AI.',
    image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80',
    category: 'Resources',
    type: 'update',
    tags: ['framework', 'guidelines', 'resources']
  },
  {
    id: 'event-2',
    title: 'AI Trust Workshop Series',
    date: 'July 10-12, 2025',
    excerpt: 'A three-day workshop series focusing on technical and policy approaches to verifying AI-generated content.',
    content: 'The Global Trust Challenge is hosting a three-day workshop series on technical and policy approaches to verifying AI-generated content. This intensive program will feature presentations and hands-on sessions led by experts in content authentication, policy development, and AI ethics. Participants will explore current technologies for content verification, discuss policy frameworks for promoting transparency, and work on practical exercises to develop integrated solutions. The workshop is open to all interested individuals, with priority given to registered challenge participants. Sessions will be held both in-person at our headquarters and streamed online for remote participants.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    category: 'Workshop',
    type: 'event',
    location: 'Global Trust Challenge HQ, San Francisco',
    time: '9:00 AM - 5:00 PM PDT (each day)',
    tags: ['workshop', 'technical', 'policy', 'verification']
  },
  {
    id: 'news-3',
    title: 'Expert Advisory Panel Announced',
    date: 'April 20, 2025',
    excerpt: 'Meet the distinguished experts who will guide the Global Trust Challenge and evaluate submissions.',
    content: 'We are proud to announce the formation of our Expert Advisory Panel for the Global Trust Challenge. This distinguished group includes leaders from academia, industry, policy, and civil society organizations who bring diverse perspectives and deep expertise in AI, digital trust, policy development, and information integrity. The panel will play a crucial role in guiding the challenge, mentoring participants, and evaluating submissions. Panel members include representatives from major technology companies, international organizations, leading research institutions, and advocacy groups. Their combined expertise ensures that the challenge will address the complex technical, ethical, and policy dimensions of building trust in AI-generated content.',
    image: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?auto=format&fit=crop&q=80',
    category: 'Announcement',
    type: 'news',
    tags: ['experts', 'advisory', 'panel']
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