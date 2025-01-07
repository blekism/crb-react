import React, { Children } from "react";

export default function AdminStatsChartsTemplate({ statsTitle, children }) {
  return (
    <>
      <div
        className="AdminStatsChartsTemplate"
        style={{
          backgroundColor: "rgba(101, 138, 189, 0.5)",
          width: "100%",
          height: "45vh",
          borderRadius: "5px",
          color: "black",
          fontWeight: "600",
          fontSize: "20px",
          padding: "20px",
          paddingBottom: "50px",
        }}
      >
        <p className="stats-title">{statsTitle}</p>
        {children}
      </div>
    </>
  );
}
