import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRelatedProjects } from '../../data/donationProjects';

function Education() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState('5');
  const [customAmount, setCustomAmount] = useState('');
  const [isOther, setIsOther] = useState(false);

  const campaign = {
    id: 'orphan-support',
    title: 'Orphan Support',
  };

  const amounts = ['5', '10', '30', '50', '100', '200'];

  // Automatically filter out 'orphan-support' and select 4 related projects
  const relatedProjects = useMemo(() => {
    return getRelatedProjects(campaign.id, 4);
  }, [campaign.id]);

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt);
    setIsOther(false);
    setCustomAmount('');
  };

  const handleOtherClick = () => {
    setIsOther(true);
    setSelectedAmount('');
  };

  const handleDonateClick = () => {
    const finalAmount = isOther ? parseFloat(customAmount) || 0 : parseFloat(selectedAmount) || 0;

    if (finalAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    navigate('/donate-payment', {
      state: {
        campaignTitle: campaign.title,
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
        <Link to="/donate" className="hover:underline">Donation</Link>
        <span className="mx-1">/</span>
        <span className="font-medium text-slate-800">{campaign.title}</span>
      </div>

      {/* PRODUCT TOP SECTION */}
      <section className="max-w-6xl px-4 py-6 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          {/* LEFT: MAIN IMAGE */}
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
              alt="Orphan Support"
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
              {campaign.title}
            </h1>

            <p className="text-sm leading-relaxed text-slate-600">
              Every single day 5,700 children become orphaned. In times of conflict and disaster, children are the first to be affected – especially if they become orphaned. The reality of poverty is a daily burden for adults, imagine what it would be like for a child? Where would they sleep? What would they eat? Who would look after them if they were to fall ill? We have to help them.
            </p>

            {/* AMOUNT SELECTOR */}
            <div className="pt-2">
              <label className="block mb-2 text-xs font-bold text-slate-800">
                Choose an amount <span className="text-red-500">*</span>
              </label>

              <div className="grid max-w-md grid-cols-3 gap-2">
                {amounts.map((amt) => {
                  const isSelected = selectedAmount === amt && !isOther;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`rounded-xs px-4 py-2 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#2b6cb0] text-white shadow-xs'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      ${amt} {isSelected && '✓'}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleOtherClick}
                  className={`col-span-3 rounded-xs px-4 py-2 text-xs font-medium transition-all ${
                    isOther
                      ? 'bg-[#2b6cb0] text-white shadow-xs'
                      : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  }`}
                >
                  Other {isOther && '✓'}
                </button>
              </div>

              {isOther && (
                <div className="max-w-md mt-3">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter custom amount ($)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full rounded-xs border border-slate-300 px-3 py-2 text-xs focus:border-[#2b6cb0] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* DONATE BUTTON */}
            <div className="flex justify-end max-w-md pt-4">
              <button
                type="button"
                onClick={handleDonateClick}
                className="cursor-pointer rounded-sm bg-[#2b6cb0] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#205286]"
              >
                Donate »
              </button>
            </div>

            <div className="pt-4 text-xs text-slate-500">
              Category: <Link to="/donate" className="text-pink-600 hover:underline">Donation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION TABS */}
      <section className="max-w-6xl px-4 mx-auto mt-8">
        <div className="border-b border-slate-200">
          <button className="px-4 py-2 -mb-px text-xs font-medium bg-white border rounded-t-sm border-slate-200 border-b-white text-slate-700">
            Description
          </button>
        </div>

        <div className="py-6">
          <h2 className="mb-3 text-2xl font-normal text-slate-800">Description</h2>
          <p className="max-w-5xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            Every single day 5,700 children become orphaned. In times of conflict and disaster, children are the first to be affected – especially if they become orphaned. The reality of poverty is a daily burden for adults, imagine what it would be like for a child? Where would they sleep? What would they eat? Who would look after them if they were to fall ill? We have to help them.
          </p>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      <section className="max-w-6xl px-4 py-8 mx-auto mb-12">
        <h2 className="mb-6 text-2xl font-normal text-slate-800">Related projects</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProjects.map((item) => (
            <div key={item.id} className="flex flex-col items-start justify-between space-y-3">
              <div className="w-full overflow-hidden aspect-square bg-slate-100">
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
                className="rounded-sm bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-200"
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

export default Education;