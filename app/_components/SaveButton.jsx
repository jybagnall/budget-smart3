export default function SaveButton({ bgColor }) {
  return (
    <button
      type="submit"
      className={`w-full rounded-md px-4 py-2 text-gray-900 font-semibold hover:bg-slate-100 ${bgColor}`}
    >
      Save
    </button>
  );
}
