import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./bookmarkPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Bookmarkitem from "./bookmarkItemTemplate.jsx";
import OffcanvasBookmark from "../Homepage/Offcanvas.jsx";
import FilterButton from "../Genrepage/FilterByButton.jsx";
import axios from "axios";

export default function BookmarkPage() {
  const [selectedItem, setSelectedItem] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readAllContent.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setItems(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const groupItems = (items, groupSize) => {
    const groups = [];

    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  };
  const groupedItems = groupItems(items, 12);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Navbar />
      <OffcanvasBookmark item={selectedItem} />
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
                  image={item.image}
                  title={item.title}
                  author={item.author}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
