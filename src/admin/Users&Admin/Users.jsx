import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import Sidebar from "../Sidebar";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";

export default function Users() {
  return (
    <>
      <div className="Users-Parent">
        <Sidebar />
        <div className="Users-Child">
          <div className="Users-Header">
            <h1>Welcome, Cristian!</h1>
            <p>Here are the latest updates.</p>
          </div>
          <div className="Users-MainContent">
            <div className="Users-MainContent-header">
              <h3>USERS</h3>
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

            <div className="Users-MainContent-Table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">USER ID</th>
                    <th scope="col">ROLE</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PASSWORD</th>
                    <th scope="col">VIEW DETAILS</th>
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
                                  EDIT USER DETAILS
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
                                <div className="userModalBody-rightTopContent">
                                  <div className="userModalBody-rightTopCont1">
                                    <div className="userModalBody-rightTopContent1">
                                      <p>First Name:</p>
                                      <InputTemplate
                                        placeholder="First Name"
                                        name="first_name"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="modalBody-rightTopContent2">
                                      <p>Last Name:</p>
                                      <InputTemplate
                                        placeholder="Last Name"
                                        name="last_name"
                                        // value={profileModalDetails.last_name}
                                        // onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="userModalBody-rightTopCont2">
                                    <div className="modalBody-rightTopContent1">
                                      <p>Username:</p>
                                      <InputTemplate
                                        placeholder="Username"
                                        name="username"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="userModalBody-rightTopContent2">
                                      <p>Role:</p>
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
                                        <option value="user">User</option>
                                        <option value="guest">Guest</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="userModalBody-rightTopCont3">
                                    <div className="userModalBody-rightTopContent1">
                                      <p>Verified Date:</p>
                                      <InputTemplate
                                        placeholder="Verified Date"
                                        name="username"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        readOnly
                                      />
                                    </div>
                                    <div className="userModalBody-rightTopContent2">
                                      <p>Created Date:</p>
                                      <InputTemplate
                                        placeholder="Created Date"
                                        name="username"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        readOnly
                                      />
                                    </div>
                                  </div>

                                  <div className="userModalBody-rightBottomContent">
                                    <p>Password: </p>
                                    <InputTemplate
                                      placeholder="Password"
                                      name="password"
                                      //   value={profileModalDetails.username}
                                      //   onChange={handleInputChange}
                                      required
                                    />
                                    <p>Email:</p>
                                    <InputTemplate
                                      placeholder="Email"
                                      name="email"
                                      //   value={profileModalDetails.email}
                                      //   onChange={handleInputChange}
                                      required
                                    />
                                    <p>Bio: </p>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="3"
                                      placeholder="Bio"
                                      style={{
                                        height: "10vh",
                                        maxHeight: "10vh",
                                        resize: "none",
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
