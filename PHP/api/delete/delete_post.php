<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS ');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header_remove("X-Powered-By");

include('../function.php');
require(__DIR__ . '../../creds.php');
require  __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;

global $secret_key;

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "OPTIONS") {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}

if ($requestMethod == "POST") {
    // 
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (empty($inputData)) {
        $data = [
            'status' => 400,
            'message' => 'Bad Request',
        ];
        header("HTTP/1.0 400 Bad Request");
        echo json_encode($data);
        exit();
    } else {
        $deleteContent = delete_post($inputData);
    }
    echo $deleteContent;
    exit();
} else {
    $data = [
        'status' => 405,
        'message' => $requestMethod . ' method not allowed'
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
