import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Genrepage.css";
import Genreitem from "../Bookmark/bookmarkItemTemplate.jsx";
import OffcanvasGenre from "../Homepage/Offcanvas.jsx";
import FilterButton from "./FilterByButton.jsx";
import axios from "axios";

export default function Genre() {
  const [selectedItem, setSelectedItem] = useState(1);
  const [items, setItems] = useState([]);
  const [backlog, setBacklog] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readAllContent.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setItems(response.data.data);
          setBacklog(response.data.data);
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
      <Navbar searchItem={setItems} isHome={false} initialData={backlog} />
      <OffcanvasGenre item={selectedItem} />

      <div className="genreTitle">
        <h1>Full Archive</h1>
        <FilterButton showNewContent={setItems} />
      </div>

      {groupedItems.map((group, index) => (
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
      ))}
    </>
  );
}
