import React, { useEffect, useState } from "react";
import "./Posts.css";
import axios from "axios";
import Sidebar from "../Sidebar";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import Delete from "../../assets/images/delRed.svg";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [postType, setPostType] = useState("for_review");

  const handleNavigate = (id) => {
    navigate("/PostView", { state: { post_id: id } });
  };

  useEffect(() => {
    axios //gawing post para makapag pasa ka ng kung anong page yung pinapasa
      .post("http://localhost/crb-react/PHP/api/read/readPosts.php", {
        status: postType,
      })
      .then((response) => {
        if (response.data.status === 200 && response.data.data.length > 0) {
          console.log(response.data.data);
          setPosts(response.data.data);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setPosts([]);
      });
  }, [postType]);

  const handleDeletePost = (postId) => {
    console.log(postId, "postid");
    setLoading(true);
    axios
      .post(
        "http://localhost/crb-react/PHP/api/delete/delete_post.php",
        {
          post_id: postId,
        },
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
        if (response.data.status === 200) {
          console.log(response.data);
          alert("Post deleted successfully!");
          window.location.reload();
          setLoading(false);
        } else {
          console.log(response.data);
          setLoading(false);
          alert("There was an error deleting the post. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An unexpected error occurred. Please try again later.");
        setLoading(false);
      });
  };

  const handleTypeChange = (event) => {
    setPostType(event.target.value);
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
      <div className="Posts-Parent">
        <Sidebar />
        <div className="Posts-Child">
          <div className="Posts-Header">
            <h1>Welcome, Cristian!</h1>
            <p>Here are the latest updates.</p>
          </div>
          <div className="Posts-MainContent">
            <div className="Posts-MainContent-header">
              <h3>Posts</h3>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                name="status"
                onChange={handleTypeChange}
                style={{
                  width: "fit-content",
                  height: "40px",
                  backgroundColor: "rgba(19, 62, 135, 0.81)",
                  color: "white",
                  border: "none",
                }}
              >
                <option value="for_review">FOR REVIEW</option>
                <option value="reviewing">REVIEWING</option>
                <option value="posted">POSTED</option>
                <option value="rejected">REJECTED</option>
              </select>
            </div>

            <div className="Posts-MainContent-Table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">POST ID</th>
                    <th scope="col">USER ID</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">VIEW DETAILS</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length > 0 ? (
                    posts.map((post, key) => (
                      <tr key={key}>
                        <td>{post.post_id}</td>
                        <td>{post.user_id}</td>
                        <td>{post.title}</td>
                        <td>{post.status}</td>
                        <td>
                          <div className="PostsViewModal-ParentCont">
                            <button
                              type="button"
                              className="btn"
                              onClick={() => handleNavigate(post.post_id)}
                              style={{
                                backgroundColor: "#354290",
                                color: "#ffffff",
                              }}
                            >
                              View
                            </button>

                            <div
                              className="modal fade"
                              id="viewItemsModalToggle"
                              aria-hidden="true"
                              aria-labelledby="viewItemsModalToggleLabel"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
                            >
                              <div className="modal-dialog modal-lg  modal-dialog-centered">
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
                                    <div className="postModalBody-rightTopContent">
                                      <div className="postModalBody-rightTopCont1">
                                        <div className="postModalBody-rightTopContent1">
                                          <p>User ID:</p>
                                          <InputTemplate
                                            placeholder="userid"
                                            name="user_id"
                                            // value={profileModalDetails.first_name}
                                            // onChange={handleInputChange}
                                            required
                                          />
                                        </div>
                                        <div className="postModalBody-rightTopContent2">
                                          <p>Status:</p>
                                          <select
                                            className="form-select mb-3"
                                            aria-label="Default select example"
                                            name="is_volunteer"
                                            // value={volunteerItem.is_volunteer}
                                            // onChange={handleChange}
                                            style={{
                                              width: "210px",
                                              backgroundColor:
                                                "rgba(19, 62, 135, 0.21)",
                                            }}
                                          >
                                            <option value="for_review">
                                              For Review
                                            </option>
                                            <option value="reviewing">
                                              Reviewing
                                            </option>
                                            <option value="approved">
                                              Approved
                                            </option>
                                            <option value="rejected">
                                              Rejected
                                            </option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="postModalBody-rightBottomContent">
                                        <p>Title: </p>
                                        <InputTemplate
                                          placeholder="Title"
                                          name="title"
                                          //   value={profileModalDetails.username}
                                          //   onChange={handleInputChange}
                                          required
                                        />
                                        <p>Content:</p>
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          rows="3"
                                          placeholder="Content"
                                          style={{
                                            height: "20vh",
                                            maxHeight: "20vh",
                                            fontSize: "16px",
                                            backgroundColor:
                                              "rgba(19, 62, 135, 0.21)",
                                          }}
                                          //   value={postContents.content || ""}
                                          //   onChange={onChange}
                                        ></textarea>
                                      </div>

                                      <div className="postModalBody-rightTopCont2">
                                        <div className="postModalBody-rightTopContent1">
                                          <p>Analysis Score:</p>
                                          <InputTemplate
                                            placeholder="Analysis Score"
                                            name="analysis_score"
                                            // value={profileModalDetails.first_name}
                                            // onChange={handleInputChange}
                                            readOnly
                                          />
                                        </div>
                                        <div className="postModalBody-rightTopContent2">
                                          <p>Published Date:</p>
                                          <InputTemplate
                                            placeholder="Published Date"
                                            name="published_at"
                                            //   value={profileModalDetails.username}
                                            //   onChange={handleInputChange}
                                            readOnly
                                          />
                                        </div>
                                        <div className="postModalBody-rightTopContent3">
                                          <p>Created Date:</p>
                                          <InputTemplate
                                            placeholder="Created Date"
                                            name="created_at"
                                            //   value={profileModalDetails.username}
                                            //   onChange={handleInputChange}
                                            readOnly
                                          />
                                        </div>
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
                            alt="Delete"
                            className="DeleteIcon"
                            onClick={() => handleDeletePost(post.post_id)}
                            style={{
                              width: "70px",
                              height: "40px",
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Posts found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
