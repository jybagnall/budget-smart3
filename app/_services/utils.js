export const bgColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-amber-400",
  "bg-violet-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-orange-400",
];

const hexColors = [
  "#f87171", // red-400
  "#60a5fa", // blue-400 (unchanged, already -400)
  "#34d399", // green-400
  "#fbbf24", // amber-400
  "#c4b5fd", // violet-400
  "#fda4af", // pink-400
  "#a5b4fc", // indigo-400
  "#5eead4", // teal-400
  "#fb923c", // orange-400
];

function hashCategory(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function applyRandomColor(categoryName) {
  const index = hashCategory(categoryName) % bgColors.length;
  return bgColors[index];
}

export const applyHexColor = (categoryName) => {
  const index = hashCategory(categoryName) % hexColors.length;
  return hexColors[index];
};

export const applyTextColor = (bgHex) => {
  const rgb = parseInt(bgHex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186 ? "#000" : "#fff";
};

export function getMonthName(monthNum) {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(2000, monthNum)
  );
}

export function formatMoney(number) {
  return Math.floor(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTopThreeNames(array) {
  const slicedArray = array
    .filter((item) => Number(item.total) > 0)
    .sort((a, b) => Number(b.total) - Number(a.total))
    .slice(0, 3);

  if (slicedArray.length === 0) return "No data";

  const resultArray = slicedArray.map(
    (item) => item.category_name || "Unknown"
  );

  return resultArray.join(", ");
}
