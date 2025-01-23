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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

export default function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState({});
  const [postContents, setPostContents] = useState([]);
  const [cookies] = useCookies(["logged_user"]);
  const [postsData, setPostsData] = useState([]);
  const [totalCommentsData, setTotalCommentsData] = useState([]);
  const [totalBookmarksData, setTotalBookmarksData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readYourTotalPosts.php",
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
        setPostsData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readYourPostsTotalComment.php",
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
        setTotalCommentsData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readYourPostsTotalBookmarks.php",
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
        setTotalBookmarksData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <p
            className="label"
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Title: {`${payload[0].payload.title}`}
          </p>
          <p className="intro">
            <span>{`Total Comments: `}</span>
            <span>{`${payload[0].value}`}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  const CustomTooltip1 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <p
            className="label"
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Date: {`${payload[0].payload.Month}`}
          </p>
          <p className="intro">
            <span>{`Total Posts: `}</span>
            <span>{`${payload[0].value}`}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <p
            className="label"
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Title: {`${payload[0].payload.title}`}
          </p>
          <p className="intro">
            <span>{`Total Bookmarks: `}</span>
            <span>{`${payload[0].value}`}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="ProfilePageParent">
        <Navbar isHome={true} />

        <div className="ProfilePageTopCont">
          <div className="ProfilePageTopCont-left">
            <img
              src={profileDetails.image}
              alt="Profile"
              style={{
                objectFit: "cover",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
              }}
            />
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
                  <StatsTemplate statsTitle="Total No. of Posts">
                    <ResponsiveContainer>
                      <AreaChart width={300} height={150} data={postsData}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis
                          dataKey="Month"
                          tick={{ fill: "#ffffff", fontSize: 14 }}
                        />
                        <Tooltip content={<CustomTooltip1 />} />
                        {/* <Legend /> */}
                        <Area
                          type="monotone"
                          dataKey="Posts"
                          fill="rgb(128, 167, 223)"
                          stroke="rgb(240, 240, 240)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </StatsTemplate>

                  <StatsTemplate statsTitle="Total No. of Comments">
                    <ResponsiveContainer>
                      <BarChart
                        width={300}
                        height={150}
                        data={totalCommentsData}
                      >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis
                          dataKey="TotalComments"
                          tick={{ fill: "#ffffff", fontSize: 14 }}
                        />
                        {/* <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} /> */}
                        <Tooltip content={<CustomTooltip />} />
                        {/* <Legend /> */}
                        <Bar
                          dataKey="TotalComments"
                          fill="rgb(128, 223, 223)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </StatsTemplate>
                </div>
                <div className="rightTop-Right2">
                  <StatsTemplate statsTitle="Total No. of Bookmarks">
                    <ResponsiveContainer>
                      <BarChart
                        width={300}
                        height={150}
                        data={totalBookmarksData}
                      >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis
                          dataKey="total_bookmarks"
                          tick={{ fill: "#ffffff", fontSize: 14 }}
                        />
                        {/* <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} /> */}
                        <Tooltip content={<CustomTooltip2 />} />
                        {/* <Legend /> */}
                        <Bar
                          dataKey="total_bookmarks"
                          fill="rgb(223, 206, 128)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </StatsTemplate>
                  <StatsTemplate statsTitle="Empty" />
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
                  owner={postContent.user_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
