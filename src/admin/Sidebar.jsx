import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import Blakey from "../assets/images/blakey.png";
import DashIcon from "../assets/images/Dashboard.svg";
import Dashboard from "../assets/images/dashboard2.png";
import ReportsIcon from "../assets/images/Reports.svg";
import ContRevIcon from "../assets/images/ContRev.svg";
import Comment from "../assets/images/comments.png";
import Bookmark from "../assets/images/bookmarks.png";
import User from "../assets/images/user.png";
import Admin from "../assets/images/admin.png";
import Posts from "../assets/images/post.png";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("");

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
      // } else if (path.includes("Comments")) {
      //   setActiveLink("comments");
    } else if (path.includes("Reports")) {
      setActiveLink("reports");
      // } else if (path.includes("Bookmark")) {
      //   setActiveLink("contentreview");
    }
  }, [location]);

  return (
    <>
      <div className="AdminSideBar-Parent">
        <div className="AdminSideBar-Logo">
          <img src={Blakey} alt="Dashboard Icon" />
        </div>
        <div className="AdminSideBar-TopCont">
          <div className="AdminSideBar-TopCont-Dashboard">
            <img src={Dashboard} alt="Dashboard Icon" />
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
            <img src={User} alt="Dashboard Icon" />
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
            <img src={Admin} alt="Dashboard Icon" />
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
            <img src={Posts} alt="Dashboard Icon" />
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
          {/* <div className="AdminSideBar-TopCont-Reports">
            <img src={Comment} alt="Dashboard Icon" />
            <Link
              to="/Comments"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "comments" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("comments")}
            >
              Comments
            </Link>
          </div> */}
          <div className="AdminSideBar-TopCont-Reports">
            <img src={ReportsIcon} alt="Dashboard Icon" />
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
