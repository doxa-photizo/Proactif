import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../Components/common/Navbar';
import { MapPin, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dynamic-site-backend-admin.onrender.com';
const CONTACT_API_PATH = '/api/v1/contact/';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    
    if (typeof name !== 'string' || name.trim() === '') {
      setErrorMessage('Please enter your full name.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (typeof message !== 'string' || message.trim() === '') {
      setErrorMessage('Please enter a message.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`${BASE_URL}${CONTACT_API_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.detail || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
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
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-light tracking-wide text-red-50"
            >
              Have questions? Want to partner with us? We'd love to hear from you.
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#0A192F] mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle2 className="size-5" />
                      <p>Thanks for reaching out! We'll get back to you soon.</p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3"
                    >
                      <AlertCircle className="size-5" />
                      <p>{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E3000F] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                    disabled={status === 'loading'}
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
                    disabled={status === 'loading'}
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
                    disabled={status === 'loading'}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#E3000F] hover:bg-[#c00000] disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>

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
