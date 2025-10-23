interface ErrorStateProps {
    error: Error
  }
  
  /**
   * Error state component for component loading failures
   */
  export const ErrorState = ({ error }: ErrorStateProps) => {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="font-semibold text-red-800">Failed to load component</h3>
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      </div>
    )
  }
  