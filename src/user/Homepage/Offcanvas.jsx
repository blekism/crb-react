import React from "react";
import "./Offcanvas.css";
import T1 from "../../assets/images/t1.jpg";

export default function Offcanvas({
  author,
  title,
  genre1,
  genre2,
  genre3,
  image,
}) {
  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          About this Post
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="offcanvas-parent-content">
          <div className="offcanvas-image">
            <img className="offcanvas-post-image" src={T1} />
          </div>
          <div className="offcanvas-title">
            <p>Buhay Ni YoungWee</p>
            <p>lrac onila</p>
          </div>
          <div className="offcanvas-tags">Genre</div>
          <div className="offcanvas-buttons">
            <button
              type="button"
              className="btn"
              style={{
                color: "white",
                fontWeight: "400",
                height: "45px",
                backgroundColor: "#658ABD",
              }}
            >
              Read Now
            </button>
            <button
              type="button"
              className="btn"
              style={{
                color: "white",
                fontWeight: "400",
                height: "45px",
                backgroundColor: "#658ABD",
              }}
            >
              Save this Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
