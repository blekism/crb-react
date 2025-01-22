import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import Sidebar from "../Sidebar";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import AddAdminModal from "./AddAdminModal";
import Delete from "../../assets/images/delRed.svg";

export default function Admin() {
  const [admins, setAdmins] = useState([]);
  const [singleReadAdmin, setSingleReadAdmin] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    role: "",
    created_at: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readAdmin.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setAdmins(response.data.data);
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
        "http://localhost/crb-react/PHP/api/read/readSingleAdmin.php",
        { user_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setSingleReadAdmin(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSingleReadAdmin((values) => ({ ...values, [name]: value }));
  };

  const handleDeleteAdmin = (id) => {
    console.log("Item clicked: ", id);
    axios
      .post(
        "http://localhost/crb-react/PHP/api/delete/delete_userAdmin.php",
        {
          user_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                  {admins.map((admin, key) => (
                    <tr key={key}>
                      <td>{admin.user_id}</td>
                      <td>{admin.role}</td>
                      <td>
                        {admin.first_name} {admin.last_name}
                      </td>
                      <td>{admin.email}</td>
                      <td>{admin.password}</td>
                      <td>
                        <div className="AdminViewModal-ParentCont">
                          <button
                            type="button"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#viewAdminModalToggle"
                            onClick={() => handleButtonClick(admin.user_id)}
                            style={{
                              backgroundColor: "#354290",
                              color: "#ffffff",
                            }}
                          >
                            View
                          </button>

                          <div
                            className="modal fade"
                            id="viewAdminModalToggle"
                            aria-hidden="true"
                            aria-labelledby="viewAdminModalToggleLabel"
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
                                          value={singleReadAdmin.first_name}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                      <div className="adminModalBody-rightTopContent2">
                                        <p>Last Name:</p>
                                        <InputTemplate
                                          placeholder="Last Name"
                                          name="last_name"
                                          value={singleReadAdmin.last_name}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="adminModalBody-rightTopCont2">
                                      <div className="adminModalBody-rightTopContent1">
                                        <p>Date Added:</p>
                                        <InputTemplate
                                          placeholder="Date Added"
                                          name="created_at"
                                          value={singleReadAdmin.created_at}
                                          // onChange={handleInputChange}
                                          readOnly
                                        />
                                      </div>
                                      <div className="adminModalBody-rightTopContent2">
                                        <p>Role:</p>
                                        <InputTemplate
                                          placeholder="Role"
                                          name="role"
                                          value={singleReadAdmin.role}
                                          // onChange={handleInputChange}
                                          readOnly
                                        />
                                      </div>
                                    </div>

                                    <div className="adminModalBody-rightBottomContent">
                                      <p>Password: </p>
                                      <InputTemplate
                                        placeholder="Password"
                                        name="password"
                                        value={singleReadAdmin.password}
                                        onChange={handleInputChange}
                                        required
                                      />
                                      <p>Email:</p>
                                      <InputTemplate
                                        placeholder="Email"
                                        name="email"
                                        value={singleReadAdmin.email}
                                        onChange={handleInputChange}
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
                          onClick={() => handleDeleteAdmin(admin.user_id)}
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
