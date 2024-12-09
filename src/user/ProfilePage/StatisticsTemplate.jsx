import React from "react";

export default function StatisticsTemplate({ statsTitle }) {
  return (
    <>
      <div
        className="ProfilePageParent"
        style={{
          backgroundColor: "#133E87",
          width: "100%",
          height: "20vh",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <p className="stats-title">{statsTitle}</p>
      </div>
    </>
  );
}
