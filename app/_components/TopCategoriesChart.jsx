"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  Rectangle,
} from "recharts";

import { formatMoney } from "@/app/_services/utils";

export default function TopCategoriesChart({ topCategories }) {
  if (!topCategories || topCategories.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No category data available for the selected period.
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-700 mb-5 text-xllg/7 font-bold sm:truncate sm:text-2xl sm:tracking-tight">
        Top Categories Per Month
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={topCategories}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={(entry) => `${entry.monthName}`} />
          <YAxis tickFormatter={(value) => `$${formatMoney(value)}`} />
          <Tooltip
            formatter={(value, props) => {
              const category = props?.payload?.category ?? "Unknown";
              return [`$${formatMoney(value)}`, category];
            }}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar
            dataKey="total"
            barSize={30}
            minPointSize={5}
            fill="#93c5fd"
            activeBar={<Rectangle fill="#bfdbfe" stroke="#fafaf9" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
