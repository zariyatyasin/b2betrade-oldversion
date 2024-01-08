/* This example requires Tailwind CSS v2.0+ */

export default function StatusCard({ name, stat }) {
  return (
    <div
      key={name}
      className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
    >
      <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {stat.toLocaleString()}
      </dd>
    </div>
  );
}
