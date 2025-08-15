import { create } from "zustand"
import { io, type Socket } from "socket.io-client"
import { v4 } from "uuid"

export interface Message {
    id: string
    content: string | null
    role: "user" | "assistant"
    timestamp: Date
    attachments?: any
    multipleChoice?: any[]
    isStreaming?: boolean
}

interface ChatState {
    messages: Message[]
    isLoading: boolean
    isConnected: boolean
    socket: Socket | null
    currentStreamingId: string | null
    initializeSocket: (botToken: string | undefined) => void
    disconnectSocket: () => void
    sendMessage: (content: string, attachments?: any[]) => void
    addMessage: (content: string, role: "user" | "assistant", attachments?: any[], multipleChoice?: any[]) => void
    setLoading: (loading: boolean) => void
    setConnected: (connected: boolean) => void
    clearMessages: () => void
    addStreamingMessage: (role: "user" | "assistant") => string
    updateStreamingMessage: (id: string, content: string) => void
    finishStreamingMessage: (id: string) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    isLoading: false,
    isConnected: false,
    socket: null,
    currentStreamingId: null,
    addStreamingMessage: (role) => {
        const id = v4()
        set((state) => {
            const newMessage: Message = {
                id,
                content: "",
                role,
                timestamp: new Date(),
                isStreaming: true,
            }
            return { messages: [...state.messages, newMessage] }
        })
        return id
    },

    updateStreamingMessage: (id, content) =>
        set((state) => ({
            messages: state.messages.map((msg) => (msg.id === id ? { ...msg, content } : msg)),
        })),

    finishStreamingMessage: (id) =>
        set((state) => ({
            messages: state.messages.map((msg) => (msg.id === id ? { ...msg, isStreaming: false } : msg)),
        })),

    initializeSocket: (botToken) => {
        const { socket } = get()
        if (socket) return
        const conversationId = `conv-${v4()}`
        // const newSocket = io(process.env.RREACT_APP_DOMAIN, {
        const newSocket = io(window.location.origin, {
            path: '/socket.io',
            transports: ["websocket", "polling"],
            query: {
                token: botToken,
                conversationId,
            },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
        })

        // Connection event handlers
        newSocket.on("connect", () => {
            console.log("Connected to server")
            set({ isConnected: true })
        })
        newSocket.on("rag", (data) => {
            console.log("rag data:", data)

            if (data.type === "chunk") {
                const { currentStreamingId } = get()

                // If no streaming message exists, create one
                if (!currentStreamingId) {
                    const streamingId = get().addStreamingMessage("assistant")
                    set({ currentStreamingId: streamingId, isLoading: false })
                }

                const streamingId = get().currentStreamingId
                if (streamingId) {
                    const currentMessage = get().messages.find((msg) => msg.id === streamingId)

                    let answerContent = ""
                    let referencesContent = ""

                    // Parse existing content to extract answer and references
                    const existingContent = currentMessage?.content || ""
                    const parts = existingContent.split("\n\nReferences:\n")
                    if (parts.length > 1) {
                        answerContent = parts[0]
                        referencesContent = parts[1]
                    } else {
                        answerContent = existingContent
                    }

                    // Handle answer format: { "type": "chunk", "answer": "" }
                    if (data.answer !== undefined) {
                        answerContent = data.answer
                    }
                    // Handle references format: { "type": "chunk", "references": [str] }
                    else if (data.references && Array.isArray(data.references)) {
                        referencesContent = data.references.join("\n")
                    }

                    // Combine answer and references for display
                    let combinedContent = answerContent
                    if (referencesContent) {
                        combinedContent += "\n\nReferences:\n" + referencesContent
                    }

                    if (combinedContent !== existingContent) {
                        get().updateStreamingMessage(streamingId, combinedContent)
                    }
                }
            }
        })
        newSocket.on("agent", (data) => {
            console.log("agent data:", data)

            // Handle streaming chunks from agent
            if (data.type === "chunk" && data.chunk) {
                const { currentStreamingId } = get()

                // If no streaming message exists, create one
                if (!currentStreamingId) {
                    const streamingId = get().addStreamingMessage("assistant")
                    set({ currentStreamingId: streamingId, isLoading: false })
                }

                // Append the chunk to the current streaming message
                const streamingId = get().currentStreamingId
                if (streamingId) {
                    const currentMessage = get().messages.find((msg) => msg.id === streamingId)
                    const newContent = (currentMessage?.content || "") + data.chunk
                    get().updateStreamingMessage(streamingId, newContent)
                }
            }
        })
        newSocket.on("end", (data) => {
            console.log("end data:", data)

            // Handle end of streaming
            if (data.type === "end of chunks") {
                const { currentStreamingId } = get()
                if (currentStreamingId) {
                    // Finish the streaming message
                    get().finishStreamingMessage(currentStreamingId)
                    set({ currentStreamingId: null, isLoading: false })
                }
            }
        })
        newSocket.on("disconnect", () => {
            console.log("Disconnected from server")
            set({ isConnected: false })
        })
        newSocket.on("force_disconnect", (reason) => {
            console.log("force disconnect:", reason)
            newSocket.disconnect()
        })

        newSocket.on("error_message", (error: string) => {
            console.error("Socket error:", error)
            get().addMessage(error || "Sorry, there was an error processing your message.", "assistant")
            set({ isLoading: false })
        })
        // Streaming message event handlers

        newSocket.on("message", async (data) => {
            console.log("Received from server:", data)

            const streamingId = get().addStreamingMessage("assistant")
            set({ currentStreamingId: streamingId })

            const text = data.text || ""
            let currentText = ""

            // Stream only the text
            if (text) {
                for (let i = 0; i < text.length; i++) {
                    currentText += text[i]
                    get().updateStreamingMessage(streamingId, currentText)
                    await new Promise((resolve) => setTimeout(resolve, 5))
                }
            }

            // Add attachments and choices *after* streaming is complete
            if (data?.type === "file" || data.choices) {
                set((state) => ({
                    messages: state.messages.map((msg) =>
                        msg.id === streamingId
                            ? {
                                ...msg,
                                attachments: data || msg.attachments,
                                multipleChoice: data.choices || msg.multipleChoice,
                            }
                            : msg,
                    ),
                }))
            }

            // Finish streaming
            get().finishStreamingMessage(streamingId)
            set({ currentStreamingId: null, isLoading: false })
        })
        set({ socket: newSocket })
    },

    disconnectSocket: () => {
        const { socket } = get()
        if (socket) {
            socket.disconnect()
            set({ socket: null, isConnected: false, isLoading: false })
        }
    },
    sendMessage: async (content, attachments) => {
        const { socket } = get()

        if (content?.trim() && !attachments?.length) {
            const textMessageObj = {
                type: "Message",
                data: content,
                data_type: "text",
            }
            if (socket?.connected) {
                set({ isLoading: true })
                console.log("Sending text to server:", textMessageObj)
                socket.emit("message", JSON.stringify(textMessageObj))
            } else {
                console.error("Socket not connected")
                get().addMessage("Connection error. Please try again.", "assistant")
            }
        }

        if (attachments?.length) {
            const { socket } = get()

            for (const attach of attachments) {
                const { file } = attach
                if (!file) continue

                const reader = new FileReader()

                reader.onload = (e) => {
                    const arrayBuffer = e.target?.result
                    if (!arrayBuffer) return

                    const byteArray = new Uint8Array(arrayBuffer as ArrayBuffer)

                    const fileMessageObj = {
                        type: "Message",
                        data: Array.from(byteArray), // send as array of bytes
                        filename: file.name,
                        mimetype: file.type,
                        data_type: "binary",
                    }

                    console.log("Sending file to server:", fileMessageObj)
                    socket?.emit("message", JSON.stringify(fileMessageObj))
                }

                reader.onerror = (err) => {
                    console.error("Error reading file:", file.name, err)
                }

                reader.readAsArrayBuffer(file) // Read raw bytes
            }
        }
    },
    addMessage: (content, role, attachments, multipleChoice) =>
        set((state) => {
            const newMessage: Message = {
                id: v4(),
                content: content.trim() ? content : null,
                role,
                timestamp: new Date(),
                attachments,
                multipleChoice,
            }

            return { messages: [...state.messages, newMessage] }
        }),

    setLoading: (loading) => set({ isLoading: loading }),

    setConnected: (connected) => set({ isConnected: connected }),

    clearMessages: () => set({ messages: [] }),
}))
