@echo off
SETLOCAL
SET ROOTDIR=%~dp0

"C:\xampp\mysql\bin\mysql.exe" -u root -e "DROP DATABASE IF EXISTS cata_foundation; CREATE DATABASE cata_foundation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
"C:\xampp\mysql\bin\mysql.exe" -u root cata_foundation < "%ROOTDIR%database\migrations\schema.sql"
"C:\xampp\mysql\bin\mysql.exe" -u root cata_foundation < "%ROOTDIR%database\seeders\sample_data.sql"
"C:\xampp\mysql\bin\mysql.exe" -u root -e "USE cata_foundation; SHOW TABLES; SELECT COUNT(*) FROM banners; SELECT COUNT(*) FROM news; SELECT COUNT(*) FROM donation_projects; SELECT COUNT(*) FROM scholarships; SELECT COUNT(*) FROM annual_reports;"
ENDLOCAL
