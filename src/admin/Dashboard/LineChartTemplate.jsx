import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function LineChartTemplate({
  mappy,
  active,
  onClick,
  statsTitle,
  lineData,
  dataKeyX,
  dataKeyY,
  dataColor,
  strokeColor,
}) {
  return (
    <>
      <div className="LineChartTemplate-Parent">
        <div
          className="LineChartTemplate-tabs"
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: "20",
            cursor: "pointer",
          }}
        >
          {mappy.map((item, key) => (
            //genre
            //category
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                rowGap: "20",
                cursor: "pointer",
                borderRadius: " 5px",
                fontWeight: "600",
              }}
              key={key}
            >
              <div
                style={{
                  marginRight: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor:
                    active === item
                      ? "rgba(101, 138, 189, 0.5)"
                      : "rgba(192, 218, 255, 0.5)",
                  borderRadius: "5px 5px 0 0",
                }}
                onClick={() => onClick(item)}
              >
                {item}
              </div>
            </div>
          ))}
        </div>

        <div
          className="LineChartTemplate-Child"
          style={{
            backgroundColor: "rgba(101, 138, 189, 0.5)",
            width: "100%",
            height: "45vh",
            borderRadius: "0 5px 5px 5px",
            color: "black",
            fontWeight: "600",
            fontSize: "20px",
            padding: "20px",
            paddingBottom: "50px",
          }}
        >
          <p className="stats-title">{statsTitle}</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis
                dataKey={dataKeyX}
                tick={{ fill: "#ffffff", fontSize: 14 }}
              />
              <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKeyY}
                fill={dataColor}
                stroke={strokeColor}
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
