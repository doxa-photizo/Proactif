import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../Components/common/Navbar';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handling form submission
    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Contact | ProActif Global LBG</title>
        <meta name="description" content="Get in touch with ProActif Global LBG." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Red Hero Banner */}
        <section className="bg-gradient-to-r from-[#c00000] to-[#E3000F] text-white py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Get in Touch</h1>
            <p className="text-lg md:text-xl font-light tracking-wide text-red-50">
              Have questions? Want to partner with us? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A192F] mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E3000F] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E3000F] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E3000F] focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E3000F] hover:bg-[#c00000] text-white font-medium py-3 px-8 rounded-lg transition-colors w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column: Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A192F] mb-8">Contact Information</h2>
              <div className="space-y-8">
                
                {/* Location */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-[#E3000F]">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A192F]">Location</h3>
                    <p className="text-gray-600 mt-1">
                      AH 10 Roughy Street, Kwadaso<br />
                      AK-354-5555<br />
                      Adjacent the Code Hotel
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-[#E3000F]">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A192F]">Email</h3>
                    <p className="text-gray-600 mt-1">proactifglobal@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We aim to respond within 24 hours.</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-[#E3000F]">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A192F]">Phone</h3>
                    <p className="text-gray-600 mt-1">+233 247 476 677</p>
                    <p className="text-sm text-gray-500 mt-1">Available 9am to 6pm</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
