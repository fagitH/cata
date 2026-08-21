import React, { useState } from 'react';

// 1. Ensure these relative paths match your folder structure exactly
import catayouth from '../assets/image/cata_youth/Banner_catayouth.jpg';
import scholarship from '../assets/image/cata_youth/Banner_scholarship.jpg';


function CataYouthScholarship() {
  const [suggestionMessage, setSuggestionMessage] = useState('');
  
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

    </div>
  );
}

export default CataYouthScholarship;