

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Badge } from "../../ui/badge"
import { Brain } from "lucide-react"

interface MemorySectionProps {
  config: any
  onConfigUpdate: (key: string, value: any) => void
}

// Available memory types
const availableMemories = [
  { value: "conversation", label: "Conversation Memory" },
  { value: "buffer", label: "Buffer Memory" },
  { value: "summary", label: "Summary Memory" },
  { value: "vector", label: "Vector Store Memory" },
  { value: "entity", label: "Entity Memory" },
  { value: "window", label: "Window Memory" },
]

export function MemorySection({ config, onConfigUpdate }: MemorySectionProps) {
  const memoryEnabled = config.memoryEnabled === true
  const memoryType = config.memoryType || "conversation"
  const memoryConfig = config.memoryConfig || {}

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            Memory
          </CardTitle>

          {/* Innovative Memory Activation Component */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Memory Capacity Indicator */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((slot) => (
                  <div
                    key={slot}
                    className={`w-2 h-6 rounded-sm transition-all duration-300 ${
                      memoryEnabled && slot <= (memoryType === "buffer" ? 3 : memoryType === "summary" ? 4 : 5)
                        ? "bg-gradient-to-t from-blue-400 to-blue-600 shadow-sm"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">{memoryEnabled ? "Active" : "Inactive"}</div>
            </div>

            {/* Brain Toggle with Neural Animation */}
            <button
              onClick={() => onConfigUpdate("memoryEnabled", !memoryEnabled)}
              className={`relative w-12 h-12 rounded-xl transition-all duration-300 ${
                memoryEnabled
                  ? "bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg scale-105"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {/* Brain Icon */}
              <Brain
                className={`w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  memoryEnabled ? "text-white" : "text-gray-500"
                }`}
              />

              {/* Neural Network Animation */}
              {memoryEnabled && (
                <>
                  {/* Animated dots representing neural activity */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse" />
                  <div className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
                  <div className="absolute bottom-2 left-3 w-1 h-1 bg-white rounded-full animate-pulse delay-300" />
                  <div className="absolute bottom-3 right-3 w-1 h-1 bg-white rounded-full animate-pulse delay-75" />

                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white opacity-30 animate-ping" />
                </>
              )}
            </button>
          </div>
        </div>
        <CardDescription>Configure memory for the LLM agent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {memoryEnabled && (
          <>
            {/* Memory Type Selector with Visual Icons */}
            <div>
              <Label htmlFor="memoryType" className="flex items-center mb-3">
                Memory Type
                <Badge variant="outline" className="ml-2 text-xs">
                  {availableMemories.find((m) => m.value === memoryType)?.label}
                </Badge>
              </Label>

              {/* Visual Memory Type Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {availableMemories.slice(0, 4).map((memory) => (
                  <button
                    key={memory.value}
                    onClick={() => onConfigUpdate("memoryType", memory.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                      memoryType === memory.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {/* Memory Type Icons */}
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          memoryType === memory.value ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {memory.value === "conversation" && "💬"}
                        {memory.value === "buffer" && "📊"}
                        {memory.value === "summary" && "📝"}
                        {memory.value === "vector" && "🔍"}
                        {memory.value === "entity" && "👤"}
                        {memory.value === "window" && "🪟"}
                      </div>
                      <span className="text-xs font-medium">{memory.label.replace(" Memory", "")}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Dropdown for additional memory types */}
              {availableMemories.length > 4 && (
                <Select value={memoryType} onValueChange={(value) => onConfigUpdate("memoryType", value)}>
                  <SelectTrigger id="memoryType" className="mt-2">
                    <SelectValue placeholder="More memory types..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMemories.slice(4).map((memory) => (
                      <SelectItem key={memory.value} value={memory.value}>
                        {memory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Memory Configuration with Visual Sliders */}
            {memoryType === "buffer" && (
              <div className="space-y-3">
                <Label htmlFor="bufferSize" className="flex items-center justify-between">
                  Buffer Size
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {memoryConfig.bufferSize || 10}
                  </span>
                </Label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={memoryConfig.bufferSize || 10}
                    onChange={(e) =>
                      onConfigUpdate("memoryConfig", {
                        ...memoryConfig,
                        bufferSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            )}

            {memoryType === "summary" && (
              <div className="space-y-3">
                <Label htmlFor="summarizeInterval" className="flex items-center justify-between">
                  Summarize Interval
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {memoryConfig.summarizeInterval || 3}
                  </span>
                </Label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={memoryConfig.summarizeInterval || 3}
                    onChange={(e) =>
                      onConfigUpdate("memoryConfig", {
                        ...memoryConfig,
                        summarizeInterval: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            )}

            {memoryType === "window" && (
              <div className="space-y-3">
                <Label htmlFor="windowSize" className="flex items-center justify-between">
                  Window Size (k)
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {memoryConfig.windowSize || 5}k
                  </span>
                </Label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={memoryConfig.windowSize || 5}
                    onChange={(e) =>
                      onConfigUpdate("memoryConfig", {
                        ...memoryConfig,
                        windowSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1k</span>
                    <span>5k</span>
                    <span>10k</span>
                  </div>
                </div>
              </div>
            )}

            {/* Persist Memory Toggle with Visual Indicator */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${memoryConfig.persistMemory ? "bg-green-500" : "bg-gray-300"}`}
                />
                <Label htmlFor="persistMemory" className="text-sm font-medium">
                  Persist Memory
                </Label>
              </div>
              <Switch
                id="persistMemory"
                checked={memoryConfig.persistMemory === true}
                onCheckedChange={(checked) =>
                  onConfigUpdate("memoryConfig", {
                    ...memoryConfig,
                    persistMemory: checked,
                  })
                }
              />
            </div>
          </>
        )}

        {/* Memory Status Indicator */}
        <div
          className={`text-xs p-3 rounded-lg transition-all duration-300 ${
            memoryEnabled
              ? "text-blue-700 bg-blue-50 border border-blue-200"
              : "text-gray-500 bg-gray-50 border border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${memoryEnabled ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="font-medium">{memoryEnabled ? "Memory System Active" : "Memory System Inactive"}</span>
          </div>
          <p>
            {memoryEnabled
              ? `Using ${availableMemories.find((m) => m.value === memoryType)?.label} to maintain context across interactions.`
              : "Enable memory to allow the LLM agent to recall previous interactions and maintain context."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
