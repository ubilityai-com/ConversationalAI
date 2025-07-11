"use client"
import { Building, Calendar, Hash, User } from "lucide-react"
import { Badge } from "./ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"

const variables = [
    {
        category: "User Info",
        icon: User,
        items: [
            { label: "First Name", value: "{{user.firstName}}" },
            { label: "Last Name", value: "{{user.lastName}}" },
            { label: "Full Name", value: "{{user.fullName}}" },
            { label: "Email", value: "{{user.email}}" },
            { label: "Phone", value: "{{user.phone}}" },
        ],
    },
    {
        category: "Date & Time",
        icon: Calendar,
        items: [
            { label: "Current Date", value: "{{date.today}}" },
            { label: "Current Time", value: "{{time.now}}" },
            { label: "Timestamp", value: "{{timestamp}}" },
            { label: "Year", value: "{{date.year}}" },
            { label: "Month", value: "{{date.month}}" },
        ],
    },
    {
        category: "System",
        icon: Hash,
        items: [
            { label: "Random ID", value: "{{system.randomId}}" },
            { label: "Session ID", value: "{{system.sessionId}}" },
            { label: "User Agent", value: "{{system.userAgent}}" },
            { label: "IP Address", value: "{{system.ipAddress}}" },
        ],
    },
    {
        category: "Company",
        icon: Building,
        items: [
            { label: "Company Name", value: "{{company.name}}" },
            { label: "Company Address", value: "{{company.address}}" },
            { label: "Company Phone", value: "{{company.phone}}" },
            { label: "Company Email", value: "{{company.email}}" },
        ],
    },
]

interface VariablesPopoverProps {
    isOpen: boolean
    right:number
}

export function VariablesPopover({ isOpen ,right}: VariablesPopoverProps) {
    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild>
                <div className="fixed top-2/4 -translate-y-1/2 w-0 h-0" style={{right:`${right}px`}}/>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-80 p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="p-4 border-b">
                    <h3 className="font-semibold">Insert Variable</h3>
                    <p className="text-sm text-muted-foreground">Select a variable to insert into </p>
                </div>
                <ScrollArea className="h-[calc(100vh-160px)]">
                    <div className="p-4 space-y-4">
                        {variables.map((category) => {
                            const IconComponent = category.icon
                            return (
                                <div key={category.category} className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <IconComponent className="w-4 h-4" />
                                        {category.category}
                                    </div>
                                    <div className="space-y-1">
                                        {category.items.map((item) => (
                                            <button
                                                key={item.value}
                                                // onClick={() => onVariableSelect(item.value)}
                                                className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">{item.label}</span>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {item.value}
                                                    </Badge>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
