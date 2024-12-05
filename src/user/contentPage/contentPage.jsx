import React from "react";
import "./contentPage.css";
import Navbar from "../Navbar/Navbar";
import bookmark from "../../assets/images/bookmark.png";
import comment from "../../assets/images/comment.png";
import view from "../../assets/images/view.png";
import Commentuser from "./commentUser";
import Commentbutton from "./commentButton";
import ReportButton from "./reportButton";

export default function Contentpage() {
  const comments = [
    { name: "V2day", date: "November 20,2024", comment: "lalalalalal" },
    { name: "user2", date: "date2", comment: "comment2" },
    { name: "user3", date: "date3", comment: "comment3" },
    { name: "user4", date: "date4", comment: "comment4" },
    { name: "user5", date: "date5", comment: "comment5" },
  ];
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

        <div className="flex-content-parent-right">
          <div className="title-right">
            <h1>TITLE</h1>
            <img
              src={bookmark}
              className="search-icon"
              style={{ height: "50px", width: "50px" }}
            />
          </div>
          <div>
            <p>by user blabla</p>
          </div>

          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            at faucibus lectus, at pretium magna. Sed viverra aliquet dolor ac
            mollis. Curabitur feugiat orci vel lorem semper, eu ultrices purus
            gravida. Quisque in velit non ipsum tincidunt efficitur. Mauris
            euismod, ante nec interdum efficitur, nisl ipsum ultrices enim, in
            luctus orci nisl eget felis. Mauris eu ex feugiat, euismod nisi
            quis, interdum nunc. Vivamus ornare tincidunt lectus eu faucibus.
            Nullam in convallis justo. Donec sollicitudin, est nec egestas
            maximus, odio felis tincidunt neque, semper venenatis lorem mi in
            quam. Phasellus eleifend at risus sed tristique. In hac habitasse
            platea dictumst. Vestibulum eget posuere diam, at dictum metus.
            Aenean vehicula leo mattis augue consequat maximus. Cras non ante
            non libero tempus sollicitudin vel at odio. Pellentesque quis
            elementum elit. Donec sit amet nisi ipsum. Pellentesque vitae
            finibus dolor. Aenean varius quis justo sit amet gravida. Nunc
            hendrerit scelerisque dui, sed pulvinar ante elementum eu. Cras
            pulvinar nisi non leo tempor, quis imperdiet lectus condimentum.
            Praesent blandit ullamcorper commodo. In ultricies orci a felis
            fringilla, a aliquam justo dapibus. Donec ut vehicula est. Mauris
            blandit, nibh quis rutrum imperdiet, mauris quam fermentum lacus,
            sed rutrum orci ante sit amet ligula. Donec aliquet risus dolor,
            quis dapibus diam vulputate quis. sollicitudin, est nec egestas
            maximus, odio felis tincidunt neque, semper venenatis lorem mi in
            quam. Phasellus eleifend at risus sed tristique. In hac habitasse
            platea dictumst. Vestibulum eget posuere diam, at dictum metus.
            Aenean vehicula leo mattis augue consequat maximus. Cras non ante
            non libero tempus sollicitudin vel at odio. Pellentesque quis
            elementum elit. Donec sit amet nisi ipsum. Pellentesque vitae
            finibus dolor. Aenean varius quis justo sit amet gravida. Nunc
            hendrerit scelerisque dui, sed pulvinar ante elementum eu. Cras
            pulvinar nisi non leo tempor, quis imperdiet lectus condimentum.
            Praesent blandit ullamcorper commodo. In ultricies orci a felis
            fringilla, a aliquam justo dapibus. Donec ut vehicula est. Mauris
            blandit, nibh quis rutrum imperdiet, mauris quam fermentum lacus,
            sed rutrum orci ante sit amet ligula. Donec aliquet risus dolor,
            quis dapibus diam vulputate quis.sollicitudin, est nec egestas
            maximus, odio felis tincidunt neque, semper venenatis lorem mi in
            quam. Phasellus eleifend at risus sed tristique. In hac habitasse
            platea dictumst. Vestibulum eget posuere diam, at dictum metus.
            Aenean vehicula leo mattis augue consequat maximus. Cras non ante
            non libero tempus sollicitudin vel at odio. Pellentesque quis
            elementum elit. Donec sit amet nisi ipsum. Pellentesque vitae
            finibus dolor. Aenean varius quis justo sit amet gravida. Nunc
            hendrerit scelerisque dui, sed pulvinar ante elementum eu. Cras
            pulvinar nisi non leo tempor, quis imperdiet lectus condimentum.
            Praesent blandit ullamcorper commodo. In ultricies orci a felis
            fringilla, a aliquam justo dapibus. Donec ut vehicula est. Mauris
            blandit, nibh quis rutrum imperdiet, mauris quam fermentum lacus,
            sed rutrum orci ante sit amet ligula. Donec aliquet risus dolor,
            quis dapibus diam vulputate quis.
          </div>
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
          {comments.map((comment) => (
            <Commentuser
              name={comment.name}
              date={comment.date}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    </>
  );
}
