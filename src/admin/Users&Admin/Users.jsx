import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import Sidebar from "../Sidebar";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import Delete from "../../assets/images/delRed.svg";
import ReactLoading from "react-loading";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [singleReadUser, setSingleReadUser] = useState({
    user_id: "",
    role: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bio: "",
    verified_at: "",
    created_at: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readUser.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setUsers(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleButtonClick = async (id) => {
    console.log("Item clicked: ", id);
    try {
      const response = await axios.post(
        "http://localhost/crb-react/PHP/api/read/readSingleUser.php",
        { user_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setSingleReadUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSingleReadUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(
        "http://localhost/crb-react/PHP/api/update/updateUser.php",
        singleReadUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("User Profile updated successfully!");
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error submitting the form!", error);
        alert("There was an error updating user profile!");
        setLoading(false);
      });
  };

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
                  {users.map((user, key) => (
                    <tr key={key}>
                      <td>{user.user_id}</td>
                      <td>{user.role}</td>
                      <td>{user.username}</td>
                      <td>
                        {user.first_name} {user.last_name}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                        <div className="UsersViewModal-ParentCont">
                          <button
                            type="button"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#viewUserModalToggle"
                            onClick={() => handleButtonClick(user.user_id)}
                            style={{
                              backgroundColor: "#354290",
                              color: "#ffffff",
                            }}
                          >
                            View
                          </button>

                          {loading ? (
                            <div className="loadProgress">
                              <ReactLoading
                                type="bars"
                                color="#133e87"
                                height={100}
                                width={100}
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          <div
                            className="modal fade"
                            id="viewUserModalToggle"
                            aria-hidden="true"
                            aria-labelledby="viewUserModalToggleLabel"
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

                                <form onSubmit={handleSubmit}>
                                  <div className="modal-body">
                                    <div className="userModalBody-rightTopContent">
                                      <div className="userModalBody-rightTopCont1">
                                        <div className="userModalBody-rightTopContent1">
                                          <p>First Name:</p>
                                          <InputTemplate
                                            placeholder="First Name"
                                            name="first_name"
                                            value={singleReadUser.first_name}
                                            onChange={handleInputChange}
                                            required
                                          />
                                        </div>
                                        <div className="modalBody-rightTopContent2">
                                          <p>Last Name:</p>
                                          <InputTemplate
                                            placeholder="Last Name"
                                            name="last_name"
                                            value={singleReadUser.last_name}
                                            onChange={handleInputChange}
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
                                            value={singleReadUser.username}
                                            onChange={handleInputChange}
                                            required
                                          />
                                        </div>
                                        <div className="userModalBody-rightTopContent2">
                                          <p>Role:</p>
                                          <InputTemplate
                                            placeholder="Role"
                                            name="role"
                                            value={singleReadUser.role}
                                            // onChange={handleInputChange}
                                            readOnly
                                          />
                                        </div>
                                      </div>

                                      <div className="userModalBody-rightTopCont3">
                                        <div className="userModalBody-rightTopContent1">
                                          <p>Verified Date:</p>
                                          <InputTemplate
                                            placeholder="Verified Date"
                                            name="verified_at"
                                            value={singleReadUser.verified_at}
                                            // onChange={handleInputChange}
                                            readOnly
                                          />
                                        </div>
                                        <div className="userModalBody-rightTopContent2">
                                          <p>Created Date:</p>
                                          <InputTemplate
                                            placeholder="Created Date"
                                            name="created_at"
                                            value={singleReadUser.created_at}
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
                                          value={singleReadUser.password}
                                          onChange={handleInputChange}
                                          required
                                        />
                                        <p>Email:</p>
                                        <InputTemplate
                                          placeholder="Email"
                                          name="email"
                                          value={singleReadUser.email}
                                          onChange={handleInputChange}
                                          required
                                        />
                                        <p>*Bio: </p>
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          rows="3"
                                          placeholder="Bio"
                                          name="bio"
                                          style={{
                                            height: "10vh",
                                            maxHeight: "10vh",
                                            resize: "none",
                                            fontSize: "16px",
                                            backgroundColor:
                                              "rgba(19, 62, 135, 0.21)",
                                          }}
                                          value={singleReadUser.bio || ""}
                                          onChange={handleInputChange}
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
                                      disabled={!singleReadUser.bio.trim()}
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </form>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
