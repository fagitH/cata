import React from 'react';

// ==========================================
// REPLACE THIS IMPORT WITH YOUR ACTUAL BANNER IMAGE
// ==========================================
 import hajjBannerImg from '../../assets/image/hajj_fund/banner.jpg';

export default function HajjFundCambodia() {
  const operatingPrinciples = [
    'Voluntary Contribution',
    'Ethical Savings Practice',
    'Social Welfare and Community Support',
    'Full Compliance with Shariah Guidelines',
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased pb-20">
      
      {/* HERO BANNER SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white">
          
          {/* Banner Image Display */}
          <div className="relative w-full aspect-[21/9] max-h-[350px] overflow-hidden flex items-center justify-center bg-slate-100">
            <img
              src={hajjBannerImg}
              alt="Hajj Fund Cambodia Banner"
              className="w-full h-full "
            />


          </div>

        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          
          {/* Description Paragraph */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 text-justify">
            The CATA Hajj Fund was established to assist the Muslim community in Cambodia in saving and contributing towards the Hajj in accordance with the Islamic principle of Takaful (Cooperation and Protection).
          </p>

          {/* Operating Basis Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              The program operates on the basis of:
            </h3>

            <ul className="space-y-2.5 pl-2 sm:pl-4 text-sm sm:text-base text-slate-700">
              {operatingPrinciples.map((principle, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>

    </div>
  );
}