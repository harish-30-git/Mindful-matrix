import React, { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Insight() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const moods = await fetchWithToken("https://mindmatrix-3.onrender.com/api/weekly-moods");
        setData(moods);
      } catch (err) {
        console.error("Error loading moods:", err);
      }
    };
    loadData();
  }, []);

  // ---- Static pie chart values ----
  const pieData = [
    { name: "Happy", value: 4 },
    { name: "Anxious", value: 3 },
    { name: "Stressed", value: 2 },
    { name: "Neutral", value: 1 },
  ];

  const COLORS = ["#facc15", "#805ad5", "#e53e3e", "#718096"];

  return (
    <div className="flex flex-col bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 min-h-screen p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Your Mood Insights
      </h1>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Weekly Mood Trend
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ stroke: "#a3a3a3", strokeDasharray: 2 }}
                wrapperStyle={{ outline: "none" }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#4c51bf"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 9 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Mood Distribution
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
