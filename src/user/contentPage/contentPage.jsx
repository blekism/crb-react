import React, { useState, useEffect } from "react";
import "./contentPage.css";
import Navbar from "../Navbar/Navbar";
import bookmark from "../../assets/images/bookmark.png";
import comment from "../../assets/images/comment.png";
import view from "../../assets/images/view.png";
import Commentuser from "./commentUser";
import RepOrComment from "./reportButton";
import LaunchModal from "./launchModal";
import EditUploadModal from "../Homepage/UploadModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Edit from "../../assets/images/Edit.svg";
import Bookmarked from "../../assets/images/bookmarked.png";
import ReactLoading from "react-loading";

export default function Contentpage() {
  const location = useLocation();
  const { post_id } = location.state || {};
  const { owner } = location.state || {};
  const [postContent, setPostContent] = useState({});
  const [postComment, setPostComment] = useState([]);
  const [cookies] = useCookies(["logged_user"]);
  const jwt = cookies.logged_user;
  const [viewerIsOwner, setViewerIsOwner] = useState(false);
  const decoded = jwtDecode(jwt);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userComment, setComment] = useState({
    myComment: "",
    post_id: post_id,
  });
  const [userReport, setReport] = useState({
    myReport: "",
    post_id: post_id,
  });

  useEffect(() => {
    if (post_id) {
      axios
        .post(
          "http://localhost/crb-react/PHP/api/read/read_content.php",
          { post_id: post_id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === 200) {
            console.log(response.data.data);

            setPostContent(response.data.data);
          } else {
            console.log("No data found hehe");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      if (owner) {
        //checks if the viewer is the owner of the post
        try {
          if (decoded.user_id === owner) {
            setViewerIsOwner(true);
          } else {
            setViewerIsOwner(false);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        //if no owner is passed, viewer is not owner
        setViewerIsOwner(false);
      }

      axios //checks if this specific post is bookmarked by the viewer
        .post(
          "http://localhost/crb-react/PHP/api/read/readIfBookmarked.php",

          { post_id: post_id, user_id: decoded.user_id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            setIsBookmarked(true);
          } else {
            setIsBookmarked(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post(
          "http://localhost/crb-react/PHP/api/read/read_comment.php",
          { post_id: post_id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            console.log(response.data.data);
            setPostComment(response.data.data);
          } else {
            console.log("No data found hehe");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    axios
      .post(
        "http://localhost/crb-react/PHP/api/create/newread.php",
        {
          post_id: post_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.logged_user,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          console.log("Successfully added to views");
        } else if (response.data.status === 201) {
          console.log(response.data);
          console.log("post already viewed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBookmark = () => {
    if (!isBookmarked) {
      console.log("adding bookmark");
      axios
        .post(
          "http://localhost/crb-react/PHP/api/create/bookmark.php",
          { post_id: post_id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.logged_user,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.status === 201) {
            console.log(response.data);
            setIsBookmarked(true);
          } else if (response.data.status === 409) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("deleting bookmark");
      axios
        .post(
          "http://localhost/crb-react/PHP/api/delete/delete_bookmark.php",
          { post_id: post_id },
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
          if (response.data.status === 200) {
            setIsBookmarked(false);
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setComment({
      ...userComment,
      [name]: value,
    });
  };

  const handleReportChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setReport({
      ...userReport,
      [name]: value,
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(userComment);
    setLoading(true);

    axios
      .post(
        "http://localhost/crb-react/PHP/api/create/insert_comment.php",
        userComment,
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
        if (response.data.status === 201) {
          console.log(response.data);
          setLoading(false);
          window.location.reload();

          setComment({
            myComment: "",
          });
        } else {
          console.log(response.data);
          window.location.reload();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
        setLoading(false);
      });
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log(userReport.myReport);
    setLoading(true);

    axios
      .post(
        "http://localhost/crb-react/PHP/api/create/report_post.php",
        userReport,
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
        if (response.data.status === 201) {
          setLoading(false);
          window.location.reload();
          console.log(response.data);
          setReport({
            myReport: "",
          });
        } else {
          setLoading(false);
          console.log(response.data);
          window.location.reload();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        window.location.reload();
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
      <Navbar />
      <div className="flex-content-parent">
        <div className="flex-content-parent-left">
          <div className="flex-content-left">
            <div className="totalComments">
              <img
                src={comment}
                className="search-icon"
                style={{ height: "50px", width: "50px" }}
              />
              <p>1.2k</p>
            </div>

            <div className="totalBookmarks">
              <img
                src={bookmark}
                className="search-icon"
                style={{ height: "50px", width: "50px" }}
              />
              <p>1.2k</p>
            </div>

            <div className="totalViews">
              <img
                src={view}
                className="search-icon"
                style={{ height: "50px", width: "50px" }}
              />
              <p>1.2k</p>
            </div>

            <div className="datePosted">
              <p>Dec 28, 2024</p>
            </div>
          </div>
        </div>

        {/* DITO UNG MGA CONTENTS */}

        <div className="flex-content-parent-right">
          <div className="title-right">
            <h1>{postContent.title}</h1>
            <div>
              {isBookmarked ? (
                <img
                  src={Bookmarked}
                  className="search-icon"
                  onClick={() => handleBookmark()}
                  style={{
                    height: "50px",
                    width: "50px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <img
                  src={bookmark}
                  className="search-icon"
                  onClick={() => handleBookmark()}
                  style={{
                    height: "50px",
                    width: "50px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
              )}

              {viewerIsOwner && (
                <>
                  <LaunchModal Edit={Edit} />
                  <EditUploadModal postID={post_id} />
                </>
              )}
            </div>
          </div>
          <div>
            <p>by {postContent.username}</p>
          </div>

          <div>{postContent.content}</div>
          <div>{postContent.category_id}</div>
          <div>{postContent.tag_id}</div>

          <hr />
          <div className="button-right">
            <RepOrComment
              name={"myReport"}
              title={"Report this Post"}
              hint={"What is your issue with this post?"}
              target={"reportmodal"}
              content={userReport.myReport}
              handleChange={handleReportChange}
              handleSubmit={handleReportSubmit}
            />
          </div>
        </div>
      </div>

      <hr style={{ marginLeft: "100px", marginRight: "100px" }} />

      <div className="flex-content-bottom">
        <div className="commentTitle">
          <h2>COMMENTS</h2>
          <RepOrComment
            name={"myComment"}
            title={"Leave a Comment"}
            hint={"Tell us what you think about this post"}
            target={"commentmodal"}
            content={userComment.myComment}
            handleChange={handleCommentChange}
            handleSubmit={handleCommentSubmit}
          />
        </div>
        <div className="commentName">
          {postComment.map((postComment, index) => (
            <Commentuser
              key={index}
              name={postComment.username}
              date={postComment.created_at}
              comment={postComment.content}
            />
          ))}
        </div>
      </div>
    </>
  );
}
