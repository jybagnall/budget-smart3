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
import { formatMoney } from "@/app/_services/utils";

export default function ({ result }) {
  return (
    <div>
      <p className="text-gray-700 mb-5 text-xllg/7 font-bold sm:truncate sm:text-2xl sm:tracking-tight">
        Spending Trend - Last 3 Months
      </p>

      <ResponsiveContainer width={"100%"} height={250}>
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
          <YAxis tickFormatter={(value) => `$${formatMoney(value)}`} />
          <Tooltip
            formatter={(value, name) => {
              const labelMap = {
                actual_spending: "Spent",
                budget: "Budget",
              };
              return [`$${formatMoney(value)}`, labelMap[name] || name];
            }}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar
            dataKey="actual_spending"
            minPointSize={5}
            fill="#6ee7b7"
            activeBar={<Rectangle fill="#6ee7b7" stroke="#fafaf9" />}
          />
          <Bar
            dataKey="budget"
            fill="#cbd5e1"
            activeBar={<Rectangle fill="#cbd5e1" stroke="#fafaf9" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
