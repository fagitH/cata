import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api, toAssetUrl } from '../../utils/api';
import bgImage from '../../assets/image/pattern.png';
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop';
  return toAssetUrl(imagePath);
};

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [reportItems, setReportItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const targetReportId = String(id);
        const foundReport = await api.get(`/annual_reports/${targetReportId}`);
        setReport(foundReport);

        const data = await api.get('/report_items');
        const items = Array.isArray(data) ? data : [];
        const filteredItems = items.filter((item) => {
          const reportId = String(item.report_id).toLowerCase();
          return reportId === targetReportId || reportId === 'all';
        });
        setReportItems(filteredItems);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setReport(null);
        setReportItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen pb-24 font-sans bg-slate-50 text-slate-800">
      {loading || !report ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#0d4760] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-600">Loading report...</p>
          </div>
        </div>
      ) : (
      <>
      {/* ===== HERO BANNER ===== */}
      <section 
  className="relative overflow-hidden text-[#0070ba] py-14 lg:py-20 px-4 bg-center"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-white/55 pointer-events-none" />

  {/* Content Container */}
  <div className="relative z-10 max-w-5xl mx-auto text-center">
    {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-white/10 backdrop-blur-md rounded-full border border-amber-300/30">
      Official Annual Report
    </span> */}
    <h1 className="text-3xl font-extrabold tracking-tight text-[#0070ba] sm:text-4xl lg:text-5xl">
      {report?.title}
    </h1>
    <p className="max-w-2xl mx-auto mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
      {report?.subtitle}
    </p>
  </div>
</section>

      {/* ===== ACTION BAR ===== */}
      <div className="max-w-5xl px-4 mx-auto -mt-6 sm:px-6">
        <div className="flex flex-col gap-3 pt-10 pb-6 border-b sm:flex-row sm:items-center sm:justify-between border-slate-200/80">
          <button
            type="button"
            onClick={() => navigate('/annual-reports')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0d4760] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Annual Reports
          </button>
        </div>
      </div>

      {/* ===== REPORT ITEMS CARDS ===== */}
      <main className="max-w-5xl px-4 mx-auto mt-8 sm:px-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#0d4760] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-600">Loading report items...</p>
          </div>
        ) : reportItems.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <p>No report items found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reportItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col md:flex-row items-stretch bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Left Image */}
                <div className="w-full md:w-72 lg:w-80 shrink-0 relative bg-slate-100 overflow-hidden min-h-[200px] md:min-h-full">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.description}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white/90 backdrop-blur-md rounded-lg shadow-xs border border-slate-200">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-base font-medium leading-relaxed sm:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Amount / Highlight Tag */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                      Contribution Value
                    </span>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-[#0070ba]">
                      <span className="text-xl font-black tracking-tight sm:text-2xl">
                        {item.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      </>
      )}
    </div>
  );
}
