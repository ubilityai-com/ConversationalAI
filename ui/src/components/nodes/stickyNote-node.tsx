import { NodeResizer } from "@xyflow/react"
import { Palette, Trash2 } from "lucide-react"
import type React from "react"
import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useDebounceConfig } from "../../hooks/use-debounced-config"
import { useFlowStore } from "../../store/root-store"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface StickyNoteData {
    color: string
    content: string
}
interface StickyNoteNodeProps {
    id: string
    data: {
        rightSideData: StickyNoteData
    }
    selected?: boolean
}

const PRESET_COLORS = [
    "#fef3c7", // yellow
    "#fecaca", // red
    "#bbf7d0", // green
    "#bfdbfe", // blue
    "#e9d5ff", // purple
    "#fed7aa", // orange
    "#f3e8ff", // lavender
    "#fce7f3", // pink
]

export default function StickyNoteNode({ id, data, selected }: StickyNoteNodeProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)

    const deleteNode = useFlowStore(state => state.deleteNode)
    const updateNodeRightSideData = useFlowStore(
        (state) => state.updateNodeRightSideData
    );

    const onContentUpdate = (value: any) => {
        updateNodeRightSideData(id, { rightSideData: value });
    };
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { localConfig, updateNestedConfig } = useDebounceConfig(
        data.rightSideData,
        {
            delay: 300,
            onSave: (savedConfig) => {
                onContentUpdate(savedConfig)
            },
        },
    )
    const handleDoubleClick = () => {
        setIsEditing(true)
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus()
                textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length)
            }
        }, 0)
    }

    const handleTextareaBlur = () => {
        setIsEditing(false)
    }

    const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsEditing(false)
        }
    }

    const handleColorChange = (newColor: string) => {
        updateNestedConfig("color", newColor)
    }
    const { color, content } = localConfig
    return (
        <div
            className={`relative rounded-sm shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg select-none w-full h-full ${selected ? "ring-2  ring-blue-500" : ""
                }`}
            style={{ backgroundColor: color, minWidth: "100px", minHeight: "70px" }}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={() => setShowToolbar(true)}
            onMouseLeave={() => setShowToolbar(false)}
        >
            <NodeResizer
                isVisible={true}
                minWidth={100}
                minHeight={40}
                handleStyle={{
                    opacity: 0,
                    width: "8px",
                    height: "8px",
                }}
                lineStyle={{
                    opacity: 0,
                }}
            />

            {showToolbar && (
                <div className="absolute top-0 right-0 flex gap-0.5 sm rounded-md p-1 z-50 transform translate-x-2 -translate-y-10">
                    <Button variant="ghost" size="sm" onClick={() => deleteNode(id)} className="h-8 w-8 p-0 hover:bg-red-100">
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                                <Palette className="h-4 w-4 text-blue-600" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-3" side="bottom" align="end">
                            <div className="grid grid-cols-4 gap-2">
                                {PRESET_COLORS.map((presetColor) => (
                                    <button
                                        key={presetColor}
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                                        style={{ backgroundColor: presetColor }}
                                        onClick={() => handleColorChange(presetColor)}
                                    />
                                ))}
                            </div>
                            <div className="mt-3">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="w-full h-8 rounded border"
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )}

            <div className="p-2 h-full">
                {!isEditing ? (
                    <div className="prose prose-sm max-w-none text-gray-800 h-full overflow-hidden [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-5 [&>ol]:pl-5">
                        {content.trim() === "" ? (
                            <span className="text-gray-500 italic">Double click to edit me</span>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ children }) => <h1 className="text-xl font-bold mb-1">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-lg font-semibold mb-1">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-md font-medium mb-1">{children}</h3>,
                                    a: ({ children, href }) => (
                                        <a href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        )}
                    </div>


                ) : (
                    <textarea
                        ref={textareaRef}
                        value={localConfig.content}
                        onChange={(e) => updateNestedConfig("content", e.target.value)}
                        onBlur={handleTextareaBlur}
                        onKeyDown={handleTextareaKeyDown}
                        className="w-full h-full resize-none border-none outline-none bg-transparent text-sm text-gray-800 placeholder-gray-500"
                        placeholder="Type your note here..."
                    />
                )}
            </div>

        </div>
    )
}
