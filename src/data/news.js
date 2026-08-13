// src/data/news.js
export const newsArticles = [
  {
    id: 1,
    slug: "cata-youth-leadership-workshop-2026",
    title: "CATA Youth Leadership Workshop 2026",
    date: "May 10, 2026",
    author: "CATA Team",
    category: "Education",
    // Primary cover thumbnail (Shown on the list page & hero banner)
    image: "/images/news/youth-workshop-cover.jpg", 
    
    // Gallery photos uploaded by admin (Shown ONLY inside NewsDetail.jsx)
    images: [
      "/images/news/youth-workshop-1.jpg",
      "/images/news/youth-workshop-2.jpg",
      "/images/news/youth-workshop-3.jpg",
    ],
    excerpt: "Empowering young leaders through hands-on community workshops and skills training.",
    content: [
      "The CATA Youth Leadership Workshop brought together youth from various regions for intensive leadership modules.",
      "Participants engaged in interactive sessions focusing on strategic planning, effective communication, and community outreach.",
    ],
  },
];

export const getAllNewsArticles = () => newsArticles;

export const getNewsBySlug = (slug) => 
  newsArticles.find((article) => article.slug === slug);