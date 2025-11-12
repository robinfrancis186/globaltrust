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
    image: 'https://maximages.s3.us-west-1.amazonaws.com/ENS.jpg',
    category: 'Event'
  },
  {
    id: 'Global-Trust-Challenge-Side-Event',
    title: 'Trust in Focus: Global Trust Challenge at the Japan Cultural Centre',
    date: 'February 10, 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "In a world where synthetic content can be produced at the click of a button, trust has never been more fragile — or more essential. That urgency set the tone at the Japan Cultural Centre in Paris, where global leaders gathered to confront the risks of generative AI and chart pathways toward a more reliable digital future.",
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event'
    
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: 'November 15, 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+Photo.jpeg',
    category: 'Event'
  
  },
  {
    id: 'AI-For-Good',
    title: 'AI for Good Global Summit 2025',
    date: 'July 9, 2025',
    location: 'Geneva, Switzerland',
    excerpt: 'It started with a simple, unsettling question at the AI for Good Global Summit: If we can no longer tell what’s real online, how do we keep societies from unravelling? On stage, at the International Telecommunication Union’s (ITU) AI for Good, the Global Trust Challenge offered an answer — not in theory, but in action. This global initiative, born from a G7 call to safeguard truth in the digital age, is rallying technologists, policymakers, and innovators to build solutions that blend policy with technology.',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/AI+for+Good+Event+Photo.jpeg',
    category: 'Event'
  },
  {
    id: 'Lyceum-Project-Event',
    title: 'Empowering Tomorrow’s Citizens: Highlights from The Lyceum Project 2025 - Children in the Age of AI',
    date: 'June 20, 2025',
    location: 'Athens, Greece',
    excerpt: 'On June 20, 2025, an electric gathering took place in Athens. The Lyceum Project 2025 – “Children in the Age of AI” – was explicitly “a day of reflection and dialogue” on how to empower children to flourish in a world guided by algorithms. Leading thinkers, educators, policymakers, and citizens gathered at the historic Athens Conservatoire (next to Aristotle’s Lyceum) to ask: what does it really mean to be a child in the age of AI?',
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Screenshot+2025-08-29+210641.png',
    category: 'Event'
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

export default function NewsHighlights() {
  return (
    <section className="py-16 bg-white">
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
          {recentNews
            .sort((a, b) => {
              const dateA = parseEventDate(a.date);
              const dateB = parseEventDate(b.date);
              return dateB.getTime() - dateA.getTime(); // Newest first
            })
            .slice(0, 3) // Limit to 3 newest events
            .map((item) => (
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