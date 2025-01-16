import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import Blakey from "../assets/images/blakey.png";
import DashIcon from "../assets/images/Dashboard.svg";
import ReportsIcon from "../assets/images/Reports.svg";
import ContRevIcon from "../assets/images/ContRev.svg";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("AdminDashboard")) {
      setActiveLink("dashboard");
    } else if (path.includes("Reports")) {
      setActiveLink("reports");
    } else if (path.includes("Bookmark")) {
      setActiveLink("contentreview");
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
            <img src={DashIcon} alt="Dashboard Icon" />
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
          <div className="AdminSideBar-TopCont-ContRev">
            <img src={ContRevIcon} alt="Dashboard Icon" />
            <Link
              to="/Bookmark"
              className={`AdminSideBar-TopCont-link ${
                activeLink === "contentreview" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("contentreview")}
            >
              Content Review
            </Link>
          </div>
        </div>
        <div className="AdminSideBar-BottomCont"></div>
      </div>
    </>
  );
}
