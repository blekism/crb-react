import React, { useState, useEffect } from "react";
import "./editUploadModal.css";
import HomepageDropdown from "../Homepage/HomepageDropdown.jsx";
import axios from "axios";

export default function editUploadModal({
  placeholder,
  postContent,
  onChange,
  postID,
}) {
  const test = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Fantasy" },
    { id: 6, name: "Historical" },
    { id: 7, name: "Horror" },
    { id: 8, name: "Mystery" },
    { id: 9, name: "Romance" },
    { id: 10, name: "Science Fiction" },
    { id: 11, name: "Thriller" },
    { id: 12, name: "Western" },
  ];
  const [items, setItems] = useState([
    {
      name: "Genre",
    },
  ]);
  const [isFormValid, setIsFormValid] = useState(false);

  const addElement = () => {
    if (items.length < 3) {
      setItems([...items, { name: "Genre" }]);
    } else {
      alert("You can only add up to 3 genres.");
    }
  };

  const removeElement = (index) => {
    if (items.length <= 1) {
      alert("You must have at least 1 genre.");
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const [postContents, setPostContents] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/read_content.php",
        { post_id: postID },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setPostContents(response.data.data);
      });
  }, [postID]);

  return (
    <>
      <div
        className="modal fade"
        id="UploadModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header custom-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ fontWeight: "700", margin: "auto" }}
              >
                Edit Your Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ margin: "0" }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="modalContentParent">
                <div className="mb-3 upload-text-area">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder={placeholder}
                    style={{
                      height: "40vh",
                      maxHeight: "40vh",
                      resize: "none",
                      fontSize: "16px",
                    }}
                    value={postContents.content || ""}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="upload-options">
                  <div className="upper-options">
                    <HomepageDropdown
                      type="Post Type"
                      items={test}
                      isGenre={false}
                    />
                    {items.map((item, index) => (
                      <HomepageDropdown
                        key={index}
                        type={item.name}
                        items={test}
                        remove={() => removeElement(index)}
                        isGenre={true}
                      />
                    ))}
                  </div>
                  <div
                    className="lower-options"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addElement}
                    >
                      New Genre Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer custom-footer">
              <button type="button" className="btn btn-success">
                Submit
              </button>
              <button type="button" className="btn btn-primary">
                Choose an Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
