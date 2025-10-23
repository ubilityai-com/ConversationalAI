
import { ChevronDown, Search, Variable } from "lucide-react"
import { Button } from "../ui/button"
import { CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"

interface PanelHeaderProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    onClose: () => void
    onToggleMinimize: () => void
}

export function PanelHeader({ searchTerm, onSearchChange, onToggleMinimize }: PanelHeaderProps) {

    return (
        <CardHeader className="pb-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Variable className="w-4 h-4" />
                    Variables
                </CardTitle>
                <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="w-8 h-8 p-0">
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Search variables..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 h-8"
                />
            </div>
        </CardHeader>
    )
}
