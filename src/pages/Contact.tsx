import React, { useState } from 'react';
import { Mail, Send, MessageSquare } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyq_E7D5TyT4k1urnrnLVgJiOKqtPd_0X9oTIU0VSx_2lyfuUONIpGA4TATUbw0H0Xg/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message. We will get back to you soon!',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 pt-20">
      {/* Header Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-slate-900">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Us</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get in touch with our team for any questions about the Global Trust Challenge. We're here to help.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <GlassCard className="h-full bg-white shadow-lg border-slate-100">
                <h2 className="text-2xl font-bold font-heading mb-8 text-slate-900">
                  Get in Touch
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300 mr-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-slate-900">Email</h3>
                      <a href="mailto:global-trust-challenge-team@ieee.org" className="text-slate-600 hover:text-blue-600 transition-colors">
                        global-trust-challenge-team@ieee.org
                      </a>
                      <p className="text-sm text-slate-500 mt-2">
                        For general inquiries, partnership opportunities, and support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="p-3 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300 mr-4">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-slate-900">Community</h3>
                      <p className="text-slate-600">
                        Join our community channels to connect with other participants and mentors.
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <div>
              <GlassCard className="bg-white shadow-lg border-slate-100">
                <h2 className="text-2xl font-bold font-heading mb-6 text-slate-900">
                  Send us a Message
                </h2>
                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg border ${submitStatus.type === 'success'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}