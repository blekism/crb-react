import React, { useState } from "react";
import InputTemplate from "./InputTemplate";
import axios from "axios";

export default function VerificationModal() {
  const [verification, setVerification] = useState({
    verification_code: "",
  });

  const handleVerifyChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setVerification((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost/crb-react/PHP/api/create/account_verify.php",
        verification,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          alert("Account verified!");
        } else {
          alert("Invalid verification code");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Verification Code
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className="modal-body"
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <InputTemplate
                  placeholder="Enter Verification Code"
                  name="verification_code"
                  style={{ fontSize: "30px" }}
                  onChange={handleVerifyChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
