export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-8 bg-gray-700 rounded w-80"></div>
              <div className="h-4 bg-gray-700 rounded w-96"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded w-32"></div>
          </div>

          {/* Tabs skeleton */}
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-700 rounded w-32"></div>
            <div className="h-10 bg-gray-700 rounded w-24"></div>
            <div className="h-10 bg-gray-700 rounded w-28"></div>
          </div>

          {/* Stats cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>

          {/* Plans cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
