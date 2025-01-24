import React from "react";
import "./PostView.css";
import back from "../../assets/images/back.png";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import CommentsTemplate from "./CommentsTemplate";
import HomepageDropdown from "../../user/Homepage/HomepageDropdown";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

export default function PostView() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { post_id } = location.state || {};
  console.log(post_id, "post id is: ");
  const [postDeets, setPostDeets] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect called");
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readSinglePost.php",
        {
          post_id: post_id,
        },
        {
          headers: "Content-Type: application/json",
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          setPostDeets(response.data.data);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPostDeets((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(
        "http://localhost/crb-react/PHP/api/update/updatePost.php",
        postDeets,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Post updated successfully!");
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error submitting the form!", error);
        alert("There was an error updating post details!");
        setLoading(false);
      });
  };

  const handleNavigate = () => {
    navigate("/Posts");
  };

  useEffect(() => {
    console.log("useEffect called");
    axios
      .post(
        "http://localhost/crb-react/PHP/api/read/readCommentTbl.php",
        {
          post_id: post_id,
        },
        {
          headers: "Content-Type: application/json",
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          setComments(response.data.data);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="PostView-Parent">
        <div className="PostView-Header">
          <img
            src={back}
            alt="Post"
            onClick={handleNavigate}
            style={{ cursor: "pointer" }}
          />
          <h4
            style={{
              marginTop: "5px",
              paddingLeft: "10px",
              fontWeight: "400",
            }}
          >
            Go Back
          </h4>
        </div>
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
        <form onSubmit={handleSubmit}>
          <div className="PostView-Child">
            <div className="PostView-Child-Left">
              <div className="PostView-Child-Left-Top">
                <div className="PostView-Child-Left-Top-Left">
                  <div className="Top">
                    <div className="UserIdCont">
                      <p>USER_ID:</p>
                      <input
                        className="form-control"
                        placeholder="USER ID"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleInputChange}
                        value={postDeets.user_id}
                        required
                        name="user_id"
                        style={{
                          backgroundColor: "rgba(19, 62, 135, 0.21)",
                          border: "none",
                          height: "40px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="PostStatusCont">
                      <p>Status:</p>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        name="status"
                        value={postDeets.status}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "fit-content",
                          backgroundColor: "rgba(19, 62, 135, 0.81)",
                          color: "white",
                          border: "none",
                          height: "40px",
                        }}
                      >
                        <option value="for_review">FOR REVIEW</option>
                        <option value="reviewing">REVIEWING</option>
                        <option value="posted">POSTED</option>
                        <option value="rejected">REJECTED</option>
                      </select>
                    </div>
                  </div>
                  <div className="TitleCont">
                    <p>Title:</p>
                    <input
                      className="form-control"
                      placeholder="Title"
                      aria-label="title"
                      aria-describedby="basic-addon1"
                      name="title"
                      required
                      value={postDeets.title}
                      onChange={handleInputChange}
                      style={{
                        backgroundColor: "rgba(19, 62, 135, 0.21)",
                        border: "none",
                        height: "40px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="PostView-Child-Left-Top-Right">
                  <p>Analysis Score: </p>
                  <div className="ScoreResult">
                    <p>{postDeets.analysis_score}</p>
                  </div>
                </div>
              </div>
              <div className="PostView-Child-Left-Bottom">
                <div className="PostView-Child-Left-Bottom-Top">
                  <div className="PostView-Child-Left-Bottom-Top-Left">
                    <h3>Content</h3>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Content"
                      name="content"
                      style={{
                        height: "40vh",
                        maxHeight: "40vh",
                        fontSize: "16px",
                        backgroundColor: "rgba(19, 62, 135, 0.21)",
                      }}
                      value={postDeets.content || ""}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  {/* <div className="upload-options">
                  <div className="upper-options">
                    <HomepageDropdown
                      type="Post Type"
                      items={type}
                      isGenre={false}
                      onSelect={handleTypeChange}
                      required
                    />
                    {items.map((item, index) => (
                      <HomepageDropdown
                        key={index}
                        type={
                          Postcontent.genre[index] &&
                          Postcontent.genre[index].genre_id
                            ? "Genre" ||
                              genre.find(
                                (g) =>
                                  g.id === Postcontent.genre[index].genre_id
                              )?.name
                            : "Genre"
                        }
                        required
                        items={getFilteredGenres(index)}
                        remove={() => removeElement(index)}
                        isGenre={true}
                        onSelect={(selectedItem) =>
                          handleGenreChange(selectedItem, index)
                        }
                      />
                    ))}
                  </div>
                  <div
                    className="lower-options"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      flexDirection: "column",
                      alignItems: "end",
                    }}
                  >
                    {!postID ? (
                      <></>
                    ) : (
                      <p>
                        Current optionsz will remain unchanged if this field is
                        left blank.
                      </p>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addElement}
                    >
                      New Genre Tag
                    </button>
                  </div>
                </div> */}
                </div>
                <div className="PostView-Child-Left-Bottom-Cont">
                  <div className="Date">
                    <div className="date1">
                      <p>Published Date:</p>
                      <InputTemplate
                        placeholder="Published Date"
                        name="published_at"
                        value={postDeets.published_at}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                    <div className="date2">
                      <p>Created Date:</p>
                      <InputTemplate
                        placeholder="Created Date"
                        name="created_at"
                        value={postDeets.created_at}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="SaveButton">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="PostView-Child-Right">
              <div className="PostView-Child-Right-Content">
                <p style={{ fontSize: "30px", fontWeight: "550" }}>Comments</p>
                <div className="PostView-Child-Right-Comments">
                  {comments.length > 0 ? (
                    comments.map((comment, key) => (
                      <CommentsTemplate
                        key={key}
                        title={comment.comment_id}
                        datePosted={comment.created_at}
                        commentContent={comment.content}
                        comment_id={comment.comment_id}
                      />
                    ))
                  ) : (
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: "550",
                        color: "grey",
                      }}
                    >
                      No comments available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
