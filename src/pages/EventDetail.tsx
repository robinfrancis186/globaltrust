import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import PreRegisterCTA from '../components/PreRegisterCTA';
import { BCMSService } from '../services/bcms';
import { NewsItem } from '../types/bcms';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('No event ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await BCMSService.getEventBySlug(id);
        if (eventData) {
          setItem(eventData);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The event you\'re looking for doesn\'t exist or has been removed.'}</p>
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
          {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
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
         <div className="prose prose-lg prose-indigo max-w-none">
            {item.content ? (
              <div dangerouslySetInnerHTML={{ __html: item.content }} 
              className="
    [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-4
    [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4
    [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3
    [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-gray-700 [&_ul]:my-4
    [&_strong]:font-semibold
  "
              />
             
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