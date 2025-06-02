import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Skeleton className="h-4 w-32 mb-4 bg-gray-700" />
          <Skeleton className="h-8 w-48 mb-2 bg-gray-700" />
          <Skeleton className="h-4 w-64 bg-gray-700" />
        </div>

        <div className="space-y-6">
          {/* Order Summary Skeleton */}
          <Card className="bg-black/50 border-gold-500/30">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 bg-gray-700" />
                      <Skeleton className="h-3 w-48 bg-gray-700" />
                    </div>
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-12 bg-gray-700" />
                    <Skeleton className="h-5 w-20 bg-gray-700" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods Skeleton */}
          <Card className="bg-black/50 border-gold-500/30">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-gray-700" />
              <Skeleton className="h-4 w-64 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full bg-gray-700" />
                <Skeleton className="h-3 w-80 bg-gray-700 mx-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
