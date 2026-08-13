import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRelatedProjects } from '../../data/donationProjects';

function Qurabn() {
  const [activeTab, setActiveTab] = useState('description');
  const [contribution, setContribution] = useState('1');
  const navigate = useNavigate();

  const campaignId = 'qurban';
  const campaignTitle = 'Qurban in Cambodia';

  // Dynamically pull 4 related projects excluding this campaign
  const relatedProjects = useMemo(() => {
    return getRelatedProjects(campaignId, 4);
  }, [campaignId]);

  const handleDonateClick = () => {
    const finalAmount = parseFloat(contribution) || 0;

    if (finalAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    navigate('/donate-payment', {
      state: {
        campaignTitle,
        amount: finalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen font-sans bg-white text-slate-700">
      
      {/* BREADCRUMB */}
      <div className="max-w-6xl px-4 pt-6 mx-auto text-xs text-slate-500">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/donate" className="hover:underline">Community support</Link>
        <span className="mx-1">/</span>
        <span className="font-medium text-slate-800">{campaignTitle}</span>
      </div>

      {/* PRODUCT TOP SECTION */}
      <section className="max-w-6xl px-4 py-6 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* LEFT: MAIN IMAGE WITH ZOOM ICON */}
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop"
              alt={campaignTitle}
              className="object-cover w-full h-auto border shadow-xs rounded-xs border-slate-100"
            />
            <button 
              type="button"
              className="absolute p-2 transition-colors bg-white rounded-full shadow-md top-3 right-3 text-slate-600 hover:text-black"
              title="Zoom Image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* RIGHT: DETAILS & FORM */}
          <div className="space-y-4">
            <h1 className="text-3xl font-normal tracking-tight text-slate-800">
              {campaignTitle}
            </h1>

            <p className="text-sm leading-relaxed text-slate-600">
              Qurban is not merely the slaughtering of an animal and the distribution of its meat; it transcends being a mere ritual. The word 'Qurbani' is derived from the Arabic, 'qurban', rooted in the word 'qurb' – meaning 'nearness'. The essence of offering Qurbani is to draw near to Allah. Through Qurbani, we reaffirm our commitment to Allah, expressing our complete submission to His will, just as Prophet Ibrahim (as) did.
            </p>

            {/* YOUR CONTRIBUTION INPUT */}
            <div className="pt-2">
              <label className="block mb-2 text-xs font-bold text-slate-800">
                Your Contribution <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center max-w-xs gap-1">
                <span className="text-sm text-slate-700">$</span>
                <input
                  type="number"
                  min="1"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  className="w-32 rounded-xs border border-slate-400 px-3 py-1.5 text-sm font-medium text-slate-800 focus:border-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {/* DONATE BUTTON WITH CLICK HANDLER */}
            <div className="flex justify-end max-w-md pt-2">
              <button
                type="button"
                onClick={handleDonateClick}
                className="cursor-pointer rounded-sm bg-[#2b6cb0] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#205286]"
              >
                Donate »
              </button>
            </div>

            {/* CATEGORY META */}
            <div className="pt-4 text-xs text-slate-500">
              Categories: <Link to="/donate" className="text-pink-600 hover:underline">Community support</Link>, <Link to="/donate" className="text-pink-600 hover:underline">Donation</Link>
            </div>
          </div>

        </div>
      </section>

      {/* TABS SECTION */}
      <section className="max-w-6xl px-4 mx-auto mt-8">
        <div className="flex gap-1 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            className={`-mb-px rounded-t-xs px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === 'description'
                ? 'border-x border-t border-slate-300 border-b-white bg-white font-semibold text-slate-800'
                : 'border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('additional')}
            className={`-mb-px rounded-t-xs px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === 'additional'
                ? 'border-x border-t border-slate-300 border-b-white bg-white font-semibold text-slate-800'
                : 'border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Additional information
          </button>
        </div>

        {/* TAB 1 CONTENT: DESCRIPTION */}
        {activeTab === 'description' && (
          <div className="py-6 space-y-3">
            <h2 className="text-2xl font-normal text-slate-800">Description</h2>
            <p className="max-w-5xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              Qurban is not merely the slaughtering of an animal and the distribution of its meat; it transcends being a mere ritual. The word 'Qurbani' is derived from the Arabic, 'qurban', rooted in the word 'qurb' – meaning 'nearness'. The essence of offering Qurbani is to draw near to Allah. Through Qurbani, we reaffirm our commitment to Allah, expressing our complete submission to His will, just as Prophet Ibrahim (as) did.
            </p>
          </div>
        )}

        {/* TAB 2 CONTENT: ADDITIONAL INFORMATION */}
        {activeTab === 'additional' && (
          <div className="py-6 space-y-3">
            <h2 className="text-2xl font-normal text-slate-800">Additional information</h2>
            
            <div className="max-w-5xl text-xs border border-slate-200 sm:text-sm">
              <div className="flex p-3 bg-slate-50">
                <span className="w-40 font-bold text-slate-800">Donation to</span>
                <span className="italic text-slate-600">Goat USD200, Cow USD700</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* RELATED PROJECTS */}
      <section className="max-w-6xl px-4 py-8 mx-auto mb-12">
        <h2 className="mb-6 text-2xl font-normal text-slate-800">Related projects</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProjects.map((item) => (
            <div key={item.id || item.title} className="flex flex-col items-start justify-between space-y-3">
              <div className="w-full overflow-hidden border aspect-square bg-slate-100 border-slate-200 rounded-xs">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <Link to={item.href} className="text-xs font-normal leading-tight text-pink-600 hover:underline sm:text-sm">
                {item.title}
              </Link>

              <Link
                to={item.href}
                className="rounded-xs bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-200"
              >
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Qurabn;