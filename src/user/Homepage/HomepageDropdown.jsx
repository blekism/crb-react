import React, { useState } from "react";
import DeleteItem from "../../assets/images/deleteItem.png";

export default function HomepageDropdown({ type, items, remove, isGenre }) {
  const [selectedType, setSelectedType] = useState(type);

  const handleSelect = (name) => {
    setSelectedType(name);
    console.log(name);
  };

  return (
    <div className="btn-group">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
        style={{ marginRight: "15px" }}
      >
        {selectedType}
      </button>
      <ul className="dropdown-menu">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className="dropdown-item"
              onClick={() => handleSelect(item.name)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      {isGenre == true && (
        <img
          className="delete-btn"
          src={DeleteItem}
          onClick={remove}
          style={{
            margin: "auto",
            width: "20px",
            height: "20px",
          }}
        />
      )}
    </div>
  );
}
