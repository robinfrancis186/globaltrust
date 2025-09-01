
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Facebook, Mail, Check } from 'lucide-react';
import NewsletterModal from './NewsletterModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{    fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase', fontSize:'2rem'}}>Global Trust Challenge</h3>
            <p className="text-gray-400" style={{fontStyle: 'italic'}}>Together, We Can Build Trust in the Age of AI</p>
          </div>
          
          <div className="space-y-2">
             {/* <h4 className="text-lg font-semibold mb-4">Legal</h4> */}
            <ul >
              {/* <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li> */}
              <li><Link to="/contact" className="text-white-600 hover:text-white" style={{fontSize:'1.125rem', fontWeight:'600'}}>Contact Us</Link></li>
            </ul> 
            <div className="text-gray-400">global-trust-challenge-team@ieee.org</div>
          </div>
          <div>
             <h4 className="text-lg font-semibold mb-4">Follow Us</h4> 
            <div >
              {/* <div className="text-gray-400" style={{marginBottom:'0.5rem'}}>Follow Us</div> */}
              <a href="https://www.linkedin.com/company/globaltrustchallenge/about/" className="text-gray-400 hover:text-white">
                <Linkedin size={24} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github size={24} />
              </a> */}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-4">Newsletter Signup</h4>
            <div className="text-gray-400">Sign up for our Global Trust Challenge newsletter</div>
            {/* Newsletter */}
                   {/* Success Message */}
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  <span className="text-sm">{successMessage}</span>
                </div>
              )}
              
              {/* Newsletter Button */}
              <button
                onClick={handleOpenModal}
                className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Global Trust Challenge. All rights reserved.</p>
        </div>
      </div>

         {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </footer>
   
    
  );
}