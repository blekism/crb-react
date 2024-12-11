import React, { useEffect } from "react";
import Search from "../../assets/images/search.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Pomasin from "../../assets/images/lheopomasin.jpg";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["logged_user"]);
  const jwt = cookies.logged_user;

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/";
    } else {
      console.log("user is logged in");
    }
  }, []);

  return (
    <div className="navbar-parent">
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
            Genre
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
            type="text"
            className="form-control"
            placeholder="start looking..."
            aria-label="Username"
            aria-describedby="basic-addon1"
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
