import React, { useState } from "react";
import "./loginRegister.css";
import InputTemplate from "./InputTemplate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import VerificationModal from "./verificationModal.jsx";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["logged_user"]);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [userReg, setUserReg] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const getJwtExpiry = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? new Date(payload.exp * 1000) : null;
  };

  const handleChangeReg = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserReg((values) => ({ ...values, [name]: value }));
  };
  const handleChangeLog = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserLog((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitReg = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost/crb-react/PHP/api/create/register.php", userReg)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          alert("check ur email bruh");
          // mag open ng popup na may message na check mo email mo
        } else {
          alert("error");
          //error bobo baka wala kang internet kase
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitLog = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost/crb-react/PHP/api/read/login.php", userLog, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          console.log(response.data);
          setCookie("logged_user", response.data.token, {
            path: "/",
            expires: getJwtExpiry(response.data.token),
            secure: true,
            sameSite: "strict",
            // httpOnly: true,
          });
          navigate("/Homepage");
          setUserLog({
            email: "",
            password: "",
          });
        } else if (response.data.status === 401) {
          alert("Invalid credentials");
          setUserLog({
            email: "",
            password: "",
          });
        } else if (response.data.status === 403) {
          alert("Account unverified");
          setUserLog({
            email: "",
            password: "",
          });
        } else {
          alert("server error");
          setUserLog({
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

            <button
              type="button"
              className="loginSignupChildCont-rightButton"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
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
              <form onSubmit={handleSubmitLog}>
                <InputTemplate
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChangeLog}
                />
                <InputTemplate
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChangeLog}
                />

                <button
                  className="loginSignupChildCont-leftButton"
                  type="submit"
                >
                  <p>Log in</p>
                </button>
              </form>
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
        <VerificationModal />
      </div>
    </>
  );
}
