import React, { useState, useEffect } from 'react';
import { fetchCataVideos } from '../data/blogs.js';
import blogHeroBg from '../assets/image/blog.png';

export default function CATABlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      try {
        const videos = await fetchCataVideos();
        setBlogs(videos || []);
      } catch (error) {
        console.error('Failed to load CATA videos:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  const categories = ['All', ...Array.from(new Set(blogs.map((item) => item.category).filter(Boolean)))];

  const filteredBlogs = blogs.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedBlogs = filteredBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
   {/* ===== HERO BANNER ===== */}
<section className="relative bg-[#0b3d3a] text-white py-16 sm:py-20 px-4 overflow-hidden">
  {/* Background Image with Low Opacity */}
 <img
        src={blogHeroBg}
        alt="Hero Background"
        className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none opacity-35"
      />

  {/* Content Layer */}
  <div className="relative z-10 max-w-6xl mx-auto text-center">
    {/* <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
      CATA COMMUNITY
    </span> */}
    <h1 className="text-3xl font-extrabold tracking-tight uppercase text-sky-600 sm:text-6xl drop-shadow-sm">
      Blogs & Media
    </h1>
    <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-slate-200">
      Watch community interviews, educational stories, and project announcements directly from our official channel.
    </p>
  </div>
</section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-6xl px-4 py-12 mx-auto sm:py-16">
        
        {/* SEARCH & CATEGORY BAR */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 mb-10 bg-white border shadow-sm md:flex-row sm:p-6 rounded-2xl border-slate-200">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search video blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b3d3a]"
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

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
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

        {/* ===== VIDEO GRID / LOADING / EMPTY STATE ===== */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="p-4 space-y-4 bg-white border rounded-2xl animate-pulse border-slate-200">
                <div className="w-full bg-slate-200 aspect-video rounded-xl" />
                <div className="w-3/4 h-4 rounded bg-slate-200" />
                <div className="w-1/2 h-3 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : displayedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedBlogs.map((item) => (
              <div
                key={item.id || item.youtubeId}
                className="flex flex-col justify-between overflow-hidden transition-shadow bg-white border shadow-sm rounded-2xl hover:shadow-md border-slate-200"
              >
                <div>
                  {/* EMBEDDED YOUTUBE PLAYER */}
                  <div className="relative w-full bg-black aspect-video">
                    {item.youtubeId ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${item.youtubeId}`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-xs text-slate-400">
                        Video Unavailable
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 rounded-md">
                        {item.category || 'Community'}
                      </span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>

                    <h3 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2">
                      {item.title}
                    </h3>

                    {item.excerpt && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border rounded-2xl border-slate-200">
            <p className="text-slate-500">No videos found.</p>
          </div>
        )}

        {/* ===== BOTTOM ACTION BUTTONS ===== */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-8 mt-12 border-t border-slate-200">
          {!loading && visibleCount < filteredBlogs.length && (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#333333] hover:bg-[#222222] rounded-lg shadow-sm transition-colors"
            >
              Load More...
            </button>
          )}

          <a
            href="https://www.youtube.com/@cata_community"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg shadow-sm transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe
          </a>
        </div>

      </main>
    </div>
  );
}
