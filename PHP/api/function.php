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
// use Google\Cloud\Storage\StorageClient;

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

    $queryText = "Analyze if the following text sounds positive, neutral, negative, or problematic. The output should only contain one of the three choices: \"$userContent\"";
    $client = new Client('AIzaSyD54wt_Pp1Jb3Jrc-bXxi5UXk17ZsF1w6Q');
    $response = $client->generativeModel(ModelName::GEMINI_1_5_FLASH)->generateContent(
        new TextPart($queryText),
    );

    $data = [
        'status' => 200,
        'message' => $response->text()
    ];
    return json_encode($data);
}

function register($userInput)
{
    global $con;

    if (isset($userInput['email']) && isset($userInput['password'])) {
        $user_id = 'USER - ' . date('Y-d') . substr(uniqid(), -5);
        $email = $userInput['email'];
        $password = $userInput['password'];
        $username = $userInput['username'];
        $firstname = $userInput['firstname'];
        $lastname = $userInput['lastname'];

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
                        'message' => 'User registered successfully'
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
                            'status' => 401,
                            'message' => 'Account not verified',
                        ];
                        header("HTTP/1.0 401 Unauthorized");
                        return json_encode($data);
                    }
                } else {
                    $data = [
                        'status' => 401,
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

function postContent($userInput, $user_id)
{
    global $con;

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
                $query = "INSERT INTO posts_tbl (post_id, user_id, title, content, status, analysis_score, published_at, created_at) VALUES (?, ?, ?, ?, 'posted', ?, NOW(), NOW())";
                $stmt = $con->prepare($query);
                $stmt->bind_param('sssss', $post_id, $user_id, $title, $content, $sentiment);
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
            } else if ($sentiment == 'problematic') {
                $query1 = "INSERT INTO posts_tbl (post_id, user_id, title, content, status, analysis_score, created_at) VALUES (?, ?, ?, ?, 'for_review', ?, NOW())";
                $stmt1 = $con->prepare($query1);
                $stmt1->bind_param('sssss', $post_id, $user_id, $title, $content, $sentiment);
                $result1 = $stmt1->execute();
                $stmt1->close();

                if ($result1) {
                    $review_id = 'REVIEW - ' . date('Y-d') . substr(uniqid(), -5);
                    $query2 = "INSERT INTO review_tbl (review_id, post_id, analysis_score, status, created_at) VALUES (?, ?, ?, 'for_review', NOW())";
                    $stmt2 = $con->prepare($query2);
                    $stmt2->bind_param('sss', $review_id, $post_id, $sentiment);
                    $result2 = $stmt2->execute();
                    $stmt2->close();

                    if ($result2) {
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
                                    'message' => 'Flagged',
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
                    $data = [
                        'status' => 500,
                        'message' => 'Internal Server Error'
                    ];
                    header("HTTP/1.0 500 Internal Server Error");
                    return json_encode($data);
                }
            } else if ($sentiment == 'negative') {
                $query3 = "INSERT INTO posts_tbl (post_id, user_id, title, content, status, analysis_score, created_at) VALUES (?, ?, ?, ?, 'for_review', ?, NOW())";
                $stmt3 = $con->prepare($query3);
                $stmt3->bind_param('sssss', $post_id, $user_id, $title, $content, $sentiment);
                $result3 = $stmt3->execute();
                $stmt3->close();

                if ($result3) {
                    $reject_id = 'REJECT - ' . date('Y-d') . substr(uniqid(), -5);
                    $query4 = "INSERT INTO review_tbl (review_id, post_id, analysis_score, status, created_at) VALUES (?, ?, ?, 'rejected', NOW())";
                    $stmt4 = $con->prepare($query4);
                    $stmt4->bind_param('sss', $reject_id, $post_id, $sentiment);
                    $result4 = $stmt4->execute();
                    $stmt4->close();

                    if ($result4) {
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
                                    'message' => 'Rejected',
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

    $comment_id= 'COMMENT- ' . date('Y-d') . substr(uniqid(), -5);
    $content = $data['content'];

    if (empty(trim($content))) {
        $data = [
            'status' => 400,
            'message' => 'Comment cannot be empty'
        ];
        return json_encode($data);
        
    }else{
      $query = "INSERT INTO comments_tbl (user_id, comment_id, content, created_at) VALUES (?,?, ?, NOW())";
        $stmt = $con->prepare($query);
        $stmt->bind_param('sss', $userId, $comment_id, $content);
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

    $query = "SELECT c.title,u.username , c.content
              FROM posts_tbl c
            INNER JOIN user_tbl u ON c.user_id = u.user_id
            WHERE post_id = ?";

    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows == 1) {
        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
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

function readComment($data)
{
    global $con;

    $query = "SELECT u.username, c.created_at, c.content 
              FROM comments_tbl c
            INNER JOIN user_tbl u ON c.user_id = u.user_id";
    $result = $con->query($query);

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

function report_post($post_id, $reason)
{
    global $con;

    $report_id = 'REPORT- ' . date('Y-d') . substr(uniqid(), -5);

    $query = "INSERT INTO reports_tbl (report_id, post_id, reason, status, created_at) VALUES (?, ?, ?, 'REPORTED', NOW())";
    $stmt = $con->prepare($query);
    $stmt->bind_param('sss',$report_id, $post_id, $reason);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        $data = [
            'status' => 201,
            'message' => 'Post reported successfully'
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

