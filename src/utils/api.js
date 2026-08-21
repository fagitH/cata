// Backend API Configuration
// Origin is configurable via VITE_API_BASE_URL so non-local builds work.
// Falls back to the local PHP dev server on port 8000.
const DEFAULT_BACKEND_ORIGIN = 'http://localhost:8000';

// Backend origin for static assets (uploaded images, PDFs)
export const ASSET_BASE_URL = String(
  import.meta.env?.VITE_API_BASE_URL || DEFAULT_BACKEND_ORIGIN
).replace(/\/+$/, '');

export const toAssetUrl = (path) => {
  if (!path || /^https?:\/\//i.test(path)) return path || '';
  return `${ASSET_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const API_BASE_URL = `${ASSET_BASE_URL}/api`;

export async function apiFetch(endpoint, options = {}) {
  const isFormData = options.body instanceof FormData;
  const token = localStorage.getItem('admin_token');
  
  const defaultHeaders = isFormData ? {
    'Accept': 'application/json',
    // Don't set Content-Type for FormData - let browser set it with boundary
  } : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  // Only stringify body if it's not FormData and is an object
  if (!isFormData && config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiFetch(endpoint, { method: 'POST', body }),
  put: (endpoint, body) => apiFetch(endpoint, { method: 'PUT', body }),
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' }),
};
