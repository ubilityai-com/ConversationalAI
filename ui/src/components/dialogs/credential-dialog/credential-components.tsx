import { useState } from "react"
import { AutoCompleteItem, CopyField, CredentialField } from "../../../types/credentials-types"
import { Label } from "../../ui/label"
import { Check, ChevronDown, Copy, Plus, Search, Settings, Trash2 } from "lucide-react"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Card } from "../../ui/card"

const handleCopyClick = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text)
        console.log("Copied to clipboard:", text)
    } catch (error) {
        console.error("Failed to copy:", error)
    }
}

export const CopyFields: React.FC<{ field: CopyField }> = ({ field }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await handleCopyClick(field.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</Label>
            <div className="relative">
                <Input
                    value={field.value}
                    readOnly
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 pr-12 cursor-pointer hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200"
                    onClick={handleCopy}
                />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                    <Copy className={`h-4 w-4 transition-colors ${copied ? "text-green-600" : "text-gray-500"}`} />
                </Button>
                {copied && (
                    <div className="absolute -top-8 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                        Copied!
                    </div>
                )}
            </div>
        </div>
    )
}

export const CustomDynamicField: React.FC<{
    field: CredentialField
    onChange: (value: any) => void
}> = ({ field, onChange }) => {
    const [items, setItems] = useState<Array<{ key: string; value: string }>>(
        field.Credential_value || [{ key: "", value: "" }],
    )

    const addItem = () => {
        const newItems = [...items, { key: "", value: "" }]
        setItems(newItems)
        onChange(newItems)
    }

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
        onChange(newItems)
    }

    const updateItem = (index: number, field: "key" | "value", value: string) => {
        const newItems = [...items]
        newItems[index][field] = value
        setItems(newItems)
        onChange(newItems)
    }

    return (
        <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {field.label}
            </Label>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        className="p-4 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-750"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-1 space-y-2">
                                <Input
                                    placeholder="Key"
                                    value={item.key}
                                    onChange={(e: any) => updateItem(index, "key", e.target.value)}
                                    className="border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Input
                                    placeholder="Value"
                                    value={item.value}
                                    onChange={(e: any) => updateItem(index, "value", e.target.value)}
                                    className="border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeItem(index)}
                                disabled={items.length === 1}
                                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
                <Button
                    variant="outline"
                    onClick={addItem}
                    className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-transparent"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                </Button>
            </div>
        </div>
    )
}

export const ServiceSelector: React.FC<{
    value: string
    onChange: (value: string) => void
    options: AutoCompleteItem[]
    disabled?: boolean
}> = ({ value, onChange, options, disabled }) => {
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const filteredOptions = options.filter((option) => option.title.toLowerCase().includes(searchValue.toLowerCase()))
    const selectedOption = options.find((option) => option.title === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className="h-12 w-full justify-between border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                >
                    {selectedOption ? (
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <img
                                    src={selectedOption.image || "/placeholder.svg"}
                                    alt={selectedOption.title}
                                    className="w-5 h-5 object-contain"
                                />
                            </div>
                            <span className="font-medium">{selectedOption.title}</span>
                        </div>
                    ) : (
                        <span className="text-gray-500">Select a service</span>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" style={{ width: "var(--radix-popover-trigger-width)" }}>
                <div className="w-full">
                    {/* Search Input */}
                    <div className="flex items-center border-b px-3 py-2">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Input
                            placeholder="Search services..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="flex h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground border-0 focus:ring-0 shadow-none"
                        />
                    </div>
                    {/* Scrollable Options List */}
                    <div
                        className="max-h-80 overflow-y-auto overscroll-contain scroll-smooth"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent",
                            WebkitOverflowScrolling: "touch",
                        }}
                        onWheel={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        {filteredOptions.length === 0 ? (
                            <div className="py-6 text-center text-sm text-gray-500">No services found.</div>
                        ) : (
                            <div className="p-1">
                                {filteredOptions.map((option) => (
                                    <div
                                        key={option.title}
                                        onClick={() => {
                                            onChange(option.title)
                                            setOpen(false)
                                            setSearchValue("")
                                        }}
                                        className="flex items-center space-x-3 py-3 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors relative"
                                    >
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                            <img
                                                src={option.image || "/placeholder.svg"}
                                                alt={option.title}
                                                className="w-5 h-5 object-contain"
                                            />
                                        </div>
                                        <span className="font-medium flex-1">{option.title}</span>
                                        <Check
                                            className={`ml-auto h-4 w-4 ${value === option.title ? "opacity-100 text-blue-600" : "opacity-0"}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
