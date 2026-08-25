import React, { useState, useEffect } from 'react';

// 1. Ensure these relative paths match your folder structure exactly
import catayouth from '../assets/image/cata_youth/Banner_catayouth.jpg';
import scholarship from '../assets/image/cata_youth/Banner_scholarship.jpg';
import { api, toAssetUrl } from '../utils/api';

function CataYouthScholarship() {
  const [suggestionMessage, setSuggestionMessage] = useState('');
  
  // States for dynamic scholarship data fetching
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setScholarships(await api.get('/scholarships'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (!suggestionMessage.trim()) {
      alert('Please enter a message before submitting.');
      return;
    }
    alert('Thank you for your suggestion!');
    setSuggestionMessage('');
  };

  return (
    <div className="w-full min-h-screen font-sans bg-slate-50/50 text-slate-700">
      
      {/* ================= SECTION 1: CATA'S YOUTH ================= */}
      <section className="w-full">
        {/* HERO BANNER */}
        <div className="relative w-full h-48 overflow-hidden sm:h-64 lg:h-80 bg-slate-900">
          <img
            src={catayouth}
            alt="CATA's Youth Banner"
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/70 via-transparent to-transparent">
            <div className="w-full max-w-6xl px-4 pb-6 mx-auto">
              <span className="inline-block px-3 py-1 bg-[#0088cc] text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Program
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                CATA's Youth
              </h1>
            </div>
          </div>
        </div>

        {/* CONTENT & SUGGESTION FORM */}
        <div className="max-w-6xl px-4 py-10 mx-auto">
          <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* LEFT: PROGRAM DESCRIPTION */}
            <div className="p-6 space-y-4 bg-white border shadow-xs lg:col-span-7 sm:p-8 rounded-2xl border-slate-200/80">
              <h2 className="pb-3 text-xl font-bold border-b sm:text-2xl text-slate-800 border-slate-100">
                About The Program
              </h2>
              <p className="text-sm leading-relaxed sm:text-base text-slate-600">
                The “CATA’s Youth” program is dedicated to fostering the sharing of new information, enhancing skill development through short courses, offering insights on youth and community issues, providing job opportunities for young individuals, engaging in social welfare activities, and more.
              </p>
            </div>

            {/* RIGHT: SUGGESTION OF ACTIVITIES FORM */}
            <div className="p-6 space-y-4 bg-white border shadow-xs lg:col-span-5 sm:p-8 rounded-2xl border-slate-200/80">
              <div>
                <h2 className="text-xl font-bold text-[#0088cc]">
                  Suggestion of Activities
                </h2>
                <p className="mt-1 text-xs leading-relaxed sm:text-sm text-slate-500">
                  CATA is opening its mind to accept suggestions from youth in order to improve and develop the community together.
                </p>
              </div>

              <form onSubmit={handleSuggestionSubmit} className="pt-2 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Suggest activity for youth
                  </label>
                  <textarea
                    rows={4}
                    value={suggestionMessage}
                    onChange={(e) => setSuggestionMessage(e.target.value)}
                    placeholder="Type your message or ideas here..."
                    className="w-full p-3 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f39200] hover:bg-[#e08500] text-white text-xs sm:text-sm font-semibold py-2.5 px-5 transition-all duration-200 rounded-xl shadow-xs hover:shadow-md cursor-pointer"
                >
                  Submit Suggestion
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 2: CATA SCHOLARSHIP ================= */}
      <section className="w-full bg-white border-t border-slate-200/60">
        {/* HERO BANNER */}
        <div className="relative w-full h-48 overflow-hidden sm:h-64 lg:h-80 bg-slate-900">
          <img
            src={scholarship}
            alt="CATA Scholarship Banner"
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/70 via-transparent to-transparent">
            <div className="w-full max-w-6xl px-4 pb-6 mx-auto">
              <span className="inline-block px-3 py-1 bg-[#f39200] text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Empowerment
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                CATA Scholarship
              </h1>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl px-4 py-12 mx-auto space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0088cc] leading-snug text-center sm:text-left">
            Everyone deserves an opportunity to pursue what they love doing. How many have that option?
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed border-l-4 border-[#0088cc]/30 pl-4 sm:pl-6">
            <p>
              At CATA, we are committed towards helping young talent in need to realise their dreams. We go beyond providing financial support by also providing professional development and a mentor support system designed to empower the region’s young talent to build a bright future and make a difference for those around them.
            </p>

            <p>
              The CATA Scholarship is a highly selective, full scholarship for exceptional students from registered members in which CATA has a presence. We are looking for individuals fueled up to go beyond the ordinary.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: SCHOLARSHIP ANNOUNCEMENTS (DYNAMIC API) ================= */}
      <section className="w-full bg-[#e8f3f9] py-12 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0088cc] text-center mb-10">
            Scholarship Announcement
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="py-10 text-center text-slate-500">
              Loading scholarship announcements...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="py-10 text-center text-red-500">
              {error}
            </div>
          )}

          {/* Dynamic Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {scholarships.map((item) => (
                <div 
                  key={item.id || item._id} 
                  className="flex flex-col justify-between overflow-hidden transition-shadow bg-white rounded-md shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="w-full overflow-hidden h-44 bg-slate-200">
                      <img
                        src={item.image ? toAssetUrl(item.image) : scholarship}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-bold leading-snug text-slate-800 line-clamp-3">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                      {item.link && <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Read More
                      </a>}
                    </div>
                  </div>

                  {/* Author / Date Footer */}
                  <div className="flex items-center gap-2 px-4 pt-2 pb-4 mt-2 text-xs border-t text-slate-500 border-slate-50">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 shrink-0">
                      <svg 
                        className="w-4 h-4 text-slate-500" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Scholarship announcement'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && scholarships.length === 0 && (
            <p className="py-10 text-center text-slate-500">There are no scholarship announcements at the moment. Please check back soon.</p>
          )}
        </div>
      </section>

    </div>
  );
}

export default CataYouthScholarship;
