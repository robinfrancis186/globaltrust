import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
   subject: string;
  message: string;

}

export default function Newsletter() {

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
            message: 'Thank you, you are registered to our newsletter!',
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
    <div className="w-full">
         {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-lg">
                      {submitStatus.type && (
                        <div
                          className={`mb-6 p-4 rounded-md ${
                            submitStatus.type === 'success'
                              ? 'bg-green-50 text-green-800'
                              : 'bg-red-50 text-red-800'
                          }`}
                        >
                          {submitStatus.message}
                        </div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            style={{ color: '#111827', backgroundColor: '#ffffff' }}
                           
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 !text-gray-900 !bg-white"
                          />
                          
                          {/* HIDDEN FIELDS  */}
                            <input
                                type="hidden"
                                id="subject"
                                name="subject"
                                value="Newsletter Subscription"  
                             />
                             <input
                                type="hidden"
                                id="message"
                                name="message"
                                value="This user has requested a subscription to the Global Trust Challenge Newsletter."  
                             />
                
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                          }`}
                        >
                          {isSubmitting ? 'Sending...' : 'Subscribe'}
                          <Send className="ml-2 h-5 w-5" />
                        </button>
                      </form>
                    </div>
    </div>
  )
}
