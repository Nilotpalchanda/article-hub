export default function Loading() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="block max-w-sm animate-pulse rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-lg"
        >
          <div className="mb-2 h-7 w-3/4 rounded bg-gray-300"></div>
          <div className="h-14 w-full rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
