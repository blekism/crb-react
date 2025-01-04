import React, { useEffect, useState } from "react";
import "./Works.css";
import Edit from "../../assets/images/Edit.svg";
import Delete from "../../assets/images/Delete.svg";
import EditUploadModal from "./editUploadModal";

export default function Works({
  workImage,
  title,
  genre,
  datePosted,
  totalComments,
  totalBookmarks,
  work,
}) {
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

        <button type="button" className="WorksTemplateButton">
          View
        </button>
        <img
          src={Edit}
          alt="Edit"
          className="EditIcon"
          data-bs-toggle="modal"
          data-bs-target="#UploadModal"
        />
        <img src={Delete} alt="Edit" className="DeleteIcon" />
      </div>
      <EditUploadModal postID={work} />
      <hr />
    </>
  );
}
