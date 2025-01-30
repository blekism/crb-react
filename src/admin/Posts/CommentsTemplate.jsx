import React, { useEffect, useState } from "react";
import "./CommentsTemplate.css";
import Delete from "../../assets/images/delBlue.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CommentsTemplate({
  workImage,
  title,
  datePosted,
  commentContent,
  comment_id,
}) {
  const handleDeleteComment = (comment_id) => {
    console.log(comment_id, "comment cm7omment");
    axios
      .post(
        "http://localhost/crb-react/PHP/api/delete/delete_comment.php",
        {
          comment_id: comment_id,
        },
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
        alert("There was an error deleting the comment!");
      });
  };
  return (
    <>
      <div className="CommentsTemplateParent">
        <div className="CommentsTemplateContent">
          <p className="p1">{title}</p>
          <p className="p2"> {datePosted}</p>
          <p className="p3"> {commentContent}</p>
        </div>

        <img
          src={Delete}
          alt="Edit"
          className="DeleteIcon"
          onClick={() => handleDeleteComment(comment_id)}
        />
      </div>

      <hr />
    </>
  );
}
