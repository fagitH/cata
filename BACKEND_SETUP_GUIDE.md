# CATA Foundation - Complete Backend Setup & Integration Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **XAMPP installed** with MySQL running
- **PHP 8.3+** (included with XAMPP)
- **Frontend code** in `src/` folder

### Setup Steps

#### 1. Start XAMPP MySQL
- Open XAMPP Control Panel
- Click **Start** next to MySQL
- Wait for "Running" status (should show port 3306)

#### 2. Run Database Setup
Navigate to backend folder and run:
```bash
cd backend
start-server.bat
```

This script will:
- ✅ Create `cata_foundation` database
- ✅ Create all tables (banners, news, donations, etc.)
- ✅ Load sample data
- ✅ Start PHP server on port 8000

#### 3. Configure Frontend
In `src/utils/api.js`, verify the API URL:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

Create `.env.local` in the frontend root:
```
REACT_APP_API_URL=http://localhost:8000/api
```

#### 4. Start Frontend Dev Server
```bash
npm run dev
```

Your app should be live at: `http://localhost:5173`

---

## 📋 Manual Setup (if batch script doesn't work)

### Step 1: Create Database
Open Command Prompt and run:
```bash
mysql -u root
```

Then paste this SQL:
```sql
CREATE DATABASE IF NOT EXISTS cata_foundation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cata_foundation;
```

### Step 2: Create Tables
```bash
mysql -u root cata_foundation < backend/database/migrations/schema.sql
```

### Step 3: Load Sample Data
```bash
mysql -u root cata_foundation < backend/database/seeders/sample_data.sql
```

### Step 4: Start Server
```bash
cd backend
php -S localhost:8000 public/api.php
```

---

## 🔌 API Endpoints Reference

### Health Check
```bash
GET http://localhost:8000/api/health
# Response: {"status":"OK","database":"Connected"}
```

### Banners
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/banners` | List all banners |
| GET | `/api/banners/1` | Get banner by ID |
| POST | `/api/banners` | Create new banner |
| PUT | `/api/banners/1` | Update banner |
| DELETE | `/api/banners/1` | Delete banner |

**Example:**
```bash
curl http://localhost:8000/api/banners
```

### News
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/news` | List all news |
| GET | `/api/news/1` or `/api/news/cata-youth-leadership-workshop-2026` | Get by ID or slug |
| POST | `/api/news` | Create article |
| PUT | `/api/news/1` | Update article |
| DELETE | `/api/news/1` | Delete article |

### Donation Projects
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/donation_projects` | List projects |
| GET | `/api/donation_projects/1` | Get project |
| POST | `/api/donation_projects` | Create project |
| PUT | `/api/donation_projects/1` | Update project |
| DELETE | `/api/donation_projects/1` | Delete project |

### Donations
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/donations` | List donations |
| GET | `/api/donations/1` | Get donation |
| POST | `/api/donations` | Create donation |
| PUT | `/api/donations/1` | Update donation |
| DELETE | `/api/donations/1` | Delete donation |

### Scholarships
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/scholarships` | List scholarships |
| GET | `/api/scholarships/1` | Get scholarship |
| POST | `/api/scholarships` | Create scholarship |
| PUT | `/api/scholarships/1` | Update scholarship |
| DELETE | `/api/scholarships/1` | Delete scholarship |

### Annual Reports
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/annual_reports` | List reports |
| GET | `/api/annual_reports/1` or `/api/annual_reports/report-community-fund-2025` | Get by ID or slug |
| POST | `/api/annual_reports` | Create report |
| PUT | `/api/annual_reports/1` | Update report |
| DELETE | `/api/annual_reports/1` | Delete report |

---

## 📊 Database Schema

### Tables Overview

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| **banners** | Website banner content | id, image, title, description, link |
| **news** | News articles | id, slug, title, author, category, content[] |
| **donation_projects** | Fundraising campaigns | id, title, goal_amount, collected_amount |
| **donations** | Donation records | id, transaction_id, donor_name, amount |
| **scholarships** | Scholarship programs | id, title, amount, deadline, requirements[] |
| **annual_reports** | Annual reports | id, slug, title, year, content[] |

### JSON Columns (Flexible Data)
- **news.content** - Array of article paragraphs
- **news.images** - Array of gallery image URLs
- **donations.donor_address** - Address object with street, city, country
- **scholarships.requirements** - Array of requirement descriptions
- **annual_reports.content** - Array of report sections

---

## 🧪 Testing the API

### Using cURL
```bash
# Get all banners
curl http://localhost:8000/api/banners

# Get all news
curl http://localhost:8000/api/news

# Create new banner
curl -X POST http://localhost:8000/api/banners \
  -H "Content-Type: application/json" \
  -d '{"title":"New Banner","description":"Test","image":"url"}'

# Update banner
curl -X PUT http://localhost:8000/api/banners/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete banner
curl -X DELETE http://localhost:8000/api/banners/1
```

### Using Postman
1. Import collection: Create requests with endpoints above
2. Set method to GET/POST/PUT/DELETE
3. Test each endpoint

### Using Frontend API Client
The frontend uses the `api` helper from `src/utils/api.js`:
```javascript
import { api } from './utils/api.js';

// Get banners
const banners = await api.get('/banners');

// Create donation
const donation = await api.post('/donations', {
  transaction_id: 'TXN123',
  donor_name: 'John Doe',
  amount: 100,
  payment_method: 'bank_transfer'
});

// Update news
const updatedNews = await api.put('/news/1', {
  title: 'New Title',
  excerpt: 'New excerpt'
});

// Delete scholarship
await api.delete('/scholarships/1');
```

---

## 🔧 Troubleshooting

### Issue: API returns 500 error
**Solution:**
1. Verify MySQL is running: `tasklist | find "mysqld"`
2. Check database exists: `mysql -u root -e "SHOW DATABASES;"`
3. Check tables: `mysql -u root cata_foundation -e "SHOW TABLES;"`

### Issue: "Database connection failed"
**Solution:**
1. Ensure XAMPP MySQL is started
2. Check .env file has correct credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=cata_foundation
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### Issue: API endpoint returns 404
**Solution:**
1. Check spelling: `/api/donation_projects` (with underscore)
2. Verify table exists: `mysql -u root cata_foundation -e "SHOW TABLES;"`
3. Check PHP server is running: Visit `http://localhost:8000/api/health`

### Issue: CORS errors in frontend
**Solution:**
1. Verify API returns CORS headers (API already configured)
2. Check frontend is calling correct URL: `http://localhost:8000/api`
3. Check browser console for specific CORS error

### Issue: Sample data not loaded
**Solution:**
```bash
# Re-load sample data
mysql -u root cata_foundation < backend/database/seeders/sample_data.sql
```

---

## 📁 File Structure

```
backend/
├── public/
│   └── api.php                  # Main API router (runs here)
├── bootstrap/
│   └── autoload.php             # Environment configuration
├── database/
│   ├── migrations/
│   │   └── schema.sql           # Database schema (create tables)
│   └── seeders/
│       └── sample_data.sql      # Sample data (2 articles, 3 projects, etc)
├── .env                         # Database configuration
├── start-server.bat             # Automated setup & server start (Windows)
├── composer.json                # PHP dependencies
└── README.md                    # Documentation
```

---

## 📝 Frontend Integration Checklist

- [ ] XAMPP MySQL is running
- [ ] Database `cata_foundation` created
- [ ] All tables created
- [ ] Sample data loaded
- [ ] Backend API server running on port 8000
- [ ] Frontend `src/utils/api.js` points to `http://localhost:8000/api`
- [ ] `.env.local` file created with API URL
- [ ] Frontend `npm run dev` running on port 5173
- [ ] Test API call from browser DevTools Console:
  ```javascript
  fetch('http://localhost:8000/api/news')
    .then(r => r.json())
    .then(d => console.log(d))
  ```

---

## 🚨 Important Notes

1. **Passwords**: MySQL has no password by default (XAMPP standard)
2. **Ports**: 
   - Frontend: 5173 (Vite dev server)
   - Backend: 8000 (PHP server)
   - MySQL: 3306 (XAMPP default)
3. **Database**: `cata_foundation` (created automatically or manually)
4. **CORS**: Already enabled on backend for all origins
5. **Timestamps**: Automatically added on create/update

---

## 📞 Support

For issues:
1. Check MySQL is running in XAMPP Control Panel
2. Verify database exists: `mysql -u root -e "USE cata_foundation;"`
3. Test API: `http://localhost:8000/api/health`
4. Check frontend console for errors (F12)
5. Review `.env` file for correct database credentials

---

**Backend Created:** August 2026  
**Frontend API Client:** `src/utils/api.js`  
**Database:** MySQL 5.7+ via XAMPP
