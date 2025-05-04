export default function OverviewStatBox({ label, children }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8">
      <dt className="text-sm/6 font-medium text-gray-500">{label}</dt>
      <dd className="w-full flex-none text-xl/10 font-small tracking-tight text-gray-900">
        {children}
      </dd>
    </div>
  );
}
