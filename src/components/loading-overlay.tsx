import { Loader2 } from "lucide-react"
import { useFlowStore } from "../store/flow-store"
import { useChatStore } from "../store/chat-store"


export function LoadingOverlay() {
    const isLoadingBotByID = useFlowStore(state => state.isLoadingBotByID)
    const isLoadingConnect = useChatStore(state => state.isLoadingConnect)
    if (!isLoadingBotByID && !isLoadingConnect) return null
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-none z-50 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-primary">{"Loading..."}</p>
            </div>
        </div>
    )
}
