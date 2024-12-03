import React from "react";
import "./Homepage.css";
import Navbar from "../Navbar/Navbar.jsx";
import ForyouItem from "./ForyouItemTemplate.jsx";

export default function Homepage() {
  const forYouItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Navbar />
      <div className="homepage-parent">
        <div className="for-you-header">
          <h3>For You</h3>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontWeight: "400",
              height: "45px",
            }}
          >
            Write a Post
          </button>
        </div>
        <div className="for-you-content">
          {forYouItems.map((item, key) => (
            <ForyouItem key={key} />
          ))}
        </div>
        <div className="new-post-header">
          <h1>New Post</h1>
        </div>
        <div className="new-post-content">
          <h1>new post content</h1>
          <h1>new post content</h1>
          <h1>new post content</h1>
          <h1>new post content</h1>
        </div>
      </div>
    </>
  );
}
