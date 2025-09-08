import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 7 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 8 },
  { day: "Fri", mood: 4 },
  { day: "Sat", mood: 7 },
  { day: "Sun", mood: 6 },
];

export default function Insight() {
  return (
    // Outer container for the entire page
    <div className="flex flex-col bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 min-h-screen">
      <div className="p-6">
        {/* Title at the top-left */}
        <h1 className="text-3xl font-bold mb-8 text-left text-gray-800">
          Your Mood Insights
        </h1>
        
        {/* Container to center the graph */}
        <div className="flex justify-center">
          {/* Container for the graph with appealing styling */}
          <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-4xl">
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
                
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4c51bf" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4c51bf" stopOpacity={0} />
                  </linearGradient>
                </defs>
                
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4c51bf"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="url(#colorMood)"
                  strokeWidth={0}
                  fillOpacity={1}
                  fill="url(#colorMood)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}