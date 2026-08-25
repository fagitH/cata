import React from 'react';

// ==========================================
// REPLACE THESE IMPORTS WITH YOUR ACTUAL IMAGES
// ==========================================
 import bannerImg from '../../assets/image/luy_saat.jpg';
 import acledaLogo from '../../assets/image/luy_saat/ac.jpg';
 import abaLogo from '../../assets/image/luy_saat/aba.webp';

export default function LuyKhnhumSaat() {
  const videoCards = [
 {
    id: 'e_BWzLfEGes',
    title: 'Speech by H E In Channy',
    subtitle: 'CATA COMMUNITY',
    thumbnail: 'https://img.youtube.com/vi/e_BWzLfEGes/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=e_BWzLfEGes',
  },
    {
      id: 'D2gPTFYhpgM',
      title: 'Speech of H E datuk othman',
      subtitle: 'CATA COMMUNITY',
      thumbnail: 'https://img.youtube.com/vi/D2gPTFYhpgM/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=D2gPTFYhpgM',
    },
    {
      id: '_WYByPyPO08',
      title: 'How to enable Riba-Free',
      subtitle: 'CATA COMMUNITY',
      thumbnail: 'https://img.youtube.com/vi/_WYByPyPO08/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_WYByPyPO08',
    },
    {
      id: '4IAQznBP3do',
      title: 'ACLEDA and CATA partnership',
      subtitle: 'CATA COMMUNITY',
      thumbnail: 'https://img.youtube.com/vi/4IAQznBP3do/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=4IAQznBP3do',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased pb-20">
      
      {/* HERO BANNER SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-r from-sky-900 via-blue-800 to-sky-700">
          {/* Banner Graphic Placeholder */}
          <div className="relative w-full aspect-[21/9] max-h-[420px] overflow-hidden flex items-center justify-center">
            <img
              src={bannerImg}
              alt="CATA-Muslim Community Account - Luy Khnhum Saat"
              className="w-full h-full object-cover opacity-80"
            />
           
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* PROGRAM DESCRIPTION BLOCK */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#107dcb] tracking-tight border-b border-slate-100 pb-4">
            LUY KHNHUM SAAT PROGRAM (INTEREST-FREE)
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-700 text-justify">
            Luy Khnhum Saat Program (Interest-Free), also called the <strong className="text-slate-900">Wealth Purification Program</strong>, is a Shariah-compliant initiative by the Cambodian Amanah Takaful Association (CATA) in partnership with Local Bank. It allows Muslims in Cambodia to manage their finances <strong className="text-slate-900">without earning or paying interest (Riba)</strong>.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-slate-700 text-justify">
            All interest generated from members’ bank accounts is <strong className="text-slate-900">automatically redirected to CATA</strong> as a permissible donation, purifying members’ wealth and ensuring full compliance with Islamic law. These funds are used for <strong className="text-slate-900">humanitarian and community development</strong>, including:
          </p>

          {/* LIST 1: FUND USAGE */}
          <ul className="space-y-2.5 pl-2 sm:pl-4 text-sm sm:text-base text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-extrabold mt-1">•</span>
              <span>Emergency aid for families and disaster relief</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-extrabold mt-1">•</span>
              <span>Education programs and scholarships for underprivileged Muslim children</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-extrabold mt-1">•</span>
              <span>Development of community infrastructure</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-extrabold mt-1">•</span>
              <span>Social and healthcare support for vulnerable community members</span>
            </li>
          </ul>

          {/* LIST 2: MEMBER BENEFITS */}
          <div className="pt-4 space-y-3 border-t border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Member Benefits:
            </h3>

            <ul className="space-y-2.5 pl-2 sm:pl-4 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 font-extrabold mt-1">•</span>
                <span>Purify personal wealth and avoid interest income</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 font-extrabold mt-1">•</span>
                <span>Contribute to meaningful community and humanitarian projects</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 font-extrabold mt-1">•</span>
                <span>Simplify compliance with Islamic principles</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 font-extrabold mt-1">•</span>
                <span>Participate in modern banking with full Shariah confidence</span>
              </li>
            </ul>
          </div>

        </section>

        {/* OUR PARTNERS SECTION */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-[#107dcb]">
            Our Partners
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ACLEDA BANK LOGO BOX */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 flex items-center justify-center min-h-[180px] shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 text-center">
               
                 <img src={acledaLogo} alt="ACLEDA Bank" className="h-full object-contain" />
              </div>
            </div>

            {/* ABA BANK LOGO BOX */}
            <div className="bg-[#005c78] text-white rounded-2xl p-8 flex flex-col items-center justify-center min-h-[180px] shadow-2xs hover:shadow-md transition-shadow">
              <div className="text-center space-y-1">
                
              </div>
             <img src={abaLogo} alt="ABA Bank" className="h-full object-contain" />
            </div>

          </div>
        </section>

        {/* MEDIA & VIDEOS GALLERY */}
        <section className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoCards.map((video) => (
              <a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] shadow-md flex flex-col justify-between"
              >
                {/* Background Thumbnail Image */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
                />

                {/* Top Info Bar */}
                <div className="relative z-10 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-bold text-white border border-white/50">
                      CATA
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate leading-tight">
                        {video.title}
                      </h4>
                      <p className="text-[9px] text-slate-300 font-medium tracking-wider">
                        {video.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center YouTube Play Icon Button */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <div className="w-10 h-7 bg-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 transition-all">
                    <svg className="w-4 h-4 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Shadow Overlay */}
                <div className="relative z-10 h-4 bg-gradient-to-t from-black/60 to-transparent" />
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}