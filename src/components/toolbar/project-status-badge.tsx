import { useFlowStore } from "../../store/flow-store"
import { Badge } from "../ui/badge"
import { CheckCircle, Clock } from "lucide-react"

export function ProjectStatusBadge() {
  const { selectedBot } = useFlowStore()

  if (!selectedBot) return null

  const isPublished = selectedBot.status === "Active"

  return (
    <Badge
      variant={isPublished ? "default" : "secondary"}
      className={isPublished ? "bg-green-100 text-green-800 border-green-200" : ""}
    >
      {isPublished ? (
        <>
          <CheckCircle className="w-3 h-3 mr-1" />
          Published
        </>
      ) : (
        <>
          <Clock className="w-3 h-3 mr-1" />
          Draft
        </>
      )}
    </Badge>
  )
}
