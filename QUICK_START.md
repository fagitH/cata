# 🚀 Quick Start Guide

## Backend + Frontend Setup (2 minutes)

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```
✅ Backend running at `http://localhost:5000/api`

### Terminal 2 - Start Frontend  
```bash
npm run dev
```
✅ Frontend running at `http://localhost:5173`

## 📊 What's Ready

### ✅ Database Tables
- **Banners** - Carousel slides
- **News** - Articles with images & galleries
- **Donations** - Track donor contributions
- **Donation Projects** - Fundraising campaigns
- **Scholarships** - Announcement programs
- **Annual Reports** - Yearly reports with PDFs

### ✅ All API Endpoints
- `/api/banners` - Carousel management
- `/api/news` - News articles (supports slug)
- `/api/donations` - Donation records
- `/api/donation-projects` - Campaign management
- `/api/scholarships` - Scholarship programs
- `/api/annual-reports` - Reports (supports slug)

### ✅ Sample Data
- 3 banners
- 2 news articles with images
- 3 donation projects
- 2 donations
- 2 scholarships
- 6 annual reports

## 🔗 Integration Examples

### Get News (React)
```javascript
import { api } from '@/utils/api';
const news = await api.get('/news');
```

### Get News by Slug
```javascript
const article = await api.get('/news/article-title-slug');
```

### Create Donation
```javascript
const donation = await api.post('/donations', {
  donor_name: 'John Doe',
  donor_email: 'john@example.com',
  amount: 100,
  campaign_title: 'Education Fund'
});
```

## 📖 Documentation Files

- `backend/README.md` - Backend API reference
- `BACKEND_INTEGRATION_GUIDE.md` - Complete integration guide
- `BACKEND_SUMMARY.md` - Project overview

## ⚙️ Configuration

**Frontend API URL** (in `.env.example`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Backend Port** (in `backend/.env`):
```
PORT=5000
```

## 🎯 Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend API configured
3. ✅ Sample data ready
4. Start building your features!

## 📂 File Locations

- Backend: `backend/` 
- Frontend: `src/`
- Sample Data: `backend/storage/data/`
- Integration Guide: `BACKEND_INTEGRATION_GUIDE.md`

---

**Everything is ready! Both frontend and backend are configured and running.** 🎉
