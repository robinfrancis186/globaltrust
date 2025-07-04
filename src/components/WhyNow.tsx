import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

interface Incident {
  location: [number, number];
  city: string;
  title: string;
  date: string;
  desc: string;
}

const incidents: Incident[] = [
  { location: [10.5, -66.9], city: "Venezuela", title: "AI President Hoax", date: "May 2024", desc: "Deepfake video showed opposition leader declaring false electoral victory" },
  { location: [-34.6, -58.4], city: "Argentina", title: "Economic Crisis Rumor", date: "April 2024", desc: "Fake video of Finance Minister spurred bank runs and panic withdrawals" },
  { location: [9.1, 8.7], city: "Nigeria", title: "Military Coup Deepfake", date: "July 2024", desc: "AI-generated video falsely claimed army had overthrown government" },
  { location: [30.0, 31.2], city: "Egypt", title: "AI Cleric Fatwa", date: "June 2024", desc: "Fake sermon circulated with political fatwa from religious leader" },
  { location: [5.6, -0.2], city: "Ghana", title: "Election Day Chaos Video", date: "August 2024", desc: "Deepfake of electoral commission chair announcing ballot cancellation" },
  { location: [38.9, -77.0], city: "United States", title: "Biden Deepfake Robocalls", date: "January 2024", desc: "AI-generated robocalls using President Biden's voice urged 25,000 voters not to vote in the Democratic primary" },
  { location: [-33.4, -70.6], city: "Chile", title: "Election Disinformation Video", date: "March 2024", desc: "AI-generated video aimed to discredit presidential candidate went viral" },
  { location: [14.6, -90.5], city: "Guatemala", title: "Deepfake Hoax Against Journalist", date: "May 2024", desc: "AI-generated footage falsely showed a journalist accepting bribes" },
  { location: [6.5, 3.4], city: "Nigeria", title: "Political Deepfake Scandal", date: "February 2024", desc: "AI-generated audio aimed to destabilize public trust ahead of elections" },
  { location: [-1.3, 36.8], city: "Kenya", title: "AI Voice Scam", date: "January 2024", desc: "AI-generated impersonation of telecom CEO used in fraud attempt" },
  { location: [22.3, 114.2], city: "Hong Kong", title: "Zoom Scam", date: "February 2024", desc: "Finance worker tricked into paying $25.6 million in deepfake video conference" },
  { location: [48.1, 17.1], city: "Slovakia", title: "Progressive Slovakia Election Audio", date: "September 2023", desc: "AI-generated audio of party leader discussing election rigging went viral days before election" },
  { location: [-6.2, 106.8], city: "Indonesia", title: "Suharto 'Resurrection' Campaign", date: "February 2024", desc: "AI deepfake of deceased dictator Suharto created for political campaign" },
  { location: [40.4, -3.7], city: "Spain", title: "Leading EU Deepfake Target", date: "2023", desc: "Spain identified as the country most attacked by deepfakes globally in 2023" },
  { location: [25.0, 121.5], city: "Taiwan", title: "China-backed Election Deepfakes", date: "January 2024", desc: "Microsoft confirmed first use of AI-generated material by nation-state to influence foreign election" },
  { location: [33.7, 73.1], city: "Pakistan", title: "Imran Khan Deepfake", date: "February 2024", desc: "Deepfake of former PM announcing party boycott of national elections" },
  { location: [51.5, -0.1], city: "United Kingdom", title: "Female Politicians Targeted", date: "2024", desc: "30+ female UK politicians targeted with sexually explicit deepfakes before general election" },
  { location: [39.9, 116.4], city: "China", title: "2800% Deepfake Increase", date: "2023-2024", desc: "Massive 2,800% year-over-year increase in deepfake incidents" },
  { location: [50.4, 30.5], city: "Ukraine", title: "Zelenskyy Wife Luxury Car Hoax", date: "June 2024", desc: "Deepfake video falsely claimed president's wife bought luxury car during war" },
  { location: [20.6, 77.2], city: "India", title: "280% Deepfake Surge", date: "2024", desc: "Massive increase in deepfake incidents during world's largest election with 970 million voters" },
  { location: [52.5, 13.4], city: "Germany", title: "Major EU Deepfake Hub", date: "2024", desc: "Among top countries with highest deepfake detection rates in Europe" },
  { location: [21.0, 105.8], city: "Vietnam", title: "25.3% Regional Fraud Leader", date: "2023-2024", desc: "Highest increase in deepfake fraud in Asia-Pacific region" },
  { location: [35.7, 139.7], city: "Japan", title: "243% Deepfake Growth", date: "2023-2024", desc: "Significant increase in AI-powered fraud targeting financial systems" },
  { location: [13.4, 122.6], city: "Philippines", title: "4500% Deepfake Explosion", date: "2023-2024", desc: "Most dramatic increase in deepfake cases globally" },
  { location: [15.9, 100.9], city: "Thailand", title: "Police Impersonation Scams", date: "2022-ongoing", desc: "Criminals using deepfakes to impersonate police officers in extortion video calls" },
  { location: [36.2, 128.0], city: "South Korea", title: "AI Child Abuse Material", date: "September 2023", desc: "First conviction for using AI to generate child sexual abuse material" },
  { location: [39.4, -76.7], city: "United States", title: "Pikesville High School Principal", date: "January 2024", desc: "Athletic director created deepfake audio of principal making racist remarks" },
  { location: [39.9, 32.9], city: "Turkey", title: "1533% Deepfake Increase", date: "2023-2024", desc: "Massive surge in deepfake incidents despite no major elections" },
  { location: [1.3, 103.8], city: "Singapore", title: "1100% Fraud Explosion", date: "2023-2024", desc: "Major financial hub experiences massive deepfake fraud surge" },
  { location: [-14.2, -51.9], city: "Brazil", title: "822% Deepfake Surge", date: "2023-2024", desc: "Largest Latin American economy sees major increase in AI fraud" },
  { location: [23.6, -102.6], city: "Mexico", title: "500% Election Year Surge", date: "2024", desc: "Deepfake incidents quintuple during presidential election year" },
  { location: [-30.6, 22.9], city: "South Africa", title: "500% Election Deepfakes", date: "2024", desc: "Significant surge in deepfake incidents during national elections" },
  { location: [46.2, 2.2], city: "France", title: "97% EU Election Increase", date: "2024", desc: "Nearly double deepfake incidents before European Parliament elections" },
  { location: [-25.3, 133.8], city: "Australia", title: "2.5 Million Document Theft", date: "January 2024", desc: "Russian hackers stole 2.5 million government documents in largest breach" }
];

const WhyNow: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map instance
    const map = L.map(mapRef.current, {
      worldCopyJump: false
    }).setView([20, 0], 2);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      noWrap: true,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each incident
    incidents.forEach(({ location, title, city, date, desc }) => {
      L.marker(location).addTo(map)
        .bindPopup(`<strong>${title}</strong><br>${city} • ${date}<br>${desc}`);
    });

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl font-bold mb-6"
            style={{
              fontFamily: '"Barlow Condensed", serif',
              fontWeight: '800',
              textTransform: 'uppercase',
              fontSize: '2.5rem',
              color: '#dd4fc8'
            }}
          >
            Why Now?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            The global explosion of AI-generated deepfakes and misinformation
          </p>
        </div>
        
        <div className="flex justify-center">
          <div 
            ref={mapRef}
            className="w-full max-w-5xl h-96 md:h-[540px] rounded-lg shadow-2xl"
            style={{
              boxShadow: '0 0 16px rgba(255, 255, 255, 0.15)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyNow;