import { useState } from 'react';
import { Calendar, MapPin, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ChromaGrid from '@/components/ui/chroma-grid';

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
const parseEventDate = (dateString: string | undefined): Date => {
  if (!dateString || typeof dateString !== 'string') {
    return new Date(0);
  }
  // Remove ordinal suffixes (st, nd, rd, th)
  const cleanDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');

  // Try to parse the date
  const parsed = new Date(cleanDate);

  // If parsing fails or we only have month/year, handle specially
  if (isNaN(parsed.getTime())) {
    // Handle "Month YYYY" format by setting to first of month
    const parts = (cleanDate || '').split(' ');
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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pt-20">
      {/* Header Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-slate-900">
            Events & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">News</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and news about the Global Trust Challenge.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex gap-2 p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
              {(['all', 'event', 'news', 'update'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeFilter === filter
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Upcoming Events Section */}
          <h2 className="text-3xl font-bold font-heading mb-8 text-slate-900 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {upcomingEvents.map((item) => (
                <GlassCard key={item.id} className="h-full flex flex-col group hover:border-blue-500/30 transition-all duration-300 bg-white shadow-lg border-slate-100">
                  <div className="h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 z-10"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md border border-white/20 shadow-sm ${item.type === 'event'
                        ? 'bg-blue-500/90 text-white'
                        : item.type === 'news'
                          ? 'bg-purple-500/90 text-white'
                          : 'bg-pink-500/90 text-white'
                        }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    {item.date}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                    <Link to={`/events/${item.id}`}>{item.title}</Link>
                  </h3>

                  {item.type === 'event' && item.location && (
                    <div className="flex items-center text-slate-500 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                      {item.location}
                    </div>
                  )}

                  <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">{item.excerpt}</p>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      {item.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/events/${item.id}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-1 group/link"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200 mb-16 shadow-sm">
              <p className="text-xl text-slate-500">
                No upcoming events at this time. Check back soon!
              </p>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <>
              <h2 className="text-3xl font-bold font-heading mb-8 text-slate-900 flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                Past Events
              </h2>
              <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 md:p-8">
                <ChromaGrid
                  items={pastEvents.map((event, index) => {
                    // Generate consistent colors based on index
                    const colors = [
                      { border: '#3B82F6', gradient: 'linear-gradient(145deg, #3B82F6, #000)' }, // Blue
                      { border: '#8B5CF6', gradient: 'linear-gradient(145deg, #8B5CF6, #000)' }, // Purple
                      { border: '#EC4899', gradient: 'linear-gradient(145deg, #EC4899, #000)' }, // Pink
                      { border: '#10B981', gradient: 'linear-gradient(145deg, #10B981, #000)' }, // Emerald
                      { border: '#F59E0B', gradient: 'linear-gradient(145deg, #F59E0B, #000)' }, // Amber
                    ];
                    const color = colors[index % colors.length];

                    return {
                      image: event.image,
                      title: event.title,
                      subtitle: event.date,
                      location: event.location,
                      borderColor: color.border,
                      gradient: color.gradient,
                      url: `/events/${event.id}`
                    };
                  })}
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>
            </>
          )}

          {/* Show message if no events at all */}
          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}