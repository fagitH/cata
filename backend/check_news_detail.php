<?php
$pdo = new PDO('mysql:host=localhost;dbname=cata_foundation', 'root', '');
$stmt = $pdo->query('SELECT * FROM news WHERE id = 1');
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo "News ID 1 - All columns:\n";
foreach ($row as $key => $value) {
    $displayValue = strlen($value) > 50 ? substr($value, 0, 50) . "..." : $value;
    echo "$key: $displayValue\n";
}
