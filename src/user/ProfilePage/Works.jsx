import React, { useEffect, useState } from "react";
import "./Works.css";
import Delete from "../../assets/images/Delete.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Works({
  workImage,
  title,
  genre,
  datePosted,
  totalComments,
  totalBookmarks,
  work,
  owner,
}) {
  const navigate = useNavigate();

  const handleReadNow = () => {
    navigate("/Contentpage", { state: { post_id: work, owner: owner } });
  };

  const handleDelete = (jakol) => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readAllContent.php",
        {
          post_id: jakol,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="WorksTemplateParent">
        <img src={workImage} alt="Work" className="WorkImage" />
        <div className="WorksTemplateContent">
          <p className="p1">{title}</p>
          <p className="p2">{genre}</p>
          <p className="p3">Published At: {datePosted}</p>
          <p className="p3">Total Comments: {totalComments}</p>
          <p className="p3">Total Bookmarks: {totalBookmarks}</p>
        </div>

        <button
          type="button"
          onClick={handleReadNow}
          className="WorksTemplateButton"
        >
          View
        </button>
        <img src={Delete} alt="Edit" className="DeleteIcon" />
      </div>

      <hr />
    </>
  );
}
