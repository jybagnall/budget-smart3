"use client";

export default function SaveButton({ bgColor, isSubmitting }) {
  return (
    <button
      type="submit"
      className={`w-full rounded-md py-2 text-center font-semibold text-black ${bgColor} ${
        isSubmitting
          ? "opacity-50 cursor-not-allowed bg-gray-500 text-white"
          : "hover:opacity-90"
      }`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Saving..." : "Save"}
    </button>
  );
}
