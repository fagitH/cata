import React from 'react';

export default function DonationCategoriesPage() {
  const donationCategories = [
    {
      id: 1,
      title: 'Zakat',
      percentage: 20,
      image: '/images/zakat.jpg',
      donateUrl: '/donate-zakat',
    },
    {
      id: 2,
      title: 'Sadaqah Jariyah',
      percentage: 30,
      image: '/images/sadaqah.jpg',
      donateUrl: '/donate-sadakah',
    },
    {
      id: 3,
      title: 'Orphan Support',
      percentage: 16,
      image: '/images/orphan.jpg',
      donateUrl: '/donate-education',
    },
    {
      id: 4,
      title: 'Education/Orphan/Poors',
      percentage: 8,
      image: '/images/education.jpg',
      donateUrl: '/donate-education',
    },
    {
      id: 5,
      title: 'Food Packages (Ramadan/Qurban)',
      percentage: 61,
      image: '/images/food-packages.jpg',
      donateUrl: '/donate-ramadhan',
    },
    {
      id: 6,
      title: 'Water Well / Toilet',
      percentage: 50,
      image: '/images/water-well.jpg',
      donateUrl: '/donate-water-well',
    },  
    {
      id: 7,
      title: 'Mosque / School / House',
      percentage: 7,
      image: '/images/food-packages.jpg',
      donateUrl: '/donate-mosque',
    },
    {
      id: 8,
      title: 'Umrah / Hajj',
      percentage: 21,
      image: '/images/water-well.jpg',
      donateUrl: '/donate-umrah-hajj',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative w-full overflow-hidden bg-[#0b3d3a] text-white py-16 sm:py-20 px-4 min-h-[320px] flex items-center justify-center">
        {/* Islamic Geometric SVG Background */}
        <svg
          className="absolute inset-0 object-cover w-full h-full pointer-events-none opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="islamic-grid-donation"
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

            <radialGradient id="center-glow-donation" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0b3d3a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="400" fill="#0b3d3a" />
          <rect width="1200" height="400" fill="url(#islamic-grid-donation)" />
          <rect width="1200" height="400" fill="url(#center-glow-donation)" />

          {/* Left Arch Frame */}
          <g stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.35">
            <path d="M-50 400 V 120 Q 100 0 250 120 V 400" />
            <path d="M-30 400 V 135 Q 100 25 230 135 V 400" />
            <path d="M-10 400 V 150 Q 100 50 210 150 V 400" />
          </g>

          {/* Right Arch Frame */}
          <g stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.35">
            <path d="M1250 400 V 120 Q 1100 0 950 120 V 400" />
            <path d="M1230 400 V 135 Q 1100 25 970 135 V 400" />
            <path d="M1210 400 V 150 Q 1100 50 990 150 V 400" />
          </g>

          {/* Center Accents */}
          <g stroke="#38bdf8" strokeWidth="0.75" fill="none" opacity="0.4">
            <circle cx="600" cy="200" r="180" strokeDasharray="4 4" />
            <circle cx="600" cy="200" r="220" strokeDasharray="8 8" />
          </g>
        </svg>

        {/* Banner Content */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300 backdrop-blur-sm">
            CATA GIVING
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl drop-shadow-sm">
            Donation Categories
          </h1>

          <div className="w-24 h-[3px] my-4 rounded-full shadow-sm" />

          <p className="max-w-2xl mx-auto text-sm leading-relaxed sm:text-base text-slate-200">
            Choose a dedicated cause to direct your contributions toward meaningful, transparent, and high-impact community initiatives.
          </p>
        </div>
      </section>

      {/* ===== MAIN DONATION LIST SECTION ===== */}
      <main className="max-w-5xl px-4 mx-auto my-10">
        {/* Gray Container Box */}
        <div className="bg-[#e5e7eb] rounded-3xl p-6 sm:p-4 space-y-5">
          {donationCategories.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-5 p-4 transition-shadow bg-white border shadow-sm rounded-2xl sm:p-5 border-slate-100 sm:flex-row hover:shadow-md"
            >
              {/* Left Side: Category Image */}
              <div className="w-full overflow-hidden sm:w-56 h-36 shrink-0 rounded-xl bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Right Side: Title, Progress Bar, and Button */}
              <div className="flex flex-col justify-between flex-1 w-full py-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0070ba] mb-3">
                    {item.title}
                  </h3>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#f0f0f0] rounded-sm h-6 mb-4 relative overflow-hidden">
                    <div
                      className="bg-[#0070ba] h-full flex items-center justify-between px-2 text-white text-xs font-semibold transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className="pr-1 truncate">{item.title}</span>
                      <span>{item.percentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Donate Link */}
                <div>
                  <a
                    href={item.donateUrl}
                    className="inline-block bg-[#ff9800] hover:bg-[#e68a00] text-white text-sm font-bold px-6 py-2.5 rounded-md shadow-xs transition-colors duration-200"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}