import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRelatedProjects } from '../../data/donationProjects';

function WaqfContribution() {
  const [amount, setAmount] = useState('1');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const navigate = useNavigate();

  const campaignId = 'waqf-contribution';
  const campaignTitle = 'Waqf Contribution';
  const presetAmounts = [5, 25, 30, 50, 100, 200];

  const campaignDescription =
    'The CATA Seeds of Futures Initiative aims to revolutionize agriculture through sustainable and ethical practices. The initiative seeks to improve productivity and profitability while prioritizing community development through job creation and support for local economies.';

  // Dynamically retrieve 4 shuffled related projects excluding current campaign
  const relatedProjects = useMemo(() => {
    return getRelatedProjects(campaignId, 4);
  }, [campaignId]);

  const handlePresetClick = (val) => {
    setAmount(val.toString());
    setSelectedPreset(val);
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleDonateClick = () => {
    const finalAmount = parseFloat(amount || '0');

    if (finalAmount <= 0 || isNaN(finalAmount)) {
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
        <Link className="hover:underline" to="/">Home</Link>
        <span className="mx-1">/</span>
        <Link className="hover:underline" to="/donate">Donation</Link>
        <span className="mx-1">/</span>
        <span className="font-medium text-slate-800">{campaignTitle}</span>
      </div>

      {/* MAIN CAMPAIGN SECTION */}
      <section className="max-w-6xl px-4 py-6 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* LEFT: MAIN IMAGE WITH ZOOM ICON */}
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop"
              alt={campaignTitle}
              className="object-cover w-full h-auto border shadow-xs rounded-xs border-slate-100"
            />
            <button 
              type="button"
              className="absolute p-2 transition-colors bg-white rounded-full shadow-md cursor-pointer top-3 right-3 text-slate-600 hover:text-black"
              title="Zoom Image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* RIGHT: DETAILS & FORM */}
          <div className="space-y-4">
            <h1 className="text-3xl font-normal leading-tight tracking-tight text-slate-800">
              {campaignTitle}
            </h1>

            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              {campaignDescription}
            </p>

            <div className="pt-2 space-y-3">
              <label className="block text-xs font-semibold text-slate-800">
                Choose an amount <span className="text-red-500">*</span>
              </label>

              {/* PRESET AMOUNT BUTTONS & CUSTOM INPUT */}
              <div className="grid grid-cols-3 gap-2">
                {presetAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePresetClick(val)}
                    className={`py-1.5 text-xs font-medium transition-colors border ${
                      selectedPreset === val
                        ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-800 border-slate-200 hover:bg-slate-300'
                    }`}
                  >
                    ${val}
                  </button>
                ))}

                {/* CUSTOM INPUT BOX */}
                <div className="flex items-center col-span-1 border rounded-xs border-slate-400 focus-within:border-[#1d4ed8]">
                  <span className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#1d4ed8]">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={amount}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                  />
                  <div className="flex items-center justify-center h-full px-2 text-white bg-[#1d4ed8]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* DONATE BUTTON */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleDonateClick}
                  className="px-5 py-2 text-xs font-semibold transition-colors cursor-pointer rounded-xs bg-slate-200 text-slate-800 hover:bg-slate-300"
                >
                  Donate »
                </button>
              </div>
            </div>

            {/* CATEGORIES META */}
            <div className="pt-2 text-xs text-slate-500">
              Categories:{' '}
              <Link className="text-pink-600 hover:underline" to="/donate">Community support</Link>,{' '}
              <Link className="text-pink-600 hover:underline" to="/donate">Donation</Link>
            </div>
          </div>

        </div>
      </section>

      {/* DESCRIPTION TAB */}
      <section className="max-w-6xl px-4 mx-auto mt-8">
        <div className="border-b border-slate-200">
          <button className="px-4 py-2 -mb-px text-xs font-medium bg-white border-t rounded-t-xs border-x border-slate-300 border-b-white text-slate-800">
            Description
          </button>
        </div>

        <div className="py-6 space-y-3">
          <h2 className="text-2xl font-normal text-slate-800">Description</h2>
          <p className="max-w-5xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            {campaignDescription}
          </p>
        </div>
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

              <Link className="text-xs font-normal leading-tight text-pink-600 hover:underline sm:text-sm" to={item.href}>
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

export default WaqfContribution;