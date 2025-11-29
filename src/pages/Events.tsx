import { useState } from 'react';
import { Calendar, MapPin, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ChromaGrid from '@/components/ui/chroma-grid';
import { motion } from 'framer-motion';

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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+Photo.jpeg")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase"
            style={{ fontFamily: '"Barlow Condensed", serif' }}
          >
            Events & <span className="text-[#00AEEF]">News</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Stay updated with the latest announcements, events, and news about the Global Trust Challenge.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              {(['all', 'event', 'news', 'update'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 ${activeFilter === filter
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Upcoming Events Section */}
          <h2 className="text-4xl font-black mb-12 text-slate-900 uppercase tracking-tight flex items-center gap-4" style={{ fontFamily: '"Barlow Condensed", serif' }}>
            <span className="w-3 h-12 bg-blue-500 rounded-full"></span>
            Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {upcomingEvents.map((item) => (
                <GlassCard key={item.id} className="h-full flex flex-col group hover:border-blue-500/30 transition-all duration-300 bg-white shadow-xl border-slate-100 rounded-3xl overflow-hidden hover:-translate-y-2">
                  <div className="h-64 -mx-6 -mt-6 mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/20 shadow-lg ${item.type === 'event'
                        ? 'bg-blue-600 text-white'
                        : item.type === 'news'
                          ? 'bg-purple-600 text-white'
                          : 'bg-pink-600 text-white'
                        }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-blue-600 font-bold text-sm mb-3 uppercase tracking-wide">
                    <Calendar className="h-4 w-4 mr-2" />
                    {item.date}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                    <Link to={`/events/${item.id}`}>{item.title}</Link>
                  </h3>

                  {item.type === 'event' && item.location && (
                    <div className="flex items-center text-slate-500 text-sm mb-4 font-medium">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                      {item.location}
                    </div>
                  )}

                  <p className="text-slate-600 mb-8 line-clamp-3 flex-grow leading-relaxed">{item.excerpt}</p>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      {item.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wide">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/events/${item.id}`}
                      className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-2 group/link uppercase text-sm tracking-wide"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 mb-24 shadow-sm">
              <p className="text-xl text-slate-500 font-light">
                No upcoming events at this time. Check back soon!
              </p>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <>
              <h2 className="text-4xl font-black mb-12 text-slate-900 uppercase tracking-tight flex items-center gap-4" style={{ fontFamily: '"Barlow Condensed", serif' }}>
                <span className="w-3 h-12 bg-purple-500 rounded-full"></span>
                Past Events
              </h2>
              <div className="w-full rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-4 md:p-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
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
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No results found</h3>
              <p className="text-xl text-slate-500 font-light">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}