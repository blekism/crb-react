import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarChartTemplate({
  mappy,
  active,
  onClick,
  statsTitle,
  pieData,
  dataPieKey,
  namePieKey,
}) {
  const COLORS = [
    "rgb(85, 157, 219)",
    "rgb(233, 222, 121)",
    "rgb(255, 99, 132)",
    "rgb(186, 104, 200)",
  ];
  return (
    <>
      <div className="PieChartTemplate-Parent">
        <div
          className="PieChartTemplate-tabs"
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: "20",
            cursor: "pointer",
          }}
        >
          {mappy.map((item, key) => (
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
          className="PieChartTemplate-Child"
          style={{
            backgroundColor: "rgba(101, 138, 189, 0.5)",
            width: "100%",
            height: "fit-content",
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
            <PieChart width={400} height={200}>
              <Legend />
              <Tooltip />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                // labelLine={false}
                // label={({ namePieKey, percent }) =>
                //   `${namePieKey} ${(percent * 100).toFixed(0)}%`
                // }
                innerRadius={50}
                outerRadius={130}
                fill="#8884d8"
                // label
                dataKey={dataPieKey}
                nameKey={namePieKey}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
