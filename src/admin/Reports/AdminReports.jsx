import React from "react";
import "./AdminReports.css";
import Sidebar from "../Sidebar";
import Delete from "../../assets/images/delRed.svg";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";

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
                    <td>
                      <div className="UsersViewModal-ParentCont">
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#viewItemsModalToggle"
                          //   onClick={() =>
                          //     handleButtonClick(donation.donation_id)
                          //   }
                          style={{
                            backgroundColor: "#354290",
                            color: "#ffffff",
                          }}
                        >
                          View
                        </button>

                        <div
                          className="modal fade"
                          id="viewItemsModalToggle"
                          aria-hidden="true"
                          aria-labelledby="viewItemsModalToggleLabel"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                        >
                          <div className="modal-dialog modal-m  modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  style={{
                                    color: "black",
                                    fontWeight: "600",
                                  }}
                                >
                                  EDIT REPORT DETAILS
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>

                              {/* <form onSubmit={handleSubmit}> */}
                              <div className="modal-body">
                                <div className="reportsModalBody-rightTopContent">
                                  <div className="reportsModalBody-rightTopCont1">
                                    <div className="reportsModalBody-rightTopContent1">
                                      <p>Report ID:</p>
                                      <InputTemplate
                                        placeholder="Report ID"
                                        name="report_id"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="reportsModalBody-rightTopContent2">
                                      <p>Post ID:</p>
                                      <InputTemplate
                                        placeholder="Post ID"
                                        name="post_id"
                                        // value={profileModalDetails.last_name}
                                        // onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="reportsModalBody-rightTopCont2">
                                    <div className="reportsModalBody-rightTopContent1">
                                      <p>Status:</p>
                                      <select
                                        className="form-select mb-3"
                                        aria-label="Default select example"
                                        name="is_volunteer"
                                        // value={volunteerItem.is_volunteer}
                                        // onChange={handleChange}
                                        style={{
                                          width: "210px",
                                          backgroundColor:
                                            "rgba(19, 62, 135, 0.21)",
                                        }}
                                      >
                                        <option value="reported">
                                          Reported
                                        </option>
                                        <option value="closed">Closed</option>
                                      </select>
                                    </div>
                                    <div className="reportsModalBody-rightTopContent2">
                                      <p>Created Date:</p>
                                      <InputTemplate
                                        placeholder="Created Date"
                                        name="created_at"
                                        // value={profileModalDetails.last_name}
                                        // onChange={handleInputChange}
                                        readOnly
                                      />
                                    </div>
                                  </div>

                                  <div className="reportsModalBody-rightBottomContent">
                                    <p>Reason: </p>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="3"
                                      placeholder="Reason"
                                      style={{
                                        height: "20vh",
                                        maxHeight: "20vh",
                                        fontSize: "16px",
                                        backgroundColor:
                                          "rgba(19, 62, 135, 0.21)",
                                      }}
                                      //   value={postContents.content || ""}
                                      //   onChange={onChange}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                >
                                  Save changes
                                </button>
                              </div>
                              {/* </form> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
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
