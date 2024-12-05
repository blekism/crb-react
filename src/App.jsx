import React from "react";
import "./index.css";
import Homepage from "./user/Homepage/Homepage.jsx";
import Login from "./user/loginSignupPage/loginRegister.jsx";
import Contentpage from "./user/contentPage/contentPage.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login/>} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Contentpage" element={<Contentpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
