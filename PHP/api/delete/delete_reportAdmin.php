<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');

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
                $deleteContent = delete_reportAdmin($inputData);
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
