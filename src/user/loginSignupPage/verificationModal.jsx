import React, { useState } from "react";
import InputTemplate from "./InputTemplate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerificationModal({ onClose }) {
  const [verification, setVerification] = useState({
    verification_code: "",
  });
  const navigate = useNavigate();
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
          window.location.reload();
        } else {
          alert("Invalid verification code. check your email for correct code");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="dialog"
        style={{
          display: "flex",
          position: "fixed",
          zIndex: "100",
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="content"
          style={{
            backgroundColor: "white",
            width: "fit-content",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="header">
            <h1 className="title">Verification Code</h1>
            <button
              type="button"
              class="btn btnclose"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              className="body"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputTemplate
                placeholder="Enter Verification Code"
                name="verification_code"
                style={{ fontSize: "30px" }}
                onChange={handleVerifyChange}
              />
            </div>
            <div
              className="footer"
              style={{ display: "flex", columnGap: "10px" }}
            >
              <button type="button" class="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
