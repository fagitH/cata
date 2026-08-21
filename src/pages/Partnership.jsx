import React from 'react';
import heroBg from '../assets/image/partnershipBanner.png'; // Adjust image import path as needed
import partner1 from '../assets/image/partner6.jpg';
import partner2 from '../assets/image/partner5.jpg';
import partner3 from '../assets/image/partner4.jpg';
import partner4 from '../assets/image/partner3.png';
import partner5 from '../assets/image/partner2.png';
import partner6 from '../assets/image/partner1.png';
  // Sample logo data arrays - replace image paths with your actual assets
  const organizations = [
    { id: 1, name: 'Cambodian Muslim Development Foundation', logo: partner1 },
    { id: 2, name: 'Cambodian Muslim Teacher Association', logo: partner2 },
    { id: 3, name: 'Cambodian Muslim Youth Alliance', logo: partner3},
    { id: 4, name: 'Cambodian Islamic Women Development Association', logo: partner4 },
    { id: 5, name: 'Cambodian Muslim Intellectual Union', logo: partner5 },
    { id: 6, name: 'DMDI Cambodia', logo: partner6 },
    { id: 7, name: 'Emaan Foundation Cambodia', logo: '/logos/emaan.png' },
  ];

  const companies = [
    { id: 1, name: 'Company Logo 1', logo: '/logos/company1.png' },
    { id: 2, name: 'ABA Bank', logo: '/logos/aba.png' },
    { id: 3, name: 'Al Barakah Travel & Tours Co., Ltd', logo: '/logos/att.png' },
    { id: 4, name: 'Zafaa Travel & Services Co., Ltd', logo: '/logos/zafaa.png' },
    { id: 5, name: 'Turkish Garden Restaurant', logo: '/logos/turkish-garden.png' },
    { id: 6, name: 'PSMS Sophia Cambodia Co., Ltd', logo: '/logos/psms-sophia.png' },
    { id: 7, name: 'Rahma International School', logo: '/logos/rahma.png' },
    { id: 8, name: 'Mubarak Tour & Travel', logo: '/logos/mubarak.png' },
    { id: 9, name: 'Cambodian Oud & Agarwood', logo: '/logos/oud.png' },
  ];

  const internationalPartners = [
    { id: 1, name: 'BAZNAS', logo: '/logos/baznas.png' },
    { id: 2, name: 'Nazir Perwakilan BWI Sumatera Barat', logo: '/logos/bwi-sumbar.png' },
    { id: 3, name: 'Aaleemee Society', logo: '/logos/aaleemee.png' },
    { id: 4, name: 'Well Solidarity', logo: '/logos/well-solidarity.png' },
  ];
  
export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ===== HERO BANNER SECTION ===== */}
<section className="relative bg-[#0b3d3a] text-white py-16 sm:py-20 px-4 overflow-hidden">
  {/* Background Image with Low Opacity */}
  <img
    src={heroBg}
    alt="Partnership Background"
    className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none opacity-35"
  />

  {/* Content Layer */}
  <div className="relative z-10 max-w-6xl mx-auto text-center">
    <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
      OUR PARTNERS
    </span>
    <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl drop-shadow-sm">
      Partnership
    </h1>
    <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-slate-200">
      Building strong alliances to advance community welfare and ethical financial solutions.
    </p>
  </div>
</section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="px-4 py-2 mx-auto space-y-2 max-w-7xl sm:py-6">
        
        {/* Overview Section */}
<div className="py-12">
  <div className="max-w-4xl px-1 mx-auto text-center">
    
    {/* Centered Blue Title
    <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#0070ba] uppercase mb-6">
      PARTNERSHIP
    </h2> */}

    {/* Description Paragraphs */}
    <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
      <p>
        Through your support, together we can provide crucial resources, training, and aid to those in need, all while fostering a strong network of organizations dedicated to ethical and impactful work. CATA’s collaborative environment allows partners to engage in charitable initiatives, share knowledge, and build connections with like-minded organizations.
      </p>
      
      <p>
        Your partnership is a step toward meaningful change. Join us in supporting community growth, sustainability, and well-being.
      </p>
    </div>

    {/* Subheading CTA */}
    <h3 className="mt-8 text-xl sm:text-2xl font-bold text-[#0070ba]">
      Get Involved and Make a Difference Today!
    </h3>

  </div>
</div>

<section className="p-4 sm:p-6 md:p-8 bg-[#0070ba] rounded-3xl max-w-7xl mx-auto my-8">
      {/* Outer Blue Header */}
      <h2 className="pl-2 mb-6 text-2xl font-bold text-white sm:text-3xl">
        Local Partnership
      </h2>

      {/* Two-Column Layout Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Left Side: Organizations */}
        <div className="flex flex-col p-6 bg-white shadow-sm rounded-2xl sm:p-8">
          <h3 className="text-2xl font-bold text-[#0070ba] mb-6">
            Organizations
          </h3>
          
          <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-3 justify-items-center">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="flex items-center justify-center w-full p-2 transition-transform duration-200 aspect-square hover:scale-105"
              >
                <img
                  src={org.logo}
                  alt={org.name}
                  className="object-contain max-w-full max-h-34"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Companies */}
        <div className="flex flex-col p-6 bg-white shadow-sm rounded-2xl sm:p-8">
          <h3 className="text-2xl font-bold text-[#0070ba] mb-6">
            Companies
          </h3>

          <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-3 justify-items-center">
            {companies.map((comp) => (
              <div
                key={comp.id}
                className="flex items-center justify-center w-full p-2 transition-transform duration-200 aspect-square hover:scale-105"
              >
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="object-contain max-w-full max-h-24"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
        <section className="p-4 sm:p-6 md:p-8 bg-[#0070ba] rounded-3xl max-w-7xl mx-auto my-8">
      {/* Container Header */}
      <h2 className="pl-2 mb-6 text-2xl font-bold text-white sm:text-3xl">
        International Partnership
      </h2>

      {/* White Card Layout */}
      <div className="p-6 bg-white shadow-sm rounded-2xl sm:p-8">
        <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-4 justify-items-center">
          {internationalPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center w-full p-2 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="object-contain max-w-full max-h-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
      </section>
    </div>
  );
}
