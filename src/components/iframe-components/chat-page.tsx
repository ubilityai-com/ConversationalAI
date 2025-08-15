import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useChatStore } from "../../store/chat-store"
import { ChatInput } from "./chat-input"
import { ChatMessage } from "./chat-message"
import { SimpleHeader } from "./simple-header"
import TypingIndicator from "./typing-indicator"

export default function ChatPage() {
    const { messages, isLoading, initializeSocket, disconnectSocket } = useChatStore()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])
    const { botToken } = useParams()
    console.log({ botToken });
    useEffect(() => {
        initializeSocket(botToken)

        return () => {
            disconnectSocket()
        }
    }, [initializeSocket, disconnectSocket])
    const hasStreamingMessage = messages.some((message) => message.isStreaming)

    return (
        <div className="h-screen bg-white text-gray-900 flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-10 bg-white border">
                <SimpleHeader />
            </div>

            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
                    <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 text-gray-900">
                                What can I help with?
                            </h1>
                        </div>
                        <ChatInput />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto pt-16 pb-36">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            {isLoading && !hasStreamingMessage && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10">
                        <ChatInput />
                    </div>
                </>
            )}
        </div>
    )
}