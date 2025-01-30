import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./AddAdminModal.css";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import ReactLoading from "react-loading";

export default function AddAdminModal() {
  const [loading, setLoading] = useState(false);
  const [InsertAdmin, setInsertAdmin] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInsertAdmin((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(InsertAdmin);
    setLoading(true);
    axios
      .post(
        "http://localhost/crb-react/PHP/api/create/insertAdmin.php",
        InsertAdmin,
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 201) {
          console.log(response.data);
          alert("Admin added successfully!");
          setInsertAdmin({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          });
          setLoading(false);
          window.location.reload();
        } else {
          console.log(response.data);
          setLoading(false);
          alert("There was an error adding admin. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An unexpected error occurred. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="loadProgress">
          <ReactLoading type="bars" color="#133e87" height={100} width={100} />
        </div>
      ) : (
        <></>
      )}
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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="addAdminModalBody-rightTopContent">
                  <div className="addAdminModalBody-rightTopCont1">
                    <div className="addAdminModalBody-rightTopContent1">
                      <p>First Name:</p>
                      <InputTemplate
                        placeholder="First Name"
                        name="first_name"
                        value={InsertAdmin.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="addAdminModalBody-rightTopContent2">
                      <p>Last Name:</p>
                      <InputTemplate
                        placeholder="Last Name"
                        name="last_name"
                        value={InsertAdmin.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="addAdminModalBody-rightBottomContent">
                    <p>Email:</p>
                    <InputTemplate
                      placeholder="Email"
                      name="email"
                      value={InsertAdmin.email}
                      onChange={handleInputChange}
                      required
                    />
                    <p>Password: </p>
                    <InputTemplate
                      placeholder="Password"
                      name="password"
                      value={InsertAdmin.password}
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
                  // data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
