import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Navbar from "../Navbar/Navbar.jsx";
import HomepageItem from "./HomepageItemTemplte.jsx";
import Back from "../../assets/images/back.png";
import Forward from "../../assets/images/forward.png";

export default function Homepage() {
  const [Homeitem, setItem] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const postsPerPage = 2;
  const item = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const startIndex = CurrentPage * postsPerPage;
  const selectedItems = item.slice(startIndex, startIndex + postsPerPage);
  const totalPages = Math.ceil(item.length / postsPerPage);

  const handleNext = () => {
    if (CurrentPage < totalPages - 1) {
      setCurrentPage(CurrentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (CurrentPage > 0) {
      setCurrentPage(CurrentPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="homepage-parent">
        <div className="homepage-header">
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
          {/* {item.map((item, key) => (
            <HomepageItem key={key} />
          ))} */}

          <img
            src={Back}
            alt="left-arrow"
            onClick={handlePrevious}
            style={{
              cursor: CurrentPage === 0 ? "not-allowed" : "pointer",
              opacity: CurrentPage === 0 ? 0.5 : 1,
              height: "50px",
            }}
          />

          {selectedItems.map((item, key) => (
            <HomepageItem key={key} />
          ))}

          <img
            src={Forward}
            alt="right-arrow"
            onClick={handleNext}
            style={{
              cursor:
                CurrentPage === totalPages - 1 ? "not-allowed" : "pointer",
              opacity: CurrentPage === totalPages - 1 ? 0.5 : 1,
              height: "50px",
            }}
          />
        </div>
        <div className="homepage-header">
          <h3>New Post</h3>
        </div>
        <div className="new-post-content">
          {item.map((item, key) => (
            <HomepageItem key={key} />
          ))}
        </div>
      </div>
    </>
  );
}
