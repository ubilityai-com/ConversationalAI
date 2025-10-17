
import { Check, Copy, ExternalLink, Globe } from "lucide-react"
import { useState } from "react"
import { useFlowStore } from "../store/root-store"
import { Badge } from "./ui/badge"

const copyToClipboard = (text: string) => {
  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy") // fallback copy
    document.body.removeChild(textarea)
    console.log("Copied (fallback):", text)
  } catch (err) {
    console.error("Failed to copy to clipboard:", err)
  }
}

export function LiveUrlDisplay() {
  const selectedBot = useFlowStore((state) => state.selectedBot)
  const [copied, setCopied] = useState(false)

  if (!selectedBot || selectedBot.status !== "Active") return null

  const liveUrl = `${window.location.origin}/chat/${selectedBot.token}`

  const handleCopyClick = () => {
    copyToClipboard(liveUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed top-20 right-2 sm:right-7 z-10 max-w-[90vw] sm:max-w-xs">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-2 shadow-sm">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 px-2 py-1 text-xs flex items-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
            <Globe className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>

        {/* URL + Open */}
        <div className="flex items-center gap-2">
          {/* URL container with hover overlay for Copy */}
          <div className="relative group flex-1 min-w-0">
            <code className="block truncate bg-white/80 border border-emerald-200 rounded px-2 py-1.5 font-mono text-emerald-800 text-xs cursor-pointer">
              {liveUrl}
              {/* Hover overlay for Copy */}
            </code>
            <div className="absolute inset-0 flex items-center justify-center border border-emerald-200 gap-2 bg-emerald-50/95 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? (
                <div className="flex items-center gap-1 text-emerald-700 text-xs font-medium">
                  <Check className="w-3 h-3" />
                  Copied!
                </div>
              ) : (
                <button
                  onClick={handleCopyClick}
                  className="flex items-center gap-1 text-emerald-600 text-xs font-medium hover:text-emerald-800"
                  aria-label="Copy live bot URL"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              )}
            </div>

          </div>

          {/* Open link always visible */}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-800 text-xs flex-shrink-0"
            aria-label="Open live bot URL in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
