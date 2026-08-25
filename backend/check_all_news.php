<?php
$pdo = new PDO('mysql:host=localhost;dbname=cata_foundation', 'root', '');
$stmt = $pdo->query('SELECT id, title, event_images FROM news ORDER BY id');
$rows = $stmt->fetchAll();
echo "All news items:\n";
foreach ($rows as $row) {
    echo "ID: " . $row['id'] . " | Title: " . $row['title'] . " | event_images: " . $row['event_images'] . "\n";
}
