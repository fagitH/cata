import React from 'react';
import DataManagerWithFiles from '../components/DataManagerWithFiles';
import { toAssetUrl } from '../../utils/api';

// Safely extracts a string path from a string or image object
const extractUrlString = (item) => {
  if (!item) return null;
  if (typeof item === 'string') return item.trim();
  if (typeof item === 'object' && item !== null) {
    return item.url || item.path || item.src || item.image || item.event_image || null;
  }
  return null;
};

// Formats backend image URLs safely
const getImageUrl = (path) => {
  const url = extractUrlString(path);
  if (!url) return '/placeholder.png';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  return toAssetUrl(url);
};

// Parses array, stringified JSON, object-indexed arrays, and comma-separated strings
const parseJsonArray = (value) => {
  if (!value) return [];
  let items = [];

  if (Array.isArray(value)) {
    items = value;
  } else if (typeof value === 'object' && value !== null) {
    // Converts PHP associative/indexed objects like {"0": "img1.png", "1": "img2.png"}
    items = Object.values(value);
  } else if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        items = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        items = Object.values(parsed);
      } else if (typeof parsed === 'string') {
        try {
          const doubleParsed = JSON.parse(parsed);
          items = Array.isArray(doubleParsed)
            ? doubleParsed
            : typeof doubleParsed === 'object' && doubleParsed !== null
            ? Object.values(doubleParsed)
            : [parsed];
        } catch {
          items = [parsed];
        }
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

// Merges all potential event image fields without dropping items
const parseEventImages = (item) => {
  if (!item) return [];
  const images = [];

  images.push(...parseJsonArray(item.event_images));
  images.push(...parseJsonArray(item.eventImages));
  images.push(...parseJsonArray(item.gallery_images));
  images.push(...parseJsonArray(item.galleryImages));
  images.push(...parseJsonArray(item.images));

  [item.event_image, item.eventImage].forEach((singleImg) => {
    const extracted = extractUrlString(singleImg);
    if (extracted && extracted !== '/placeholder.png') {
      images.push(extracted);
    }
  });

  return Array.from(new Set(images.filter(Boolean)));
};

export default function NewsAdmin() {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    {
      key: 'content',
      label: 'Content',
      render: (item) => String(item.content || '').substring(0, 50) + '...',
    },
    { key: 'author', label: 'Author' },
    {
      key: 'published_date',
      label: 'Published Date',
      render: (item) => {
        const value = item.published_date || item.date || item.created_at;
        if (!value) return <span className="text-slate-500">-</span>;
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? <span>{value}</span> : date.toLocaleDateString();
      },
    },
    {
      key: 'image',
      label: 'Featured Image',
      render: (item) => {
        const imagePath =
          extractUrlString(item.image) ||
          extractUrlString(item.cover_image) ||
          extractUrlString(item.coverImage);

        if (!imagePath) return <span className="text-slate-500">-</span>;

        return (
          <img
            src={getImageUrl(imagePath)}
            alt={item.title || 'Featured'}
            className="object-cover w-10 h-10 border rounded border-slate-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            }}
          />
        );
      },
    },
    {
      key: 'event_images',
      label: 'Event Images',
      render: (item) => {
        const images = parseEventImages(item);

        if (images.length === 0) {
          return <span className="text-slate-500">-</span>;
        }

        return (
          /* Displays ALL images added by the admin directly in the table */
          <div className="flex flex-wrap items-center max-w-xs gap-1 p-1 overflow-y-auto max-h-24">
            {images.map((img, idx) => (
              <img
                key={`${img}-${idx}`}
                src={getImageUrl(img)}
                alt={`event-${idx}`}
                className="object-cover w-10 h-10 border rounded border-slate-200 shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.png';
                }}
              />
            ))}
          </div>
        );
      },
    },
  ];

  const formFields = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'author', label: 'Author', type: 'text' },
    { key: 'published_date', label: 'Published Date', type: 'date' },
  ];

  const fileFields = [
    {
      name: 'image',
      label: 'Featured Image (for listing)',
      accept: 'image/*',
    },
    {
      /* event_images[] includes brackets for backend array uploads */
      name: 'event_images[]',
      label: 'Event Images (select multiple)',
      accept: 'image/*',
      multiple: true,
    },
  ];

  return (
    <DataManagerWithFiles
      title="News"
      endpoint="news"
      columns={columns}
      formFields={formFields}
      fileFields={fileFields}
    />
  );
}
