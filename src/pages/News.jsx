import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, toAssetUrl } from '../utils/api';

const getImageUrl = (url) => {
  if (!url) return '/placeholder.png';
  return toAssetUrl(url);
};

const formatNewsDate = (value) => {
  if (!value) return 'Recently';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export default function CATANewsBlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.get('/news');
        setArticles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ['All', ...Array.from(new Set(articles.map((item) => item.category).filter(Boolean)))];

  const filteredArticles = articles.filter((item) => {
    const title = String(item.title || '').toLowerCase();
    const excerpt = String(item.excerpt || '').toLowerCase();
    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      excerpt.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
      <section className="relative text-white py-20 sm:py-28 px-4 overflow-hidden flex items-center justify-center min-h-[320px]">
        <img
          src="/your-background-image.jpg"
          alt="Hero Background"
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-[#0082da]/85 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-white uppercase sm:text-5xl drop-shadow-sm">
            LATEST NEWS
          </h1>
          <div className="w-28 h-[3px] bg-[#38bdf8] my-3 rounded-full shadow-sm" />
          <p className="text-base font-medium tracking-wide sm:text-lg text-white/95">
            Our Activities
          </p>
        </div>
      </section>

      <main className="max-w-6xl px-4 py-12 mx-auto sm:py-16">
        <div className="flex flex-col items-center justify-between gap-4 p-4 mb-10 bg-white border shadow-sm md:flex-row sm:p-6 rounded-2xl border-slate-200">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b3d3a] focus:border-transparent"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center w-full gap-2 pb-1 overflow-x-auto md:w-auto md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#0b3d3a] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#0b3d3a] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm font-semibold text-slate-500">Syncing news from CATA system...</p>
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="p-8 py-16 text-center bg-white border rounded-3xl border-slate-200">
            <h3 className="text-lg font-bold text-slate-700">No News Found</h3>
            <p className="mt-1 text-xs text-slate-500">
              There are currently no news items matching your search criteria.
            </p>
          </div>
        )}

        {!loading && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-[#f5f5f5] flex flex-col justify-between transition-shadow hover:shadow-md rounded-lg overflow-hidden"
              >
                <div>
                  <div className="relative w-full overflow-hidden aspect-square bg-slate-200">
                    <img
                      src={getImageUrl(article.image || article.cover_image)}
                      alt={article.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <Link to={`/news/${article.slug || article.id}`}>
                      <h3 className="text-xl font-extrabold text-[#0284c7] hover:underline leading-snug">
                        {article.title}
                      </h3>
                    </Link>

                    <div className="mt-2 text-xs font-normal text-slate-400">
                      {formatNewsDate(article.date || article.published_date || article.created_at)} | by {article.author || 'CATA Team'}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-500 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pt-2 pb-5">
                  <Link
                    to={`/news/${article.slug || article.id}`}
                    className="inline-flex items-center text-sm font-bold text-[#f59e0b] hover:underline gap-1"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
