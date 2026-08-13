// src/data/blogs.js

export async function fetchCataVideos() {
  try {
    // YouTube RSS feed url using handle endpoint or channel ID
    const RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCwbNKD6eeq_zE5Zz8EpznDg';

    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
    const data = await res.json();

    if (!data.items) return [];

    return data.items.map((item) => {
      const videoId = item.link.split('v=')[1];
      return {
        id: videoId,
        title: item.title,
        date: new Date(item.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        excerpt: item.description ? item.description.replace(/<[^>]*>?/gm, '') : '',
        youtubeId: videoId,
        category: 'Community',
      };
    });
  } catch (error) {
    console.error('Failed to fetch videos from RSS:', error);
    return [];
  }
}