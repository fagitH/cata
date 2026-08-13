import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRelatedProjects } from '../../data/donationProjects';

// Replace with your actual local image path or unsplash fallback
const mainTreeImg = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop";

function TreePlantation() {
  const [amount, setAmount] = useState('1');
  const navigate = useNavigate();

  const campaignId = 'tree-plantation';
  const campaignTitle = 'Tree Plantation';
  const presetAmounts = ['5', '10', '15', '20', '50', '100', '200'];

  // Dynamically pull 4 related projects excluding this campaign
  const relatedProjects = useMemo(() => {
    return getRelatedProjects(campaignId, 4);
  }, [campaignId]);

  const handleDonateClick = () => {
    const finalAmount = parseFloat(amount || '0');

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
        <Link className="hover:underline" to="/">Home</Link>
        <span className="mx-1">/</span>
        <Link className="hover:underline" to="/community-support">Community support</Link>
        <span className="mx-1">/</span>
        <span className="font-medium text-slate-800">{campaignTitle}</span>
      </div>

      {/* TOP SECTION: IMAGE + DONATION FORM */}
      <section className="max-w-6xl px-4 py-6 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* LEFT: MAIN IMAGE WITH ZOOM BUTTON */}
          <div className="relative group">
            <img
              src={mainTreeImg}
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
              Trees are transformational, benefiting people, wildlife, and our environment. You can support tree planting in the National Forest in many ways, each helping to grow a greener future for everyone.
            </p>

            {/* AMOUNT SELECTION */}
            <div className="pt-2 space-y-3">
              <label className="block text-xs font-semibold text-slate-800">
                Choose an amount <span className="text-red-500">*</span>
              </label>

              {/* PRESET BUTTONS GRID */}
              <div className="grid max-w-md grid-cols-3 gap-2">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-1.5 text-xs font-medium border rounded-xs transition-colors cursor-pointer ${
                      amount === preset
                        ? 'bg-[#2b6cb0] text-white border-[#2b6cb0]'
                        : 'bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}

                {/* CUSTOM AMOUNT INPUT (PLACED IN THE GRID NEXT TO $200) */}
                <div className="flex items-center col-span-2">
                  <div className="flex items-center w-full overflow-hidden border border-slate-400 rounded-xs focus-within:border-[#2b6cb0]">
                    <span className="bg-[#2b6cb0] text-white text-xs px-2 py-1.5 font-medium">$</span>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-2 py-1.5 text-center text-xs font-medium text-slate-800 focus:outline-none"
                    />
                    <div className="bg-[#2b6cb0] text-white p-1.5 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* DONATE BUTTON */}
              <div className="flex justify-end max-w-md pt-4">
                <button
                  type="button"
                  onClick={handleDonateClick}
                  className="cursor-pointer rounded-xs bg-[#e2e8f0] px-6 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-[#cbd5e1]"
                >
                  Donate »
                </button>
              </div>
            </div>

            {/* CATEGORIES META */}
            <div className="pt-4 text-xs text-slate-500">
              Categories: <Link className="text-pink-600 hover:underline" to="/community-support">Community support</Link>, <Link className="text-pink-600 hover:underline" to="/donate">Donation</Link>
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
            Trees are transformational, benefiting people, wildlife, and our environment. You can support tree planting in the National Forest in many ways, each helping to grow a greener future for everyone.
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

              <Link className="rounded-xs bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-200" to={item.href}>
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default TreePlantation;