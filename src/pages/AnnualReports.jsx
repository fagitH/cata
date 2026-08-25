import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Sprout, Home, Presentation, Handshake, Coins } from 'lucide-react';
import { api, toAssetUrl } from '../utils/api';
import bgImage from '../assets/image/pattern.png';

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
      <section
  className="relative px-4 bg-center py-14"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Light Overlay */}
  <div className="absolute inset-0 pointer-events-none bg-white/55" />

  {/* Decorative Grid Pattern Overlay */}
  <div className="absolute inset-0 pointer-events-none [background-size:16px_16px]" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
      CATA PUBLICATIONS
    </span> */}

    <h1 className="text-3xl font-extrabold tracking-tight uppercase text-sky-600 sm:text-6xl">
      Annual Reports
    </h1>

    <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-sky-600">
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
