import React from "react";
import Navbar from "../Navbar/Navbar";
import "./bookmarkPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import T1 from "../../assets/images/sheena.jpg";
import T2 from "../../assets/images/mikha.jpg";
import T3 from "../../assets/images/maloi.jpg";
import Bookmarkitem from "./bookmarkItemTemplate.jsx";
import Offcanvas from "../Homepage/Offcanvas.jsx";
import FilterButton from "../Genrepage/FilterByButton.jsx";

export default function Contentpage() {
  const item = [
    { src: T1, title: "BINI", author: "Sheena" },
    { src: T2, title: "BINI", author: "Mikha" },
    { src: T3, title: "BINI", author: "Maloi" },
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
  const groupedItems = groupItems(item, 12);

  return (
    <>
      <Navbar />
      <Offcanvas />
      <div className="Titlecontent">
        <h1>Saved Post</h1>
        <FilterButton />
      </div>
      <Carousel
        className="crsl"
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        {groupedItems.map((group, index) => (
          <div key={index} className="custom-slider-bookmark">
            <div className="grid-container">
              {group.map((item, idx) => (
                <Bookmarkitem
                  key={idx}
                  image={item.src}
                  title={item.title}
                  author={item.author}
                />
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
