<?php

require __DIR__. '/../inc/dbcon.php';

function insertComment($data)
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
      $query = "INSERT INTO comments_tbl (comment_id, content, created_at) VALUES (?, ?, NOW())";
        $stmt = $con->prepare($query);
        $stmt->bind_param('ss', $comment_id, $content);
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

function readContent()
{
    global $con;

    $query = "SELECT c.title, c.content, u.username 
              FROM posts_tbl c
            INNER  JOIN user_tbl u ON c.user_id = u.user_id";
    $result = $con->query($query);

    if ($result->num_rows > 0) {
        $data = [
            'status' => 200,
            'message' => 'Content retrieved successfully',
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