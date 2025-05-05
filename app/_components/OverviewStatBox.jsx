export default function OverviewStatBox({ label, children }) {
  return (
    <div className="w-full sm:w-auto border-t border-gray-900/5 px-4 py-6 sm:px-6 lg:border-t-0 lg:px-8">
      <dt className="text-sm/6 font-medium text-gray-500">{label}</dt>
      <dd className="text-xl font-semibold text-gray-900 mt-2 break-words">
        {children}
      </dd>
    </div>
  );
}
