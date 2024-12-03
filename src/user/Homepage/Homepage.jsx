import React from "react";
import "./Homepage.css";
import Navbar from "../Navbar/Navbar.jsx";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div className="homepage-parent">
        <div className="for-you-header">
          <h1>For You</h1>
          <h1>For button</h1>
        </div>
        <div className="for-you-content">
          <h1>for you content</h1>
          <h1>for you content</h1>
          <h1>for you content</h1>
          <h1>for you content</h1>
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
