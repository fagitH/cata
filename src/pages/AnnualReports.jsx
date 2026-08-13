import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Sprout, Home, Presentation, Handshake, Coins } from 'lucide-react';

export default function AnnualReportsPage() {
  const reports2025 = [
    {
      id: 1,
      slug: 'general-charity-2025',
      title: '1. Report of My Community Fund Program 2025',
      description:
        'A mutual assistance and social solidarity fund providing critical support for vulnerable families, education initiatives, and broader community welfare needs.',
      icon: HeartHandshake,
    },
    {
      id: 2,
      slug: 'general-charity-2025',
      title: '2. Report of RIBA Clearance Program 2025',
      description:
        'Also called the Wealth Purification Program, A Shariah-compliant solution designed to help Muslim individuals and businesses transition away from interest-based (riba) financial obligations toward ethical and permissible financial arrangements.',
      icon: Sprout,
    },
    {
      id: 3,
      slug: 'general-charity-2025',
      title: '3. Report of Sanitation & Water Wells Project 2025',
      description:
        'A report detailing the construction and improvement of sanitation facilities and water wells to provide clean, safe water for communities in 2025.',
      icon: Home,
    },
    {
      id: 4,
      slug: 'general-charity-2025',
      title: '4. Report of Human Resource Development 2025',
      description:
        'A review of training, capacity-building programs, and staff development initiatives aimed at strengthening human resources in 2025.',
      icon: Presentation,
    },
    {
      id: 5,
      slug: 'general-charity-2025',
      title: '5. Report of Partnership 2025',
      description:
        'An outline of collaborations with local and international partners, focusing on joint programs, contributions, and shared achievements in 2025.',
      icon: Handshake,
    },
    {
      id: 6,
      slug: 'general-charity-2025',
      title: '6. Report of General Charity 2025',
      description:
        'A comprehensive summary of charitable activities, including emergency aid, social support, and welfare programs carried out throughout 2025.',
      icon: Coins,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative w-full overflow-hidden bg-[#0b3d3a] text-white py-16 sm:py-20 px-4 min-h-[320px] flex items-center justify-center">
        <svg
          className="absolute inset-0 object-cover w-full h-full pointer-events-none opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="islamic-grid"
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
              <circle
                cx="30"
                cy="30"
                r="8"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.4"
                strokeOpacity="0.3"
              />
            </pattern>

            <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0b3d3a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="400" fill="#0b3d3a" />
          <rect width="1200" height="400" fill="url(#islamic-grid)" />
          <rect width="1200" height="400" fill="url(#center-glow)" />

          <g stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.35">
            <path d="M-50 400 V 120 Q 100 0 250 120 V 400" />
            <path d="M-30 400 V 135 Q 100 25 230 135 V 400" />
            <path d="M-10 400 V 150 Q 100 50 210 150 V 400" />
          </g>

          <g stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.35">
            <path d="M1250 400 V 120 Q 1100 0 950 120 V 400" />
            <path d="M1230 400 V 135 Q 1100 25 970 135 V 400" />
            <path d="M1210 400 V 150 Q 1100 50 990 150 V 400" />
          </g>

          <g stroke="#38bdf8" strokeWidth="0.75" fill="none" opacity="0.4">
            <circle cx="600" cy="200" r="180" strokeDasharray="4 4" />
            <circle cx="600" cy="200" r="220" strokeDasharray="8 8" />
          </g>
        </svg>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300 backdrop-blur-sm">
            CATA PUBLICATIONS
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl drop-shadow-sm">
            Annual Reports
          </h1>

          <p className="max-w-2xl mx-auto mt-3 text-sm leading-relaxed sm:text-base text-slate-200">
            Review our official annual documentation, financial transparency reports, and community project milestones.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-6xl px-4 mx-auto my-8">
        <div className="bg-[#0070ba] rounded-2xl p-6 sm:p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
            Year of 2025
          </h2>

          <div className="space-y-4">
            {reports2025.map((report) => {
              const IconComponent = report.icon;
              return (
                <Link
                  key={report.id}
                  to={`/reports/${report.slug}`}
                  className="block bg-[#f0f4f8] hover:bg-white rounded-xl p-5 transition-all duration-200 border border-slate-200/60 shadow-sm group cursor-pointer"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="shrink-0 p-2 sm:p-3 text-[#e11d48] group-hover:scale-105 transition-transform duration-200">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#1e3a8a] group-hover:text-[#0070ba] transition-colors mb-1">
                        {report.title}
                      </h3>
                      <p className="text-xs font-normal leading-relaxed sm:text-sm text-slate-600">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}