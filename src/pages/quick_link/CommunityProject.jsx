import React from 'react';

// ==========================================
// IMPORT YOUR LOCAL IMAGES HERE:
// ==========================================
// import communityMartImg from '../assets/community-mart.png';
// import cataAquaImg from '../assets/cata-aqua.png';
// import cleanStartImg from '../assets/clean-start.png';
// import cataFarmingImg from '../assets/cata-farming.png';
// import cataSchoolImg from '../assets/cata-school.png';

export default function CommunityProjects() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#555555] font-sans antialiased pb-20">
      
      {/* HEADER BANNER */}
      <section className="bg-[#EBF4F9] py-12 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0073B7] tracking-wider uppercase">
            COMMUNITY PROJECTS
          </h1>
        </div>
      </section>

      {/* PROJECTS CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 pt-10 space-y-8">

        {/* 1. COMMUNITY MART */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <img
              src={/* communityMartImg */ ""}
              alt="Community Mart"
              className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3] border border-slate-100"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#0073B7] uppercase tracking-wide">
              COMMUNITY MART
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              <strong className="text-slate-800">COMMUNITY MART</strong> As part of CATA’s broader mission, COMMUNITY MART contributes to: Empowering Muslim-owned businesses and SMEs Promoting halal products and ethical commerce Strengthening community economic networks Creating income and business opportunities for youth and families Encouraging social responsibility and community development. The initiative reflects CATA’s commitment to building a stronger and more self-sustaining Muslim economy in Cambodia through collaboration, innovation, and community participation.
            </p>
            <div>
              <button className="px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* 2. CATA AQUA PREMIUM WATER */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <img
              src={/* cataAquaImg */ ""}
              alt="CATA Aqua Premium Water"
              className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3] border border-slate-100"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#0073B7] uppercase tracking-wide">
              CATA AQUA PREMIUM WATER
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              <strong className="text-slate-800">CATA Aqua Premium Water</strong> is a premium drinking water initiative created to provide clean, safe, and high-quality purified water while promoting health, community development, and Islamic values. With the slogan <strong className="text-slate-800">“Water with Barakah”</strong>, CATA Aqua represents more than just drinking water — it symbolizes purity, care, trust, and blessings for families, businesses, and communities across Cambodia. The initiative combines modern water purification standards with a mission-driven approach that supports social impact and community empowerment.
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              CATA Aqua Premium Water – Water with Barakah.
            </p>
            <div>
              <button className="px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* 3. CLEAN START MICRO-BUSINESS INITIATIVE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <img
              src={/* cleanStartImg */ ""}
              alt="Clean Start Micro-Business Initiative"
              className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3] border border-slate-100"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#0073B7] uppercase tracking-wide">
              CLEAN START MICRO-BUSINESS INITIATIVE
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              The <strong className="text-slate-800">CLEAN START Micro-Business Initiative</strong> is a community empowerment project designed to help low-income Muslim families create sustainable income opportunities through small-scale pressure washing businesses. This initiative provides essential equipment, basic operational training, and business support to selected families, enabling them to offer affordable cleaning services within their communities. By combining entrepreneurship with social responsibility, CLEAN START helps families achieve financial independence with dignity and self-reliance.
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              CLEAN START – Empowering Families Through Sustainable Micro-Business.
            </p>
            <div>
              <button className="px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* 4. CATA FARMING INITIATIVE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <img
              src={/* cataFarmingImg */ ""}
              alt="CATA Farming Initiative"
              className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3] border border-slate-100"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#0073B7] uppercase tracking-wide">
              CATA FARMING INITIATIVE
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              The <strong className="text-slate-800">CATA Farming Initiative</strong> is a sustainable agricultural and livestock development project focused on raising healthy cattle for <strong className="text-slate-800">Qurban</strong> and community food support programs. This initiative aims to strengthen local halal livestock production while creating economic opportunities for rural Muslim communities and farmers in Cambodia. Through proper livestock care, ethical farming practices, and community collaboration, the program supports both religious and social development objectives.
            </p>
            <div>
              <button className="px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* 5. CATA INTERNATIONAL SCHOOL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <img
              src={/* cataSchoolImg */ ""}
              alt="CATA International School"
              className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3] border border-slate-100"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#0073B7] uppercase tracking-wide">
              CATA INTERNATIONAL SCHOOL
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              <strong className="text-slate-800">CATA International School</strong> is an educational initiative established to provide high-quality, modern, and values-based education for the next generation in Cambodia. The school is committed to nurturing students with strong academic knowledge, Islamic values, leadership skills, creativity, and global perspectives. By integrating international educational standards with moral and character development, CATA International School aims to prepare students to become responsible, confident, and compassionate future leaders.
            </p>
            <div>
              <button className="px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}