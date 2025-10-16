import type { ConnectorType } from "../../types/connector-types"
import { Badge } from "../ui/badge"

interface ConnectorCardProps {
  connector: ConnectorType
  onClick: () => void
}

export function ConnectorCard({ connector, onClick }: ConnectorCardProps) {
  const IconComponent = connector.icon

  return (
    <div
      className="p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`w-12 h-12 ${connector.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
        >
          {IconComponent ? (
            <IconComponent className="w-6 h-6 text-white" />
          ) : (
            <img
              src={"/components-icons/" + connector.type + ".png"}
              alt="img"
              className={`${connector.category === "basic" ? "w-6 h-6" : "w-8 h-8"} object-contain`}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {connector.label}
          </h4>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{connector.description}</p>
          <Badge variant="outline" className="mt-2 text-xs">
            {connector.category.toUpperCase()}
          </Badge>
        </div>
      </div>
    </div>
  )
}
