import React, { useState, useEffect } from "react";
import "./UploadModal.css";
import HomepageDropdown from "./HomepageDropdown.jsx";
import axios from "axios";
import { useCookies } from "react-cookie";
import ReactLoading from "react-loading";
// import vid from "../../assets/images/nananaCut.mp4";
import { useNavigate } from "react-router-dom";
// import vid from "../../assets/images/ugh.mp4";

export default function UploadModal({ postID }) {
  const navigate = useNavigate();
  const [genre, setGenre] = useState([]);
  const [type, setType] = useState([]);
  const [cookies] = useCookies(["logged_user"]);
  const [SelectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Postcontent, setPostContent] = useState({
    title: "",
    content: "",
    type: "",
    genre: [],
  });
  const [items, setItems] = useState([
    {
      name: "Genre",
    },
  ]);

  console.log(postID);

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setPostContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleTypeChange = (selectedItem) => {
    setPostContent((prevContent) => ({
      ...prevContent,
      type: selectedItem,
    }));
  };

  const handleGenreChange = (selectedItem, index) => {
    setPostContent((prevContent) => {
      const updatedGenres = [...prevContent.genre];
      updatedGenres[index] = { genre_id: selectedItem };
      return {
        ...prevContent,
        genre: updatedGenres,
      };
    });
  };

  // Filter genres to exclude already selected genres
  const getFilteredGenres = (index) => {
    return genre.filter(
      (g) =>
        !Postcontent.genre.some(
          (selected, i) => selected.genre_id === g.id && i !== index
        )
    );
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const handleContentSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    setLoading(true);

    // Check if Postcontent.type is selected
    if (!Postcontent.type) {
      alert("Please select a post type.");
      setLoading(false);
      return;
    }

    // Check if all genres are selected
    if (Postcontent.genre.length === 0) {
      alert("Please select a genre for each tag.");
      setLoading(false);
      return;
    }
    formData.append("file", SelectedFile);
    formData.append("postContent", JSON.stringify(Postcontent));
    formData.append("post_id", postID);

    const apiUrl = postID
      ? "http://localhost/crb-react/PHP/api/update/update_content.php"
      : "http://localhost/crb-react/PHP/api/create/post_content.php";

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + cookies.logged_user,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setLoading(false);
          console.log(response.data);
          alert("Post successful!");
          window.location.reload();
        } else if (response.data.status === 422) {
          console.log(response.data);
          setLoading(false);
          alert(
            "Your post was flagged and rejected due to inappropriate content."
          );

          if (postID) {
            navigate("/Homepage");
            window.location.reload();
          } else {
            window.location.reload();
          }
        } else {
          console.log(response.data);
          setLoading(false);
          alert("An unexpected error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("An unexpected error occurred. Please try again later.");
      });
  };

  // purpose is to get the genre and type data for the dropdowns
  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readGenre.php")
      .then((response) => {
        if (response.data.status === 200) {
          setGenre(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readType.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setType(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // the purpose of this function is to add a new genre tag to a post
  const addElement = () => {
    if (items.length < 3) {
      setItems([...items, { name: "Genre" }]);
    } else {
      alert("You can only add up to 3 genres.");
    }
  };

  // the purpose of this function is to delete a genre tag from a post. prevents deleting the last genre tag
  const removeElement = (index) => {
    if (items.length <= 1) {
      alert("You must have at least 1 genre.");
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  useEffect(() => {
    if (postID) {
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
        .then((response) => {
          if (response.data.status === 200) {
            console.log(response.data);
            setPostContent(response.data.data);
          } else {
            console.log("No data found hehe");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPostContent({
        title: "",
        content: "",
        type: "",
        genre: [],
      });
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loadProgress">
          <ReactLoading type="bars" color="#133e87" height={100} width={100} />
          {/* <video width="600" autoPlay controls>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video element.
          </video> */}
        </div>
      ) : (
        <></>
      )}

      <div
        className="modal fade"
        id="UploadModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
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
                Post Your Story
                {/* {postID} */}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ margin: "0" }}
              ></button>
            </div>
            <form onSubmit={handleContentSubmit}>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Title
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="How would you like to title your story?"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="title"
                    onChange={handleContentChange}
                    value={Postcontent.title}
                    required
                  />
                </div>
                <div className="modalContentParent">
                  <div className="mb-3 upload-text-area">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Tell me how your story goes..."
                      style={{
                        height: "40vh",
                        maxHeight: "40vh",
                        resize: "none",
                        fontSize: "16px",
                      }}
                      onChange={handleContentChange}
                      name="content"
                      value={Postcontent.content}
                      required
                    ></textarea>
                  </div>
                  <div className="upload-options">
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
                          Current optionsz will remain unchanged if this field
                          is left blank.
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
                  </div>
                </div>
              </div>
              <div className="modal-footer custom-footer">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload your story cover *optional*
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="imageUpload"
                    onChange={handleSelectImage}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
