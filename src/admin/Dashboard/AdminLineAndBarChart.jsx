import React from "react";
import StatsChartTemplate from "./AdminStatsChartsTemplate";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

export default function AdminLineAndBarChart() {
  const data = [
    { name: "January", posts: 4000 },
    { name: "February", posts: 3000 },
    { name: "March", posts: 2000 },
    { name: "April", posts: 2780 },
    { name: "May", posts: 1890 },
    { name: "June", posts: 2390 },
    { name: "July", posts: 3490 },
  ];
  return (
    <>
      <div
        className="AdminLineAndBarChart"
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      >
        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer>
            <AreaChart width={300} height={100} data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 14 }} />
              <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} />
              <Tooltip />
              {/* <Legend /> */}
              <Area
                type="monotone"
                dataKey="posts"
                // stroke="#133E87"
                // strokeWidth={1}
                fill="rgb(85, 157, 219)"
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatsChartTemplate>

        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer>
            <LineChart width={300} height={100} data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 14 }} />
              <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="posts"
                stroke=" #8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </StatsChartTemplate>

        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer>
            <LineChart width={300} height={100} data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 14 }} />
              <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="posts"
                stroke=" #8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </StatsChartTemplate>

        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer>
            <BarChart width={300} height={100} data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 14 }} />
              <YAxis tick={{ fill: "#ffffff", fontSize: 14 }} />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="posts" fill="rgb(240, 220, 132)" />
            </BarChart>
          </ResponsiveContainer>
        </StatsChartTemplate>
      </div>
    </>
  );
}
