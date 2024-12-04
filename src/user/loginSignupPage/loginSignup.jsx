import React from "react";
import "./loginSignup.css";

export default function LoginSignup() {
  return (
    <>
      <div className="loginSignupParentCont">
        <div className="loginSignupChildCont">
          <div className="loginSignupChildCont-left">
            <div className="contentCont">
              <h1>Sign in Your Account</h1>
              <p>Lorem ipsum</p>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                />
              </div>

              <button className="loginSignupChildCont-rightButton">
                <p>Log in</p>
              </button>
            </div>
          </div>
          <div className="loginSignupChildCont-right">
            <h1>Get Started!</h1>
            <p className="p2">Register your account to continue.</p>

            <div className="loginSignupChildCont-rightTopContent">
              <div className="loginSignupChildCont-rightTopContent1">
                <p>First Name:</p>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="firstName"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                  />
                </div>
                <p>Username: </p>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                  />
                </div>
              </div>

              <div className="loginSignupChildCont-rightTopContent2">
                <p>Last Name:</p>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                  />
                </div>
                <p>Date of Birth: </p>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Date of Birth"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                  />
                </div>
              </div>
            </div>

            <div className="loginSignupChildCont-rightBottomContent">
              <p>Email:</p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                />
              </div>
              <p>Password: </p>
              <div class="input-group mb-3">
                <input
                  type="Password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "rgba(19, 62, 135, 0.21)" }}
                />
              </div>
            </div>

            <button className="loginSignupChildCont-rightButton">
              <p>Sign Up</p>
            </button>
          </div>
          {/* <div className="loginSignupChildCont-right">
            <p className="p1">Welcome Back!</p>
            <p className="p2">
              Please sign to your account with the given details to continue.
            </p>

            <button className="loginSignupChildCont-leftButton">
              <p>Sign Up</p>
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
