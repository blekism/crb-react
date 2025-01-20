import React, { useState, useEffect } from "react";
import PieChartTemplate from "./PieChartTemplate";
import axios from "axios";

export default function AdminPieCharts() {
  const data = [
    { name: "Approved", value: 400 },
    { name: "Rejected", value: 300 },
    { name: "For Review", value: 300 },
  ];

  const [LoggedVSGuest, setLoggedVSGuest] = useState([]);
  const [ReviewStatus, setReviewStatus] = useState([]);
  const [activeTabPieGraph, setActiveTabPieGraph] = useState("Users");

  const dataPie = ["Users", "Reviews"];

  useEffect(() => {
    axios
      .get(
        "http://localhost/crb-react/PHP/api/read/readTotalLoggedVsGuestUser.php"
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setLoggedVSGuest(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "http://localhost/crb-react/PHP/api/read/readTotalReviewDistribution.php"
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setReviewStatus(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div
        className="AdminPieChart"
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      >
        <div>
          {activeTabPieGraph === "Users" ? (
            <PieChartTemplate
              mappy={dataPie}
              active={activeTabPieGraph}
              onClick={(item) => setActiveTabPieGraph(item)}
              statsTitle="Logged vs Guest Users"
              pieData={LoggedVSGuest}
              dataPieKey="total_count"
              namePieKey="role"
            />
          ) : (
            <PieChartTemplate
              mappy={dataPie}
              active={activeTabPieGraph}
              onClick={(item) => setActiveTabPieGraph(item)}
              statsTitle="Reviews Status"
              pieData={ReviewStatus}
              dataPieKey="total_count"
              namePieKey="status"
            />
          )}
        </div>
      </div>
    </>
  );
}
