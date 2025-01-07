import React from "react";
import StatsChartTemplate from "./AdminStatsChartsTemplate";
import {
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminPieCharts() {
  const data = [
    { name: "Approved", value: 400 },
    { name: "Rejected", value: 300 },
    { name: "For Review", value: 300 },
  ];
  const COLORS = [
    "rgb(85, 157, 219)",
    "rgb(233, 222, 121)",
    "rgb(243, 139, 162)",
  ];
  return (
    <>
      <div
        className="AdminPieChart"
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      >
        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                // labelLine={false}
                // label={({ name, percent }) =>
                //   `${name} ${(percent * 100).toFixed(0)}%`
                // }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </StatsChartTemplate>

        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                // labelLine={false}
                // label={({ name, percent }) =>
                //   `${name} ${(percent * 100).toFixed(0)}%`
                // }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </StatsChartTemplate>

        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                // labelLine={false}
                // label={({ name, percent }) =>
                //   `${name} ${(percent * 100).toFixed(0)}%`
                // }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </StatsChartTemplate>

        <StatsChartTemplate statsTitle="No of Posts">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                // labelLine={false}
                // label={({ name, percent }) =>
                //   `${name} ${(percent * 100).toFixed(0)}%`
                // }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </StatsChartTemplate>
      </div>
    </>
  );
}
