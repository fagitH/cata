import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNewsBySlug } from '../data/news.js';

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getNewsBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen py-20 bg-slate-50 text-slate-900">
        <div className="max-w-4xl p-8 mx-auto text-center bg-white border shadow-sm rounded-3xl border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">News item not found</h1>
          <p className="mt-4 text-sm text-slate-500">The news item you are looking for may have been moved or removed.</p>
          <button
            onClick={() => navigate('/news')}
            className="inline-flex items-center px-5 py-3 mt-6 text-sm font-semibold text-white rounded-xl bg-[#0b3d3a] hover:bg-[#0d4e4b]"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  // Combine cover image with additional gallery images if present
  const galleryImages = article.images || [];

  return (
    <div className="min-h-screen px-4 py-12 bg-slate-50 text-slate-900 sm:py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>•</span>
          <Link to="/news" className="hover:underline">
            News
          </Link>
          <span>•</span>
          <span className="font-semibold text-slate-700 line-clamp-1">{article.title}</span>
        </div>

        {/* Main Article Container */}
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm border border-slate-200">
          {/* Main Cover/Profile Image */}
          <div className="relative h-80 sm:h-96 bg-slate-100">
            <img 
              src={article.image || article.coverImage} 
              alt={article.title} 
              className="object-cover w-full h-full" 
            />
          </div>

          <div className="p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase border rounded-full text-amber-700 bg-amber-50 border-amber-200">
                {article.category}
              </span>
              <div className="text-sm text-slate-500">
                {article.date} • by {article.author}
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
              {article.title}
            </h1>

            <p className="max-w-3xl mt-5 text-base font-medium leading-8 text-slate-600">
              {article.excerpt}
            </p>

            {/* Article Content */}
            <div className="pt-6 mt-8 space-y-6 leading-8 border-t text-slate-700 border-slate-100">
              {Array.isArray(article.content) ? (
                article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              ) : (
                <p>{article.content || article.excerpt}</p>
              )}
            </div>

            {/* Extra Images Gallery (Rendered only on detail page) */}
            {galleryImages.length > 0 && (
              <div className="pt-8 mt-8 border-t border-slate-100">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Event Photos</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {galleryImages.map((imgUrl, index) => (
                    <div key={index} className="h-48 overflow-hidden border shadow-sm rounded-2xl bg-slate-100 border-slate-200">
                      <img 
                        src={imgUrl} 
                        alt={`${article.title} gallery image ${index + 1}`} 
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-10 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => navigate('/news')}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-full bg-[#0b3d3a] hover:bg-[#0d4e4b]"
              >
                Back to News
              </button>
              <Link
                to="/news"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[#0b3d3a] rounded-full border border-[#0b3d3a] hover:bg-[#0b3d3a] hover:text-white transition"
              >
                Browse more news
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}