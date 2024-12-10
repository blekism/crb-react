import React, { useState } from "react";
import "./loginRegister.css";
import InputTemplate from "./InputTemplate";
import { Link } from "react-router-dom";

export default function LoginSignup() {
  // State to toggle the right-panel-active class
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <>
      <div
        className={`loginSignupParentCont ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="main"
      >
        <div className="loginSignupChildCont">
          {/* Right Panel */}
          <div className="loginSignupChildCont-right">
            <h1>Get Started!</h1>
            <p className="p2">Register in your account to get started.</p>

            <div className="loginSignupChildCont-rightTopContent">
              <div className="loginSignupChildCont-rightTopContent1">
                <p>First Name:</p>
                <InputTemplate placeholder="First Name" name="firstName" />
                <p>Username: </p>
                <InputTemplate placeholder="Username" name="username" />
              </div>
              <div className="loginSignupChildCont-rightTopContent2">
                <p>Last Name:</p>
                <InputTemplate placeholder="Last Name" name="lastName" />
                <p>Date of Birth: </p>
                <InputTemplate placeholder="yyyy-mm-dd" name="dob" />
              </div>
            </div>

            <div className="loginSignupChildCont-rightBottomContent">
              <p>Email:</p>
              <InputTemplate placeholder="Email" name="email" />
              <p>Password: </p>
              <InputTemplate
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>

            <button className="loginSignupChildCont-rightButton">
              <p>Sign Up</p>
            </button>
          </div>

          {/* Left Panel */}
          <div className="loginSignupChildCont-left">
            <div className="contentCont">
              <h1>Sign in Your Account</h1>
              <p>
                Sign in your account <br />
                to continue.
              </p>

              <InputTemplate placeholder="Enter your email" name="email" />
              <InputTemplate
                type="password"
                placeholder="Enter your password"
                name="password"
              />

              {/* gagawin tong nasa axios pagka may working functions na pero
              eto muna for now */}
              <button className="loginSignupChildCont-leftButton">
                <Link
                  to={"/Homepage"}
                  style={{ color: "white", textDecorationLine: "none" }}
                >
                  <p>Log in</p>
                </Link>
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div className="loginSignUpOverlay-parent">
            <div className="loginSignUpOverlay-child">
              <div className="loginSignupChildCont-leftOverlay">
                <p className="p1">Welcome!</p>
                <p className="p2">
                  Please provide the information to register your account.
                </p>
                <p className="p3">Already have an account?</p>
                <button
                  className="leftOverlayButton"
                  onClick={() => setIsRightPanelActive(false)}
                >
                  <p>Log In</p>
                </button>
              </div>

              <div className="loginSignupChildCont-rightOverlay">
                <p className="p1">Welcome Back!</p>
                <p className="p2">
                  Please sign to your account with the given details to
                  continue.
                </p>
                <button
                  className="rightOverlayButton"
                  onClick={() => setIsRightPanelActive(true)}
                >
                  <p>Sign Up</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
