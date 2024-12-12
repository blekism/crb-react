import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./ProfileModal.css";
import InputTemplate from "../loginSignupPage/InputTemplate";

export default function ProfileModal() {
  const [profileModalDetails, setProfileModalDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    // password: "",
    bio: "",
  });
  const [cookies] = useCookies(["logged_user"]);

  useEffect(() => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/singleRead_profile.php",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.logged_user,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setProfileModalDetails(response.data.data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileModalDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost/crb-react/PHP/api/update/update_profile.php",
        profileModalDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.logged_user,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error submitting the form!", error);
      });
  };

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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="modalBody-rightTopContent">
                  <div className="modalBody-rightTopContent1">
                    <p>First Name:</p>
                    <InputTemplate
                      placeholder="First Name"
                      name="first_name"
                      value={profileModalDetails.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modalBody-rightTopContent2">
                    <p>Last Name:</p>
                    <InputTemplate
                      placeholder="Last Name"
                      name="last_name"
                      value={profileModalDetails.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="modalBody-rightBottomContent">
                  <p>Username: </p>
                  <InputTemplate
                    placeholder="Username"
                    name="username"
                    value={profileModalDetails.username}
                    onChange={handleInputChange}
                    required
                  />
                  <p>Email:</p>
                  <InputTemplate
                    placeholder="Email"
                    name="email"
                    value={profileModalDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                  <p>Bio: </p>
                  <InputTemplate
                    type="text"
                    placeholder="Bio"
                    name="bio"
                    value={profileModalDetails.bio}
                    onChange={handleInputChange}
                    required
                  />
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
