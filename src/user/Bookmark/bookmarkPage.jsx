import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./bookmarkPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Bookmarkitem from "./bookmarkItemTemplate.jsx";
import OffcanvasBookmark from "../Homepage/Offcanvas.jsx";
import FilterButton from "../Genrepage/FilterByButton.jsx";
import axios from "axios";
import { useCookies } from "react-cookie";
import Filtering from "../Homepage/UploadModal.jsx";
import { jwtDecode } from "jwt-decode";
import Genreitem from "../Bookmark/bookmarkItemTemplate.jsx";

export default function BookmarkPage() {
  const [selectedItem, setSelectedItem] = useState(1);
  const [items, setItems] = useState([]);
  const [cookies] = useCookies(["logged_user"]);

  useEffect(() => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readAllBookmark.php",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.logged_user,
          },
          withCredentials: true,
        }
      )
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
      <Navbar
        searchItem={setItems}
        User={"bookmark"}
        isHome={false}
        initialData={items}
      />

      <OffcanvasBookmark item={selectedItem} />
      <div className="Titlecontent">
        <h1>Saved Post</h1>
        <FilterButton showNewContent={setItems} PageType={"bookmark"} />
      </div>
      <Carousel
        className="crsl"
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        {items.length > 0 ? (
          groupedItems.map((group, index) => (
            <div key={index} className="custom-slider-bookmark">
              <div className="grid-container">
                {group.map((item, idx) => (
                  <Genreitem
                    key={idx}
                    image={item.image}
                    title={item.title}
                    author={item.author}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="noPost">No Bookmarks Found</p>
        )}
      </Carousel>
    </>
  );
}
