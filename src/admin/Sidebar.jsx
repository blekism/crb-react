import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import Blakey from "../assets/images/blakey.png";
import DashIcon from "../assets/images/dashboard.png";
import Dashboard from "../assets/images/dashboard2.png";
import Report from "../assets/images/report.png";
import Report2 from "../assets/images/reportBlue.png";
import Admin2 from "../assets/images/adminBlue.png";
import User2 from "../assets/images/personBlue.png";
import User from "../assets/images/user.png";
import Admin from "../assets/images/admin.png";
import Posts from "../assets/images/post.png";
import Posts2 from "../assets/images/postBlue.png";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("AdminDashboard")) {
      setActiveLink("dashboard");
    } else if (path.includes("Users")) {
      setActiveLink("users");
    } else if (path.includes("Admin")) {
      setActiveLink("admin");
    } else if (path.includes("Posts")) {
      setActiveLink("posts");
    } else if (path.includes("Reports")) {
      setActiveLink("reports");
    }
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="AdminSideBar-Parent">
        <div className="AdminSideBar-Logo">
          <img src={Blakey} alt="Dashboard Icon" />
        </div>
        <div className="AdminSideBar-TopCont">
          <div className="AdminSideBar-TopCont-Dashboard">
            <img
              src={activeLink === "dashboard" ? DashIcon : Dashboard}
              alt="Dashboard Icon"
            />
            <Link
              to="/AdminDashboard"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </Link>
          </div>
          <div className="AdminSideBar-TopCont-Reports">
            <img
              src={activeLink === "users" ? User2 : User}
              alt="Dashboard Icon"
            />
            <Link
              to="/Users"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "users" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("users")}
            >
              Users
            </Link>
          </div>
          <div className="AdminSideBar-TopCont-Reports">
            <img
              src={activeLink === "admin" ? Admin2 : Admin}
              alt="Dashboard Icon"
            />
            <Link
              to="/Admin"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "admin" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("admin")}
            >
              Admin
            </Link>
          </div>
          <div className="AdminSideBar-TopCont-Reports">
            <img
              src={activeLink === "posts" ? Posts2 : Posts}
              alt="Dashboard Icon"
            />
            <Link
              to="/Posts"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "posts" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("posts")}
            >
              Posts
            </Link>
          </div>
          <div className="AdminSideBar-TopCont-Reports">
            <img
              src={activeLink === "reports" ? Report2 : Report}
              alt="Dashboard Icon"
            />
            <Link
              to="/Reports"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "reports" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("reports")}
            >
              Reports
            </Link>
          </div>
          {/* <div className="AdminSideBar-TopCont-ContRev">
            <img src={ContRevIcon} alt="Dashboard Icon" />
            <Link
              to="/Bookmark"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "contentreview" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("contentreview")}
            >
              Reviews
            </Link>
          </div> */}
        </div>
        <div className="AdminSideBar-BottomCont"></div>
      </div>
    </>
  );
}
