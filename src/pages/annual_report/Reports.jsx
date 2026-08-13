import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Coins, FileText, Calendar, Tag } from 'lucide-react';

export default function ReportDetailPage() {
  const { slug } = useParams();

  // Dictionary containing data for all reports
  const reportsData = {
    'my-community-fund-2025': {
      title: 'Report of My Community Fund Program 2025',
      items: [],
    },
    'riba-clearance-2025': {
      title: 'Report of RIBA Clearance Program 2025',
      items: [],
    },
    'sanitation-water-wells-2025': {
      title: 'Report of Sanitation & Water Wells Project 2025',
      items: [],
    },
    'human-resource-development-2025': {
      title: 'Report of Human Resource Development 2025',
      items: [],
    },
    'partnership-2025': {
      title: 'Report of Partnership 2025',
      items: [],
    },
    'general-charity-2025': {
      title: 'Report of General Charity 2025',
      items: [
        {
          id: 1,
          description:
            'CATA has contributed for refugee who were affected by the Cambodia-Thailand border conflict. To the Minister of Tourism.',
          amount: 'About KHR 10,000,000',
          image: '/images/reports/refugee-tourism.jpg',
        },
        {
          id: 2,
          description:
            'CATA has contributed for refugee who were affected by the Cambodia-Thailand border conflict. To ministry of religious affairs cambodia.',
          amount: 'About KHR 4,256,000',
          image: '/images/reports/refugee-religious.jpg',
        },
        {
          id: 3,
          description:
            'CATA has contributed for Ramadan food package to different places in Cambodia.',
          amount: 'About KHR 10,000,000',
          image: '/images/reports/ramadan-food.jpg',
        },
        {
          id: 4,
          description:
            'CATA has conducted Iftar Ramada in the muslim community in Cambodia.',
          amount: 'About KHR 5,000,000',
          image: '/images/reports/iftar-ramadan.jpg',
        },
        {
          id: 5,
          description:
            'Comprehensive summary of charitable activities, including emergency aid, social support, and welfare programs carried out throughout 2025.',
          amount: 'About KHR 55,000,000',
          image: '/images/reports/hospital-aid.jpg',
        },
        {
          id: 6,
          description:
            'CATA has donate Al-quran to school, students, family, and community.',
          amount: '2500 Books',
          image: '/images/reports/quran-donation.jpg',
        },
      ],
    },
  };

  const report = reportsData[slug];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative w-full overflow-hidden bg-[#0b3d3a] text-white py-12 sm:py-16 px-4 min-h-[220px] flex items-center justify-center shadow-inner">
        {/* Islamic Pattern SVG Background */}
        <svg
          className="absolute inset-0 object-cover w-full h-full pointer-events-none opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="islamic-grid-detail"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 38.8 21.2 L 60 30 L 38.8 38.8 L 30 60 L 21.2 38.8 L 0 30 L 21.2 21.2 Z"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
            </pattern>
          </defs>
          <rect width="1200" height="400" fill="#0b3d3a" />
          <rect width="1200" height="400" fill="url(#islamic-grid-detail)" />
        </svg>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300 backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            2025 ANNUAL AUDIT & ACTIVITIES
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase drop-shadow-sm max-w-3xl">
            {report ? report.title : 'Report Details'}
          </h1>
        </div>
      </section>

      {/* ===== BACK NAVIGATION BAR ===== */}
      <div className="max-w-6xl mx-auto px-4 pt-6 sm:pt-8">
        <Link
          to="/annual-reports"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-[#0070ba] transition-all shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Annual Reports
        </Link>
      </div>

      {/* ===== REPORT ITEMS SECTION ===== */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        {report && report.items && report.items.length > 0 ? (
          <div className="space-y-6">
            {report.items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row items-stretch gap-6 md:gap-8 group"
              >
                {/* Image Container with Hover Scale */}
                <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 overflow-hidden rounded-xl border border-slate-100 relative bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.description || 'Report image'}
                    className="w-full h-52 sm:h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    Item #{index + 1}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-between space-y-4 py-1">
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Contribution Value
                    </span>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-blue-50/80 border border-blue-100 text-[#0070ba] font-bold text-lg sm:text-xl shadow-2xs">
                      <Coins className="w-5 h-5 text-[#0070ba]" />
                      {item.amount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State View */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs my-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Data Being Updated</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Detailed activity items and financial figures for this report section are currently being compiled and will be published shortly.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}