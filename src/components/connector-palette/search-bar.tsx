import { Search } from "lucide-react"
import { Input } from "../ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative p-0.5">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input placeholder="Search..." value={value} onChange={(e) => onChange(e.target.value)} className="pl-10" />
    </div>
  )
}
