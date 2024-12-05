import React from "react";
import Homepage from "./user/Homepage/Homepage.jsx";
import Login from "./user/loginSignupPage/loginRegister.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
