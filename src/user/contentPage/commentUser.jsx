import React, { useState, useEffect } from "react";
import "./CommentUser.css";
import Delete from "../../assets/images/delete.png";
import axios from "axios";
export default function CommentUser({
  name,
  date,
  comment,
  user_id,
  loggedInUserId,
  comment_id,
}) {
  const handleDeleteComment = (comment_id) => {
    console.log(comment_id);
    axios
      .post(
        "http://localhost/crb-react/PHP/api/delete/deleteOwnComment.php",
        { comment_id: comment_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          alert("Comment deleted successfully!");
          window.location.reload();
        } else {
          alert("There was an error deleting the comment!");
        }
      })
      .catch((error) => {
        console.log("There was an error deleting the comment!", error);
        alert("ERROR DELETING COMMENT");
      });
  };
  return (
    <div className="commentContainer">
      <div className="commentContent">
        <h5>By: {name}</h5>
        <p>{date}</p>
        <p>{comment}</p>
      </div>
      {user_id === loggedInUserId && (
        <div className="deleteButton">
          <img
            src={Delete}
            alt="Delete"
            onClick={() => handleDeleteComment(comment_id)}
          />
        </div>
      )}
    </div>
  );
}
