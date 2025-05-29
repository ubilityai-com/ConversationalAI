import { Check, ChevronRight, Search, type LucideIcon } from "lucide-react"
import React from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

export interface ListItem {
    id: string
    icon: LucideIcon
    label: string
    description: string
    badge?: string
    onClick?: () => void
}

interface ItemsListDialogProps {
    trigger?: React.ReactNode
    title: string
    description?: string
    items: ListItem[]
    open?: boolean
    onOpenChange?: (open: boolean) => void
    maxHeight?: string
    searchable?: boolean
    selectable?: boolean
    onItemSelect?: (item: ListItem) => void
}

export function ItemsListDialog({
    trigger,
    title,
    description,
    items,
    open,
    onOpenChange,
    maxHeight = "500px",
    searchable = false,
    selectable = false,
    onItemSelect,
}: ItemsListDialogProps) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

    const filteredItems = React.useMemo(() => {
        if (!searchable || !searchTerm) return items

        return items.filter(
            (item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [items, searchTerm, searchable])

    const handleItemClick = (item: ListItem) => {
        if (selectable) {
            const newSelected = new Set(selectedItems)
            if (newSelected.has(item.id)) {
                newSelected.delete(item.id)
            } else {
                newSelected.add(item.id)
            }
            setSelectedItems(newSelected)
        }

        if (onItemSelect) {
            onItemSelect(item)
        }

        if (item.onClick) {
            item.onClick()
        }
    }
    console.log({filteredItems});
    
    const dialogContent = (
        <DialogContent className="sm:max-w-[400px] dark:bg-gray-900 dark:border-gray-700">
            <DialogHeader>
                <DialogTitle className="dark:text-white">{title}</DialogTitle>
                {description && <DialogDescription className="dark:text-gray-300">{description}</DialogDescription>}
            </DialogHeader>

            {searchable && (
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    />
                </div>
            )}

            <ScrollArea className="w-full" style={{ maxHeight }}>
                <div className="space-y-2 pr-4">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                            <p>No items found</p>
                            {searchTerm && <p className="text-sm mt-2">Try adjusting your search terms</p>}
                        </div>
                    ) : (
                        filteredItems.map((item) => {
                            // const IconComponent = item.icon
                            const isSelected = selectedItems.has(item.id)
                            console.log({item});
                            
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className={`
                    flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    ${isSelected
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                        }
                  `}
                                >
                                    <div
                                        className={`
                    flex-shrink-0 p-2 rounded-md
                    ${isSelected
                                                ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
                                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                            }
                  `}
                                    >
                                        {/* <IconComponent className="h-5 w-5" /> */}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.label}</h4>
                                            {item.badge && (
                                                <Badge variant="secondary" className="ml-2 text-xs dark:bg-gray-700 dark:text-gray-300">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
                                    </div>

                                    <div className="flex-shrink-0 flex items-center">
                                        {selectable && (
                                            <div
                                                className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center
                        ${isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600"}
                      `}
                                            >
                                                {isSelected && <Check className="h-3 w-3 text-white" />}
                                            </div>
                                        )}
                                        <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </ScrollArea>

            {selectable && selectedItems.size > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedItems.size} item{selectedItems.size !== 1 ? "s" : ""} selected
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedItems(new Set())}
                            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Clear
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => {
                                // Handle selected items
                                console.log("Selected items:", Array.from(selectedItems))
                            }}
                        >
                            Apply ({selectedItems.size})
                        </Button>
                    </div>
                </div>
            )}
        </DialogContent>
    )

    if (trigger) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                {dialogContent}
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {dialogContent}
        </Dialog>
    )
}
