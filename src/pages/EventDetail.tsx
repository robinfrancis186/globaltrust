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
    id: 'Digital-Trust-Convention-Montreal',
    title: 'Digital Trust Convention – Montreal',
    date: 'November 6, 2025',
    location: 'Montreal, Canada',
    excerpt: 'Join us at the Digital Trust Convention in Montreal for an insightful presentation by the Global Trust Consortium (GTC) — a global movement convened by IEEE SA, OECD, UNESCO, GPAI, and AI Commons to restore integrity in the age of AI.',
    content: `<h1>Digital Trust Convention – Montreal</h1><p><b>Montreal, Canada — November 6-7, 2025</b></p><p>Join us at the Digital Trust Convention in Montreal for an insightful presentation by the Global Trust Consortium (GTC) — a global movement convened by IEEE SA, OECD, UNESCO, GPAI, and AI Commons to restore integrity in the age of AI. The GTC empowers innovators, policymakers, and organizations worldwide to design solutions that strengthen trust in digital ecosystems. This session will explore how resilient, transparent, and user-centric information environments can empower future generations, industry, innovation, and healthcare alike. Discover how the GTC's three-phase challenge model is mobilizing global talent to turn this moment into an opportunity to build a more reliable and human-centered digital future.</p>`,
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+2025.webp',
    category: 'Event',
    type: 'event',
    tags: ['Event', 'Upcoming', 'important']
  },
  {
    id: 'ENS-AI-Action-Summit-Event',
    title: 'Trust on the Line: Global Trust Challenge Side Event at the AI Action Summit',
    date: 'February 11, 2025',
    location: 'École normale supérieure, Paris',
    excerpt: 'As part of the official programming of the AI Action Summit, this Global Trust Challenge side event convened a distinguished panel to explore how generative AI is reshaping the landscape of trust and online information.',
    content: `<h1>Trust on the Line: Global Trust Challenge Side Event at the AI Action Summit</h1>

  <p><strong>Paris, France — ENS, February 2025</strong></p>

  <p>In the heart of Paris, as part of the AI Action Summit's official program, the Global Trust Challenge brought together a remarkable panel to tackle one of the toughest questions of our time: how can we safeguard truth in an era of generative AI?</p>

  <p>Hosted at the École Normale Supérieure (ENS), the session quickly moved beyond abstract worries to collective strategies for countering AI-fueled mis- and disinformation. Moderated by Amir Banifatemi (AI Commons), the conversation showcased the breadth of expertise fueling this global initiative.</p>

  <h2>A Multistakeholder Conversation</h2>
  <p>The panel included:</p>
  <ul>
    <li>Craig Matasik (OECD) — highlighting the need for cross-border policy cooperation</li>
    <li>Konstantinos Karachalios (IEEE) — bringing the perspective of global technical standards</li>
    <li>Andy Parsons (Adobe) — speaking to innovations in media authenticity and provenance</li>
    <li>Frauke Goll (AppliedAI Institute for Europe) — emphasizing Europe's role in responsible AI innovation</li>
    <li>Tanya Perelmuter (Fondation Abeona) — underlining the importance of citizen literacy and public trust</li>
  </ul>

  <p>Together, they painted a vivid picture: the fight against disinformation cannot be won by technology alone or by policy in isolation. It requires both — and it requires everyone at the table.</p>

  <h2>Key Outcomes</h2>
  <ul>
    <li>Paris marked the formal introduction of GTC to the AI Action Summit community.</li>
    <li>Panelists underscored that no single sector can solve this problem alone.</li>
  </ul>
`,
    image: 'https://maximages.s3.us-west-1.amazonaws.com/ENS.jpg',
    category: 'Event',
    type: 'event',
    tags: []
  },
  {
    id: 'Global-Trust-Challenge-Side-Event',
    title: 'Trust in Focus: Global Trust Challenge at the Japan Cultural Centre',
    date: 'February 10, 2025',
    location: 'Japan Cultural Centre, Paris',
    excerpt: "In a world where synthetic content can be produced at the click of a button, trust has never been more fragile — or more essential. That urgency set the tone at the Japan Cultural Centre in Paris, where global leaders gathered to confront the risks of generative AI and chart pathways toward a more reliable digital future.",
    content: `<h2 style='font-size: 1.5rem;font-weight: bold;'>A Global Coalition on Stage</h2>
  <p style='margin-top:1rem;'>Co-hosted by the <b>OECD, IEEE, Japan’s Ministry of Internal Affairs and Communications (MIC), AI Commons, and Fondation Abeona.</b></p>
  <p style='margin:1rem;'>Co-hosted by the OECD, IEEE, Japan’s Ministry of Internal Affairs and Communications (MIC), AI Commons, and Fondation Abeona, the event reflected the growing recognition that disinformation is a borderless threat.The session opened with Vice Minister Takuo Imagawa (Japan’s MIC) and was moderated by Audrey Plonk, who guided a panel of distinguished voices:
  <ul style='list-style: disc;margin-left: 1.5rem;margin-top: 1rem;margin-bottom: 1rem;'>
    <li><b>Yoichi Iida</b>, Assistant Vice Minister at Japan's MIC</li>
    <li><b>Konstantinos Karachalios (IEEE)</b></li>
    <li><b>Andy Parsons (Adobe)</b></li>
    <li><b>Wan Sie Lee</b>, Director of AI and Data Innovation, Singapore's IMDA</li>
  </ul></p>
  <b>Confronting the Challenge</b>
  <p style='margin:1rem;'>The panel examined how generative AI is reshaping the information ecosystem—from the spread of deepfakes to the erosion of public confidence in journalism and institutions. Their discussions converged on three priorities:</p>
  <ul style='list-style: disc;margin-left: 1.5rem;margin-top: 1rem;margin-bottom: 1rem;'>
    <li><b>International cooperation</b> — trust cannot stop at borders.</li>
    <li><b>Digital provenance technologies</b> — make the origin and authenticity of content transparent.</li>
    <li><b>Responsible governance frameworks</b> — embed accountability into the DNA of AI systems.</li>
  </ul><br>
  <b>Introducing the Global Trust Challenge</b>
  <p style='margin:1rem;'>The event introduced the Global Trust Challenge, a landmark initiative designed to accelerate solutions that blend policy and technology. By incentivizing innovation and collaboration, the Challenge aims to equip societies with tools to defend truth in an age where it is constantly under siege.</p>
  <b>Why It Matters</b>
  <p style='margin:1rem;'>The Paris session was more than a discussion—it was a signal. Governments, standards bodies, civil society, and industry are aligning around a shared recognition: restoring trust is a global imperative. The Global Trust Challenge provides the platform to transform that recognition into scalable action.</p>
  <b>Highlights from Paris</b>
  <ul style='list-style: disc;margin-left: 1.5rem;margin-top: 1rem;margin-bottom: 1rem;'>
    <li>Global leaders underlined the urgency of safeguarding information integrity.</li>
    <li>The Challenge was presented as a mechanism to unite governance and innovation.</li>
    <li>The event reinforced that collective action is the only path forward.</li>
  </ul>
`,
    image: 'https://maximages.s3.us-west-1.amazonaws.com/GTCEvent1.png',
    category: 'Event',
    type: 'event',
     tags: []
  },
  {
    id: 'Digital-Trust-Convention',
    title: 'The Digital Trust Convention',
    date: 'November 15, 2024',
    location: 'OECD Headquarters, Paris, France',
    excerpt: 'The Digital Trust Convention brought together global stakeholders to examine what is needed to build a resilient digital space—one in which trust and integrity, as essential pillars of democratic discourse and effective markets, can be sustained in the era of generative AI.',
    content: `<h1>Building the Foundations of Digital Trust at the Digital Trust Convention</h1><p><b>Paris, November 15, 2024</b></p><p>Trust is the invisible infrastructure of democracy and markets. Without it, discourse fractures, economies falter, and communities lose cohesion. At the Digital Trust Convention, leaders from across sectors gathered to ask how this fragile asset can be safeguarded in an era when generative AI is testing the limits of what we can believe.</p><h2>A Global Gathering</h2><p>The event was co-hosted by a formidable alliance: the Atlantic Council, Bertelsmann Stiftung, KI Park, the Mila Quebec AI Institute, the OECD, the Partnership on AI (PAI), the Association of Electrical, Electronic and Information Technologies (VDE), and the World Privacy Forum. Their shared presence underscored the urgent, global nature of the challenge.</p><h2>Foundations for a Vision of Digital Trust</h2><p>In the session titled <i>"Foundations for a Vision of Digital Trust,"</i> Amir Banifatemi (Co-Founder and Director of AI Commons, and Founder/Curator of the AI for Good Global Summit) introduced the Global Trust Challenge to the Convention audience.</p><p>He emphasized that disinformation powered by scalable synthetic content cannot be tackled by any one actor in isolation. Instead, the Challenge promotes collective resilience by equipping governments, organizations, and individuals with practical tools to discern truth from manipulation. The GTC's unique design — combining technical innovation with governance and policy frameworks — resonated strongly with the Convention's theme of resilience and integrity.</p><h2>Why This Session Mattered</h2><p>This event reaffirmed that digital trust is not optional; it is the backbone of both democratic legitimacy and economic vitality. Presenting the Global Trust Challenge within this context highlighted the initiative's potential to serve as a global mechanism for action, where multilateral organizations, private sector innovators, and civil society converge.</p><h2>Key Highlights:</h2><ul><li>Digital trust framed as a pillar of democracy and markets in the AI age.</li><li>Introduction of the Global Trust Challenge as a mechanism to build resilience against disinformation.</li><li>Strong endorsement of cross-sector collaboration as the only path forward.</li></ul>
`,
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Digital+Trust+Convention+Photo.jpeg',
    category: 'Event',
    type: 'event',
     tags: []
  },
  {
    id: 'AI-For-Good',
    title: 'AI for Good Global Summit 2025',
    date: 'July 9, 2025',
    location: 'Geneva, Switzerland',
    excerpt: 'It started with a simple, unsettling question at the AI for Good Global Summit: If we can no longer tell what’s real online, how do we keep societies from unravelling? On stage, at the International Telecommunication Union’s (ITU) AI for Good, the Global Trust Challenge offered an answer — not in theory, but in action. This global initiative, born from a G7 call to safeguard truth in the digital age, is rallying technologists, policymakers, and innovators to build solutions that blend policy with technology.',
    content: `<h1>From Geneva to the World: Global Trust Challenge Sparks Action at AI for Good 2025</h1>
<p><b>Geneva, Switzerland – July 9, 2025</b></p>
<p>It started with a simple, unsettling question at the AI for Good Global Summit: If we can no longer tell what’s real online, how do we keep societies from unravelling?</p>
<p>On stage, at the International Telecommunication Union’s (ITU) AI for Good, the Global Trust Challenge offered an answer — not in theory, but in action. This global initiative, born from a G7 call to safeguard truth in the digital age, is rallying technologists, policymakers, and innovators to build solutions that blend policy with technology.</p>
<p>Backed by a formidable coalition — OECD.AI, IEEE Standards Association, UNESCO, AI Commons — the Challenge was introduced to an audience of global changemakers. They heard about its mission, its three-phase pathway from proposal to prototype to pilot, and most importantly, its open invitation: bring us your boldest ideas for restoring trust.</p>
<p>The conversations didn’t stop when the panel ended. The session sparked engaged discussion in the room and beyond, as attendees reflected on the urgent need for tools and policies that can keep pace with rapidly evolving AI-generated misinformation. Many expressed interest in learning more about the Challenge, signalling early momentum as it reaches a global audience.</p>
<p>This was the Challenge doing exactly what it was designed to do: connect brilliant minds across borders to solve one of the toughest problems of our time.</p>
<h2>Why it Matters:</h2>
<ul>
<li>Generative AI is a double-edged sword — creative on one side, corrosive on the other.</li>
<li>Trust is a shared global asset — and its defence requires coordinated effort.</li>
<li>Momentum is building — Geneva marked a turning point in turning dialogue into tangible projects.</li>
</ul>
<p><b>Call to Action:</b> The Global Trust Challenge is still open to participants worldwide to preregister. If your work can help people trust what they see, hear, and read, now is the time to step forward.</p>
`,
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
    excerpt: 'On June 20, 2025, an electric gathering took place in Athens. The Lyceum Project 2025 - “Children in the Age of AI” - was explicitly “a day of reflection and dialogue” on how to empower children to flourish in a world guided by algorithms.',
    content: `<h1>Empowering Tomorrow’s Citizens: Highlights from The Lyceum Project 2025 - Children in the Age of AI</h1>
<p><b>On June 20, 2025, an electric gathering took place in Athens.</b> The Lyceum Project 2025 - “Children in the Age of AI” - was explicitly “a day of reflection and dialogue” on how to empower children to flourish in a world guided by algorithms. Leading thinkers, educators, policymakers, and citizens gathered at the historic Athens Conservatoire (next to Aristotle's Lyceum) to ask: what does it really mean to be a child in the age of AI? Speakers agreed that as we learn anew what it means to grow up alongside AI, we must recognize children’s voices and safeguard the values that allow them to flourish.</p>
<div style='overflow: hidden;padding-bottom: 56.25%;position: relative;height: 0;'><iframe style='left: 0;top: 0;height: 100%;width: 100%;position: absolute;' width="560" height="315" src="https://www.youtube.com/embed/Ui_iGEhqaZo?si=334r0_7zpzREKdqH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<h2>Voices for Childhood: Keynotes and Panels</h2>
<p>The day opened with powerful words from Greek Prime Minister Kyriakos Mitsotakis and Baroness Beeban Kidron. Addressing a packed hall, the Prime Minister underscored two crucial “battles” for the digital age: preserving democracy and protecting our kids and teenagers. He declared that shielding young people from harm in the online world must be a top priority. Google public-policy head Eugenia Bozou added optimism, reminding everyone that “AI is not magic… if we face [its challenges] responsibly, we have a unique opportunity to create something extraordinary.”</p>
<p>Throughout the morning, panels dove into governance and education. Experts agreed that “good governance can lay the right foundations” for policies that protect children. Tanya Perelmuter (Abeona Foundation) highlighted the importance of citizen AI education - especially empowering young women - to prepare the next generation for these challenges. In a lively Greek-language “AI & Education” session, teachers and policymakers talked about using AI as a support in schools. They stressed a return to interdisciplinary learning that connects technology to real life, echoing the idea that in this changing era “we need to bring back interdisciplinarity and the connection of school subjects with everyday life.”</p>
<h2>Designing AI for Kids: Insights and Innovation</h2>
<p>The afternoon focused on practical design. A panel on “Age-Appropriate AI Design” brought together child-development experts and AI practitioners. They agreed that children must be at the center of how AI tools are built. As Dr. Jun Zhao (Oxford) put it, “We want to put children at the centre of the design process, to listen to their voices, to respect their needs.” Technologists and ethicists discussed how to develop safe, trustworthy AI systems that empower rather than exploit young users.</p>
<p>Philosophers Professor John Tasioulas (Oxford) and Spyridon Rangos (Patras) offered profound reflections. Tasioulas warned that digital systems which simply “flatter and mirror our preferences” can actually displace the personal growth that comes from genuine human relationships. In other words, if children's apps and games are just engineered to keep them hooked (a form of persuasive, addictive design), kids may miss out on challenges that build character. This insight underlined a core message: protecting childhood in the AI era isn’t just about filters and screen time - it's about guiding tech with wisdom, integrity, and respect for human development.</p>
<p>The formal program closed with enthusiastic remarks from Prof. Anastasia Giannakidou, but the day's questions carried on into a stirring site-specific performance at the ancient Lyceum. Dancers and musicians from the Athens Conservatoire transformed the ruins with movement and sound inspired by the theme of children and AI. This artistic finale - literally bridging Athens' philosophical heritage with our digital future – left the audience inspired and energized.</p>
<h2>Building Trust from Childhood Up</h2>
<p>The conversations at the Lyceum Project resonate directly with the goals of the Global Trust Challenge, a G7-led initiative to ensure people can trust the information they encounter online. At heart, both emphasize that technology must serve human values and well-being. Protecting children from harmful, addictive design is actually a foundational step toward a more trustworthy digital world. If young users grow up with ethically designed tech and strong media literacy, they become discerning citizens who can help stem misinformation.</p>
<p><b>Design with Integrity:</b> Children's platforms should avoid addictive, persuasive features and instead support healthy development. Professor Tasioulas’s warning about algorithms that merely “flatter” users highlights why we must resist manipulative design for kids. Ethically-designed technology respects children's needs and builds confidence - trust grows when parents and society see that digital systems are transparent and caring.</p>
<p><b>Educate and Empower:</b> Tanya Perelmuter and other panelists at Lyceum stressed teaching AI literacy from an early age. Media literacy and critical thinking are key goals of the Global Trust Challenge. By giving children tools to question and verify what they see online, we help create a generation that won't blindly accept AI-generated content. This protects users and enhances the reliability of the whole information ecosystem.</p>
<p><b>Ethics + Policy + Tech:</b> Both the Lyceum Project and the Global Trust Challenge call for broad collaboration. Experts from philosophy, science, governance and beyond agreed that aligning AI innovation with our highest values is essential. The Global Trust Challenge specifically seeks solutions that pair new policies with technical tools (like transparency mechanisms or content verification). In practice, this means governments, educators, technologists and families working together to make sure AI serves society.</p>
<p>By linking the care of young minds to the health of our online ecosystem, we see a clear chain: protecting children online from addictive design helps build trust in digital information for everyone. As the Lyceum Project and Global Trust Challenge illustrate, when we ensure technology respects humanity—starting with our most vulnerable—we pave the way for a more truthful, inclusive internet.</p>

`,
    image: 'https://maximages.s3.us-west-1.amazonaws.com/Screenshot+2025-08-29+210641.png',
    category: 'Event',
    type: 'event',
     tags: ['Event', 'Announcement', 'important']
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