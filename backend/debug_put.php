<?php
// Log what's in the input during a PUT request
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'PUT') {
    // Check $_FILES
    $logContent = "PUT REQUEST LOG:\n";
    $logContent .= "Method: $method\n";
    $logContent .= "\$_FILES keys: " . implode(', ', array_keys($_FILES)) . "\n";
    $logContent .= "\$_FILES: " . json_encode($_FILES, JSON_UNESCAPED_SLASHES) . "\n";
    
    // Check $_POST
    $logContent .= "\$_POST: " . json_encode($_POST, JSON_UNESCAPED_SLASHES) . "\n";
    
    file_put_contents('/tmp/api_debug.log', $logContent . "\n\n", FILE_APPEND);
}
