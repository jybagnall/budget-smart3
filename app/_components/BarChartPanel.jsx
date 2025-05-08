"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

export default function BarChartPanel({ result }) {
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          data={result}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={(entry) => `${entry.date.month}, ${entry.date.year}`}
          />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="actual_spending"
            minPointSize={5}
            fill="#c0abf6"
            activeBar={<Rectangle fill="#a29bfe" stroke="#846bf3" />}
          />
          <Bar
            dataKey="budget"
            fill="#d6d8da"
            activeBar={<Rectangle fill="#daf1ea" stroke="#00695c" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
