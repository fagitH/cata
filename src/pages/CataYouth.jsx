import React, { useState, useEffect } from 'react';

// 1. Ensure these relative paths match your folder structure exactly
import catayouth from '../assets/image/cata_youth/Banner_catayouth.jpg';
import scholarship from '../assets/image/cata_youth/Banner_scholarship.jpg';


function CataYouthScholarship() {
  const [suggestionMessage, setSuggestionMessage] = useState('');
  
  // Dynamic state for scholarships from backend
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic scholarship announcements from backend API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/scholarships');
        
        if (!response.ok) {
          throw new Error('Failed to load scholarship announcements.');
        }

        const data = await response.json();
        setScholarships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

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
    <div className="w-full min-h-screen bg-slate-50/50 font-sans text-slate-700">
      
      {/* ================= SECTION 1: CATA'S YOUTH ================= */}
      <section className="w-full">
        {/* HERO BANNER */}
        <div className="relative w-full h-48 sm:h-64 lg:h-80 bg-slate-900 overflow-hidden">
          <img
            src={catayouth}
            alt="CATA's Youth Banner"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end">
            <div className="max-w-6xl mx-auto w-full px-4 pb-6">
              <span className="inline-block px-3 py-1 bg-[#0088cc] text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Program
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                CATA's Youth
              </h1>
            </div>
          </div>
        </div>

        {/* CONTENT & SUGGESTION FORM */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: PROGRAM DESCRIPTION */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 border-b border-slate-100 pb-3">
                About The Program
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The “CATA’s Youth” program is dedicated to fostering the sharing of new information, enhancing skill development through short courses, offering insights on youth and community issues, providing job opportunities for young individuals, engaging in social welfare activities, and more.
              </p>
            </div>

            {/* RIGHT: SUGGESTION OF ACTIVITIES FORM */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#0088cc]">
                  Suggestion of Activities
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  CATA is opening its mind to accept suggestions from youth in order to improve and develop the community together.
                </p>
              </div>

              <form onSubmit={handleSuggestionSubmit} className="space-y-4 pt-2">
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
      <section className="w-full border-t border-slate-200/60 bg-white">
        {/* HERO BANNER */}
        <div className="relative w-full h-48 sm:h-64 lg:h-80 bg-slate-900 overflow-hidden">
          <img
            src={scholarship} /* Replaced scholarshipBannerImg with catayouth as placeholder */
            alt="CATA Scholarship Banner"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end">
            <div className="max-w-6xl mx-auto w-full px-4 pb-6">
              <span className="inline-block px-3 py-1 bg-[#f39200] text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Empowerment
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                CATA Scholarship
              </h1>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
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

      {/* ================= SECTION 3: SCHOLARSHIP ANNOUNCEMENT (DYNAMIC DATA) ================= */}
      <section className="w-full bg-slate-100/70 py-12 px-4 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0088cc]">
              Scholarship Announcement
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Explore open full-funding opportunities and programs available for registered members.
            </p>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex justify-center items-center py-12 text-xs sm:text-sm text-slate-500 space-x-2">
              <svg className="animate-spin h-5 w-5 text-[#0088cc]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading scholarship announcements...</span>
            </div>
          )}

          {/* ERROR STATE */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-center py-4 px-6 rounded-xl text-xs sm:text-sm max-w-lg mx-auto">
              {error}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && scholarships.length === 0 && (
            <div className="bg-white border border-slate-200 text-center py-12 px-6 rounded-2xl text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              No scholarship announcements available at this time.
            </div>
          )}

          {/* DYNAMIC SCHOLARSHIP CARDS GRID */}
          {!loading && !error && scholarships.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {scholarships.map((item) => (
                <div
                  key={item.id || item._id}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* CARD IMAGE */}
                    <div className="w-full h-44 bg-slate-100 overflow-hidden relative">
                      <img
                        src={item.image_url || item.image || ''}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* CARD CONTENT */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#0088cc] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div className="pt-1">
                        <a
                          href={item.link || `/scholarship/${item.id}`}
                          className="inline-flex items-center text-xs font-semibold text-[#0088cc] hover:text-[#006699] transition-colors"
                        >
                          <span>Read More</span>
                          <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center space-x-2 text-slate-400 text-xs">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="truncate">{item.date || item.created_at}</span>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default CataYouthScholarship;