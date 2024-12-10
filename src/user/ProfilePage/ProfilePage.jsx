import React from "react";
import "./ProfilePage.css";
import Navbar from "../Navbar/Navbar";
import StatsTemplate from "./StatisticsTemplate.jsx";
import Works from "./Works.jsx";
import Edit from "../../assets/images/Edit.svg";
import Circle from "../../assets/images/Circle.svg";
import ProfileModal from "./ProfileModal";

export default function ProfilePage() {
  return (
    <>
      <div className="ProfilePageParent">
        <Navbar />
        <div className="ProfilePageTopCont">
          <div className="ProfilePageTopCont-left">
            <img src={Circle} alt="Profile" />
            <h1>Username</h1>
          </div>
          <div className="ProfilePageTopCont-right">
            <div className="ProfilePageTopCont-rightTop">
              <div className="rightTop-Left">
                <div className="rightTop-LeftTitle">
                  <p className="p1">My Profile</p>
                  <img
                    src={Edit}
                    alt="Edit"
                    className="EditIcon"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#profileModal"
                  />
                  <ProfileModal />
                </div>
                <p className="p2">Name:</p>
                <p className="p3">Hannah Duplon</p>
                <p className="p4">Date of Birth:</p>
                <p className="p5">August 4, 2003</p>
              </div>
              <div className="rightTop-Right">
                <div className="rightTop-Right1">
                  <StatsTemplate statsTitle="Lorem ipsum dolor sit amet," />
                  <StatsTemplate statsTitle="Statistics" />
                </div>
                <div className="rightTop-Right2">
                  <StatsTemplate statsTitle="Lorem ipsum dolor sit amet," />
                  <StatsTemplate statsTitle="Statistics" />
                </div>
              </div>
            </div>
            <div className="ProfilePageTopCont-rightBottom">
              <p className="p1">Bio:</p>
              <div className="bio">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum at faucibus lectus, at pretium magna. Sed viverra
                  aliquet dolor ac mollis. Curabitur feugiat orci vel lorem
                  semper, eu ultrices purus gravida. Quisque in velit non ipsum
                  tincidunt efficitur. Mauris euismod, ante nec interdum
                  efficitur.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="ProfilePageBottomCont">
          <div className="ProfilePageBottomCont-Title">
            <h2>Writings/Works</h2>
          </div>
          <div className="ProfilePageBottomCont-Content">
            <Works
              title="Book ni Yngwie"
              genre="fiction"
              datePosted="august 4, 2003"
              totalComments="200"
              totalBookmarks="400"
            />
            <Works
              title="Book ni Yngwie"
              genre="fiction"
              datePosted="august 4, 2003"
              totalComments="200"
              totalBookmarks="400"
            />
            <Works
              title="Book ni Yngwie"
              genre="fiction"
              datePosted="august 4, 2003"
              totalComments="200"
              totalBookmarks="400"
            />
            <Works
              title="Book ni Yngwie"
              genre="fiction"
              datePosted="august 4, 2003"
              totalComments="200"
              totalBookmarks="400"
            />
            <Works
              title="Book ni Yngwie"
              genre="fiction"
              datePosted="august 4, 2003"
              totalComments="200"
              totalBookmarks="400"
            />
          </div>
        </div>
      </div>
    </>
  );
}
