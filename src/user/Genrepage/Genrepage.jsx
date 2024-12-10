import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Genrepage.css";
import T1 from "../../assets/images/sheena.jpg";
import T2 from "../../assets/images/mikha.jpg";
import T3 from "../../assets/images/maloi.jpg";
import Genreitem from "../Bookmark/bookmarkItemTemplate.jsx";
import FilterButton from "./FilterByButton.jsx";

export default function Genre() {
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
  const groupedItems = groupItems(item, 6);
  return (
    <>
      <Navbar />

      <div className="genreTitle">
        <h1>Genre</h1>
        <FilterButton />
      </div>

      {groupedItems.map((group, index) => (
        <div key={index} className="custom-slider-bookmark">
          <div className="grid-container">
            {group.map((item, idx) => (
              <Genreitem
                key={idx}
                image={item.src}
                title={item.title}
                author={item.author}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
