<?php

header('Access-Control-Allow-Origin: http://localhost:5173');

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header_remove("X-Powered-By");

include('../function.php');

global $con;

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "OPTIONS") {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}

if ($requestMethod == 'PUT') {

    $inputData = json_decode(file_get_contents("php://input"), true);

    if (empty($inputData)) {
        $updatePost = updatePost($_POST);
    } else {
        $updatePost = updatePost($inputData);
    }
    echo $updatePost;
    exit();
} else {
    $data = [
        'status' => 405,
        'message' => $requestMethod . ' Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
