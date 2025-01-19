import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import Sidebar from "../Sidebar";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import AddAdminModal from "./AddAdminModal";
import Delete from "../../assets/images/delRed.svg";

export default function Admin() {
  return (
    <>
      <div className="Admin-Parent">
        <Sidebar />
        <div className="Admin-Child">
          <div className="Admin-Header">
            <h1>Welcome, Cristian!</h1>
            <p>Here are the latest updates.</p>
          </div>
          <div className="Admin-MainContent">
            <div className="Admin-MainContent-header">
              <h3>ADMIN</h3>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addAdminModal"
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  fontWeight: "400",
                  height: "45px",
                }}
              >
                ADD ADMIN
              </button>
              <AddAdminModal />
            </div>

            <div className="Admin-MainContent-Table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ADMIN ID</th>
                    <th scope="col">ROLE</th>
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
                    <td>
                      <div className="AdminViewModal-ParentCont">
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
                                  EDIT ADMIN DETAILS
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
                                <div className="adminModalBody-rightTopContent">
                                  <div className="adminModalBody-rightTopCont1">
                                    <div className="adminModalBody-rightTopContent1">
                                      <p>First Name:</p>
                                      <InputTemplate
                                        placeholder="First Name"
                                        name="first_name"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="adminModalBody-rightTopContent2">
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

                                  <div className="adminModalBody-rightTopCont2">
                                    <div className="adminModalBody-rightTopContent1">
                                      <p>Date Added:</p>
                                      <InputTemplate
                                        placeholder="Username"
                                        name="username"
                                        // value={profileModalDetails.first_name}
                                        // onChange={handleInputChange}
                                        readOnly
                                      />
                                    </div>
                                    <div className="adminModalBody-rightTopContent2">
                                      <p>Role:</p>
                                      <InputTemplate
                                        placeholder="Role"
                                        name="role"
                                        //   value={profileModalDetails.username}
                                        //   onChange={handleInputChange}
                                        readOnly
                                      />
                                    </div>
                                  </div>

                                  <div className="adminModalBody-rightBottomContent">
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
