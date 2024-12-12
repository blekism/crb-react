import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Navbar from "../Navbar/Navbar";
import StatsTemplate from "./StatisticsTemplate.jsx";
import Works from "./Works.jsx";
import Edit from "../../assets/images/Edit.svg";
import Circle from "../../assets/images/Circle.svg";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState({});
  const [postContents, setPostContents] = useState([]);
  const [cookies] = useCookies(["logged_user"]);

  console.log(profileDetails);

  // console.log(cookies.logged_user);

  useEffect(() => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/singleRead_profile.php",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.logged_user,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setProfileDetails(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readUserContent.php",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.logged_user,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setPostContents(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="ProfilePageParent">
        <Navbar />
        <div className="ProfilePageTopCont">
          <div className="ProfilePageTopCont-left">
            <img src={Circle} alt="Profile" />
            <h1>@{profileDetails.username}</h1>
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
                <p className="p2">First Name:</p>
                <p className="p3">{profileDetails.first_name}</p>
                <p className="p4">Last Name:</p>
                <p className="p5">{profileDetails.last_name}</p>
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
                <p>{profileDetails.bio}</p>
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
            {postContents.map((postContent, key) => {
              const formattedDate = new Date(postContent.published_at)
                .toISOString()
                .split("T")[0];

              return (
                <Works
                  work={postContent.post_id}
                  key={key}
                  title={postContent.title}
                  datePosted={formattedDate}
                  workImage={postContent.image}
                  totalComments={postContent.total_comments}
                  totalBookmarks={postContent.total_bookmarks}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
