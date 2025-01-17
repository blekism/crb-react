import React from "react";
import "./index.css";
import Homepage from "./user/Homepage/Homepage.jsx";
import Login from "./user/loginSignupPage/loginRegister.jsx";
import Contentpage from "./user/contentPage/contentPage.jsx";
import Profile from "./user/ProfilePage/ProfilePage.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Bookmark from "./user/Bookmark/bookmarkPage.jsx";
import Genre from "./user/Genrepage/Genrepage.jsx";
import AdminSideBar from "./admin/Sidebar.jsx";
import AdminDashboard from "./admin/Dashboard/AdminDashboard.jsx";
import AdminReports from "./admin/Reports/AdminReports.jsx";
import Users from "./admin/Users&Admin/Users.jsx";
import Admin from "./admin/Users&Admin/Admin.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Contentpage" element={<Contentpage />} />
          <Route path="/Bookmark" element={<Bookmark />} />
          <Route path="/Genre" element={<Genre />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AdminSideBar" element={<AdminSideBar />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Reports" element={<AdminReports />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
