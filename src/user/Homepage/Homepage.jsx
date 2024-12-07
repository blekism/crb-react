import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Navbar from "../Navbar/Navbar.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomepageItem from "./HomepageItemTemplte.jsx";
import Offcanvas from "./Offcanvas.jsx";
import T1 from "../../assets/images/t1.jpg";
import T2 from "../../assets/images/t2.png";
import T3 from "../../assets/images/t3.jpg";

export default function Homepage() {
  const item = [
    { src: T1, title: "Buhay Ni", author: "lrac abunda" },
    { src: T2 },
    { src: T3 },
    { src: T1 },
    { src: T2 },
    { src: T1 },
    { src: T1 },
    { src: T3 },
    { src: T3 },
    { src: T1 },
    { src: T1 },
    { src: T1 },
    { src: T1 },
    { src: T1 },
    { src: T3 },
    { src: T3 },
    { src: T3 },
    { src: T3 },
    { src: T3 },
    { src: T3 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
    { src: T2 },
  ];

  const groupItems = (items, groupSize) => {
    const groups = [];

    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  };
  const groupedItems = groupItems(item, 6);

  return (
    <>
      <Navbar />
      <Offcanvas />
      <div className="homepage-parent">
        <div className="homepage-header">
          <h3>New Posts</h3>
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
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
          >
            {groupedItems.map((group, index) => (
              <div key={index} className="custom-slider">
                {group.map((item, idx) => (
                  <HomepageItem
                    key={idx}
                    image={item.src}
                    title={item.title}
                    author={item.author}
                  />
                ))}
              </div>
            ))}
          </Carousel>
        </div>

        <div className="homepage-header">
          <h3>Continue Reading</h3>
        </div>
        <div className="new-post-content">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
          >
            {groupedItems.map((group, index) => (
              <div key={index} className="custom-slider">
                {group.map((item, idx) => (
                  <HomepageItem key={idx} image={item.src} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
