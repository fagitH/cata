@echo off
REM CATA Foundation Backend Setup Script
REM This script sets up the MySQL database and starts the API server

echo.
echo ========================================
echo CATA Foundation Backend Setup
echo ========================================
echo.

echo Step 1: Checking XAMPP MySQL Status...
tasklist | find /i "mysqld" >nul
if errorlevel 1 (
    echo.
    echo WARNING: MySQL (mysqld) is NOT running!
    echo Please start MySQL in XAMPP Control Panel first.
    echo.
    echo Steps to start MySQL:
    echo 1. Open XAMPP Control Panel
    echo 2. Click "Start" next to MySQL
    echo 3. Wait until it shows "Running" (port 3306)
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)
echo MySQL is running!

echo.
echo Step 2: Creating database and tables...
cd /d "%~dp0"

REM Create database
mysql -u root < nul
if errorlevel 1 (
    echo.
    echo ERROR: Could not connect to MySQL.
    echo Make sure MySQL is running in XAMPP Control Panel.
    echo.
    pause
    exit /b 1
)

mysql -u root -e "CREATE DATABASE IF NOT EXISTS cata_foundation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if errorlevel 1 (
    echo.
    echo ERROR: Could not create database.
    echo Check MySQL connection.
    echo.
    pause
    exit /b 1
)
echo Database created successfully!

echo.
echo Step 3: Running Laravel migrations...
php artisan migrate --force
if errorlevel 1 (
    echo.
    echo ERROR: Could not run Laravel migrations.
    echo.
    pause
    exit /b 1
)
echo Laravel migrations completed successfully!

echo.
echo ========================================
echo Database Setup Complete!
echo ========================================
echo.
echo Starting Laravel API server on http://localhost:8000
echo Press Ctrl+C to stop the server.
echo.

php artisan serve --host=localhost --port=8000

pause
