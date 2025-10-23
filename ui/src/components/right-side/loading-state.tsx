/**
 * Loading state component for component loading
 */
export const LoadingState = () => {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <p className="text-sm text-gray-600">Loading component...</p>
        </div>
      </div>
    )
  }
  