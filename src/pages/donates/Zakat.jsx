import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRelatedProjects } from '../../data/donationProjects';

function Zakat() {
  const [contribution, setContribution] = useState('1');
  const navigate = useNavigate();

  const campaignId = 'zakat';
  const campaignTitle = 'Zakat';

  // Dynamically retrieve 4 related projects excluding current campaign
  const relatedProjects = useMemo(() => {
    return getRelatedProjects(campaignId, 4);
  }, [campaignId]);

  const handleDonateClick = () => {
    const finalAmount = parseFloat(contribution || '0');

    if (finalAmount <= 0 || isNaN(finalAmount)) {
      alert('Please enter a valid donation amount.');
      return;
    }

    // Direct navigation to Checkout page with campaign payload
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

      {/* PRODUCT TOP SECTION */}
      <section className="max-w-6xl px-4 py-6 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* LEFT: MAIN IMAGE WITH ZOOM ICON */}
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800&auto=format&fit=crop"
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
              Zakat Al Mal can be one of the most powerful things a Muslim can give. It can transform entire communities, lifting people out of poverty. It is a system that looks after those in need-an obligation upon us, but a right for our beneficiaries. For orphans, widows and displaced families, it is a much-needed lifeline. On the Day of Judgement, it will be a lifeline for us, inshallah.
            </p>

            {/* CONTRIBUTION INPUT FORM */}
            <div className="pt-2 space-y-4">
              <div>
                <label className="block mb-1.5 text-xs font-semibold text-slate-800">
                  Your Contribution <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-600">$</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="w-36 rounded-xs border border-slate-400 px-3 py-1.5 text-center text-xs font-medium text-slate-800 focus:border-[#2b6cb0] focus:outline-none"
                  />
                </div>
              </div>

              {/* DONATE BUTTON WITH ROUTING HANDLER */}
              <div className="flex justify-end max-w-md pt-2">
                <button
                  type="button"
                  onClick={handleDonateClick}
                  className="cursor-pointer rounded-sm bg-[#2b6cb0] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#205286]"
                >
                  Donate »
                </button>
              </div>
            </div>

            {/* CATEGORY META */}
            <div className="pt-4 text-xs text-slate-500">
              Category: <Link className="text-pink-600 hover:underline" to="/donate">Donation</Link>
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
            Zakat Al Mal can be one of the most powerful things a Muslim can give. It can transform entire communities, lifting people out of poverty. It is a system that looks after those in need-an obligation upon us, but a right for our beneficiaries. For orphans, widows and displaced families, it is a much-needed lifeline. On the Day of Judgement, it will be a lifeline for us, inshallah.
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

export default Zakat;