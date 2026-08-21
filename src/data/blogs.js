import { api } from '../utils/api.js';

export async function fetchCataVideos() {
  const response = await api.get('/youtube/videos');
  return Array.isArray(response.videos) ? response.videos : [];
}
