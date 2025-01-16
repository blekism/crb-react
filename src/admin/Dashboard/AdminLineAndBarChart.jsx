import React, { useEffect, useState } from "react";
import BarChartTemplate from "./BarChartTemplate";
import LineChartTemplate from "./LineChartTemplate";
import axios from "axios";

export default function AdminLineAndBarChart() {
  const [PostsGraph, setPostsGraph] = useState([]);
  const [CommentsGraph, setCommentsGraph] = useState([]);
  const [BookmarksGraph, setBookmarksGraph] = useState([]);
  const [GenrePerPostGraph, setGenrePerPostGraph] = useState([]);
  const [CategoryPerPostGraph, setCategoryPerPostGraph] = useState([]);
  const [activeTabBarGraph, setActiveTabBarGraph] = useState("Genre");
  const [activeTabLineGraph, setActiveTabLineGraph] = useState("Posts");

  const dataBar = ["Genre", "Category"];
  const dataLine = ["Posts", "Comments", "Bookmarks"];

  useEffect(() => {
    axios
      .get("http://localhost/crb-react/PHP/api/read/readTotalPostsGraph.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setPostsGraph(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/crb-react/PHP/api/read/readTotalCommentsGraph.php")
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setCommentsGraph(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "http://localhost/crb-react/PHP/api/read/readTotalBookmarksGraph.php"
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setBookmarksGraph(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "http://localhost/crb-react/PHP/api/read/readTotalGenrePerPostGraph.php"
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setGenrePerPostGraph(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "http://localhost/crb-react/PHP/api/read/readTotalCategoryPerPostGraph.php"
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setCategoryPerPostGraph(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div
        className="AdminLineAndBarChart"
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      >
        <div>
          {activeTabLineGraph === "Posts" ? (
            <LineChartTemplate
              mappy={dataLine}
              active={activeTabLineGraph}
              onClick={(item) => setActiveTabLineGraph(item)}
              statsTitle="Total Posts"
              lineData={PostsGraph}
              dataKeyX="Day"
              dataKeyY="Posts"
              dataColor="rgb(240, 220, 132)"
              strokeColor="rgb(240, 220, 132)"
            />
          ) : activeTabLineGraph === "Comments" ? (
            <LineChartTemplate
              mappy={dataLine}
              active={activeTabLineGraph}
              onClick={(item) => setActiveTabLineGraph(item)}
              statsTitle="Total Comments"
              lineData={CommentsGraph}
              dataKeyX="Day"
              dataKeyY="Comments"
              dataColor="rgb(240, 220, 132)"
              strokeColor="rgb(240, 220, 132)"
            />
          ) : (
            <LineChartTemplate
              mappy={dataLine}
              active={activeTabLineGraph}
              onClick={(item) => setActiveTabLineGraph(item)}
              statsTitle="Total Bookmarks"
              lineData={BookmarksGraph}
              dataKeyX="Day"
              dataKeyY="Bookmarks"
              dataColor="rgb(240, 220, 132)"
              strokeColor="rgb(240, 220, 132)"
            />
          )}
        </div>
        <div>
          {activeTabBarGraph === "Genre" ? (
            <BarChartTemplate
              mappy={dataBar}
              active={activeTabBarGraph}
              onClick={(item) => setActiveTabBarGraph(item)}
              statsTitle="Total Posts Per Genre"
              barData={GenrePerPostGraph}
              dataKeyX="genre"
              dataKeyY="genre_total_post"
              dataColor="rgb(240, 220, 132)"
            />
          ) : (
            <BarChartTemplate
              mappy={dataBar}
              active={activeTabBarGraph}
              onClick={(item) => setActiveTabBarGraph(item)}
              statsTitle="Total Posts Per Category"
              barData={CategoryPerPostGraph}
              dataKeyX="category"
              dataKeyY="category_total_post"
              dataColor="rgb(240, 220, 132)"
            />
          )}
        </div>
      </div>
    </>
  );
}
