# CATA Foundation - Backend Integration Guide

## Overview

This guide explains how to use the new backend API with your React frontend. The backend is built with Node.js/Express and provides REST API endpoints for managing all organization data including news, donations, scholarships, and annual reports.

## Quick Start

### Prerequisites
- Node.js 14+ installed
- Backend running on `http://localhost:5000`

### 1. Starting the Backend

```bash
cd backend
npm install  # Only needed first time
npm start
```

The backend will start on: **http://localhost:5000/api**

### 2. Configuring the Frontend

The frontend is already configured to use the backend API. The API base URL is set to:
```
http://localhost:5000/api
```

You can override this by setting the environment variable:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Running Frontend and Backend Together

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd ..
npm run dev
```

Both should be running on:
- Frontend: `http://localhost:5173` (Vite)
- Backend: `http://localhost:5000`

## API Endpoints Reference

### Banner Slides
Used for carousel/slider images on home page and other sections.

```javascript
// Get all banners
GET /api/banners

// Get single banner
GET /api/banners/:id

// Create new banner
POST /api/banners
Body: {
  "image": "https://...",
  "title": "Banner Title",
  "description": "Description",
  "link": "/path"
}

// Update banner
PUT /api/banners/:id

// Delete banner
DELETE /api/banners/:id
```

### News
Manage news articles with images and gallery photos.

```javascript
// Get all news
GET /api/news

// Get single news by ID
GET /api/news/:id

// Get news by slug
GET /api/news/slug-name

// Create news
POST /api/news
Body: {
  "title": "Article Title",
  "slug": "article-title",
  "date": "2026-08-14",
  "author": "Author Name",
  "category": "Education",
  "image": "https://...",
  "excerpt": "Brief description",
  "content": ["Paragraph 1", "Paragraph 2"],
  "images": ["/images/gallery-1.jpg", "/images/gallery-2.jpg"]
}

// Update news
PUT /api/news/:id

// Delete news
DELETE /api/news/:id
```

### Donation Projects
Manage donation campaigns and fundraising projects.

```javascript
// Get all projects
GET /api/donation-projects

// Get single project
GET /api/donation-projects/:id

// Create project
POST /api/donation-projects
Body: {
  "title": "Project Title",
  "category": "Community support",
  "description": "Description",
  "image": "https://...",
  "goal_amount": 5000,
  "collected_amount": 0,
  "status": "active"
}

// Update project
PUT /api/donation-projects/:id

// Delete project
DELETE /api/donation-projects/:id
```

### Donations
Track and manage donations made by donors.

```javascript
// Get all donations
GET /api/donations

// Get single donation
GET /api/donations/:id

// Create donation
POST /api/donations
Body: {
  "donor_name": "John Doe",
  "donor_email": "john@example.com",
  "donor_phone": "+855123456789",
  "donor_address": {
    "company": "Company Name",
    "street1": "Street Address",
    "street2": "Street Address 2",
    "city": "City",
    "state": "State",
    "postcode": "12000",
    "country": "Cambodia"
  },
  "amount": 100.00,
  "payment_method": "bank_transfer",
  "campaign_title": "Education Fund",
  "status": "pending"
}

// Update donation
PUT /api/donations/:id

// Delete donation
DELETE /api/donations/:id
```

### Scholarships
Announce and manage scholarship programs.

```javascript
// Get all scholarships
GET /api/scholarships

// Get single scholarship
GET /api/scholarships/:id

// Create scholarship
POST /api/scholarships
Body: {
  "title": "Scholarship Name",
  "description": "Description",
  "amount": 5000,
  "deadline": "2026-12-31",
  "requirements": ["Requirement 1", "Requirement 2"],
  "contact_email": "scholarships@example.com",
  "image": "https://...",
  "status": "open"
}

// Update scholarship
PUT /api/scholarships/:id

// Delete scholarship
DELETE /api/scholarships/:id
```

### Annual Reports
Publish and manage annual reports.

```javascript
// Get all reports
GET /api/annual-reports

// Get single report by ID
GET /api/annual-reports/:id

// Get report by slug
GET /api/annual-reports/report-2025

// Create report
POST /api/annual-reports
Body: {
  "title": "2025 Annual Report",
  "slug": "report-2025",
  "year": 2025,
  "description": "Description",
  "content": ["Section 1", "Section 2"],
  "pdf_url": "/reports/2025-annual-report.pdf",
  "image": "https://..."
}

// Update report
PUT /api/annual-reports/:id

// Delete report
DELETE /api/annual-reports/:id
```

## Using the API in React Components

### Example 1: Fetching News

```jsx
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await api.get('/news');
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {news.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Getting News by Slug

```jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await api.get(`/news/${slug}`);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    }
    fetchArticle();
  }, [slug]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p>{article.excerpt}</p>
      {article.content && article.content.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
      {article.images && article.images.length > 0 && (
        <div>
          <h3>Gallery</h3>
          {article.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Gallery ${idx}`} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Example 3: Creating a Donation

```jsx
import { api } from '../utils/api';

export function DonationForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/donations', {
        donor_name: 'John Doe',
        donor_email: 'john@example.com',
        donor_phone: '+855123456789',
        donor_address: {
          company: 'Company',
          street1: 'Address 1',
          city: 'Phnom Penh',
          country: 'Cambodia'
        },
        amount: 100.00,
        payment_method: 'bank_transfer',
        campaign_title: 'Education Fund'
      });

      console.log('Donation created:', response);
      // Redirect to confirmation page
    } catch (error) {
      console.error('Failed to create donation:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Donate'}
      </button>
    </form>
  );
}
```

## Sample Data Files

The backend includes sample data in JSON files located in `backend/storage/data/`:

- `banners.json` - Banner slides
- `news.json` - News articles  
- `donations.json` - Donation records
- `donation_projects.json` - Donation projects/campaigns
- `scholarships.json` - Scholarship announcements
- `annual_reports.json` - Annual reports

You can manually edit these files or use the API endpoints to modify them.

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## Production Deployment

### Backend (Node.js Server)

1. Deploy to a hosting service (Heroku, DigitalOcean, AWS, etc.)
2. Set environment variables
3. Install dependencies: `npm install --production`
4. Start server: `npm start`

### Frontend (React/Vite)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to a static hosting service
3. Update API URL in environment: `REACT_APP_API_URL=https://api.yourdomain.com/api`

## Troubleshooting

### Backend won't start
- Ensure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 5000 is available: `netstat -an | findstr 5000`

### API requests failing
- Verify backend is running
- Check browser console for CORS errors
- Verify correct API URL in frontend configuration
- Check Network tab in developer tools

### CORS errors
- Backend has CORS enabled by default for all origins
- To restrict, modify in `server.js`:
  ```javascript
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  ```

## Future Enhancements

- [ ] Switch to MySQL/PostgreSQL database
- [ ] Add authentication and user roles
- [ ] Add image upload and storage
- [ ] Add email notifications
- [ ] Add admin dashboard
- [ ] Implement caching strategies
- [ ] Add API rate limiting
- [ ] Setup CI/CD pipeline

## Support

For issues or questions about the backend API, please refer to the `backend/README.md` file or create an issue in the repository.
