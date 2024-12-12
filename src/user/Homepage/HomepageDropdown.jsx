import React, { useState } from "react";
import DeleteItem from "../../assets/images/deleteItem.png";

export default function HomepageDropdown({
  type,
  items,
  remove,
  isGenre,
  onSelect,
}) {
  const [selectedType, setSelectedType] = useState(type);

  const handleSelect = (event, name) => {
    event.preventDefault();
    setSelectedType(name.name);
    console.log(name, "selected");
    onSelect(name.id);
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
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              onClick={(event) => handleSelect(event, item)}
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
