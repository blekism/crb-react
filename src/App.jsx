import React from "react";
import "./index.css";
import Homepage from "./user/Homepage/Homepage.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login/>} /> */}
          <Route path="/Homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
