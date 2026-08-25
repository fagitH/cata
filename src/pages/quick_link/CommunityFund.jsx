import React, { useEffect, useRef, useState } from 'react';

// ==========================================
// LOCAL IMAGE IMPORTS
// ==========================================
import cardFrontImg from '../../assets/image/community_fund/cardFront.jpg';
import cardBackImg from '../../assets/image/community_fund/cardBack.png';
import featureHeroImg from '../../assets/image/community_fund/img1.jpg';
import img01 from '../../assets/image/community_fund/img01.jpg';
import img02 from '../../assets/image/community_fund/img02.jpg';
import img03 from '../../assets/image/community_fund/img03.jpg';
import img04 from '../../assets/image/community_fund/img04.jpg';
import img05 from '../../assets/image/community_fund/img05.jpg';
import img06 from '../../assets/image/community_fund/img06.jpg';
import img07 from '../../assets/image/community_fund/img07.jpg';
import img08 from '../../assets/image/community_fund/img08.jpg';
import img09 from '../../assets/image/community_fund/img09.jpg';
import img010 from '../../assets/image/community_fund/img010.jpg';
import img011 from '../../assets/image/community_fund/img011.jpg';

/* ---------------------------------------------------------------- */
/*  Scroll Animation Helpers                                         */
/* ---------------------------------------------------------------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

/* Custom Scale-Up Reveal Component (Small to Large) */
function ScaleReveal({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-75'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

export default function MyCommunityFund() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Gallery array linked to imported local assets
  const galleryImages = [
    { id: 1, src: img01, alt: 'Hospital Support Visit' },
    { id: 2, src: img02, alt: 'Official Signing Ceremony' },
    { id: 3, src: img03, alt: 'Community Aid Handover' },
    { id: 4, src: img04, alt: 'Relief Distribution' },
    { id: 5, src: img05, alt: 'Community Meeting' },
    { id: 6, src: img06, alt: 'Gathering & Support' },
    { id: 7, src: img07, alt: 'Field Assistance' },
    { id: 8, src: img08, alt: 'Document Verification' },
    { id: 9, src: img09, alt: 'Ward Visit' },
    { id: 10, src: img010, alt: 'Certificate Presentation 1' },
    { id: 11, src: img011, alt: 'Certificate Presentation 2' },
  ];

  return (
    <div className="min-h-screen pb-20 font-sans antialiased bg-slate-50 text-slate-800">
      
      {/* 3D FLIP CARD CSS STYLES */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* HEADER TITLE SECTION */}
      <header className="px-4 py-10 text-center bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 uppercase sm:text-4xl">
            MY COMMUNITY FUND
          </h1>
          <h2 className="text-xl font-bold tracking-wide uppercase sm:text-2xl text-slate-700">
            SCHEME POLICY DOCUMENT
          </h2>
          <span className="inline-block px-4 py-1 mt-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-full bg-blue-50">
            MEMBERSHIP PLUS (+)
          </span>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-5xl px-4 pt-10 mx-auto space-y-12 sm:px-6">

        {/* SECTION 1: GLOBAL LANDSCAPE */}
        <section className="p-6 bg-white border rounded-xl sm:p-8 border-slate-200/80 shadow-xs space-y-6">
          <h2 className="pb-3 text-xl font-bold border-b text-slate-900 border-slate-100">
            Acknowledgment of the Global Landscape of Islamic Mutual Assistance
          </h2>

          {/* PART A */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-blue-800">
              A. Licensed Takaful Operators Worldwide
            </h3>
            <p className="text-sm text-justify sm:text-base leading-relaxed text-slate-600">
              Globally, over 130 licensed takaful operators are predominantly concentrated in Gulf Cooperation Council (GCC) countries such as Saudi Arabia, UAE, Bahrain, Qatar, Oman, and Kuwait, along with countries like Malaysia, Indonesia, Pakistan, Sudan, and certain parts of Africa. These organizations generally operate under a Tabarru’ model, which is a donation-based risk pool that forms the foundation of Takaful Funds, Risk Funds, or Mutual Assistance Funds. This cooperative system allows community members to contribute to a collective fund aimed at assisting those in need, embodying the principles of solidarity and mutual aid inherent in Islamic finance.
            </p>
          </div>

          {/* PART B */}
          <div className="pt-2 space-y-3">
            <h3 className="text-base font-bold text-blue-800">
              B. Informal Community-Based Tabarru’ Funds
            </h3>
            <p className="text-sm text-justify sm:text-base leading-relaxed text-slate-600">
              Alongside structured takaful operators, numerous informal, community-based Tabarru’ pools operate through local mosques, Islamic NGOs, burial societies, community mutual aid groups, and Islamic cooperatives. Examples include:
            </p>

            <ul className="pl-2 space-y-3 text-sm sm:pl-4 sm:text-base text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Malaysia:</strong> “Khairat kematian” funds provide community-based funeral aid, alleviating financial burdens during times of loss.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Indonesia:</strong> Baitul Mal wa Tamwil (BMT) cooperatives serve as microfinance institutions, facilitating financial support based on Islamic principles.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Pakistan and Nigeria:</strong> Community mutual aid efforts often manifest as burial societies and informal assistance networks, crucial in supporting families in need.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Somalia and the United Kingdom:</strong> Similar structures allow community members to pool resources for emergency relief and welfare support.
                </span>
              </li>
            </ul>

            <p className="pt-2 text-sm text-justify sm:text-base leading-relaxed text-slate-600">
              These community-managed schemes typically operate within a non-profit framework, emphasizing cooperative mutual aid without profit-driven motives.
            </p>
          </div>
        </section>

        {/* SECTION 2: ESTABLISHMENT & OBJECTIVES */}
        <section className="p-6 bg-white border rounded-xl sm:p-8 border-slate-200/80 shadow-xs space-y-6">
          <h2 className="pb-3 text-xl font-bold tracking-wide uppercase border-b text-slate-900 border-slate-100">
            ESTABLISHMENT AND OBJECTIVES OF THE “MY COMMUNITY FUND”
          </h2>

          <p className="text-sm text-justify sm:text-base leading-relaxed text-slate-600">
            The <strong className="text-slate-800">“My Community Fund,”</strong> formally recognized as the <strong className="text-slate-800">“Community-Based Tabarru’ Mutual Assistance Fund,”</strong> signifies a critical initiative by the <strong className="text-slate-800">Cambodian Amanah Takaful Association (CATA)</strong> to nurture ta’awun (mutual assistance) and foster collective responsibility within the Muslim community in Cambodia. It is essential to clarify that this scheme does not function as conventional insurance and therefore does not guarantee contractual profit or return.
          </p>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">
              By conceptualizing the “My Community Fund,” CATA aims to:
            </h3>

            <ul className="pl-2 space-y-3 text-sm sm:pl-4 sm:text-base text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Promote Solidarity:</strong> Encourage members of the Muslim community in Cambodia to contribute to a collective fund dedicated to assisting those facing unforeseen hardships.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Foster Community Engagement:</strong> Enable individuals to participate actively in local welfare initiatives, thereby strengthening communal ties and collective responsibility.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span>
                  <strong className="text-slate-800">Adapt Best Practices:</strong> Learn from the successes of existing mutual assistance models both locally and globally, tailoring them to fit the unique cultural and social landscape of Cambodia’s Muslim community.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h3 className="text-base font-bold text-slate-900">
              Vision for the Future
            </h3>
            <p className="text-sm text-justify sm:text-base leading-relaxed text-slate-600">
              The future vision for the “My Community Fund” includes expanding its reach and efficacy through educational programs, community training sessions, and partnerships with local NGOs and international organizations engaged in humanitarian and development efforts. By intertwining solidarity and responsibility throughout the community, CATA seeks to ensure that the Fund is sustainable, inclusive, and reflective of the altruistic values inherent within the Muslim faith.
            </p>
          </div>
        </section>

        {/* SECTION 3: MEMBERSHIP CARD & FEATURED IMAGE */}
        <section className="p-6 bg-white border rounded-xl sm:p-8 border-slate-200/80 shadow-xs space-y-6">
          <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
            
            {/* LEFT: FLIPPABLE MEMBERSHIP CARD */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-100 rounded-full bg-blue-50">
                Membership card sample
              </span>

              {/* 3D Flip Card Container */}
              <div 
                className="w-full max-w-[380px] aspect-[1.586/1] perspective-1000 cursor-pointer group"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* FRONT CARD */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden border shadow-lg rounded-xl backface-hidden border-slate-200 bg-slate-100">
                    <img 
                      src={cardFrontImg} 
                      alt="Membership Card Front" 
                      className="block object-fill w-full h-full rounded-xl" 
                    />
                  </div>

                  {/* BACK CARD */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden border shadow-lg rounded-xl backface-hidden rotate-y-180 border-slate-200 bg-slate-100">
                    <img 
                      src={cardBackImg} 
                      alt="Membership Card Back" 
                      className="block object-fill w-full h-full rounded-xl" 
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT: FEATURED HERO IMAGE */}
            <div className="w-full h-64 overflow-hidden border rounded-xl sm:h-80 border-slate-200 shadow-xs bg-slate-100">
              <img
                src={featureHeroImg}
                alt="CATA Field Work Gathering"
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>

          </div>
        </section>

        {/* SECTION 4: GALLERY GRID WITH SMALL-TO-LARGE SCALING ON SCROLL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              Community Field Activities & Support Distribution
            </h3>
            <span className="text-xs font-medium text-slate-500">
              {galleryImages.length} Photos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {galleryImages.map((img, index) => (
              <ScaleReveal 
                key={img.id} 
                delay={(index % 4) * 80} // Smooth horizontal stagger per row
              >
                <div className="relative overflow-hidden border rounded-lg group aspect-4/3 bg-slate-200 border-slate-200/80 shadow-2xs">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end p-2 transition-opacity duration-300 opacity-0 bg-black/30 group-hover:opacity-100">
                    <span className="text-[11px] text-white font-medium truncate">{img.alt}</span>
                  </div>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}