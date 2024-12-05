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
      class="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabindex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          About this Post
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div className="offcanvas-parent-content">
          <div className="offcanvas-image">
            <img className="offcanvas-post-image" src={T1} />
          </div>
          <div className="offcanvas-title">
            <p>Buhay Ni Yngwie Serrano</p>
            <p>Carl Aliño</p>
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
