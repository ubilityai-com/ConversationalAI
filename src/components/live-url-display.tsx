"use client"

import { Check, Copy, Globe, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useFlowStore } from "../store/flow-store"
import { Badge } from "./ui/badge"

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
  const selectedBot = useFlowStore(state => state.selectedBot)
  const [copied, setCopied] = useState(false)

  if (!selectedBot || selectedBot.status !== "Active") {
    return null
  }

  // Generate live URL based on bot ID
  const liveUrl = `${window.location.origin}/chat/${selectedBot.token}`

  const handleUrlClick = async () => {
    try {
      copyToClipboard(liveUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy URL:", error)
    }
  }

  return (
    <div className="fixed top-20 right-7 z-10">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-2 shadow-sm max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 px-2 py-1 text-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
            <Globe className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>

        <div
          className="bg-white/80 border border-emerald-200 rounded px-2 py-1.5 cursor-pointer hover:bg-emerald-50 transition-colors relative group"
        >
          <code className="text-emerald-800 font-mono text-xs truncate block">{liveUrl}</code>

          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-emerald-50/95 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? (
              <div className="flex items-center gap-1 text-emerald-700 text-xs font-medium">
                <Check className="w-3 h-3" />
                Copied!
              </div>
            ) : (
              <>
                <button
                  onClick={handleUrlClick}
                  className="flex items-center gap-1 text-emerald-600 text-xs font-medium hover:text-emerald-800"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-600 text-xs font-medium hover:text-emerald-800"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
