import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./AddAdminModal.css";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";

export default function AddAdminModal() {
  return (
    <>
      <div
        className="modal fade"
        id="addAdminModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addAdminModal">
                ADD AN ADMIN
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="modal-body">
              <div className="addAdminModalBody-rightTopContent">
                <div className="addAdminModalBody-rightTopCont1">
                  <div className="addAdminModalBody-rightTopContent1">
                    <p>First Name:</p>
                    <InputTemplate
                      placeholder="First Name"
                      name="first_name"
                      // value={profileModalDetails.first_name}
                      // onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="addAdminModalBody-rightTopContent2">
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

                <div className="addAdminModalBody-rightBottomContent">
                  <p>Role:</p>
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    name="is_volunteer"
                    // value={volunteerItem.is_volunteer}
                    // onChange={handleChange}
                    style={{
                      backgroundColor: "rgba(19, 62, 135, 0.21)",
                    }}
                  >
                    <option>Select a role</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p>Email:</p>
                  <InputTemplate
                    placeholder="Email"
                    name="email"
                    //   value={profileModalDetails.email}
                    //   onChange={handleInputChange}
                    required
                  />
                  <p>Password: </p>
                  <InputTemplate
                    placeholder="Password"
                    name="password"
                    //   value={profileModalDetails.username}
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
                Submit
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
