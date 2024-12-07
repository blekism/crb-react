import React from "react";
import "./ProfilePage.css";
import Navbar from "../Navbar/Navbar";
import Avatar from "../../assets/images/AvatarPlaceholder.png";

export default function ProfilePage() {
  return (
    <>
      <div className="ProfilePageParent">
        <Navbar />
        <div className="ProfilePageTopCont">
          <div className="ProfilePageTopCont-left">
            <img src={Avatar} alt="Profile" />
            <h1>Username</h1>
          </div>
          <div className="ProfilePageTopCont-right">
            <div className="ProfilePageTopCont-rightTop">
              <div className="rightTop-Left">
                <p id="p1">My Profile</p>
                <p id="p2">Name:</p>
                <p id="p3">Hannah Duplon</p>
                <p id="p4">Date of Birth:</p>
                <p id="p5">August 4, 2003</p>
              </div>
              <div className="rightTop-Right"></div>
            </div>
            <div className="ProfilePageTopCont-rightBottom">
              <p id="p1">Bio:</p>
              <div className="bio"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
