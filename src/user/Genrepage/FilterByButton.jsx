import React from "react";
import "./FilterByButton.css";
import { useState, useEffect } from "react";
import Filter from "../Homepage/HomepageDropdown.jsx";
import axios from "axios";
import { use } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export default function FilterByButton({ showNewContent, PageType }) {
  const [genre, setGenre] = useState([]);
  const [type, setType] = useState([]);
  const [postContent, setPostContent] = useState({
    user_id: "",
  });
  const [cookies] = useCookies(["logged_user"]);
  const [submit, setSubmit] = useState(false);
  const [newContent, setNewContent] = useState([]);

  const month = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const year = Array.from({ length: 26 }, (v, i) => ({
    id: i + 2000,
    name: (i + 2000).toString(),
  }));

  const handleTypeChange = (selectedItem) => {
    setPostContent((prevContent) => ({
      ...prevContent,
      type: selectedItem,
    }));
  };

  const handleGenreChange = (selectedItem) => {
    setPostContent((prevContent) => ({
      ...prevContent,
      genre: selectedItem,
    }));
  };

  const handleMonthChange = (selectedItem) => {
    setPostContent((prevContent) => ({
      ...prevContent,
      month: selectedItem,
    }));
  };

  const handleYearChange = (selectedItem) => {
    setPostContent((prevContent) => ({
      ...prevContent,
      year: selectedItem,
    }));
  };

  const handleContentSubmit = (event) => {
    event.preventDefault();
    console.log(postContent);
    axios
      .post("http://localhost/crb-react/PHP/api/read/filter.php", postContent, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setNewContent(response.data.data);
          showNewContent(response.data.data);
          setSubmit(true);
        } else {
          console.log("No data found");
          showNewContent([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (PageType === "bookmark") {
      try {
        const decoded = jwtDecode(cookies.logged_user);
        setPostContent((prevContent) => ({
          ...prevContent,
          user_id: decoded.user_id,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    axios
      .get("http://localhost/crb-react/PHP/api/read/readGenre.php")
      .then((response) => {
        if (response.data.status === 200) {
          setGenre(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readType.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setType(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#filterByButton"
      >
        Filter By:
      </button>

      <div
        className="modal fade"
        id="filterByButton"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Filter By:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleContentSubmit}>
              <div className="modal-body">
                {/* First Dropdown */}
                <Filter
                  type="Post Type"
                  items={type}
                  isGenre={false}
                  onSelect={handleTypeChange}
                  required
                />

                {/* Second Dropdown */}
                <Filter
                  type="Genre Type"
                  items={genre}
                  isGenre={false}
                  onSelect={handleGenreChange}
                  required
                />

                {/* Third Dropdown */}
                <Filter
                  type="Month"
                  items={month}
                  isGenre={false}
                  onSelect={handleMonthChange}
                  required
                />

                {/* Fourth Dropdown */}
                <Filter
                  type="Year"
                  items={year}
                  isGenre={false}
                  onSelect={handleYearChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
