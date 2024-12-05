import React from "react";

export default function CommentUser(props) {
  return (
    <div>
      <h5>By: {props.name}</h5>
      <p>{props.date}</p>
      <p>{props.comment}</p>
    </div>
  );
}
