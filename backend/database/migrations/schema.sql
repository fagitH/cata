-- CATA Foundation Database Schema
-- MySQL Database for API Backend

-- Banners Table
CREATE TABLE IF NOT EXISTS banners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image LONGTEXT NOT NULL COMMENT 'Banner image URL or path',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- News Table
CREATE TABLE IF NOT EXISTS news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(255),
    author VARCHAR(255),
    category VARCHAR(255),
    image VARCHAR(255),
    cover_image VARCHAR(255),
    excerpt TEXT,
    content JSON COMMENT 'Array of content paragraphs',
    images JSON COMMENT 'Array of gallery images',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Donation Projects are static frontend data and are intentionally not stored in MySQL.

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    acleda_transaction_id VARCHAR(255) UNIQUE,
    acleda_payment_token_id VARCHAR(255),
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255),
    donor_phone VARCHAR(20),
    donor_address JSON COMMENT 'Address object',
    amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(100) COMMENT 'bank_transfer, acleda_khqr, etc',
    campaign_title VARCHAR(255),
    status VARCHAR(100) DEFAULT 'pending' COMMENT 'pending, completed, failed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_acleda_payment_token_id (acleda_payment_token_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Scholarship announcements are static frontend data and are intentionally not stored in MySQL.

-- Annual Reports Table
CREATE TABLE IF NOT EXISTS annual_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    year INT,
    description TEXT,
    content JSON COMMENT 'Array of report content/sections',
    pdf_url VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Report Items Table
CREATE TABLE IF NOT EXISTS report_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_id VARCHAR(50),
    description TEXT NOT NULL,
    amount VARCHAR(255) NOT NULL,
    tag VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_report_id (report_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
