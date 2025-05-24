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
  return (
    <div>
      <p className="text-gray-700 mb-5 text-xllg/7 font-bold sm:truncate sm:text-2xl sm:tracking-tight">
        Top Categories Per Month
      </p>

      {topCategories.length === 0 ? (
        <div className="h-[250px] w-full flex items-center justify-center border border-dashed rounded-md text-sm text-gray-400">
          Not available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={topCategories}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={(entry) => entry?.monthName || ""} />
            <YAxis tickFormatter={(value) => `$${formatMoney(value)}`} />
            <Tooltip
              formatter={(value, name, props) => {
                const category = props.payload?.category ?? "Unknown";
                return [`$${formatMoney(value)}`, category];
              }}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar
              dataKey="total"
              barSize={30}
              minPointSize={5}
              fill="#93c5fd"
              activeBar={<Rectangle fill="#94b0d3" stroke="#fafaf9" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
