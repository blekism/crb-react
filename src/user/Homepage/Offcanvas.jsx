import React, { useState, useEffect } from "react";
import "./Offcanvas.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Offcanvas({ item }) {
  const [selectedPost, setSelectedPost] = useState({});
  const navigate = useNavigate();
  console.log(item.post_id);

  // useEffect(() => {
  //   if (item && item.post_id) {
  //     axios
  //       .post(
  //         "http://localhost/crb-react/PHP/api/read/read_content.php",
  //         { post_id: item.post_id },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         if (response.data.status === 200) {
  //           console.log(response.data);
  //           setSelectedPost(response.data.data);
  //         } else {
  //           console.log("No data found hehe");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [item]);

  const handleReadNow = () => {
    navigate("/Contentpage", { state: { post_id: item.post_id } });
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          About this Post
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="offcanvas-parent-content">
          <div className="offcanvas-image">
            <img
              className="offcanvas-post-image"
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className="offcanvas-title">
            <p>{item.title}</p>
            <p>{item.author}</p>
          </div>
          <div className="offcanvas-tags">Genre</div>
          <div className="offcanvas-buttons">
            <button
              type="button"
              className="btn"
              data-bs-dismiss="offcanvas"
              style={{
                color: "white",
                fontWeight: "400",
                height: "45px",
                backgroundColor: "#658ABD",
              }}
              onClick={handleReadNow}
            >
              <p>Read Now</p>
            </button>
            <button
              type="button"
              className="btn"
              style={{
                color: "white",
                fontWeight: "400",
                height: "45px",
                backgroundColor: "#658ABD",
              }}
            >
              Save this Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
