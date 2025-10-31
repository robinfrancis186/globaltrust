// BCMS Types for Events Management
interface BcmsContentNode {
  type: string; // You can specify known types
  value: string;
  attrs?: { level: number }; // Optional properties for specific node types
}

export interface BCMSNewsItem {
  _id: string;
  createdAt: number;
  updatedAt: number;
  meta: {
    en: {
      title: string;
      slug: string;
      excerpt: string;
      content: {
            nodes: BcmsContentNode[]; 
        };
      date: string;
      category: string;
      type: 'event' | 'news' | 'update';
      location?: string;
      time?: string;
      tags: string;
      externalLink?: string;
      featuredimage: {
        _id: string;
        url: string;
        alt: string;
        caption?: string;
      };
      sortorder: number;
    };
  };
}

export interface NewsItem {
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
  sortorder: number;
}

function getMediaUrl(url: string): string {

  //const uri = bcms.media.toUri(mediaId, filename, {
  //webp: true,
  //});
  const uri = url + '?apiKey=' + import.meta.env.VITE_BCMS_MEDIA_API_KEY_ID + '.' + import.meta.env.VITE_BCMS_MEDIA_API_KEY_SECRET
  
  console.log("URI:" + uri);
  
  return uri;
}

// Transform BCMS data to our NewsItem format
export function transformBCMSToNewsItem(bcmsItem: BCMSNewsItem): NewsItem {
 

  return {
    id: bcmsItem.meta.en.slug,
    title: bcmsItem.meta.en.title,
    date: bcmsItem.meta.en.date,
    excerpt: bcmsItem.meta.en.excerpt,
    content: bcmsItem.meta.en.content.nodes.map(node => node.value).join(''),
    image:  getMediaUrl(bcmsItem.meta.en.featuredimage.url),
    category: bcmsItem.meta.en.category,
    type: bcmsItem.meta.en.type,
    location: bcmsItem.meta.en.location,
    time: bcmsItem.meta.en.time,
    tags: bcmsItem.meta.en.tags.split(',').map((tag: string) => tag.trim()),
    link: bcmsItem.meta.en.externalLink,
    sortorder:bcmsItem.meta.en.sortorder
  };
}