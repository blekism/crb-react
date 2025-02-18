<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: multipart/form-data');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header_remove("X-Powered-By");

require  __DIR__ . '/../../vendor/autoload.php';
include('../function.php');


$filepath = __DIR__ . '/../../named-mason-444205-k2-5c3db6cb8c22.json';



use Google\Cloud\Storage\StorageClient;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $test = imageUpload($_FILES);
    echo $test;
} else {
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}
