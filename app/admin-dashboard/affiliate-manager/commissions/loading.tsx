export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 bg-gray-700 rounded w-64 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-96 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded w-32 animate-pulse"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-8 bg-gray-700 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="h-10 bg-gray-700 rounded flex-1 animate-pulse"></div>
          <div className="h-10 bg-gray-700 rounded w-40 animate-pulse"></div>
          <div className="h-10 bg-gray-700 rounded w-40 animate-pulse"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg">
        <div className="p-6 border-b border-gray-700">
          <div className="h-6 bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-64 mt-2 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
