import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
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

// Sample data - in a real app, this would come from an API or database
const allItems: NewsItem[] = [
    {
    id: 'ENS-AI-Action-Summit-Event',
    title: 'ENS - AI Action Summit Official Side Event',
    date: 'February 11, 2025',
    location: 'École normale supérieure, Paris',
    excerpt: 'As part of the official programming of the AI Action Summit, this Global Trust Challenge side event convened a distinguished panel to explore how generative AI is reshaping the landscape of trust and online information.',
    content: `<p>As part of the official programming of the AI Action Summit, this Global Trust Challenge side event convened a distinguished panel to explore how generative AI is reshaping the landscape of trust and online information.</p><p> Hosted at ENS in Paris, the session focused on collective strategies to counter AI-driven mis- and disinformation, and introduced the Global Trust Challenge as a global mechanism for incentivizing cross-sector collaboration and innovation.
Moderated by Amir Banifatemi (AI Commons), the panel featured thought leaders from key partner institutions: Craig Matasik (OECD), Konstantinos Karachalios (IEEE), Andy Parsons (Adobe), Frauke Goll (AppliedAI Institute for Europe), and Tanya Perelmuter (Fondation Abeona). Panelists shared perspectives from public policy, technical standards, media authenticity, and citizen literacy. The session highlighted the multistakeholder nature of the Global Trust Challenge and its growing coalition—OECD, IEEE, UNESCO, IDB, World Bank, and VDE—working to deliver trustworthy AI solutions that scale globally.
</p>`,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    category: 'Event',
    type: 'event',
    tags: []
  },
  {
    id: 'Global-Trust-Challenge-Side-Event',
    title: 'Global Trust Challenge Side Event',
    date: '10 February 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "This event, co-hosted by the OECD, IEEE, Japan's Ministry of Internal Affairs and Communications (MIC), AI Commons, and Fondation Abeona, addressed the urgent issue of trust in online information in the age of generative AI.",
    content: `<p>This event, co-hosted by the OECD, IEEE, Japan's Ministry of Internal Affairs and Communications (MIC), AI Commons, and Fondation Abeona, addressed the urgent issue of trust in online information in the age of generative AI.
The session began with opening remarks from Vice Minister Takuo Imagawa of Japan’s MIC.</p>
<p>Moderated by Audrey Plonk, the panel featured distinguished representatives from government, industry, and civil society, including Yoichi Iida, Assistant Vice Minister at Japan’s MIC; Konstantinos Karachalios of IEEE; Andy Parsons of Adobe; and Wan Sie Lee, Director of AI and Data Innovation at Singapore’s Infocomm Media Development Authority (IMDA).
The speakers examined the emerging risks generative AI poses to information integrity and explored possible strategies to restore and reinforce public trust. Topics included the role of international cooperation, the use of digital provenance technologies, and the development of responsible AI governance frameworks.
The session also introduced the Global Trust Challenge, an initiative designed to incentivize and accelerate the creation of both policy and technical solutions to foster trustworthy digital ecosystems.</p>
`,
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event',
    type: 'event',
     tags: []
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: '15 November 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    content: `<p>The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.</p>
<p>The event was co-hosted by the Atlantic Council, the Bertelsmann Stiftung, KI Park, the Mila Quebec AI Institute, the OECD, the Partnership on AI (PAI), the Association of Electrical, Electronic and Information Technologies (VDE), and the World Privacy Forum.
During the session titled “Foundations for a Vision of Digital Trust,” Amir Banifatemi, Co-Founder and Director of AI Commons and Founder and Content Curator of the AI for Good Global Summit, presented the Global AI Trust Challenge, to promote trust by equipping governments, organisations, and individuals with the tools and resilience needed to navigate a world increasingly shaped by scalable synthetic content.</p>
`,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80',
    category: 'Event',
    type: 'event',
     tags: []
  }

 
];

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const item = allItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/events"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Events
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${item.image}")`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <div className="text-white pb-16 max-w-4xl">
            <div className="flex items-center mb-4">
              <Link 
                to="/events"
                className="inline-flex items-center text-white hover:text-indigo-200 transition-colors duration-200 mr-4"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Events
              </Link>
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                item.type === 'event' 
                  ? 'bg-green-100 text-green-800' 
                  : item.type === 'news'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-amber-100 text-amber-800'
              }`}>
                {item.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
              {item.title}
            </h1>
            <p className="text-xl text-gray-200">{item.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              {item.date}
            </div>
            
            {item.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                {item.location}
              </div>
            )}
            
            {item.time && (
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                {item.time}
              </div>
            )}

            <button
              onClick={handleShare}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {item.content ? (
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            ) : (
              <p className="text-gray-600">{item.excerpt}</p>
            )}
          </div>

          {/* External Link */}
          {item.link && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Related Link</h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Visit External Resource
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              to="/events"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to All Events
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PreRegisterCTA />
    </div>
  );
}