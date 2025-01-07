import React from "react";
import "./AdminDashboard.css";
import Sidebar from "../Sidebar";
import StatisticsTemplate from "./AdminStatisticsTemplate";
import StatsChart from "./AdminLineAndBarChart";
import PieChart from "./AdminPieCharts";

export default function AdminDashboard({
  statsTitle,
  statsValue,
  statsIncrease,
}) {
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
                  statsValue="100"
                  statsIncrease="+10"
                ></StatisticsTemplate>
                <StatisticsTemplate
                  statsTitle="Total Users"
                  statsValue="100"
                  statsIncrease="+10"
                ></StatisticsTemplate>
                <StatisticsTemplate
                  statsTitle="Active Users"
                  statsValue="100"
                  statsIncrease="+10"
                ></StatisticsTemplate>
                <StatisticsTemplate
                  statsTitle="Total Comments"
                  statsValue="100"
                  statsIncrease="+10"
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
