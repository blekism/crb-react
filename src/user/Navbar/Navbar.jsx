import React, { useEffect, useState } from "react";
import Search from "../../assets/images/search.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Pomasin from "../../assets/images/lheopomasin.jpg";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Hub from "../../assets/images/hubs.mp4";

export default function Navbar({ searchItem, User }) {
  const [cookies, setCookie, removeCookie] = useCookies(["logged_user"]);
  const jwt = cookies.logged_user;

  const [userSearch, setUserSearch] = useState({
    search: "",
  });

  const handleSearchLog = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserSearch((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitSearch = (event) => {
    console.log(userSearch, "search CARL");

    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/search_bar.php",
        userSearch
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          searchItem(response.data.data);
        } else if (response.data.status === 201) {
          console.log(response.data);
          searchItem([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!userSearch.search.trim()) {
        console.log("empty search");
        return;
      }
      console.log(User);
      handleSubmitSearch();
    }
  };

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/";
    } else {
      console.log("user is logged in");
      if (User === "bookmark") {
        try {
          const decoded = jwtDecode(cookies.logged_user);
          setUserSearch((prevContent) => ({
            ...prevContent,
            user_id: decoded.user_id,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, []);

  return (
    <div className="navbar-parent">
      {/* ---------------- */}
      {/* <div className="audios" style={{ display: "none" }}>
        <video width="600" autoPlay controls>
          <source src={Hub} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      </div> */}
      {/* ---------------- */}
      <div className="nav-buttons">
        <p className="navbtn">
          <Link
            to={"/Homepage"}
            style={{ color: "Black", textDecorationLine: "none" }}
          >
            Home
          </Link>
        </p>
        <p className="navbtn">
          <Link
            to={"/Genre"}
            style={{ color: "Black", textDecorationLine: "none" }}
          >
            Archive
          </Link>
        </p>
        <p className="navbtn">
          <Link
            to={"/Bookmark"}
            style={{ color: "Black", textDecorationLine: "none" }}
          >
            Bookmarks
          </Link>
        </p>
      </div>

      <div className="end-group">
        <div
          className="input-group"
          style={{
            width: "70%",
            height: "5vh",
            marginRight: "7%",
            marginTop: "1%",
          }}
        >
          <span className="input-group-text" id="basic-addon1">
            <img
              src={Search}
              className="search-icon"
              style={{ height: "20px", width: "20px" }}
            />
          </span>
          <input
            name="search"
            type="text"
            className="form-control"
            placeholder="start looking..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={handleSearchLog}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="profileLogo">
          <Link to={"/Profile"}>
            <img
              src={Pomasin}
              style={{ height: "80px", width: "80px", padding: "10px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
