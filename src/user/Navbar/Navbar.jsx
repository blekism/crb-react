import React from "react";
import Search from "../../assets/images/search.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar-parent">
        <div className="nav-buttons">
          <p>Home</p>
          <p>Genre</p>
          <p>Bookmarks</p>
        </div>

        <div
          className="input-group"
          style={{
            width: "16%",
            height: "5vh",
            marginRight: "7%",
            marginTop: "1%",
          }}
        >
          <span className="input-group-text" id="basic-addon1">
            <img
              src={Search}
              className="search-icon"
              style={{ height: "20px", width: "20px" }}
            />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="start looking..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </>
  );
}
