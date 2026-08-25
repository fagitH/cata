import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, ASSET_BASE_URL } from '../utils/api';

// Helper to safely extract string path from string, object, or nested fields
const extractUrlString = (item) => {
  if (!item) return null;
  if (typeof item === 'string') return item.trim();
  if (typeof item === 'object' && item !== null) {
    return (
      item.url ||
      item.path ||
      item.src ||
      item.image ||
      item.event_image ||
      item.file ||
      item.file_path ||
      item.filename ||
      item.photo ||
      item.media ||
      item.secure_url ||
      item.location ||
      null
    );
  }
  return null;
};

// Formats relative and absolute image paths safely
const getImageUrl = (url) => {
  const path = extractUrlString(url);
  if (!path) return '/placeholder.png';
  if (/^https?:\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${ASSET_BASE_URL}${cleanPath}`;
};

// Splits long-form text into paragraphs.
// Kept separate from parseJsonArray, which is image-oriented and splits on
// commas - that mangled prose like "Kandal, Takeo, and Kampot" into 3 paragraphs.
const parseParagraphs = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }

  if (typeof value !== 'string') return [];

  const trimmed = value.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((entry) => String(entry).trim()).filter(Boolean);
    }
  } catch {
    // Not JSON - fall through and treat as plain text
  }

  // Blank lines separate paragraphs; single newlines are preserved by
  // the whitespace-pre-line class on the container.
  return trimmed
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

// Safely parses JSON strings, stringified JSON arrays, arrays of objects, or comma-separated lists
const parseJsonArray = (value) => {
  if (!value) return [];
  
  let items = [];
  if (Array.isArray(value)) {
    items = value;
  } else if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        items = parsed;
      } else if (typeof parsed === 'string') {
        try {
          const doubleParsed = JSON.parse(parsed);
          items = Array.isArray(doubleParsed) ? doubleParsed : [parsed];
        } catch {
          items = [parsed];
        }
      } else if (typeof parsed === 'object' && parsed !== null) {
        items = [parsed];
      } else {
        items = [trimmed];
      }
    } catch {
      if (trimmed.includes(',')) {
        items = trimmed.split(',').map((s) => s.trim());
      } else {
        items = [trimmed];
      }
    }
  }

  return items
    .flat(Infinity)
    .map(extractUrlString)
    .filter((url) => Boolean(url) && url !== '/placeholder.png');
};

const normalizeGalleryImages = (article) => {
  if (!article) return [];
  const images = [];

  // Parse all possible array/string fields (snake_case and camelCase)
  images.push(...parseJsonArray(article?.event_images));
  images.push(...parseJsonArray(article?.eventImages));
  images.push(...parseJsonArray(article?.gallery_images));
  images.push(...parseJsonArray(article?.galleryImages));
  images.push(...parseJsonArray(article?.images));
  images.push(...parseJsonArray(article?.photos));
  images.push(...parseJsonArray(article?.media));

  // Include single image fields
  [
    article?.event_image,
    article?.eventImage,
    article?.image,
    article?.cover_image,
    article?.coverImage
  ].forEach((singleImg) => {
    const extracted = extractUrlString(singleImg);
    if (extracted && extracted !== '/placeholder.png') {
      images.push(extracted);
    }
  });

  return Array.from(new Set(images.filter(Boolean)));
};

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // 1. Try fetching full detail endpoint directly to ensure full gallery payload is retrieved
        const detailRes = await api.get(`/news/${slug}`);
        const singleItem = detailRes?.data || detailRes;

        if (singleItem && (singleItem.title || singleItem.id || singleItem.slug)) {
          setArticle(singleItem);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Single item endpoint fetch failed, falling back to full list search:', err);
      }

      // 2. Fallback: fetch full list and search locally if single endpoint is not configured
      try {
        const data = await api.get('/news');
        const list = Array.isArray(data) ? data : data?.data || [];
        const found = list.find(
          (item) => item.slug === slug || String(item.id) === String(slug)
        );
        setArticle(found || null);
      } catch (error) {
        console.error('Failed to fetch news detail:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-slate-50 text-slate-900">
        <div className="max-w-4xl p-8 mx-auto text-center bg-white border shadow-sm rounded-3xl border-slate-200">
          <div className="inline-block w-8 h-8 border-4 border-[#0b3d3a] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm font-semibold text-slate-500">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen py-20 bg-slate-50 text-slate-900">
        <div className="max-w-4xl p-8 mx-auto text-center bg-white border shadow-sm rounded-3xl border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">News item not found</h1>
          <p className="mt-4 text-sm text-slate-500">
            The news item you are looking for may have been moved or removed.
          </p>
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

  const galleryImages = normalizeGalleryImages(article);
  const mainCover =
    extractUrlString(article.image) ||
    extractUrlString(article.cover_image) ||
    extractUrlString(article.coverImage) ||
    extractUrlString(article.event_image) ||
    extractUrlString(article.eventImage) ||
    (galleryImages.length > 0 ? galleryImages[0] : '/placeholder.png');

  const contentParagraphs = parseParagraphs(article.content);
  const excerptFallback = String(article.excerpt || '').trim();
  const content = contentParagraphs.length
    ? contentParagraphs
    : excerptFallback
      ? [excerptFallback]
      : [];

  return (
    <div className="min-h-screen px-4 py-12 bg-slate-50 text-slate-900 sm:py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumbs */}
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

        {/* Main Card */}
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm border border-slate-200">
          {/* Main Featured Image */}
          <div className="relative w-full aspect-video bg-slate-100 sm:aspect-[16/9] lg:aspect-[2/1] overflow-hidden">
  <img
    src={getImageUrl(mainCover)}
    alt={article.title}
    className="object-cover object-center w-full h-full"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/placeholder.png';
    }}
  />
</div>

          <div className="p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {article.category && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase border rounded-full text-amber-700 bg-amber-50 border-amber-200">
                  {article.category}
                </span>
              )}
              <div className="text-sm text-slate-500">
                {article.date || article.published_date || 'Recent'} • by {article.author || 'CATA Team'}
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="max-w-3xl mt-5 text-base font-medium leading-8 text-slate-600">
                {article.excerpt}
              </p>
            )}

            {content.length > 0 && (
              <div className="pt-6 mt-8 space-y-6 leading-8 whitespace-pre-line border-t text-slate-700 border-slate-100">
                {content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Event Gallery */}
            {galleryImages.length > 0 && (
              <div className="pt-8 mt-8 border-t border-slate-100">
                <h3 className="mb-6 text-xl font-bold text-slate-900">
                  Event Gallery ({galleryImages.length} {galleryImages.length === 1 ? 'Photo' : 'Photos'})
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {galleryImages.map((imgUrl, index) => (
                    <div
                      key={`${imgUrl}-${index}`}
                      className="relative w-full overflow-hidden transition-shadow border shadow-sm aspect-square bg-slate-100 rounded-xl border-slate-200 hover:shadow-md group"
                    >
                      <img
                        src={getImageUrl(imgUrl)}
                        alt={`${article.title} event activity ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.png';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Nav Buttons */}
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