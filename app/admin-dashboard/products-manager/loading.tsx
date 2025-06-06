export default function ProductsManagerLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <div className="h-10 bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded w-96 animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="h-10 bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-black/50 border border-gray-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-600 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-800 rounded w-20 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="bg-black/50 border border-gray-800/50 rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-full lg:w-48 h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-full lg:w-48 h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Products List Skeleton */}
        <div className="bg-black/50 border border-gray-800/50 rounded-lg">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-48 animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-6 border border-gray-700 rounded-lg">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-20 h-20 bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-800 rounded w-full mb-3 animate-pulse"></div>
                      <div className="flex gap-2 mb-3">
                        <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
                        <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-5 bg-gray-800 rounded w-12 animate-pulse"></div>
                        <div className="h-5 bg-gray-800 rounded w-12 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-6 bg-gray-700 rounded w-16 mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-800 rounded w-12 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
