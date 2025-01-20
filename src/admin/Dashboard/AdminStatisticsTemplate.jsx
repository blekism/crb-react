import React from "react";

export default function AdminStatisticsTemplate({
  statsTitle,
  statsValue,
  statsIncrease,
}) {
  return (
    <>
      <div
        className="AdminStatisticsTemplate"
        style={{
          backgroundColor: "rgba(101, 138, 189, 0.3)",
          width: "25%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          color: "black",
          padding: "20px",
          lineHeight: "18px",
        }}
      >
        <p
          className="stats-title"
          style={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {statsTitle}
        </p>
        <p
          className="stats-title"
          style={{
            fontSize: "35px",
            fontWeight: "bold",
          }}
        >
          {statsValue}
        </p>
        <p
          className="stats-title"
          style={{
            backgroundColor: "#133E87",
            color: "white",
            borderRadius: "30px",
            fontSize: "15px",
            width: "fit-content",
            padding: "10px",
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          {statsIncrease}
        </p>
      </div>
    </>
  );
}
