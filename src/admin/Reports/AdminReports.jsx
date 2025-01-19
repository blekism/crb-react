import React from "react";
import "./AdminReports.css";
import Sidebar from "../Sidebar";
import Delete from "../../assets/images/delRed.svg";

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
              <h3>Reports</h3>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                name="event_status"
                // value={eventItem.event_status}
                // onChange={handleChange}
                style={{
                  width: "fit-content",
                  height: "40px",
                  backgroundColor: "rgba(19, 62, 135, 0.81)",
                  color: "white",
                  border: "none",
                }}
              >
                <option value="reported">REPORTED</option>
                <option value="closed">CLOSED</option>
              </select>
            </div>

            <div className="AdminReports-MainContent-Table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">REPORT ID</th>
                    <th scope="col">POST ID</th>
                    <th scope="col">REASON</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">VIEW</th>
                    <th scope="col">ACTION</th>
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
                    <td>
                      <img
                        src={Delete}
                        alt="Edit"
                        className="DeleteIcon"
                        style={{
                          width: "70px",
                          height: "40px",
                        }}
                      />
                    </td>
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
