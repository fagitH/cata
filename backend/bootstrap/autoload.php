<?php
/**
 * Bootstrap - Autoload configuration
 */

// Load .env file
if (file_exists(__DIR__ . '/../.env')) {
    $env = parse_ini_file(__DIR__ . '/../.env');
    foreach ($env as $key => $value) {
        $_ENV[$key] = $value;
        putenv("$key=$value");
    }
}

// Define application constants
define('APP_PATH', dirname(__DIR__));
define('STORAGE_PATH', APP_PATH . '/storage');
define('CONFIG_PATH', APP_PATH . '/config');
define('DATABASE_PATH', APP_PATH . '/database');

// Ensure directories exist
@mkdir(STORAGE_PATH, 0755, true);
@mkdir(STORAGE_PATH . '/logs', 0755, true);
@mkdir(STORAGE_PATH . '/framework', 0755, true);
