import React, { useState, useEffect } from "react";
import "./contentPage.css";
import Navbar from "../Navbar/Navbar";
import bookmark from "../../assets/images/bookmark.png";
import comment from "../../assets/images/comment.png";
import view from "../../assets/images/view.png";
import Commentuser from "./commentUser";
import Commentbutton from "./commentButton";
import ReportButton from "./reportButton";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Contentpage() {
  const location = useLocation();
  const { post_id } = location.state || {};
  const [postContent, setPostContent] = useState({});
  const [postComment, setPostComment] = useState([]);

  console.log(post_id);

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
    }
  }, []);

  useEffect(() => {
    if (post_id) {
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
  }, [post_id]);

  return (
    <>
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
            <img
              src={bookmark}
              className="search-icon"
              style={{ height: "50px", width: "50px" }}
            />
          </div>
          <div>
            <p>by {postContent.username}</p>
          </div>

          <div>{postContent.content}</div>
          <div className="button-right">
            <ReportButton />
          </div>
        </div>
      </div>

      <div className="flex-content-bottom">
        <div className="commentTitle">
          <h2>COMMENTS</h2>
          <Commentbutton />
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
