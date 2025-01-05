import React, { useEffect, useState } from "react";
import "./Works.css";
import Edit from "../../assets/images/Edit.svg";
import Delete from "../../assets/images/Delete.svg";
import EditUploadModal from "../Homepage/UploadModal";

export default function Works({
  workImage,
  title,
  genre,
  datePosted,
  totalComments,
  totalBookmarks,
  work,
}) {
  const handleButtonClick = (id) => {
    setModalId(id);
  };
  const [modalId, setModalId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  console.log(work, "crappy");
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
          // onClick={() => handleButtonClick(work)}
        />
        <img src={Delete} alt="Edit" className="DeleteIcon" />
      </div>
      {/* {isModalOpen && (
        <EditUploadModal postID={work} onClose={handleCloseModal} />
      )} */}
      <EditUploadModal postID={work} />

      <hr />
    </>
  );
}
