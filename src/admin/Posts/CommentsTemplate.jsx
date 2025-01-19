import React, { useEffect, useState } from "react";
import "./CommentsTemplate.css";
import Delete from "../../assets/images/delBlue.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Works({
  workImage,
  title,
  datePosted,
  commentContent,
}) {
  //   const navigate = useNavigate();

  //   const handleReadNow = () => {
  //     navigate("/Contentpage", { state: { post_id: work, owner: owner } });
  //   };
  return (
    <>
      <div className="CommentsTemplateParent">
        <div className="CommentsTemplateContent">
          <p className="p1">{title}</p>
          <p className="p2"> {datePosted}</p>
          <p className="p3"> {commentContent}</p>
        </div>

        <img src={Delete} alt="Edit" className="DeleteIcon" />
      </div>

      <hr />
    </>
  );
}
