import React from "react";
import "./AdminReports.css";
import Sidebar from "../Sidebar";

export default function AdminReports() {
  return (
    <>
      <div className="AdminReports-Parent">
        <Sidebar />
        <div className="AdminReports-Child">
          <div className="AdminReports-Header">
            <h1>Welcome, Cristian!</h1>
            <p>Here are the latest updates.</p>
          </div>
          <div className="AdminReports-MainContent">
            <div className="AdminReports-MainContent-header">
              <h3>New Posts</h3>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  fontWeight: "400",
                  height: "45px",
                }}
              >
                Filter
              </button>
            </div>

            <div className="AdminReports-MainContent-Table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">REPORT ID</th>
                    <th scope="col">POST ID</th>
                    <th scope="col">REASON</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">UPDATED AT</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {donations
                    .filter((donation) => donation.status_name === "SUBMITTED")
                    .map((donation, key) => ( */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
