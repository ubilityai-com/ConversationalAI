"use client"

import { AlertTriangle, Plus, RefreshCw } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useFlowStore } from "../store/flow-store"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ChatbotNotFoundNoticeProps {
    title?: string
    message?: string
    isRetrying?: boolean
}

export function ChatbotNotFoundNotice({
    title = "Chatbot Not Found",
    message = "The chatbot you're looking for doesn't exist or has been deleted.",
    isRetrying = false,
}: ChatbotNotFoundNoticeProps) {
    const { getBotById, setFailedLoadingBot } = useFlowStore()
    const { botID } = useParams()
    const navigate = useNavigate()
    const onRetry = async () => {
        try {
            if (botID)
                await getBotById(botID)
        } catch (error) {
            console.log({ error });
        }
    }
    const onCreate = () => {
        setFailedLoadingBot(false)
        navigate("/")
    }
    return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{message}</p>

                    <div className="flex flex-col justify-center sm:flex-row gap-3 w-full">
                        {(
                            <Button
                                variant="outline"
                                onClick={onRetry}
                                disabled={isRetrying}
                                className="flex items-center gap-2 bg-transparent"
                            >
                                {isRetrying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                {isRetrying ? "Retrying..." : "Try Again"}
                            </Button>
                        )}

                        {(
                            <Button onClick={onCreate} className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Create New Project
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
