import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Plus, Mic, X, File, ImageIcon, WifiOff } from "lucide-react"
import { useChatStore } from "../../store/chat-store"
import { Button } from "../ui/button"
import { v4 } from "uuid"

export function ChatInput() {
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<any[]>([])
  const [isMultiLine, setIsMultiLine] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isConnected, sendMessage, addMessage, isLoadingConnect } = useChatStore()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const attachment: any = { id: v4(), file, url: URL.createObjectURL(file) }
      setAttachments((prev) => [...prev, attachment])
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
    textareaRef.current?.focus()
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id)
      if (attachment) URL.revokeObjectURL(attachment.url)
      return prev.filter((a) => a.id !== id)
    })
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    const lineHeight = 24 // Adjust based on text size
    const maxLines = 8
    const maxHeight = lineHeight * maxLines

    target.style.height = "auto" // reset for accurate scrollHeight
    if (target.scrollHeight > maxHeight) {
      target.style.height = `${maxHeight}px`
      target.style.overflowY = "auto"
    } else {
      target.style.height = target.scrollHeight + "px"
      target.style.overflowY = "hidden"
    }

    setIsMultiLine(target.scrollHeight > 48) // 48px ≈ 1 line height with padding
    setInput(target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && attachments.length === 0) return

    const userMessage = input.trim()
    const userAttachments = [...attachments]

    setInput("")
    setAttachments([])
    setIsMultiLine(false)

    // Reset textarea height to one line
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px"
      textareaRef.current.style.overflowY = "hidden"
    }

    addMessage(userMessage, "user", userAttachments)
    if (isConnected) {
      sendMessage(userMessage, userAttachments)
    } else {
      addMessage("Connection error. Please check your internet connection.", "assistant")
    }
  }


  return (
    <div className="p-4 bg-white">
      {!isConnected && !isLoadingConnect && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-1">
          <div className="bg-red-100 border border-red-300 rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-red-800">
            <WifiOff className="w-4 h-4" />
            <span>Not connected to server.</span>
          </div>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="mb-4 max-w-4xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2">
          {attachments.map(({ file, id }) => (
            <div
              key={id}
              className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 text-sm border border-gray-200"
            >
              {file.type.startsWith("image/") ? (
                <ImageIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
              ) : (
                <File className="w-4 h-4 text-gray-600 flex-shrink-0" />
              )}
              <span className="truncate max-w-32">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 hover:bg-gray-200 flex-shrink-0"
                onClick={() => removeAttachment(id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className={`bg-gray-100 rounded-3xl border border-gray-200 hover:bg-gray-50 focus-within:bg-white focus-within:border-gray-300 transition-all duration-200 flex px-3 ${isMultiLine ? "items-end" : "items-center"}`}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!isConnected}
            className="h-8 w-8 hover:bg-gray-200 rounded-full flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </Button>

          <textarea
            ref={textareaRef}
            value={input}
            disabled={!isConnected}
            onChange={(e) => setInput(e.target.value)}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="flex-1 bg-transparent border-none outline-none resize-none px-3 py-3 text-base placeholder-gray-500 break-words whitespace-pre-wrap"
            rows={1}
            style={{ minHeight: "48px", maxHeight: "200px", overflow: "hidden" }}
          />

          <div className="flex items-center gap-1 flex-shrink-0">
            {!(input.trim() || attachments.length > 0) && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-200 rounded-full"
              >
                <Mic className="w-5 h-5 text-gray-600" />
              </Button>
            )}
            {(input.trim() || attachments.length > 0) && (
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8 bg-blue-700 hover:bg-blue-900 rounded-full mb-[0.8px]"
                disabled={!isConnected}
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
        />
      </form>
    </div>
  )
}
