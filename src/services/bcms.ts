import { Client } from '@thebcms/client';
import { BCMSNewsItem, NewsItem, transformBCMSToNewsItem } from '../types/bcms';

// Initialize BCMS Client
const bcms = new Client(
  import.meta.env.VITE_BCMS_ORG_ID,
  import.meta.env.VITE_BCMS_INSTANCE_ID,
  {
    id: import.meta.env.VITE_BCMS_API_KEY_ID,
    secret: import.meta.env.VITE_BCMS_API_KEY_SECRET,
  },
  {
    injectSvg: true,
  }
);


export class BCMSService {
  // Get all events/news items
  static async getAllEvents(): Promise<NewsItem[]> {
    try {
      const entries = await bcms.entry.getAll('events') as unknown as BCMSNewsItem[];

      return entries
        .map(transformBCMSToNewsItem)
        //.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        .sort((a,b) =>a.sortorder-b.sortorder ); 
    } catch (error) {
      console.error('Error fetching events from BCMS:', error);
      return [];
    }
  }

  // Get single event by slug
  static async getEventBySlug(slug: string): Promise<NewsItem | null> {
    try {
      const entry = await bcms.entry.getBySlug(slug, 'events') as unknown as BCMSNewsItem;

      return transformBCMSToNewsItem(entry);
    } catch (error) {
      console.error(`Error fetching event with slug ${slug}:`, error);
      return null;
    }
  }

  // Get events by type
  static async getEventsByType(type: 'event' | 'news' | 'update'): Promise<NewsItem[]> {
    try {
      const allEvents = await this.getAllEvents();
      return allEvents.filter(event => event.type === type);
    } catch (error) {
      console.error(`Error fetching events by type ${type}:`, error);
      return [];
    }
  }

  // Search events
  static async searchEvents(query: string): Promise<NewsItem[]> {
    try {
      const allEvents = await this.getAllEvents();
      const searchQuery = query.toLowerCase();
      
      return allEvents.filter(event => 
        event.title.toLowerCase().includes(searchQuery) ||
        event.excerpt.toLowerCase().includes(searchQuery) ||
        event.category.toLowerCase().includes(searchQuery) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
      );
    } catch (error) {
      console.error('Error searching events:', error);
      return [];
    }
  }
}