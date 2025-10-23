import { Loader2 } from "lucide-react"
import { useFlowStore } from "../store/root-store"
import { useChatStore } from "../store/chat-store"

export function LoadingOverlay() {
  const isLoadingBotByID = useFlowStore((state) => state.isLoadingBotByID)
  const isLoadingConnect = useChatStore((state) => state.isLoadingConnect)

  if (!isLoadingBotByID && !isLoadingConnect) return null

  return (
    <div
      className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-primary">Loading...</p>
      </div>
    </div>
  )
}
