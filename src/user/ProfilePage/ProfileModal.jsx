import React from "react";
import "./ProfileModal.css";
import InputTemplate from "../loginSignupPage/InputTemplate";

export default function ProfileModal() {
  return (
    <>
      <div
        className="modal fade"
        id="profileModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modalBody-rightTopContent">
                <div className="modalBody-rightTopContent1">
                  <p>First Name:</p>
                  <InputTemplate placeholder="First Name" name="firstName" />
                  <p>Username: </p>
                  <InputTemplate placeholder="Username" name="username" />
                </div>
                <div className="modalBody-rightTopContent2">
                  <p>Last Name:</p>
                  <InputTemplate placeholder="Last Name" name="lastName" />
                  <p>Date of Birth: </p>
                  <InputTemplate placeholder="yyyy-mm-dd" name="dob" />
                </div>
              </div>

              <div className="modalBody-rightBottomContent">
                <p>Email:</p>
                <InputTemplate placeholder="Email" name="email" />
                <p>Password: </p>
                <InputTemplate
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                <p>Confirm Password: </p>
                <InputTemplate
                  type="password"
                  placeholder="Confirm Password"
                  name="password"
                />
                <p>Bio: </p>
                <InputTemplate type="text" placeholder="Bio" name="password" />
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
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
