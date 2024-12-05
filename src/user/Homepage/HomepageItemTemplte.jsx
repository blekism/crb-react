import React, { useState } from "react";
import "./HomepageItemTemplate.css";

export default function ForyouItemTemplate({ image, title, author, open }) {
  return (
    <>
      <div
        className="card-parent"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <img src={image} className="card-img" />
        <div className="card-content">
          <p>{title}</p>
          <p>{author}</p>
        </div>
      </div>
    </>
  );
}
