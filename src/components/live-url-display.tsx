"use client"

import { Check, Copy, ExternalLink, Globe } from "lucide-react"
import { useState } from "react"
import { useFlowStore } from "../store/flow-store"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
const copyToClipboard = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  console.log("Copied (fallback):", text);
};
export function LiveUrlDisplay() {
  const { selectedBot } = useFlowStore()
  const [copied, setCopied] = useState(false)

  if (!selectedBot || selectedBot.status !== "Active") {
    return null
  }

  // Generate live URL based on bot ID
  const liveUrl = `${window.location.origin}/chat/${selectedBot.token}`

  const handleCopyUrl = async () => {
    try {
      copyToClipboard(liveUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy URL:", error)
    }
  }

  const handleOpenUrl = () => {
    window.open(liveUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border border-emerald-200 rounded-xl p-3 md:p-4 shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/20 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <div className="relative space-y-3 md:space-y-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 px-3 py-1.5 shadow-sm">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            <Globe className="w-3 h-3 mr-1" />
            Live
          </Badge>
          <div className="text-emerald-700 font-semibold text-sm">{selectedBot.name} is live!</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <span className="text-emerald-600 font-medium text-sm whitespace-nowrap">Share your chatbot:</span>
          <div className="flex-1 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg px-3 py-2 min-w-0">
            <code className="text-emerald-800 font-mono text-xs sm:text-sm truncate block">{liveUrl}</code>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="h-9 px-3 bg-white/80 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Copied!</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenUrl}
              className="h-9 px-3 bg-white/80 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 text-xs sm:text-sm"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Open</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
