import React from "react";

export default function StatisticsTemplate({ statsTitle, children }) {
  return (
    <>
      <div
        className="ProfilePageParent"
        style={{
          backgroundColor: "#133E87",
          width: "100%",
          height: "20vh",
          borderRadius: "10px",
          color: "white",
          padding: "10px",
        }}
      >
        <p
          className="stats-title"
          style={{
            color: "white",
            fontWeight: "600",
          }}
        >
          {statsTitle}
        </p>
        {children}
      </div>
    </>
  );
}
