<?php

require __DIR__ . '/../inc/dbcon.php';
require  __DIR__ . '/../vendor/autoload.php';
require 'creds.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use GeminiAPI\Client;
use GeminiAPI\Resources\ModelName;
use GeminiAPI\Resources\Parts\TextPart;
use Google\Cloud\Storage\StorageClient;

function error422($message)
{
    $data = [
        'status' => 422,
        'message' => $message,
    ];
    header("HTTP/1.0 422 Unprocessable Entity");
    echo json_encode($data);
    exit();
}

function sendMail($verification_code, $email)
{
    global $myEmail, $myPassword;

    $mail = new PHPMailer(true);
    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $myEmail;                     //SMTP username
        $mail->Password   = $myPassword;                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($myEmail, 'Mailer');
        $mail->addAddress($email);     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Verification code';
        $mail->Body    = 'Your verification code is: ' . $verification_code;
        $mail->AltBody = 'Your verification code is: ' . $verification_code;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function nlpRead($userContent)
{
    global $google_key;

    $queryText = "Analyze if the following text sounds positive, neutral, negative, or problematic. consider the context when choosing negative or problematic. negative should be when the tone seems like its hurting someone or something in a bad way, and problematic should be when the tone is just outright unacceptable in society's standards The output should only contain one of the four choices: \"$userContent\"";
    $client = new Client($google_key);
    $response = $client->generativeModel(ModelName::GEMINI_1_5_FLASH)->generateContent(
        new TextPart($queryText),
    );

    if ($response) {
        $data = [
            'status' => 200,
            'message' => $response->text(),
            'text' => $userContent
        ];
        return json_encode($data);
    } else {
        $data = [
            'status' => 201,
            'message' => 'not processed',
        ];
        header("HTTP/1.0 201 Internal Server Error");
        return json_encode($data);
    }
}

function register($userInput)
{
    global $con;

    if (isset($userInput['email']) && isset($userInput['password'])) {
        $user_id = 'USER - ' . date('Y-d') . substr(uniqid(), -5);
        $email = $userInput['email'];
        $password = $userInput['password'];
        $username = $userInput['username'];
        $firstname = $userInput['firstName'];
        $lastname = $userInput['lastName'];

        $hashed = md5($password);

        if (empty(trim($email))) {
            return error422('Email is required');
        } else if (empty(trim($password))) {
            return error422('Password is required');
        } else if (empty(trim($username))) {
            return error422('Username is required');
        } else if (empty(trim($firstname))) {
            return error422('First name is required');
        } else if (empty(trim($lastname))) {
            return error422('Last name is required');
        } else {
            mysqli_begin_transaction($con);
            $verification_code = substr(number_format(time() * rand(), 0, '', ''), 0, 6);
            $verification_expiry = time() + 600;

            $query = "INSERT INTO user_tbl (user_id, email, password, username, first_name, last_name, role, verification_expiry, verification_code, created_at) VALUES (?, ?, ?, ?, ?, ?, 'user', ?, ?, NOW())";
            $stmt = $con->prepare($query);
            $stmt->bind_param('ssssssii', $user_id, $email, $hashed, $username, $firstname, $lastname, $verification_expiry, $verification_code);
            $result = $stmt->execute();
            $stmt->close();

            if ($result) {
                $emailSent = sendMail($verification_code, $email);

                if (!$emailSent) {
                    return json_encode([
                        'status' => 500,
                        'message' => 'Error sending email. Please try again.'
                    ]);
                } else {
                    mysqli_commit($con);
                    return json_encode([
                        'status' => 200,
                        'message' => 'User registered successfully. Please check your email for verification code.'
                    ]);
                }
            } else {
                mysqli_rollback($con);
                $data = [
                    'status' => 422,
                    'message' => 'Unprocessable entity',
                ];
                header("HTTP/1.0 422 Unprocessable Entity");
                return json_encode($data);
            }
        }
    } else {
        return error422('Email and Password are required');
    }
}

function accountVerify($userInput)
{
    global $con;

    if (isset($userInput['verification_code'])) {
        $verification_code = $userInput['verification_code'];

        if (empty(trim($verification_code))) {
            return error422('Verification code is required');
        } else {

            $query = "SELECT email, verification_expiry FROM user_tbl WHERE verification_code = ?";
            $stmt = $con->prepare($query);
            $stmt->bind_param('i', $verification_code);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result && $result->num_rows == 1) {
                $res = $result->fetch_assoc();
                $email = $res['email'];
                $verification_expiry = $res['verification_expiry'];

                if (time() > $verification_expiry) {
                    $newCode = substr(number_format(time() * rand(), 0, '', ''), 0, 6);
                    $newExpiry = time() + 600;

                    $query2 = "UPDATE user_tbl SET verification_code = ?, verification_expiry = ? WHERE email = ?";
                    $stmt2 = $con->prepare($query2);
                    $stmt2->bind_param('iis', $newCode, $newExpiry, $email);
                    $result2 = $stmt2->execute();
                    $stmt2->close();

                    sendMail($newCode, $email);

                    if ($result2) {
                        $data = [
                            'status' => 401,
                            'message' => 'Verification code expired, new code sent to email',
                        ];
                        header("HTTP/1.0 401 Unauthorized");
                        return json_encode($data);
                    } else {
                        $data = [
                            'status' => 500,
                            'message' => 'Internal Server Error',
                        ];
                        header("HTTP/1.0 500 Internal Server Error");
                        return json_encode($data);
                    }
                } else {
                    $query3 = "UPDATE user_tbl SET verified_at = NOW(), verification_code = NULL, verification_expiry = NULL WHERE verification_code = ?";
                    $stmt3 = $con->prepare($query3);
                    $stmt3->bind_param('i', $verification_code);
                    $result3 = $stmt3->execute();
                    $stmt3->close();

                    if ($result3) {
                        $data = [
                            'status' => 200,
                            'message' => 'Account verified successfully',
                        ];
                        header("HTTP/1.0 200 OK");
                        return json_encode($data);
                    } else {
                        $data = [
                            'status' => 500,
                            'message' => 'Internal Server Error',
                        ];
                        header("HTTP/1.0 500 Internal Server Error");
                        return json_encode($data);
                    }
                }
            } else {
                return error422('Invalid verification code');
            }
        }
    } else {
        return error422('Verification code is required');
    }
}

function login($userInput)
{
    global $con;
    $secret_key = "cutiesiserrano";

    if (isset($userInput['email']) && isset($userInput['password'])) {

        $email = $userInput['email'];
        $password = $userInput['password'];

        $hashed = md5($password);

        if (empty(trim($email))) {
            return error422('Email is required');
        } else if (empty(trim($password))) {
            return error422('Password is required');
        } else {
            $query = "SELECT user_id, verified_at, role FROM user_tbl WHERE email = ? AND password = ? AND role = 'user'";
            $stmt = $con->prepare($query);
            $stmt->bind_param('ss', $email, $hashed);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result) {
                if ($result->num_rows == 1) {
                    $res = $result->fetch_assoc();
                    if ($res['verified_at'] != null) {
                        $user_id = $res['user_id'];
                        $role = $res['role'];
                        $issuedAt = time();
                        $expirationTime = $issuedAt + (24 * 60 * 60);

                        $payload = [
                            'iss' => 'localhost',
                            'iat' => $issuedAt,
                            'exp' => $expirationTime,
                            'user_id' => $user_id,
                            'role' => $role
                        ];

                        $jwt = JWT::encode($payload, $secret_key, 'HS256');
                        setcookie('logged_user', $jwt, [
                            'expires' => $expirationTime,
                            'path' => '/',
                            'httpOnly' => true,
                            'secure' => true,
                            'samesite' => 'Strict'
                        ]);

                        $data = [
                            'status' => 200,
                            'message' => 'Login Successful',
                            'token' => $jwt
                        ];
                        header("HTTP/1.0 200 OK");
                        return json_encode($data);
                        //dito
                    } else {
                        $data = [
                            'status' => 201,
                            'message' => 'unverified',
                        ];
                        header("HTTP/1.0 201 Unauthorized");
                        return json_encode($data);
                    }
                } else {
                    $data = [
                        'status' => 404,
                        'message' => 'Invalid Email or Password',
                    ];
                    header("HTTP/1.0 401 Unauthorized");
                    return json_encode($data);
                }
            } else {
                $data = [
                    'status' => 500,
                    'message' => 'Internal Server Error',
                ];
                header("HTTP/1.0 500 Internal Server Error");
                return json_encode($data);
            }
        }
    }
}

function continueAsGuest()
{
    global $secret_key;

    $user_id = 'GUEST - ' . date('Y-d') . substr(uniqid(), -5);
    $role = 'guest';
    $issuedAt = time();
    $expirationTime = $issuedAt + (24 * 60 * 60);

    $payload = [
        'iss' => 'localhost',
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'user_id' => $user_id,
        'role' => $role
    ];
    $jwt = JWT::encode($payload, $secret_key, 'HS256');
    setcookie('logged_user', $jwt, [
        'expires' => $expirationTime,
        'path' => '/',
        'httpOnly' => true,
        'secure' => true,
        'samesite' => 'Strict'
    ]);
    $data = [
        'status' => 200,
        'message' => 'Continue as guest',
        'token' => $jwt
    ];
    header("HTTP/1.0 200 OK");
    return json_encode($data);
}

function postContent($userInputRaw, $user_id, $imageUrlRaw)
{
    global $con;

    $userInput = json_decode($userInputRaw['postContent'], true);
    $imageUrl = json_decode($imageUrlRaw, true);

    $post_id = 'POST - ' . date('Y-d') . substr(uniqid(), -5);
    $title = $userInput['title'];
    $content = $userInput['content'];
    $type = $userInput['type'];
    $genreLoop = $userInput['genre'];


    if (empty(trim($title))) {
        return error422('Title is required');
    } else if (empty(trim($content))) {
        return error422('Content is required');
    } else {
        $nlpResult = json_decode((nlpRead($content)), true);
        $sentiment = trim(strtolower($nlpResult['message']));
        mysqli_begin_transaction($con);

        try {
            if ($sentiment == 'positive' || $sentiment == 'neutral') {
                $query = "INSERT INTO posts_tbl (post_id, user_id, title, content, status, analysis_score, published_at, created_at, image) VALUES (?, ?, ?, ?, 'posted', ?, NOW(), NOW(), ?)";
                $stmt = $con->prepare($query);
                $stmt->bind_param('ssssss', $post_id, $user_id, $title, $content, $sentiment, $imageUrl);
                $result = $stmt->execute();
                $stmt->close();

                if ($result) {
                    try {
                        $insertedgp = 0;
                        foreach ($genreLoop as $genre) {
                            $gp_id = 'GP - ' . date('Y-d') . substr(uniqid(), -5);
                            $tag_id = $genre['genre_id'];
                            $query5 = "INSERT INTO genre_post_tbl (gp_id, post_id, tag_id, category_id) VALUES (?, ?, ?, ?)";
                            $stmt5 = $con->prepare($query5);
                            $stmt5->bind_param('ssss', $gp_id, $post_id, $tag_id, $type);
                            $result5 = $stmt5->execute();
                            $stmt5->close();

                            if ($result5) {
                                $insertedgp++;
                            } else {
                                throw new Exception('Failed to insert item');
                            }
                        }
                        mysqli_commit($con);
                        if ($insertedgp == count($genreLoop)) {
                            $data = [
                                'status' => 200,
                                'message' => 'Posted',
                                'sentiment' => $sentiment,
                                'genre_inserted' => $insertedgp
                            ];
                            header("HTTP/1.0 200 OK");
                            return json_encode($data);
                        } else {
                            $data = [
                                'status' => 500,
                                'message' => 'Internal Server Error'
                            ];
                            header("HTTP/1.0 500 Internal Server Error");
                            return json_encode($data);
                        }
                    } catch (Exception $e) {
                        throw new Exception('Failed to insert item');
                    }
                } else {
                    $data = [
                        'status' => 500,
                        'message' => 'Internal Server Error'
                    ];
                    header("HTTP/1.0 500 Internal Server Error");
                    return json_encode($data);
                }
            } else {
                $query1 = "INSERT INTO posts_tbl (post_id, user_id, title, content, status, analysis_score, created_at) VALUES (?, ?, ?, ?, 'for_review', ?, NOW())";
                $stmt1 = $con->prepare($query1);
                $stmt1->bind_param('sssss', $post_id, $user_id, $title, $content, $sentiment);
                $result1 = $stmt1->execute();
                $stmt1->close();

                if ($result1) {
                    try {
                        $insertedgp = 0;
                        foreach ($genreLoop as $genre) {
                            $gp_id = 'GP - ' . date('Y-d') . substr(uniqid(), -5);
                            $tag_id = $genre['genre_id'];
                            $query5 = "INSERT INTO genre_post_tbl (gp_id, post_id, tag_id, category_id) VALUES (?, ?, ?, ?)";
                            $stmt5 = $con->prepare($query5);
                            $stmt5->bind_param('ssss', $gp_id, $post_id, $tag_id, $type);
                            $result5 = $stmt5->execute();
                            $stmt5->close();

                            if ($result5) {
                                $insertedgp++;
                            } else {
                                throw new Exception('Failed to insert item');
                            }
                        }
                        mysqli_commit($con);
                        if ($insertedgp == count($genreLoop)) {
                            $data = [
                                'status' => 422,
                                'message' => 'Flagged',
                                'sentiment' => $sentiment,
                                'genre_inserted' => $insertedgp
                            ];
                            header("HTTP/1.0 422 unprocessable entity");
                            return json_encode($data);
                        } else {
                            $data = [
                                'status' => 500,
                                'message' => 'Internal Server Error'
                            ];
                            header("HTTP/1.0 500 Internal Server Error");
                            return json_encode($data);
                        }
                    } catch (Exception $e) {
                        throw new Exception('Failed to insert item');
                    }
                } else {
                    $data = [
                        'status' => 500,
                        'message' => 'Internal Server Error'
                    ];
                    header("HTTP/1.0 500 Internal Server Error");
                    return json_encode($data);
                }
            }
        } catch (Exception $e) {
            mysqli_rollback($con);
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error'
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function insertComment($data, $userId)
{
    global $con;

    $comment_id = 'COMMENT- ' . date('Y-d') . substr(uniqid(), -5);
    $content = $data['myComment'];
    $post_id = $data['post_id']; //THIS

    if (empty(trim($content))) {
        $data = [
            'status' => 400,
            'message' => 'Comment cannot be empty'
        ];
        return json_encode($data);
    } else {
        $query = "INSERT INTO comments_tbl (user_id, comment_id, content, post_id, created_at) VALUES (?, ?, ?, ?, NOW())";
        $stmt = $con->prepare($query);
        $stmt->bind_param('ssss', $userId, $comment_id, $content, $post_id); //here
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 201,
                'message' => 'Comment created successfully'
            ];
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'An error occurred'
            ];
            return json_encode($data);
        }
    }
}

function readContent($post_id)
{
    global $con;

    $id = $post_id['post_id'];

    $query = "SELECT 
                posts_tbl.title,
                posts_tbl.post_id,
                user_tbl.username, 
                posts_tbl.content,
                category_id.category_id AS type,
                GROUP_CONCAT(genre_tbl.tag_id SEPARATOR ', ') AS genre
              FROM genre_post_tbl
              INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
              INNER JOIN user_tbl ON posts_tbl.user_id = user_tbl.user_id
              INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id
              INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
            WHERE posts_tbl.post_id = ? AND posts_tbl.status = 'posted'";

    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $genre_ids = explode(', ', $row['genre']);
        $row['genre'] = array_map(function ($genre_id) {
            return ['genre_id' => $genre_id];
        }, $genre_ids);

        unset($row['genre_ids']);


        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
            'data' => $row
        ];
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        return json_encode($data);
    }
}

function readComment($data)
{
    global $con;

    $query = "SELECT u.username, c.created_at, c.content 
              FROM comments_tbl c
            INNER JOIN user_tbl u ON c.user_id = u.user_id
            WHERE post_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $data['post_id']);
    $stmt->execute();
    $result = $stmt->get_result();

    // $result = $con->query($query);

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Comment retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No comments found'
        ];
        return json_encode($data);
    }
}

function Bookmark($post_id, $user_id)
{
    global $con;

    $bookmark_id = 'BOOKMARK- ' . date('Y-d') . substr(uniqid(), -5);


    // Check if the post is already bookmarked by the same user
    $checkQuery = "SELECT * FROM bookmarks_tbl WHERE user_id = ? AND post_id = ?";
    $checkStmt = $con->prepare($checkQuery);
    $checkStmt->bind_param('ss', $user_id, $post_id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();

    if ($checkResult->num_rows > 0) {
        $data = [
            'status' => 409,
            'message' => 'Post already bookmarked'
        ];
        return json_encode($data);
    } else {
        $query = "INSERT INTO bookmarks_tbl (bookmark_id, user_id, post_id, created_at) VALUES (?, ?, ?, NOW())";
        $stmt = $con->prepare($query);
        $stmt->bind_param('sss', $bookmark_id, $user_id, $post_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 201,
                'message' => 'Post bookmarked successfully'
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'An error occurred'
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function report_post($post_id, $reason, $user_id)
{
    global $con;

    $report_id = 'REPORT- ' . date('Y-d') . substr(uniqid(), -5);

    $query = "INSERT INTO reports_tbl (report_id, post_id, reason, status, created_at, user_id) VALUES (?, ?, ?, 'REPORTED', NOW(), ?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param('ssss', $report_id, $post_id, $reason, $user_id);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        $data = [
            'status' => 201,
            'message' => 'Post reported successfully'
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 500,
            'message' => 'An error occurred'
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}


function updateContent($userInputRaw, $user_id, $imageUrlRaw)
{
    global $con;

    $userInput = json_decode($userInputRaw['postContent'], true);
    $imageUrl = json_decode($imageUrlRaw, true);

    $post_id = $userInput['post_id'];
    $title = $userInput['title'];
    $content = $userInput['content'];
    $type = $userInput['type'];
    $genreLoop = $userInput['genre'];

    if (empty(trim($title))) {
        return error422('Title is required');
    } else if (empty(trim($content))) {
        return error422('Content is required');
    } else {
        $getGPID = "SELECT gp_id FROM genre_post_tbl WHERE post_id = ?";
        $stmtgp = $con->prepare($getGPID);
        $stmtgp->bind_param('s', $post_id);
        $stmtgp->execute();
        $resultgp = $stmtgp->get_result();
        $stmtgp->close();

        if ($resultgp->num_rows > 0) {
            $gpALL = $resultgp->fetch_all(MYSQLI_ASSOC);
            $gp_id = array_map(function ($gp) {
                return $gp['gp_id'];
            }, $gpALL);

            $nlpResult = json_decode(nlpRead($content), true);
            $sentiment = trim(strtolower($nlpResult['message']));
            // $sentiment = 'positive';
            mysqli_begin_transaction($con);

            try {
                if ($sentiment == 'positive' || $sentiment == 'neutral') {
                    $query = "UPDATE posts_tbl SET title = ?, content = ?, status = 'posted', analysis_score = ?, updated_at = NOW(), image = ? WHERE post_id = ?";
                    $stmt = $con->prepare($query);
                    $stmt->bind_param('sssss', $title, $content, $sentiment, $imageUrl, $post_id);
                    $result = $stmt->execute();
                    $stmt->close();

                    if ($result) {
                        //dagdag to after: if equal yung dami ng nasa genre loop dun sa naretrieve na gp_id eto gagawin: 
                        // then pag mas marami e.g. sa update nag add si user ng another genre, another na naman na else if for that scenario
                        if ($genreLoop) {
                            try {
                                $insertedgp = 0;
                                foreach ($genreLoop as $genre) {
                                    $tag_id = $genre['genre_id'];
                                    $single_id = array_shift($gp_id);
                                    $query5 = "UPDATE genre_post_tbl SET category_id = ?, tag_id = ? WHERE gp_id = ? ";
                                    $stmt5 = $con->prepare($query5);
                                    $stmt5->bind_param('sss', $type, $tag_id, $single_id);
                                    $result5 = $stmt5->execute();
                                    $stmt5->close();

                                    if ($result5) {
                                        $insertedgp++;
                                    } else {
                                        throw new Exception('Failed to insert item');
                                    }
                                }
                                mysqli_commit($con);
                                if ($insertedgp == count($genreLoop)) {
                                    $data = [
                                        'status' => 200,
                                        'message' => 'Posted',
                                        'sentiment' => $sentiment,
                                        'genre_inserted' => $insertedgp
                                    ];
                                    header("HTTP/1.0 200 OK");
                                    return json_encode($data);
                                } else {
                                    $data = [
                                        'status' => 500,
                                        'message' => 'Internal Server Error'
                                    ];
                                    header("HTTP/1.0 500 Internal Server Error");
                                    return json_encode($data);
                                }
                            } catch (Exception $e) {
                                throw new Exception('Failed to insert item');
                            }
                        } else {
                            $data = [
                                'status' => 200,
                                'message' => 'Post updated successfully',
                                'sentiment' => $sentiment
                            ];
                            header("HTTP/1.0 200 OK");
                            return json_encode($data);
                        }
                    } else {
                        $data = [
                            'status' => 500,
                            'message' => 'Internal Server Error'
                        ];
                        header("HTTP/1.0 500 Internal Server Error");
                        return json_encode($data);
                    }
                } else {
                    $query1 = "UPDATE posts_tbl SET title = ?, content = ?, status = 'for_review', analysis_score = ?, updated_at = NOW(), image = ? WHERE post_id = ?";
                    $stmt1 = $con->prepare($query1);
                    $stmt1->bind_param('sssss', $title, $content, $sentiment, $imageUrl, $post_id);
                    $result1 = $stmt1->execute();
                    $stmt1->close();

                    if ($result1) {
                        if ($genreLoop) {
                            try {
                                $insertedgp = 0;
                                foreach ($genreLoop as $genre) {
                                    $tag_id = $genre['genre_id'];
                                    $single_id = array_shift($gp_id);
                                    $query5 = "UPDATE genre_post_tbl SET category_id = ?, tag_id = ? WHERE gp_id = ? ";
                                    $stmt5 = $con->prepare($query5);
                                    $stmt5->bind_param('sss', $type, $tag_id, $single_id);
                                    $result5 = $stmt5->execute();
                                    $stmt5->close();

                                    if ($result5) {
                                        $insertedgp++;
                                    } else {
                                        throw new Exception('Failed to insert item');
                                    }
                                }
                                mysqli_commit($con);
                                if ($insertedgp == count($genreLoop)) {
                                    $data = [
                                        'status' => 422,
                                        'message' => 'Flagged',
                                        'sentiment' => $sentiment,
                                        'genre_inserted' => $insertedgp
                                    ];
                                    header("HTTP/1.0 422 flagged");
                                    return json_encode($data);
                                } else {
                                    $data = [
                                        'status' => 500,
                                        'message' => 'Internal Server Error'
                                    ];
                                    header("HTTP/1.0 500 Internal Server Error");
                                    return json_encode($data);
                                }
                            } catch (Exception $e) {
                                throw new Exception('Failed to insert item');
                            }
                        } else {
                            $data = [
                                'status' => 422,
                                'message' => 'Flagged',
                                'sentiment' => $sentiment
                            ];
                            header("HTTP/1.0 200 OK");
                            return json_encode($data);
                        }
                    } else {
                        $data = [
                            'status' => 500,
                            'message' => 'Internal Server Error'
                        ];
                        header("HTTP/1.0 500 Internal Server Error");
                        return json_encode($data);
                    }
                }
            } catch (Exception $e) {
                mysqli_rollback($con);
                $data = [
                    'status' => 500,
                    'message' => 'Internal Server Error'
                ];
                header("HTTP/1.0 500 Internal Server Error");
                return json_encode($data);
            }
        } else {
            $data = [
                'status' => 404,
                'message' => 'No contents found'
            ];
            return json_encode($data);
        }
    }
}

function updateComment($userInput)
{
    global $con;

    $comment_id = $userInput['comment_id'];
    $content = $userInput['content'];


    if (empty(trim($comment_id))) {
        return error422('Post ID is required');
    } else if (empty(trim($content))) {
        return error422('Content is required');
    } else {
        $query = "UPDATE comments_tbl SET content = ?, updated_at = NOW() WHERE comment_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("ss", $content, $comment_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Comment updated successfully',
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function deleteContent($userInput, $userID)
{
    global $con;

    $post_id = $userInput['post_id'];

    if (empty(trim($post_id))) {
        return error422('Post ID is required');
    } else {
        $query = "DELETE FROM bookmarks_tbl WHERE post_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $post_id);
        $result = $stmt->execute();

        $query = "DELETE FROM comments_tbl WHERE post_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $post_id);
        $result = $stmt->execute();

        $query = "DELETE FROM genre_post_tbl WHERE post_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $post_id);
        $result = $stmt->execute();

        $query = "DELETE FROM reports_tbl WHERE post_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $post_id);
        $result = $stmt->execute();

        $query = "DELETE FROM posts_tbl WHERE post_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $post_id);
        $result = $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $data = [
                'status' => 200,
                'message' => 'Post deleted successfully',
            ];
            header("HTTP/1.0 200 OK");
            $stmt->close();
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            $stmt->close();
            return json_encode($data);
        }
    }
}

function deleteComment($userInput)
{
    global $con;

    $comment_id = $userInput['comment_id'];

    if (empty(trim($comment_id))) {
        return error422('Comment ID is required');
    } else {
        $query = "DELETE FROM comments_tbl WHERE comment_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $comment_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Comment deleted successfully',
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function deleteBookmark($userInput, $user_id)
{
    global $con;

    $post_id = $userInput['post_id'];

    if (empty(trim($post_id))) {
        return error422('Bookmark ID is required');
    } else {
        $query = "DELETE FROM bookmarks_tbl WHERE post_id = ? AND user_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("ss", $post_id, $user_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Bookmark deleted successfully',
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function singleReadProfile($user_id)
{

    global $con;

    $query = "SELECT user_id, username, first_name, last_name, email, password, bio FROM user_tbl WHERE user_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows == 1) {
        $res = $result->fetch_assoc();
        $data = [
            'status' => 200,
            'message' => 'Profile fetched successfully',
            'data' => $res
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function updateProfile($userInput, $user_id)
{
    global $con;

    $username = $userInput['username'];
    $first_name = $userInput['first_name'];
    $last_name = $userInput['last_name'];
    $email = $userInput['email'];
    $password = $userInput['password'];
    $bio = $userInput['bio'];

    if (empty(trim($username))) {
        return error422('User ID is required');
    } else if (empty(trim($first_name))) {
        return error422('First name is required');
    } else if (empty(trim($last_name))) {
        return error422('Last name is required');
    } else if (empty(trim($email))) {
        return error422('Email is required');
    } else if (empty(trim($password))) {
        return error422('Password is required');
    } else if (empty(trim($bio))) {
        return error422('Bio is required');
    } else {
        $query = "UPDATE user_tbl SET username = ?, first_name = ?, last_name = ?, email = ?, password = ?, bio = ?, updated_at = NOW() WHERE user_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("sssssss", $username, $first_name, $last_name, $email, $password, $bio, $user_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Profile updated successfully',
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function deleteProfile($userInput)
{
    global $con;

    $user_id = $userInput['user_id'];

    if (empty(trim($user_id))) {
        return error422('User ID is required');
    } else {
        $query = "DELETE FROM user_tbl WHERE user_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $user_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Profile deleted successfully',
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function readUserContent($user_id)
{
    global $con;

    $query = "SELECT 
            posts_tbl.post_id,
            posts_tbl.title,
            posts_tbl.image,
            posts_tbl.published_at,
            posts_tbl.user_id,
            COUNT(comments_tbl.post_id) AS total_comments, 
            COUNT(bookmarks_tbl.post_id) AS total_bookmarks 
            FROM posts_tbl 
            LEFT JOIN comments_tbl ON posts_tbl.post_id = comments_tbl.post_id
            LEFT JOIN bookmarks_tbl ON posts_tbl.post_id = bookmarks_tbl.post_id
            INNER JOIN user_tbl ON posts_tbl.user_id = user_tbl.user_id
            WHERE posts_tbl.user_id = ? AND posts_tbl.status != 'for_review' AND posts_tbl.status != 'rejected'
            GROUP BY posts_tbl.post_id";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readAllContent()
{
    global $con;

    $query = "SELECT user_tbl.username, posts_tbl.* FROM posts_tbl INNER JOIN user_tbl ON posts_tbl.user_id = user_tbl.user_id WHERE published_at IS NOT NULL AND status = 'posted'";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Contents retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        return json_encode($data);
    }
}

function readGenre()
{
    global $con;

    $query = "SELECT tag_id AS id, name FROM genre_tbl";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Genres retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No genres found'
        ];
        return json_encode($data);
    }
}

function readType()
{
    global $con;

    $query = "SELECT category_id AS id, name FROM category_id";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Genres retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No genres found'
        ];
        return json_encode($data);
    }
}

function imageUpload($userImage)
{
    global $filepath, $bucketName;


    $file = $userImage['file'] ?? [
        'tmp_name' => __DIR__ . '/create/witwiw.png',
        'name' => 'witwiw.png'
    ];;
    $storage = new StorageClient((['keyFilePath' => $filepath]));
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
    $url = "https://storage.googleapis.com/$bucketName/$fileName";

    return json_encode($url, JSON_UNESCAPED_SLASHES);
}

function readAllBookmark($user_id)
{
    global $con;

    $query = "SELECT
        bookmarks_tbl.bookmark_id,
        posts_tbl.*,
        user_tbl.username
            FROM 
        bookmarks_tbl 
        	INNER JOIN posts_tbl ON bookmarks_tbl.post_id = posts_tbl.post_id
            INNER JOIN user_tbl ON posts_tbl.user_id = user_tbl.user_id 
            WHERE bookmarks_tbl.user_id = ? AND posts_tbl.published_at IS NOT NULL AND posts_tbl.status = 'posted'";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Contents retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readIfBookmarked($post_id)
{
    global $con;

    $userPost = $post_id['post_id'];
    $user_id = $post_id['user_id'];

    if (empty(trim($userPost))) {
        return error422('Post ID is required');
    } else {
        $query = "SELECT * FROM bookmarks_tbl WHERE post_id = ? AND user_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $userPost, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result && $result->num_rows == 1) {
            $data = [
                'status' => 200,
                'message' => 'Post is bookmarked',
                'data' => true
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 201,
                'message' => 'Post is not bookmarked',
                'data' => false
            ];
            header("HTTP/1.0 201 No Bookmark");
            return json_encode($data);
        }
    }
}

function readYourTotalPosts($user_id)
{
    global $con;

    $query = "SELECT 
    DATE_FORMAT(created_at, '%M %Y') AS Month, 
    COUNT(*) AS Posts
FROM 
    posts_tbl
WHERE 
    user_id = ?
GROUP BY 
    DATE_FORMAT(created_at, '%Y-%m') 
ORDER BY 
    DATE_FORMAT(created_at, '%Y-%m') ASC;";

    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readYourPostsTotalComment($user_id)
{
    global $con;

    $query = "SELECT 
                posts_tbl.title, 
                COUNT(comments_tbl.comment_id) AS TotalComments
                FROM 
                    comments_tbl
                LEFT JOIN 
                    posts_tbl ON comments_tbl.post_id = posts_tbl.post_id
                WHERE 
                    comments_tbl.user_id = ?
                GROUP BY 
                    posts_tbl.post_id;";

    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readYourPostsTotalBookmarks($user_id)
{
    global $con;

    $query = "SELECT 
                    posts_tbl.title, 
                    COUNT(bookmarks_tbl.bookmark_id) AS total_bookmarks
                FROM 
                    bookmarks_tbl
                LEFT JOIN 
                    posts_tbl ON bookmarks_tbl.post_id = posts_tbl.post_id
                WHERE 
                    bookmarks_tbl.user_id = ?
                GROUP BY 
                    posts_tbl.post_id;";

    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No contents found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalPosts()
{
    global $con;

    $query = "SELECT COUNT(*) AS Total_Posts FROM posts_tbl WHERE posts_tbl.status = 'posted';";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Posts retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Posts found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readPosts()
{

    global $con;
    $query = "SELECT 
        posts_tbl.post_id,
        posts_tbl.user_id,
        posts_tbl.title,
        posts_tbl.content,
        posts_tbl.status,
        posts_tbl.published_at,
        posts_tbl.created_at
    FROM
        posts_tbl
    WHERE status = 'posted'";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Posts retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Posts found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalUsers()
{
    global $con;

    $query = "SELECT COUNT(*) AS Total_Users FROM user_tbl WHERE user_tbl.role = 'user';";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Users retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Users found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalComments()
{
    global $con;

    $query = "SELECT COUNT(*) AS Total_Comments FROM comments_tbl";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Comments retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Comments found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readReports()
{

    global $con;
    $query = "SELECT * FROM reports_tbl";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'reports retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)

        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Comments found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readPostsIncrease()
{
    global $con;

    $query = "SELECT COUNT(*) AS Today_Posts
                FROM posts_tbl
                WHERE DATE(created_at) = CURDATE() AND status = 'posted';";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Post Increase retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Posts found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readCommentsIncrease()
{
    global $con;

    $query = "SELECT COUNT(*) AS Today_Comments
                FROM comments_tbl
                WHERE DATE(created_at) = CURDATE();";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Comments Increase retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Posts found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readAdmin()
{

    global $con;
    $query = "SELECT * FROM user_tbl WHERE role ='admin'";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'admin list retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)

        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No admins found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readUsersIncrease()
{
    global $con;

    $query = "SELECT COUNT(*) AS Today_Users
                FROM user_tbl
                WHERE role = 'user' AND DATE(created_at) = CURDATE();";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of User Increase retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Users found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalPostsGraph()
{
    global $con;

    $query = "SELECT 
                    DATE_FORMAT(created_at, '%Y-%m-%d') AS Day, 
                    COUNT(*) AS Posts
                FROM 
                    posts_tbl
                WHERE 
                    status = 'posted' 
                    AND MONTH(created_at) = MONTH(CURRENT_DATE) 
                    AND YEAR(created_at) = YEAR(CURRENT_DATE)    
                GROUP BY 
                    DATE_FORMAT(created_at, '%Y-%m-%d')  
                ORDER BY 
                    DATE_FORMAT(created_at, '%Y-%m-%d') ASC;";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Post Per day of the Month retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Posts found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readUser()
{

    global $con;
    $query = "SELECT * FROM user_tbl WHERE role = 'user'";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'users retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC),

        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Posts found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalCommentsGraph()
{
    global $con;

    $query = "SELECT 
                    DATE_FORMAT(created_at, '%Y-%m-%d') AS Day, 
                    COUNT(*) AS Comments
                FROM 
                    comments_tbl
                WHERE 
					MONTH(created_at) = MONTH(CURRENT_DATE) 
                    AND YEAR(created_at) = YEAR(CURRENT_DATE)    
                GROUP BY 
                    DATE_FORMAT(created_at, '%Y-%m-%d')  
                ORDER BY 
                    DATE_FORMAT(created_at, '%Y-%m-%d') ASC;";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Comments Per day of the Month retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Comments found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalBookmarksGraph()
{
    global $con;

    $query = "SELECT 
                    DATE_FORMAT(created_at, '%Y-%m-%d') AS Day, 
                    COUNT(*) AS Bookmarks
                FROM 
                    bookmarks_tbl
                WHERE 
					MONTH(created_at) = MONTH(CURRENT_DATE) 
                    AND YEAR(created_at) = YEAR(CURRENT_DATE)    
                GROUP BY 
                    DATE_FORMAT(created_at, '%Y-%m-%d')  
                ORDER BY 
                    DATE_FORMAT(created_at, '%Y-%m-%d') ASC;";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();


    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Bookmarks Per day of the Month retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Bookmarks found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readSingleUser($user_input)
{
    global $con;
    $user_id = $user_input['user_id'];
    $query = "SELECT * FROM user_tbl WHERE user_id = ? AND role ='user'";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'single user retrieved successfully',
            'data' => $result->fetch_assoc()
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Bookmarks found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalGenrePerPostGraph()
{
    global $con;

    $query = "SELECT genre_tbl.name AS genre, 
                    COUNT(posts_tbl.post_id) as genre_total_post
                FROM genre_post_tbl
                INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
                INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
                GROUP BY genre_tbl.name ";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Genre Per Post retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Genre found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readTotalCategoryPerPostGraph()
{
    global $con;

    $query = "SELECT category_id.name AS category, 
                    COUNT(posts_tbl.post_id) as category_total_post
                FROM genre_post_tbl
                INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id
                INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
                GROUP BY category_id.name;";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Genre Per Post retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Genre found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readSingleAdmin($user_input)
{
    global $con;
    $user_id = $user_input['user_id'];
    $query = "SELECT * FROM user_tbl WHERE user_id = ? AND role ='admin'";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result) {

        if ($result->num_rows == 1) {

            $res = $result->fetch_assoc();

            $data = [
                'status' => 200,
                'message' => 'User List Fetched Successfully',
                'data' => $res
            ];
            header('HTTP/1.0 200 OK');
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No User Found',
            ];
            header('HTTP/1.0 404 No User Found');
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header('HTTP/1.0 500 Internal Server Error');
        return json_encode($data);
    }
}

function readTotalLoggedVsGuestUser()
{
    global $con;

    $query = "SELECT 
                role,
                COUNT(*) AS total_count
                FROM user_tbl
                WHERE role IN ('user', 'guest')
                GROUP BY role;";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Logged VS Guest User retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No User found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readSinglePost($user_input)
{
    global $con;
    $post_id = $user_input['post_id'];
    $query = "SELECT 
        posts_tbl.post_id,
        posts_tbl.user_id,
        posts_tbl.title,
        posts_tbl.content,
        GROUP_CONCAT(genre_tbl.tag_id SEPARATOR ', ') AS genre,
        category_id.category_id AS category,
        posts_tbl.status,
        posts_tbl.published_at,
        posts_tbl.created_at
    FROM 
        genre_post_tbl
    INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
    INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
    INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id
    WHERE genre_post_tbl.post_id = ? AND posts_tbl.status = 'posted'";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $post_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();


    if ($result->num_rows == 1) {

        $res = $result->fetch_assoc();

        if ($res['post_id'] == null) {
            $data = [
                'status' => 404,
                'message' => 'No Post Found',
            ];
            header('HTTP/1.0 404 No User Found');
            return json_encode($data);
        } else {
            $genre_ids = explode(', ', $res['genre']);
            $res['genre'] = array_map(function ($genre_id) {
                return ['genre_id' => $genre_id];
            }, $genre_ids);

            unset($res['genre_ids']);


            $data = [
                'status' => 200,
                'message' => 'Posts List Fetched Successfully',
                'data' => $res
            ];
            header('HTTP/1.0 200 OK');
            return json_encode($data);
        }
    }
}

function readTotalReviewDistribution()
{
    global $con;

    $query = "SELECT 
                status,
                COUNT(*) AS total_count
                FROM review_tbl
                WHERE status IN ('for_review', 'posted', 'reviewing', 'rejected')
                GROUP BY status;";
    $stmt = $con->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Total Count of Review Status retrieved successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Review found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

function readSingleReport($user_input)
{
    global $con;
    $report_id = $user_input['report_id'];
    $query = "SELECT
    	reports_tbl.report_id,
    	reports_tbl.user_id,
        user_tbl.username,
    	reports_tbl.post_id,
        posts_tbl.title,
        posts_tbl.content,
    	reports_tbl.reason,
    	reports_tbl.status,
    	reports_tbl.created_at
    FROM reports_tbl
    INNER JOIN posts_tbl ON reports_tbl.post_id = posts_tbl.post_id
    INNER JOIN user_tbl ON reports_tbl.user_id = user_tbl.user_id
    WHERE reports_tbl.report_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $report_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result) {

        if ($result->num_rows == 1) {

            $res = $result->fetch_assoc();

            $data = [
                'status' => 200,
                'message' => 'Reports List Fetched Successfully',
                'data' => $res
            ];
            header('HTTP/1.0 200 OK');
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Report Found',
            ];
            header('HTTP/1.0 404 No User Found');
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header('HTTP/1.0 500 Internal Server Error');
        return json_encode($data);
    }
}

function addAdmin($userInput)
{
    global $con;

    if (isset($userInput['email']) && isset($userInput['password'])) {
        $user_id = 'USER - ' . date('Y-d') . substr(uniqid(), -5);
        $email = $userInput['email'];
        $password = $userInput['password'];
        $firstname = $userInput['first_name'];
        $lastname = $userInput['last_name'];

        $hashed = md5($password);

        if (empty(trim($email))) {
            return error422('Email is required');
        } else if (empty(trim($password))) {
            return error422('Password is required');
        } else if (empty(trim($firstname))) {
            return error422('First name is required');
        } else if (empty(trim($lastname))) {
            return error422('Last name is required');
        } else {

            $query = "INSERT INTO user_tbl (user_id, email, password, first_name, last_name, role, created_at) VALUES (?, ?, ?, ?, ?, 'admin', NOW())";
            $stmt = $con->prepare($query);
            $stmt->bind_param('sssss', $user_id, $email, $hashed, $firstname, $lastname);
            $result = $stmt->execute();
            $stmt->close();

            if ($result) {
                $data = [
                    'status' => 201,
                    'message' => 'Admin Inserted Successfully',
                ];
                header("HTTP/1.0 201 OK");
                return json_encode($data);
            } else {
                $data = [
                    "status" => 500,
                    "message" => "Internal Server Error",
                ];
                header("HTTP/1.0 500 Internal Server Error");
                return json_encode($data);
            }
        }
    } else {
        return error422('Email and Password are required');
    }
}

function updateAdmin($userInput)
{
    global $con;

    $user_id = $userInput['user_id'];
    $first_name = $userInput['first_name'];
    $last_name = $userInput['last_name'];
    $email = $userInput['email'];
    $password = $userInput['password'];

    $hashed = md5($password);

    if (empty(trim($first_name))) {
        return error422('First name is required');
    } else if (empty(trim($last_name))) {
        return error422('Last name is required');
    } else if (empty(trim($email))) {
        return error422('Email is required');
    } else if (empty(trim($password))) {
        return error422('Password is required');
    } else {
        $query = "UPDATE user_tbl SET first_name = ?, last_name = ?, email = ?, password = ?, updated_at = NOW() WHERE user_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("sssss", $first_name, $last_name, $email, $hashed, $user_id);
        $stmt->execute();


        if ($stmt->affected_rows > 0) {
            $data = [
                'status' => 200,
                'message' => 'Admin Profile updated successfully',
            ];
            header("HTTP/1.0 200 OK");
            $stmt->close();
            return json_encode($data);
        } else if ($stmt->affected_rows == 0) {
            $data = [
                'status' => 404,
                'message' => 'no Admin found',
            ];
            header("HTTP/1.0 404 no such admin found");
            $stmt->close();
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            $stmt->close();
            return json_encode($data);
        }
    }
}

function updateUser($userInput)
{
    global $con;

    $user_id = $userInput['user_id'];
    $username = $userInput['username'];
    $first_name = $userInput['first_name'];
    $last_name = $userInput['last_name'];
    $email = $userInput['email'];
    $password = $userInput['password'];
    $bio = $userInput['bio'];

    $hashed = md5($password);

    if (empty(trim($username))) {
        return error422('Username is required');
    } else if (empty(trim($first_name))) {
        return error422('First name is required');
    } else if (empty(trim($last_name))) {
        return error422('Last name is required');
    } else if (empty(trim($email))) {
        return error422('Email is required');
    } else if (empty(trim($password))) {
        return error422('Password is required');
    } else if (empty(trim($bio))) {
        return error422('Bio is required');
    } else {
        $query = "UPDATE user_tbl SET username = ?, first_name = ?, last_name = ?, email = ?, password = ?, bio = ?, updated_at = NOW() WHERE user_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("sssssss", $username, $first_name, $last_name, $email, $hashed, $bio, $user_id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $data = [
                'status' => 200,
                'message' => 'User Profile updated successfully',
            ];
            header("HTTP/1.0 200 OK");
            $stmt->close();
            return json_encode($data);
        } else if ($stmt->affected_rows == 0) {
            $data = [
                'status' => 404,
                'message' => 'no user found',
            ];
            header("HTTP/1.0 404 no such user found");
            $stmt->close();
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            $stmt->close();
            return json_encode($data);
        }
    }
}

function updateReport($userInput)
{
    global $con;

    $report_id = $userInput['report_id'];
    $status = $userInput['status'];

    if (empty(trim($status))) {
        return error422('Status is required');
    } else {
        $query = "UPDATE reports_tbl SET status = ?, updated_at = NOW() WHERE report_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("ss", $status, $report_id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $data = [
                'status' => 200,
                'message' => 'Report updated successfully',
            ];
            header("HTTP/1.0 200 OK");
            $stmt->close();
            return json_encode($data);
        } else if ($stmt->affected_rows == 0) {
            $data = [
                'status' => 404,
                'message' => 'no report found',
            ];
            header("HTTP/1.0 404 no such report found");
            $stmt->close();
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            $stmt->close();
            return json_encode($data);
        }
    }
}

function getFilter($userInput)
{
    global $con;

    $genre = $userInput['genre'] ?? null;
    $postType = $userInput['type'] ?? null;
    $month = $userInput['month'] ?? null;
    $year = $userInput['year'] ?? null;
    $userId = $userInput['user_id'] ?? null;

    if ($userId == null) { //for bookmark manega
        $query = "SELECT posts_tbl.*, genre_tbl.name, category_id.name 
              FROM genre_post_tbl
              INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
              INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
              INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id";

        $conditions = [];
        $params = [];
        $types = '';


        $conditions[] = "posts_tbl.status = ?";
        $params[] = "posted";
        $types .= 's';

        if ($genre) {
            $conditions[] = "genre_tbl.tag_id = ?";
            $params[] = $genre;
            $types .= 's';  // 's' for string type
        }
        if ($postType) {
            $conditions[] = "category_id.category_id = ?";
            $params[] = $postType;
            $types .= 's';
        }
        if ($month) {
            $conditions[] = "MONTH(posts_tbl.published_at) = ?";
            $params[] = $month;
            $types .= 's';  // 'i' for integer type
        }
        if ($year) {
            $conditions[] = "YEAR(posts_tbl.published_at) = ?";
            $params[] = $year;
            $types .= 's';
        }


        if (count($conditions) > 0) {
            $query .= " WHERE " . implode(" AND ", $conditions);
            $stmt = $con->prepare($query);
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result->num_rows > 0) {
                $data = [
                    'status' => 200,
                    'message' => 'Content retrieved successfully',
                    'data' => $result->fetch_all(MYSQLI_ASSOC)
                ];
                header("HTTP/1.0 200 OK");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 201,
                    'message' => 'No contents found',
                    // 'data' => $result->fetch_all(MYSQLI_ASSOC)

                ];
                header("HTTP/1.0 201 Not Found");
                return json_encode($data);
            }
        } else {
            $data = [
                'status' => 422,
                'message' => 'Invalid input'
            ];
            header("HTTP/1.0 422 Unprocessable Entity");
            return json_encode($data);
        }
    } else { //for bookmark manega 
        $query = "SELECT posts_tbl.*, genre_tbl.name, category_id.name, bookmarks_tbl.bookmark_id
              FROM genre_post_tbl
              INNER JOIN bookmarks_tbl ON genre_post_tbl.post_id = bookmarks_tbl.post_id
              INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
              INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
              INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id";

        $conditions = [];
        $params = [];
        $types = '';


        $conditions[] = "bookmarks_tbl.user_id = ?";
        $params[] = $userId; // Set $userId to the appropriate value
        $types .= 's';


        $conditions[] = "posts_tbl.status = ?";
        $params[] = "posted"; // Set $userId to the appropriate value
        $types .= 's';
        if ($genre) {
            $conditions[] = "genre_tbl.tag_id = ?";
            $params[] = $genre;
            $types .= 's';  // 's' for string type
        }
        if ($postType) {
            $conditions[] = "category_id.category_id = ?";
            $params[] = $postType;
            $types .= 's';
        }
        if ($month) {
            $conditions[] = "MONTH(posts_tbl.published_at) = ?";
            $params[] = $month;
            $types .= 's';  // 'i' for integer type
        }
        if ($year) {
            $conditions[] = "YEAR(posts_tbl.published_at) = ?";
            $params[] = $year;
            $types .= 's';
        }


        if (count($conditions) > 0) {
            $query .= " WHERE " . implode(" AND ", $conditions);
            $stmt = $con->prepare($query);
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result->num_rows > 0) {
                $data = [
                    'status' => 200,
                    'message' => 'Content retrieved successfully',
                    'data' => $result->fetch_all(MYSQLI_ASSOC)
                ];
                header("HTTP/1.0 200 OK");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 201,
                    'message' => 'No contents found',
                    // 'data' => $result->fetch_all(MYSQLI_ASSOC)
                ];
                header("HTTP/1.0 201 Not Found");
                return json_encode($data);
            }
        } else {
            $data = [
                'status' => 422,
                'message' => 'Invalid input'
            ];
            header("HTTP/1.0 422 Unprocessable Entity");
            return json_encode($data);
        }
    }
}

function searchBar($userInput)
{

    global $con;

    $search = $userInput['search'];
    $userId = $userInput['user_id'] ?? null;

    if ($userId == null) {
        if ($search) {
            $query = "SELECT posts_tbl.*, GROUP_CONCAT(genre_tbl.name SEPARATOR ', ') AS genre,
                GROUP_CONCAT(genre_tbl.tag_id SEPARATOR ', ') AS genre_id, category_id.name
              FROM genre_post_tbl
              INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
              INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
              INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id
              WHERE posts_tbl.title LIKE ? AND posts_tbl.status = 'posted'
              GROUP BY posts_tbl.post_id";

            $likeQuery = "%" . $search . "%";
            $stmt = $con->prepare($query);
            $stmt->bind_param("s", $likeQuery);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result->num_rows > 0) {
                $data = [
                    'status' => 200,
                    'message' => 'Content retrieved successfully Archive or YNGWIE',
                    'data' => $result->fetch_all(MYSQLI_ASSOC)
                ];
                header("HTTP/1.0 200 OK");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 404,
                    'message' => 'No contents found'
                ];
                header("HTTP/1.0 404 Not Found");
                return json_encode($data);
            }
        } else {
            $data = [
                'status' => 201,
                'message' => 'invalid output'
            ];
            header("HTTP/1.0 201 no output");
            return json_encode($data);
        }
    } else {
        if ($search) {
            $query = "SELECT posts_tbl.*, GROUP_CONCAT(genre_tbl.name SEPARATOR ', ') AS genre,
                GROUP_CONCAT(genre_tbl.tag_id SEPARATOR ', ') AS genre_id, category_id.name, bookmarks_tbl.bookmark_id
            FROM genre_post_tbl
            INNER JOIN bookmarks_tbl ON genre_post_tbl.post_id = bookmarks_tbl.post_id
            INNER JOIN posts_tbl ON genre_post_tbl.post_id = posts_tbl.post_id
            INNER JOIN genre_tbl ON genre_post_tbl.tag_id = genre_tbl.tag_id
            INNER JOIN category_id ON genre_post_tbl.category_id = category_id.category_id
              WHERE posts_tbl.title LIKE ? AND posts_tbl.status = 'posted' AND bookmarks_tbl.user_id = ?
              GROUP BY posts_tbl.post_id";

            $likeQuery = "%" . $search . "%";

            $stmt = $con->prepare($query);
            $stmt->bind_param("ss", $likeQuery, $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result->num_rows > 0) {
                $data = [
                    'status' => 200,
                    'message' => 'Content retrieved successfully Bookmark',
                    'data' => $result->fetch_all(MYSQLI_ASSOC)
                ];
                header("HTTP/1.0 200 OK");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 404,
                    'message' => 'No contents found'
                ];
                header("HTTP/1.0 404 Not Found");
                return json_encode($data);
            }
        } else {
            $data = [
                'status' => 201,
                'message' => 'Invalid output'
            ];
            header("HTTP/1.0 201 no output");
            return json_encode($data);
        }
    }
}

function viewedPost($userInput, $user_id)
{
    global $con;
    $view_id = 'VIEW - ' . date('Y-d') . substr(uniqid(), -5);
    $post_id = $userInput['post_id'];


    $query = "SELECT view_id FROM post_views_tbl WHERE user_id = ? AND post_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('ss', $user_id, $post_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows == 1) {
        $data = [
            'status' => 201,
            'message' => 'Post already viewed',
        ];
        header("HTTP/1.0 201 OK");
        return json_encode($data);
    } else {
        $query = "INSERT INTO post_views_tbl (view_id, post_id, user_id, viewed_at) VALUES (?, ?, ?, NOW())";
        $stmt = $con->prepare($query);
        $stmt->bind_param('sss', $view_id, $post_id, $user_id);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Post viewed successfully',
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}

function getViewed($user_id)
{
    global $con;
    $query = "SELECT 
            user_tbl.username, 
            posts_tbl.* 
                FROM 
            post_views_tbl 
                INNER JOIN posts_tbl ON post_views_tbl.post_id = posts_tbl.post_id
                INNER JOIN user_tbl ON posts_tbl.user_id = user_tbl.user_id
                WHERE 
            post_views_tbl.user_id = ? AND
            posts_tbl.published_at IS NOT NULL AND 
            posts_tbl.status = 'posted'";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Post viewed successfully',
            'data' => $result->fetch_all(MYSQLI_ASSOC)
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'status' => 404,
            'message' => 'No Post found'
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}
