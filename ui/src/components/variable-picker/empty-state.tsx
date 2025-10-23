import { Variable, Search } from "lucide-react"

interface EmptyStateProps {
  hasVariables: boolean
}

export function EmptyState({ hasVariables }: EmptyStateProps) {
  return (
    <div className="text-center text-gray-500 py-8">
      {!hasVariables ? (
        <div>
          <Variable className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No variables defined</p>
          <p className="text-xs text-gray-400 mt-1">Create variables to use them in your workflow</p>
        </div>
      ) : (
        <div>
          <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No variables match your search</p>
        </div>
      )}
    </div>
  )
}
