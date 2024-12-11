<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: multipart/form-data');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');

require  __DIR__ . '/../../vendor/autoload.php';

$filepath = __DIR__ . '/../../named-mason-444205-k2-5c3db6cb8c22.json';


use Google\Cloud\Storage\StorageClient;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_FILES['file'])) {
        echo json_encode(['error' => 'File is required']);
        exit();
    }

    $file = $_FILES['file'];
    $bucketName = 'crb-bucket';

    $storage = new StorageClient(['keyFilePath' =>  $filepath]);
    $bucket = $storage->bucket($bucketName);

    $fileName = $file['name'];
    $tmpName = $file['tmp_name'];
    $mimeType = mime_content_type($tmpName);

    $object = $bucket->upload(
        fopen($tmpName, 'r'),
        [
            'name' => $fileName,
            'metadata' => [
                'contentType' => $mimeType
            ]
        ]
    );

    $object->update(['acl' => []], ['predefinedAcl' => 'PUBLICREAD']);

    // Generate a public URL
    $url = "https://storage.googleapis.com/$bucketName/$fileName";

    $data = [
        'status' => 200,
        'message' => 'File uploaded successfully',
        'url' => $url
    ];

    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit();
} else {
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}
