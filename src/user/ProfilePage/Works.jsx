import React from "react";
import "./Works.css";
import Edit from "../../assets/images/Edit.svg";
import Rectangle from "../../assets/images/Rectangle.svg";

export default function Works({
  workImage,
  title,
  genre,
  datePosted,
  totalComments,
  totalBookmarks,
}) {
  return (
    <>
      <div className="WorksTemplateParent">
        <img src={Rectangle} alt="Work" className="WorkImage" />
        <div className="WorksTemplateContent">
          <p className="p1">{title}</p>
          <p className="p2">{genre}</p>
          <p className="p3">Date Posted: {datePosted}</p>
          <p className="p3">Total Comments: {totalComments}</p>
          <p className="p3">Total Bookmarks: {totalBookmarks}</p>
        </div>

        <button type="button" className="WorksTemplateButton">
          View
        </button>
        <img src={Edit} alt="Edit" className="EditIcon" />
      </div>
      <hr />
    </>
  );
}
