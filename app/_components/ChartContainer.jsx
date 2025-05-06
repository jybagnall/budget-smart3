"use client";
import { useState } from "react";
import { applyHexColor, applyTextColor } from "@/app/_services/utils";
import ChartWithData from "@/app/_components/ChartWithData";
import ChartEmpty from "@/app/_components/ChartEmpty";

export default function ChartContainer({ totalSumPerCategory }) {
  const [hovered, setHovered] = useState(null);

  const chartData = totalSumPerCategory
    .map((category, index) => {
      const baseColor = applyHexColor(category.category_name);
      const ishovered = hovered === index;
      const value = parseFloat(category.total || 0);

      return {
        title: category.category_name,
        value,
        color: ishovered ? "#e0f2fe" : baseColor,
      };
    })
    .filter((object) => object.value > 0);

  const isChartEmpty =
    chartData.length === 0 || chartData.every((d) => d.value === 0);

  const labelStyle = ({ dataEntry }) => ({
    fill: dataEntry?.color && applyTextColor(dataEntry.color),
    fontSize: "5px",
    fontWeight: "bold",
    pointerEvents: "none",
  });

  return (
    <div className="w-60 h-60 mt-5">
      {isChartEmpty ? (
        <ChartEmpty />
      ) : (
        <ChartWithData
          chartData={chartData}
          labelStyle={labelStyle}
          setHovered={setHovered}
        />
      )}
    </div>
  );
}
