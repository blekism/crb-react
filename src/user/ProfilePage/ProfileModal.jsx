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
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
