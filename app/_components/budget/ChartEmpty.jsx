import { PieChart } from "react-minimal-pie-chart";

export default function ChartEmpty() {
  return (
    <div className="relative flex items-center justify-center w-[200px] min-w-[200px] h-[200px] mx-auto">
      <PieChart
        data={[
          { value: 1, color: "#e5e7eb" },
          { value: 0.5, color: "#0ea5e9" },
        ]}
        lineWidth={20}
        startAngle={270}
        label={() => ""}
        labelStyle={{
          fill: "#888",
          fontSize: "6px",
          fontWeight: "bold",
          pointerEvents: "none",
        }}
        radius={48}
        animate
      />
      <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-semibold pointer-events-none">
        No spending data yet
      </span>
    </div>
  );
}
