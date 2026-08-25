# CATA Foundation Backend API Setup Guide

## Overview
This is a PHP-based REST API backend for the CATA Foundation frontend built with React. The backend uses MySQL database (via XAMPP) and provides RESTful API endpoints for all frontend features.

## Requirements
- PHP 8.3+ (included with XAMPP)
- MySQL 5.7+ (included with XAMPP)
- XAMPP installed and running
- Composer (for dependency management)

## Database Setup

### 1. Start XAMPP
- Open XAMPP Control Panel
- Start MySQL service
- Default MySQL credentials: `root` (no password)

### 2. Create Database and Tables

Create the database once, then let Laravel create and track all tables with migrations:

```sql
CREATE DATABASE cata_foundation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
cd backend
php artisan migrate --force
```

The authoritative schema is in `backend/database/migrations`; `schema.sql` and `sample_data.sql` are legacy reference files.

## Running the Backend

### Option 1: PHP Built-in Server (Development)
```bash
cd backend
php artisan serve --host=localhost --port=8000
```

The API will be available at: `http://localhost:8000/api`

### Option 2: Apache via XAMPP
1. Copy backend folder to `xampp/htdocs/cata-backend`
2. Access the API at: `http://localhost:8000/api`

### Option 3: Using Artisan (if dependencies installed)
```bash
cd backend
php artisan serve --port 8000
```

## API Endpoints

### Banners
- `GET /api/banners` - Get all banners
- `GET /api/banners/{id}` - Get banner by ID
- `POST /api/banners` - Create banner
- `PUT /api/banners/{id}` - Update banner
- `DELETE /api/banners/{id}` - Delete banner

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/{id}` - Get news by ID or slug
- `POST /api/news` - Create news article
- `PUT /api/news/{id}` - Update news article
- `DELETE /api/news/{id}` - Delete news article

### Donation Projects
- `GET /api/donation_projects` - Get all projects
- `GET /api/donation_projects/{id}` - Get project by ID
- `POST /api/donation_projects` - Create project
- `PUT /api/donation_projects/{id}` - Update project
- `DELETE /api/donation_projects/{id}` - Delete project

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/{id}` - Get donation by ID
- `POST /api/donations` - Create donation
- `PUT /api/donations/{id}` - Update donation
- `DELETE /api/donations/{id}` - Delete donation

### Scholarships
- `GET /api/scholarships` - Get all scholarships
- `GET /api/scholarships/{id}` - Get scholarship by ID
- `POST /api/scholarships` - Create scholarship
- `PUT /api/scholarships/{id}` - Update scholarship
- `DELETE /api/scholarships/{id}` - Delete scholarship

### Annual Reports
- `GET /api/annual_reports` - Get all reports
- `GET /api/annual_reports/{id}` - Get report by ID or slug
- `POST /api/annual_reports` - Create report
- `PUT /api/annual_reports/{id}` - Update report
- `DELETE /api/annual_reports/{id}` - Delete report

## Frontend Integration

### Update Frontend API URL
In `src/utils/api.js`, ensure the API base URL is correct:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

### Create `.env.local` in frontend root:
```
REACT_APP_API_URL=http://localhost:8000/api
```

## CORS Configuration
The API endpoints automatically handle CORS requests from the frontend at `http://localhost:5173` (Vite dev server).

## Database Schema

### Tables
1. **banners** - Website banner images and links
2. **news** - News articles with content, images, and categories
3. **donation_projects** - Fundraising campaigns
4. **donations** - Individual donation records
5. **scholarships** - Scholarship program announcements
6. **annual_reports** - Foundation annual reports

## JSON Fields
Some tables use JSON columns for flexible data storage:
- `news.content` - Array of paragraph strings
- `news.images` - Array of gallery image URLs
- `donations.donor_address` - Address object
- `scholarships.requirements` - Array of requirement strings
- `annual_reports.content` - Array of report sections

## Troubleshooting

### API Not Responding
1. Check XAMPP MySQL is running
2. Verify database `cata_foundation` exists
3. Check `.env` file has correct database credentials
4. Ensure tables exist in database

### CORS Errors
- Verify API is returning `Access-Control-Allow-Origin: *` header
- Check frontend is requesting correct API endpoint

### Database Connection Failed
1. Verify MySQL is running (XAMPP Control Panel)
2. Check .env file credentials
3. Ensure cata_foundation database exists
4. Check MySQL user permissions

## File Structure
```
backend/
├── public/
│   └── index.php            # Laravel public entrypoint
├── bootstrap/
│   └── autoload.php         # Configuration loader
├── database/
│   ├── migrations/
│   │   └── schema.sql       # Database schema
│   └── seeders/
│       └── sample_data.sql  # Sample data
├── .env                     # Database configuration
├── composer.json            # Dependencies
└── README.md                # This file
```

## Notes
- Default MySQL password is empty (Xampp default)
- API runs on port 8000 during development
- All timestamps are stored as UTC
- Database uses utf8mb4 encoding for full Unicode support
