<?php
$pdo = new PDO('mysql:host=localhost;dbname=cata_foundation', 'root', '');
$stmt = $pdo->query('SELECT id, title, event_images FROM news WHERE id = 1');
$row = $stmt->fetch();
echo "News ID 1:\n";
echo "Title: " . $row['title'] . "\n";
echo "event_images: " . $row['event_images'] . "\n";
echo "event_images length: " . strlen($row['event_images']) . "\n";
