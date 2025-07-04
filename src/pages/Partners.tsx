import React, { useState } from 'react';
import PartnersScroll from '../components/PartnersScroll';
import Sponsors from '../components/Sponsors';
import SponsorsCTA from '../components/SponsorsCTA';
import { CheckCircle, Globe, Award, Eye, Heart, ArrowRight } from 'lucide-react';


const sponsors = [
   {
    name: "IEEE",
    logo: "https://brand-experience.ieee.org/wp-content/uploads/2016/12/LogoTest-e1481836752230.png",
  },
  {
    name: "OECD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/OECD_logo.svg/320px-OECD_logo.svg.png",
  },
  {
    name: "AI Commons",
    logo: "https://ai-commons.org/wp-content/themes/aicommons/assets/img/logo.svg",
  },
  // Add more sponsors as needed
];


interface SponsorshipFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType?: string;
  sponsorshipLevel?: string;
  interests?: string[];
  message: string;
  website?: string;
}


  

export default function Partners() {
//**Form Code */
const [formData, setFormData] = useState<SponsorshipFormData>({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: '',
    sponsorshipLevel: '',
    interests: [],
    message: '',
    website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  }; */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Here you would typically send the form data to your backend
      const response = await fetch('https://script.google.com/macros/s/AKfycbyyceYQoKcce6dnmgWtk0QMWg0IYq4DRWuOBAI5dwTjW2I7077Nhw5d7f-Y9D8wnnA_vQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'sponsorship'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your sponsorship inquiry! Our partnerships team will contact you soon.',
        });
        setFormData({
          organizationName: '',
          contactName: '',
          email: '',
          phone: '',
          organizationType: '',
          sponsorshipLevel: '',
          interests: [],
          message: '',
          website: ''
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

  const sponsorshipLevels = [
    { value: 'title', label: 'Title Sponsor ($100,000+)', description: 'Maximum visibility and co-branding opportunities' },
    { value: 'presenting', label: 'Presenting Sponsor ($50,000+)', description: 'High-level branding and speaking opportunities' },
    { value: 'supporting', label: 'Supporting Sponsor ($25,000+)', description: 'Significant brand presence and networking access' },
    { value: 'community', label: 'Community Partner ($10,000+)', description: 'Brand recognition and participant engagement' },
    { value: 'inkind', label: 'In-Kind Sponsor', description: 'Services, technology, or resources contribution' },
    { value: 'custom', label: 'Custom Partnership', description: 'Tailored sponsorship package' }
  ];

  const interestAreas = [
    'Brand Visibility',
    'Thought Leadership',
    'Talent Recruitment',
    'Technology Showcase',
    'Policy Influence',
    'Research Collaboration',
    'Global Networking',
    'CSR/ESG Goals'
  ];

//** End Form Code */

  return (
    <div className="flex flex-col min-h-screen">
           {/* Hero Section with Parallax */}
      <section className="relative h-[600px] overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center heroStyle"
          style={{
            backgroundImage: 'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1556761175-b413da4baf72.webp")',
           
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl pt-16">
            <h1 className="text-5xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif',fontWeight: '800',textTransform: 'uppercase',fontSize: '5.5rem'}}>Partners & Sponsors</h1>
            <h2 className="text-3xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>Coalition of Trust-Builders</h2>
            <p className="text-xl mb-8">The Global Trust Challenge is enabled by leading organizations worldwide committed to shaping a trustworthy AI future.
</p>
          </div>
        </div>
      </section>
      

      {/* Sponsors Section */}
      <Sponsors />

      {/* Partnership Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              Why Not Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our partners don’t just endorse the Challenge — they help make it possible.
From hosting pilot programs and mentoring teams to providing infrastructure, outreach, or visibility, each partner contributes in ways that align with their mission and strengths.
</p><p className="text-xl text-gray-600 max-w-4xl mx-auto">Whether you’re a city government, tech platform, multilateral body, or grassroots organization — you can play a vital role in shaping how the world responds to AI-driven misinformation.
Together, we’re building an ecosystem of trust.
 
            </p>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Global Impact",
                description: "Support a worldwide initiative tackling a pressing issue. Your sponsorship helps mobilize multi-disciplinary teams across the globe to restore trust in information."
              },
              {
                icon: Award,
                title: "Innovation & Leadership",
                description: "Align your brand with cutting-edge innovation and policy leadership. You'll be at the forefront of shaping how society combats AI-driven misinformation."
              },
              {
                icon: Eye,
                title: "Visibility & Recognition",
                description: "Gain prominent recognition among international experts, governments, and tech leaders. Partners are featured on our website, in media coverage, and at high-profile events associated with the Challenge."
              },
              {
                icon: Heart,
                title: "Ethical Commitment",
                description: "Demonstrate your commitment to ethical AI, transparency, and societal well-being. Supporting this challenge visibly shows you are part of the solution to one of AI's biggest challenges."
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start bg-gray-50 p-8 rounded-lg shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <benefit.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-3" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*/CTA */}
      <SponsorsCTA />

       {/* Sponsorship Form */}
      <section id="sponsor-registration" className="py-20 bg-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase', fontSize: '2.5rem'}}>
              Submit Your Sponsorship Inquiry
            </h2>
            <p className="text-xl text-indigo-100">
              Let's discuss how your organization can make a meaningful impact
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Information */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                  Organization Information
                </h3>
              </div>

              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name *
                </label>
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Type *
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select organization type</option>
                  <option value="corporation">Corporation</option>
                  <option value="nonprofit">Non-profit</option>
                  <option value="government">Government Agency</option>
                  <option value="academic">Academic Institution</option>
                  <option value="foundation">Foundation</option>
                  <option value="association">Professional Association</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* <div>
                <label htmlFor="sponsorshipLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Sponsorship Interest *
                </label>
                <select
                  id="sponsorshipLevel"
                  name="sponsorshipLevel"
                  value={formData.sponsorshipLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select sponsorship level</option>
                  {sponsorshipLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Contact Information */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                  Contact Information
                </h3>
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Areas of Interest */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-xl font-bold mb-4" style={{fontFamily: '"Barlow Condensed", serif', fontWeight: '800', textTransform: 'uppercase'}}>
                  Areas of Interest
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  <input
                  id="interests"
                  name="interests"
                  type="text"
                  value={formData.interests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                  {/* {interestAreas.map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="mr-2 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))} */}
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-2 mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your goals and how you'd like to partner with us
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your organization's objectives, target audience, and how you envision partnering with the Global Trust Challenge..."
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Sponsorship Inquiry'}
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center">
              Our partnerships team will review your inquiry and contact you within 2 business days.
            </p>
          </form>
        </div>
      </section>

    </div>
  );
}