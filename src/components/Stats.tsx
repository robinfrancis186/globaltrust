import React from 'react';

export default function Stats() {
  return (
     <section className="py-4 bg-white relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
        <div >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div  className="flex items-start bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div >
                              <h3 className="text-xl font-semibold mb-2">
                                Unprecedented Growth
                             </h3>
                             <p className="text-gray-600">
                                Deepfake incidents have increased by over 1,000% globally since 2022, with Asia-F seeing the highest growth rates. Financial fraud, election interference, and reputatic are the primary vectors of attack.
                             </p>
                        </div>
                        
                  </div>
                  <div  className="flex items-start bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div >
                              <h3 className="text-xl font-semibold mb-2">
                                Financial Impact
                             </h3>
                             <p className="text-gray-600">
                                Global losses from deepfake-enabled fraud exceeded $1.2 billion in 2023, with projected increases to $4.8 billion by 2025 as technology becomes more accessible and detection lags behind.
                             </p>
                        </div>
                  </div>
                  <div  className="flex items-start bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div >
                             <h3 className="text-xl font-semibold mb-2">
                                Election Vulnerability
                             </h3>
                             <p className="text-gray-600">
                                In 2024 alone, over 40 countries holding elections face unprecedented Al-generates misinformation campaigns, potentially affecting more than 2 billion voters worldwide.
                             </p>
                        </div>
                  </div>
                  <div  className="flex items-start bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div>
                             <h3 className="text-xl font-semibold mb-2">
                                Growth Hotspots
                             </h3>
                             <p className="text-gray-600">
                                The most dramatic increases in deepfake incidents have been observed in the Philippines (4,500%), South Korea (1,625%), Indonesia (1,550%), Turkey (1,533%), and North America (1,740%), indicating a global crisis.
                             </p>
                        </div>
                  </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 items-center justify-center mb-4 stats-container">
            <div className="flex stat-block">
                <div className="radial-progress">74%</div>
                <div className="stat-label">Worry about <span>deepfakes</span></div>
            </div>
            <div className="flex stat-block">
                <div className="radial-progress radial-95">95%</div>
                <div className="stat-label">Of <span>organisations</span> say <span>fraud risk</span> is rising</div>
            </div>
            <div className="flex stat-block">
                <div className="radial-progress radial-86">86%</div>
                <div className="stat-label">Have seen <span>false info</span> online</div>
            </div>
        </div>
      
    </div>
    </section>
      );
}