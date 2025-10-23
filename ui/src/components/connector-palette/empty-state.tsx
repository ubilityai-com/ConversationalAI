import { Search } from "lucide-react"

export function EmptyState() {
    return (
        <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No connectors found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
        </div>
    )
}
