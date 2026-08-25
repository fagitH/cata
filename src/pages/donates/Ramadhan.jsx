import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRelatedProjects } from '../../data/donationProjects';
import ramadhan from '../../assets/image/donation/ramadhan.jpg';
function FoodBank() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('1');
  const navigate = useNavigate();

  const campaignId = 'food-bank';
  const campaignTitle = 'Food Bank / Ramadan Food Package';
  const amounts = ['10', '20', '50', '100', '150', '200'];

  // Dynamically pull 4 related projects excluding this campaign
  const relatedProjects = useMemo(() => {
    return getRelatedProjects(campaignId, 4);
  }, [campaignId]);

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const handleDonateClick = () => {
    // Determine active amount (either preset selected amount or custom amount)
    const finalAmount = parseFloat(selectedAmount || customAmount || '0');

    if (finalAmount <= 0) {
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
              src={ramadhan}
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
            <h1 className="text-3xl font-normal leading-tight tracking-tight text-slate-800">
              {campaignTitle}
            </h1>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              <p>
                Our Ramadan food parcels ensure a family has enough food during the month of Ramadan, so they have the energy needed to make the most of the blessed month.
              </p>
              <p>
                The food parcels contain a variety of staple items, such as rice, lentils, cooking oil, dates, and more. These essentials empower families to enjoy Ramadan, free from worrying about how to feed their children.
              </p>
            </div>

            {/* AMOUNT SELECTOR */}
            <div className="pt-2">
              <label className="block mb-2 text-xs font-bold text-slate-800">
                Choose an amount <span className="text-red-500">*</span>
              </label>

              <div className="grid max-w-md grid-cols-3 gap-2">
                {amounts.map((amt) => {
                  const isSelected = selectedAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`px-4 py-2 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#2b6cb0] text-white shadow-xs'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      ${amt} {isSelected && '✓'}
                    </button>
                  );
                })}

                {/* CUSTOM AMOUNT INPUT BOX */}
                <div className="flex items-center col-span-3 px-2 py-1 text-white border border-[#2b6cb0] bg-[#2b6cb0] rounded-xs">
                  <span className="mr-2 text-xs font-medium">$</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full px-2 py-1 text-xs font-medium bg-white text-slate-800 focus:outline-none"
                  />
                  <span className="ml-2 text-xs">{customAmount ? '✓' : ''}</span>
                </div>
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

            {/* CATEGORY META */}
            <div className="pt-4 text-xs text-slate-500">
              Categories: <Link to="/donate" className="text-pink-600 hover:underline">Community support</Link>, <Link to="/donate" className="text-pink-600 hover:underline">Donation</Link>
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
            Our Ramadan food parcels ensure a family has enough food during the month of Ramadan, so they have the energy needed to make the most of the blessed month.
          </p>
          <p className="max-w-5xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            The food parcels contain a variety of staple items, such as rice, lentils, cooking oil, dates, and more. These essentials empower families to enjoy Ramadan, free from worrying about how to feed their children.
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

export default FoodBank;