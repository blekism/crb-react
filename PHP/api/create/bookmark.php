<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');

include('../function.php');
require(__DIR__ . '../../creds.php');

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
    $session = $_COOKIE['logged_user'] ?? '';

    try {
        $decoded = JWT::decode($session, new Key($secret_key, 'HS256'));
        $user_id = $decoded->user_id; // Extract the user ID from the token
        $expiry = $decoded->exp;

        if (time() > $expiry) {
            $data = [
                'status' => 401,
                'message' => 'Unauthorized',
            ];
            header("HTTP/1.0 401 Unauthorized");
            echo json_encode($data);
            exit();
        } else {
            // Get input data
            $inputData = json_decode(file_get_contents("php://input"), true);

            if (empty($inputData) || !isset($inputData['post_id'])) {
                $data = [
                    'status' => 400,
                    'message' => 'Bad Request: Missing post_id',
                ];
                header("HTTP/1.0 400 Bad Request");
                echo json_encode($data);
                exit();
            }

            $post_id = $inputData['post_id']; // Extract post_id from input
            $bookmark = Bookmark($post_id, $user_id);

            echo $bookmark;
            exit();
        }
    } catch (ExpiredException $e) {
        $data = [
            'status' => 401,
            'message' => 'Unauthorized',
        ];
        header("HTTP/1.0 401 Unauthorized");
        echo json_encode($data);
        exit();
    }
} else {
    $data = [
        'status' => 405,
        'message' => $requestMethod . ' method not allowed'
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
