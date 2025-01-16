import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Sidebar from "../Sidebar";
import StatisticsTemplate from "./AdminStatisticsTemplate";
import StatsChart from "./AdminLineAndBarChart";
import PieChart from "./AdminPieCharts";
import axios from "axios";

export default function AdminDashboard({
  statsTitle,
  statsValue,
  statsIncrease,
}) {
  const [TotalCountPosts, setTotalCountPosts] = useState({});
  const [TotalCountUsers, setTotalCountUsers] = useState({});
  const [TotalCountComments, setTotalCountComments] = useState({});
  const [PostIncrease, setPostIncrease] = useState({});
  const [CommentIncrease, setCommentIncrease] = useState({});
  const [UserIncrease, setUserIncrease] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readTotalPosts.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setTotalCountPosts(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readTotalUsers.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setTotalCountUsers(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readTotalComments.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setTotalCountComments(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readPostsIncrease.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setPostIncrease(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readCommentsIncrease.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setCommentIncrease(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readUsersIncrease.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setUserIncrease(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="AdminDashboard-Parent">
        <Sidebar />
        <div className="AdminDashboard-Child">
          <div className="AdminDashboard-Header">
            <h1>Welcome, Cristian!</h1>
            <p>Here are the latest updates.</p>
          </div>
          <div className="AdminDashboard-MainContent">
            <div className="AdminDashboard-MainContent-Left">
              {/* statistics start*/}
              <div className="AdminDashboard-Statistics">
                <StatisticsTemplate
                  statsTitle="Total Posts"
                  statsValue={TotalCountPosts.Total_Posts || 0}
                  statsIncrease={`+${PostIncrease.Today_Posts || 0}`}
                ></StatisticsTemplate>
                <StatisticsTemplate
                  statsTitle="Total Users"
                  statsValue={TotalCountUsers.Total_Users || 0}
                  statsIncrease={`+${UserIncrease.Today_Users || 0}`}
                ></StatisticsTemplate>
                <StatisticsTemplate
                  statsTitle="Active Users"
                  statsValue="100"
                  statsIncrease="+10"
                ></StatisticsTemplate>
                <StatisticsTemplate
                  statsTitle="Total Comments"
                  statsValue={TotalCountComments.Total_Comments || 0}
                  statsIncrease={`+${CommentIncrease.Today_Comments || 0}`}
                ></StatisticsTemplate>
              </div>
              {/* statistics end*/}

              {/* line and bar charts start */}
              <div className="AdminDashboard-Charts">
                <StatsChart />
              </div>
              {/* line and bar charts end */}
            </div>
            <div className="AdminDashboard-MainContent-Right">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
