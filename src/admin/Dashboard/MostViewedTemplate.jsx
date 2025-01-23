import React, { useEffect, useState } from "react";
import "./MostViewedTemplate.css";
import MostViewed from "../../assets/images/recentPost.png";

export default function MostViewedTemplate({ title, datePosted }) {
  return (
    <>
      <div className="ViewsTemplateParent">
        <div className="ViewsTemplateChild">
          <img src={MostViewed} alt="Edit" className="DeleteIcon" />
          <div className="ViewsTemplateContent">
            <p className="p1">{title}</p>
            <p className="p2"> {datePosted}</p>
          </div>
        </div>
      </div>
    </>
  );
}
