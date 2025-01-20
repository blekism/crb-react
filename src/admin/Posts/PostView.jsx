import React from "react";
import "./PostView.css";
import back from "../../assets/images/back.png";
import InputTemplate from "../../user/loginSignupPage/InputTemplate";
import CommentsTemplate from "./CommentsTemplate";
import HomepageDropdown from "../../user/Homepage/HomepageDropdown";

export default function PostView() {
  return (
    <>
      <div className="PostView-Parent">
        <div className="PostView-Header">
          <img src={back} alt="Post" />
          <h4
            style={{ marginTop: "5px", paddingLeft: "10px", fontWeight: "400" }}
          >
            Go Back
          </h4>
        </div>

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
                      //   onChange={onChange}
                      //   value={value}
                      //   name={name}
                      readOnly
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
                      name="event_status"
                      // value={eventItem.event_status}
                      // onChange={handleChange}
                      style={{
                        width: "fit-content",
                        backgroundColor: "rgba(19, 62, 135, 0.81)",
                        color: "white",
                        border: "none",
                        height: "40px",
                      }}
                    >
                      <option value="upcoming">FOR REVIEW</option>
                      <option value="ongoing">REVIEWING</option>
                      <option value="finished">APPROVED</option>
                      <option value="closed">REJECTED</option>
                    </select>
                  </div>
                </div>
                <div className="TitleCont">
                  <p>Title:</p>
                  <input
                    className="form-control"
                    placeholder="Title"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    //   onChange={onChange}
                    //   value={value}
                    //   name={name}
                    readOnly
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
                  <p>Negative</p>
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
                    style={{
                      height: "40vh",
                      maxHeight: "40vh",
                      fontSize: "16px",
                      backgroundColor: "rgba(19, 62, 135, 0.21)",
                    }}
                    //   value={postContents.content || ""}
                    //   onChange={onChange}
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
                      name="analysis_score"
                      // value={profileModalDetails.first_name}
                      // onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="date2">
                    <p>Created Date:</p>
                    <InputTemplate
                      placeholder="Published Date"
                      name="published_at"
                      //   value={profileModalDetails.username}
                      //   onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="SaveButton">
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="PostView-Child-Right">
            <div className="PostView-Child-Right-Content">
              <p style={{ fontSize: "30px", fontWeight: "550" }}>Comments</p>
              <div className="PostView-Child-Right-Comments">
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
                <CommentsTemplate
                  title="user1"
                  datePosted="01-17-2024"
                  commentContent="this article is very helpful"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
