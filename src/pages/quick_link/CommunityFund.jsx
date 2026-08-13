import React, { useState } from 'react';

// ==========================================
// REPLACE THESE IMPORTS WITH YOUR ACTUAL IMAGES
// ==========================================
import cardFrontImg from '../../assets/image/community_fund/cardFront.jpg';
import cardBackImg from '../../assets/image/community_fund/cardBack.png';
// import featureHeroImg from '../assets/feature-hero.jpg';
// import galleryImg1 from '../assets/gallery-1.jpg';
// import galleryImg2 from '../assets/gallery-2.jpg';
// ... etc.

export default function MyCommunityFund() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Placeholder images for the gallery section (Replace with your local asset imports)
  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop', alt: 'Hospital Support Visit' },
    { id: 2, src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=600&auto=format&fit=crop', alt: 'Official Signing Ceremony' },
    { id: 3, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop', alt: 'Community Aid Handover' },
    { id: 4, src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop', alt: 'Relief Distribution' },
    { id: 5, src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=600&auto=format&fit=crop', alt: 'Community Meeting' },
    { id: 6, src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop', alt: 'Gathering & Support' },
    { id: 7, src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop', alt: 'Field Assistance' },
    { id: 8, src: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=600&auto=format&fit=crop', alt: 'Document Verification' },
    { id: 9, src: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?q=80&w=600&auto=format&fit=crop', alt: 'Ward Visit' },
    { id: 10, src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop', alt: 'Certificate Presentation 1' },
    { id: 11, src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=600&auto=format&fit=crop', alt: 'Certificate Presentation 2' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased pb-20">
      
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
      <header className="bg-white border-b border-slate-200 py-10 px-4 text-center shadow-xs">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-700 uppercase">
            MY COMMUNITY FUND
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-700 tracking-wide uppercase">
            SCHEME POLICY DOCUMENT
          </h2>
          <span className="inline-block px-4 py-1 mt-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full">
            MEMBERSHIP PLUS (+)
          </span>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SECTION 1: GLOBAL LANDSCAPE */}
        <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Acknowledgment of the Global Landscape of Islamic Mutual Assistance
          </h2>

          {/* PART A */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-blue-800">
              A. Licensed Takaful Operators Worldwide
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 text-justify">
              Globally, over 130 licensed takaful operators are predominantly concentrated in Gulf Cooperation Council (GCC) countries such as Saudi Arabia, UAE, Bahrain, Qatar, Oman, and Kuwait, along with countries like Malaysia, Indonesia, Pakistan, Sudan, and certain parts of Africa. These organizations generally operate under a Tabarru’ model, which is a donation-based risk pool that forms the foundation of Takaful Funds, Risk Funds, or Mutual Assistance Funds. This cooperative system allows community members to contribute to a collective fund aimed at assisting those in need, embodying the principles of solidarity and mutual aid inherent in Islamic finance.
            </p>
          </div>

          {/* PART B */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-blue-800">
              B. Informal Community-Based Tabarru’ Funds
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 text-justify">
              Alongside structured takaful operators, numerous informal, community-based Tabarru’ pools operate through local mosques, Islamic NGOs, burial societies, community mutual aid groups, and Islamic cooperatives. Examples include:
            </p>

            <ul className="space-y-3 pl-2 sm:pl-4 text-sm sm:text-base text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>
                  <strong className="text-slate-800">Malaysia:</strong> “Khairat kematian” funds provide community-based funeral aid, alleviating financial burdens during times of loss.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>
                  <strong className="text-slate-800">Indonesia:</strong> Baitul Mal wa Tamwil (BMT) cooperatives serve as microfinance institutions, facilitating financial support based on Islamic principles.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>
                  <strong className="text-slate-800">Pakistan and Nigeria:</strong> Community mutual aid efforts often manifest as burial societies and informal assistance networks, crucial in supporting families in need.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>
                  <strong className="text-slate-800">Somalia and the United Kingdom:</strong> Similar structures allow community members to pool resources for emergency relief and welfare support.
                </span>
              </li>
            </ul>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600 pt-2 text-justify">
              These community-managed schemes typically operate within a non-profit framework, emphasizing cooperative mutual aid without profit-driven motives.
            </p>
          </div>
        </section>

        {/* SECTION 2: ESTABLISHMENT & OBJECTIVES */}
        <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wide">
            ESTABLISHMENT AND OBJECTIVES OF THE “MY COMMUNITY FUND”
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-600 text-justify">
            The <strong className="text-slate-800">“My Community Fund,”</strong> formally recognized as the <strong className="text-slate-800">“Community-Based Tabarru’ Mutual Assistance Fund,”</strong> signifies a critical initiative by the <strong className="text-slate-800">Cambodian Amanah Takaful Association (CATA)</strong> to nurture ta’awun (mutual assistance) and foster collective responsibility within the Muslim community in Cambodia. It is essential to clarify that this scheme does not function as conventional insurance and therefore does not guarantee contractual profit or return.
          </p>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">
              By conceptualizing the “My Community Fund,” CATA aims to:
            </h3>

            <ul className="space-y-3 pl-2 sm:pl-4 text-sm sm:text-base text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>
                  <strong className="text-slate-800">Promote Solidarity:</strong> Encourage members of the Muslim community in Cambodia to contribute to a collective fund dedicated to assisting those facing unforeseen hardships.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>
                  <strong className="text-slate-800">Foster Community Engagement:</strong> Enable individuals to participate actively in local welfare initiatives, thereby strengthening communal ties and collective responsibility.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
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
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 text-justify">
              The future vision for the “My Community Fund” includes expanding its reach and efficacy through educational programs, community training sessions, and partnerships with local NGOs and international organizations engaged in humanitarian and development efforts. By intertwining solidarity and responsibility throughout the community, CATA seeks to ensure that the Fund is sustainable, inclusive, and reflective of the altruistic values inherent within the Muslim faith.
            </p>
          </div>
        </section>

        {/* SECTION 3: MEMBERSHIP CARD & FEATURED IMAGE */}
        <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* LEFT: FLIPPABLE MEMBERSHIP CARD */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Membership card sample (Hover/Tap to flip)
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
    <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg border border-slate-200 overflow-hidden bg-slate-100">
      <img 
        src={cardFrontImg} 
        alt="Membership Card Front" 
        className="w-full h-full object-fill block rounded-xl" 
      />
    </div>

    {/* BACK CARD */}
    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg border border-slate-200 overflow-hidden bg-slate-100">
      <img 
        src={cardBackImg} 
        alt="Membership Card Back" 
        className="w-full h-full object-fill block rounded-xl" 
      />
    </div>

  </div>
</div>
            </div>

            {/* RIGHT: FEATURED HERO IMAGE */}
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop"
                alt="CATA Field Work Gathering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {/* Replace src with your imported local feature image */}
            </div>

          </div>
        </section>

        {/* SECTION 4: GALLERY GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              Community Field Activities & Support Distribution
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {galleryImages.length} Photos
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((img) => (
              <div 
                key={img.id} 
                className="group relative aspect-4/3 rounded-lg overflow-hidden bg-slate-200 border border-slate-200/80 shadow-2xs"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <span className="text-[11px] text-white font-medium truncate">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}