import React from "react";
import "./bookmarkItemTemplate.css";

export default function bookmarkItemTemplate({ image, title, author }) {
  return (
    <>
      <div
        className="card-parent-bookmark"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <img src={image} className="card-img-bookmark" />
        <div className="card-content-bookmark">
          <p>{title}</p>
          <p>{author}</p>
        </div>
      </div>
    </>
  );
}
