import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import ContactLogo from '../assets/image/logo.png';
import contactHeroBg from '../assets/image/image.png';
import { api } from '../utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await api.post('/contact', formData);
      setStatus({
        type: 'success',
        message: res.message || 'Thank you for contacting Cambodian Amanah Takaful. We will get back to you shortly.',
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to submit contact form. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Banner Section */}
      <section className="relative text-white py-20 sm:py-28 px-4 overflow-hidden flex items-center justify-center min-h-[470px]">
        <img
          src={contactHeroBg}
          alt="Contact Hero Background"
          className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
        />
        <div className="absolute inset-0 bg-[#2d73a5]/50 " />
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-white uppercase sm:text-6xl drop-shadow-sm">
            CONTACT
          </h1>
          <div className="w-28 h-[3px] bg-[#38bdf8] my-3 rounded-full shadow-sm" />
          <p className="text-sm font-medium tracking-wide sm:text-base text-white/90">
            If you have any question please reach us.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 py-12 mx-auto max-w-7xl sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Column: Contact Details Card */}
          <div className="flex flex-col justify-between p-6 bg-white border shadow-sm lg:col-span-1 sm:p-8 rounded-2xl border-slate-100">
            <div className="space-y-6">
              <div className="mb-6">
                <img
                  src={ContactLogo}
                  alt="Cambodian Amanah Takaful Association Logo"
                  className="h-auto max-w-[280px] object-contain"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-500">
                  WE WOULD LOVE TO HEAR FROM YOU
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Please write or call us with your questions or comments.
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-bold tracking-wider uppercase text-slate-500">
                  ADDRESS
                </h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  #116D, Russian Blvd, Sangkat Srah Chak , Khan Daun Penh, Phnom Penh
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                  CONTACT
                </h4>
                <div className="space-y-1.5 text-sm font-medium text-[#b91c1c]">
                  <p>+855 99 311 195/ 98 311 195/ 90 311 195</p>
                  <p>
                    <a
                      href="mailto:info@takafulcambodia.org"
                      className="transition-all hover:underline"
                    >
                      info@takafulcambodia.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="p-6 bg-white border shadow-sm lg:col-span-2 sm:p-8 rounded-2xl border-slate-100">
            <h2 className="text-2xl font-bold text-[#0b3d3a] mb-2">Send Us a Message</h2>
            <p className="mb-6 text-sm text-slate-600">
              Fill out the form below and our administrative team will respond as soon as possible.
            </p>

            {status && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span className="text-sm">{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-xs font-semibold tracking-wider uppercase text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b3d3a]/20 focus:border-[#0b3d3a] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-semibold tracking-wider uppercase text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b3d3a]/20 focus:border-[#0b3d3a] transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-xs font-semibold tracking-wider uppercase text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +855 12 345 678"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b3d3a]/20 focus:border-[#0b3d3a] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-semibold tracking-wider uppercase text-slate-700">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry Topic"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b3d3a]/20 focus:border-[#0b3d3a] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs font-semibold tracking-wider uppercase text-slate-700">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b3d3a]/20 focus:border-[#0b3d3a] transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#0b3d3a] hover:bg-[#072927] disabled:opacity-50 text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="p-4 mt-12 overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
          <h3 className="text-lg font-bold text-[#0b3d3a] mb-4 px-2">Our Location</h3>
          <div className="w-full overflow-hidden h-80 sm:h-96 rounded-xl">
            <iframe
              title="CATA Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125102.7231450259!2d104.82823675000001!3d11.5563738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee0b75e890f!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
