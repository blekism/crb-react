import React from "react";

function LaunchButton({ Edit }) {
  return (
    <img
      src={Edit}
      alt="Edit"
      className="EditIcon"
      data-bs-toggle="modal"
      data-bs-target="#UploadModal"
      style={{ cursor: "pointer" }}
    />
  );
}

export default LaunchButton;
