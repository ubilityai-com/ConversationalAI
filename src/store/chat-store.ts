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
    isLoadingConnect: boolean
    isConnected: boolean
    socket: Socket | null
    currentStreamingId: string | null

    // Queue helpers
    messageQueue: any[]
    processing: boolean

    initializeSocket: (botToken: string | undefined) => void
    disconnectSocket: () => void
    sendMessage: (content: string, attachments?: any[]) => void
    addMessage: (content: string, role: "user" | "assistant", attachments?: any[], multipleChoice?: any[]) => void
    addStreamingMessage: (role: "user" | "assistant") => string
    updateStreamingMessage: (id: string, content: string) => void
    finishStreamingMessage: (id: string) => void

    enqueueMessage: (data: any) => void
    processQueue: () => Promise<void>
    streamMessage: (data: any) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    isLoading: false,
    isLoadingConnect: false,
    isConnected: false,
    socket: null,
    currentStreamingId: null,

    // queue state
    messageQueue: [],
    processing: false,

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

    enqueueMessage: (data) =>
        set((state) => ({
            messageQueue: [...state.messageQueue, data],
        })),

    processQueue: async () => {
        const { messageQueue, processing } = get()
        if (processing || messageQueue.length === 0) return

        set({ processing: true })

        while (get().messageQueue.length > 0) {
            const data = get().messageQueue[0]
            await get().streamMessage(data)
            set((state) => ({
                messageQueue: state.messageQueue.slice(1),
            }))
        }

        set({ processing: false })
    },

    streamMessage: async (data) => {
        const createStreamingMessage = () => {
            const id = get().addStreamingMessage("assistant")
            set({ currentStreamingId: id, isLoading: false })
            return id
        }

        // --- Case 1: "message" / "file" / "multipleChoice" ---
        if (["message", "file", "multipleChoice"].includes(data.type)) {
            const streamingId = createStreamingMessage()
            const text = data.text || ""

            // Stream character-by-character
            let currentText = ""
            for (let i = 0; i < text.length; i++) {
                currentText += text[i]
                get().updateStreamingMessage(streamingId, currentText)
                await new Promise((resolve) => setTimeout(resolve, 5))
            }

            // Attachments or choices
            if (data.type === "file" || data.choices) {
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

            get().finishStreamingMessage(streamingId)
            set({ currentStreamingId: null, isLoading: false })
            return
        }

        // --- Case 2: "agent" / "rag" chunks ---
        let streamingId = get().currentStreamingId || createStreamingMessage()
        const currentMessage = get().messages.find((msg) => msg.id === streamingId) || null
        const existingContent = currentMessage?.content || ""

        if (data.type === "agent" && data.chunk) {
            get().updateStreamingMessage(streamingId, existingContent + data.chunk)
        }

        if (data.type === "rag") {
            let [answerContent, referencesContent] = existingContent.split("\n\nReferences:\n")
            answerContent = answerContent || ""
            referencesContent = referencesContent || ""

            if (data.data.answer !== undefined) answerContent = data.data.answer
            if (Array.isArray(data.data.references))
                referencesContent = data.data.references.join("\n")

            const combinedContent = referencesContent
                ? `${answerContent}\n\nReferences:\n${referencesContent}`
                : answerContent

            if (combinedContent !== existingContent)
                get().updateStreamingMessage(streamingId, combinedContent)
        }

        // --- Case 3: "end" event ---
        if (data.type === "end") {
            get().finishStreamingMessage(streamingId)
            set({ currentStreamingId: null, isLoading: false })
        }
    },
    initializeSocket: (botToken) => {
        const { socket } = get()
        if (socket) return
        set({ isLoadingConnect: true })
        const conversationId = `conv-${v4()}`
        const newSocket = io("http://23.88.122.180", {
            // const newSocket = io(window.location.origin, {
            path: '/socket.io',
            transports: ["websocket", "polling"],
            query: {
                token: botToken,
                conversationId,
            },
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 2000,
        })

        // Connection event handlers
        newSocket.on("connect", () => {
            console.log("Connected to server")
            set({ isConnected: true, isLoadingConnect: false })
        })
        newSocket.on("connect_error", (error) => {
            console.log(" Connection error :", error)
            set({ isLoadingConnect: false })
        })
        newSocket.on("agent", (data) => {
            console.log("agent data", data);

            if (data.type === "chunk" && data.chunk) {
                get().enqueueMessage({ type: "agent", chunk: data.chunk })
                get().processQueue()
            }
        })

        newSocket.on("rag", (data) => {
            if (data.type === "chunk") {
                get().enqueueMessage({ type: "rag", data })
                get().processQueue()
            }
        })
        newSocket.on("message", (data) => {
            console.log("Received from server:", data)
            get().enqueueMessage(data)
            get().processQueue()
        })

        newSocket.on("end", (data) => {
            console.log("end data:", data)
            get().enqueueMessage({ type: "end", data: data })
            // get().processQueue()
            // if (data.type === "end of chunks") {
            //     const { currentStreamingId } = get()
            //     if (currentStreamingId) {
            //         get().finishStreamingMessage(currentStreamingId)
            //         set({ currentStreamingId: null, isLoading: false })
            //     }
            // }
        })

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server")
            set({ isConnected: false, isLoadingConnect: false })
        })
        newSocket.on("force_disconnect", (reason) => {
            console.log("force disconnect:", reason)
            newSocket.disconnect()
        })
        newSocket.on("error_message", (error) => {
            console.error("Socket error:", error)
            get().addMessage(error.error || "Sorry, there was an error processing your message.", "assistant")
            set({ isLoading: false })
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
                        data: Array.from(byteArray),
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
                reader.readAsArrayBuffer(file)
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
}))
