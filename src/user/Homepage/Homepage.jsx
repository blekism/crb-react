import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Navbar from "../Navbar/Navbar.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomepageItem from "./HomepageItemTemplte.jsx";
import Offcanvas from "./Offcanvas.jsx";
import UploadModal from "./UploadModal.jsx";
import axios from "axios";

export default function Homepage() {
  const [selectedItem, setSelectedItem] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedItem === null) {
      console.log("No item selected si carl");
    }
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
  const groupedItems = groupItems(items, 6);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Navbar />
      <Offcanvas item={selectedItem} />
      <UploadModal />
      <div className="homepage-parent">
        <div className="homepage-header">
          <h3>New Posts</h3>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#UploadModal"
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
                    image={item.image}
                    title={item.title}
                    author={item.author}
                    onClick={() => handleItemClick(item)}
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
                  <HomepageItem
                    image={item.image}
                    key={idx}
                    title={item.title}
                    author={item.author}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
