<?php
$pdo = new PDO('mysql:host=localhost;dbname=cata_foundation', 'root', '');

$sql = "ALTER TABLE news ADD COLUMN event_images LONGTEXT DEFAULT '[]' COMMENT 'JSON array of event image paths'";
try {
    $pdo->exec($sql);
    echo "Column event_images added successfully\n";
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column')) {
        echo "Column event_images already exists\n";
    } else {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Verify the columns
$result = $pdo->query('DESCRIBE news');
$columns = $result->fetchAll(PDO::FETCH_COLUMN, 0);
echo "News table columns:\n";
foreach ($columns as $col) {
    echo "  - " . $col . "\n";
}
