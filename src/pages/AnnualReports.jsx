import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Sprout, Home, Presentation, Handshake, Coins } from 'lucide-react';
import { api, toAssetUrl } from '../utils/api';

const iconList = [HeartHandshake, Sprout, Home, Presentation, Handshake, Coins];

const getReportIcon = (title, index) => {
  const normalizedTitle = String(title || '').toLowerCase();

  if (normalizedTitle.includes('community') || normalizedTitle.includes('fund')) {
    return HeartHandshake;
  }
  if (normalizedTitle.includes('riba') || normalizedTitle.includes('clearance')) {
    return Sprout;
  }
  if (normalizedTitle.includes('water') || normalizedTitle.includes('sanitation')) {
    return Home;
  }
  if (normalizedTitle.includes('human resource') || normalizedTitle.includes('development')) {
    return Presentation;
  }
  if (normalizedTitle.includes('partnership') || normalizedTitle.includes('partner')) {
    return Handshake;
  }
  if (normalizedTitle.includes('charity') || normalizedTitle.includes('relief')) {
    return Coins;
  }

  return iconList[index % iconList.length];
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/reports/general-charity-2025.jpg';
  return toAssetUrl(imagePath);
};

export default function AnnualReportsPage() {
  const [reports2025, setReports2025] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const latestReportYear = reports2025
    .map((report) => Number(report.year))
    .filter((year) => Number.isFinite(year) && year > 0)
    .sort((firstYear, secondYear) => secondYear - firstYear)[0];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.get('/annual_reports');
        const list = Array.isArray(data) ? data : [];
        setReports2025(
          list.map((report, index) => ({
            id: report.id,
            slug: report.slug || `report-${report.id ?? index + 1}`,
            year: report.year,
            title: `${index + 1}. ${report.title}${report.year && !String(report.title).trim().endsWith(String(report.year)) ? ` ${report.year}` : ''}`,
            description: report.description || 'Annual report summary.',
            image: getImageUrl(report.image || report.cover_image || report.image_url),
            icon: getReportIcon(report.title, index),
          }))
        );
      } catch (error) {
        console.error('Failed to fetch annual reports:', error);
        setReports2025([]);
        setError('Annual reports are currently unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

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
            Annual Reports{latestReportYear ? ` - ${latestReportYear}` : ''}
          </h2>

          {loading ? (
            <div className="py-8 text-center text-white/80 text-sm font-medium">
              Loading annual reports...
            </div>
          ) : error ? (
            <div className="py-8 text-center text-white/80 text-sm font-medium">{error}</div>
          ) : reports2025.length === 0 ? (
            <div className="py-8 text-center text-white/80 text-sm font-medium">
              No annual reports are available.
            </div>
          ) : (
            <div className="space-y-4">
              {reports2025.map((report) => {
                const IconComponent = report.icon;
                return (
                  <Link
                    key={report.id}
                    to={`/reports/${report.id}`}
                    className="block bg-white hover:bg-slate-50 rounded-2xl overflow-hidden transition-all duration-200 border border-slate-200/70 shadow-sm hover:shadow-lg group cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch gap-0">
                      <div className="w-full sm:w-48 lg:w-56 h-40 sm:h-auto shrink-0 overflow-hidden bg-slate-100 relative">
                        <img
                          src={getImageUrl(report.image)}
                          alt={report.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="shrink-0 p-2 text-[#e11d48] group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-2" />
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-[#1e3a8a] group-hover:text-[#0070ba] transition-colors leading-snug">
                            {report.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {report.description}
                        </p>
                        {report.year && (
                          <span className="self-start px-3 py-1 mt-3 text-xs font-semibold text-[#0070ba] bg-sky-50 border border-sky-100 rounded-full">
                            Year: {report.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
