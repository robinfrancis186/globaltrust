import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Check, ArrowRight } from 'lucide-react';
import NewsletterModal from './NewsletterModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

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
    <footer className="relative bg-slate-50 pt-20 pb-10 overflow-hidden border-t border-slate-200">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-3xl tracking-tight text-slate-900">
              GLOBAL TRUST <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">CHALLENGE</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Together, We Can Build Trust in the Age of Generative AI. Join the movement to shape a more secure digital future.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/globaltrustchallenge/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:global-trust-challenge-team@ieee.org"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/people" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors"></span>
                  People
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors"></span>
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors"></span>
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-slate-900 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors"></span>
                  FAQ
                </Link>
              </li>
              <li className="text-slate-500 text-sm pt-2">
                global-trust-challenge-team@ieee.org
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-slate-900 mb-2">Stay Updated</h4>
            <p className="text-slate-600 text-sm">
              Subscribe to our newsletter for the latest updates and announcements.
            </p>

            {successMessage ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span className="text-sm">{successMessage}</span>
              </div>
            ) : (
              <button
                onClick={handleOpenModal}
                className="w-full group relative px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md"
              >
                <span className="text-slate-600 group-hover:text-slate-900 font-medium">Subscribe Now</span>
                <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Global Trust Challenge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      <NewsletterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </footer>
  );
}