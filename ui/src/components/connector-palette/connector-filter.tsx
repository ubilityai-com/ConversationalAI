import { Badge } from "../ui/badge"

interface CategoryFilterProps {
    categories: string[]
    selectedCategory: string
    onCategorySelect: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer text-xs hover:bg-primary/80 hover:text-white"
                    onClick={() => onCategorySelect(category)}
                >
                    {category.toUpperCase()}
                </Badge>
            ))}
        </div>
    )
}
