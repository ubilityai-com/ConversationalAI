"use client"

import { Handle, HandleProps, useNodeId } from "@xyflow/react"
import { Plus } from "lucide-react"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"

interface NodeHandleProps extends HandleProps {
    variant?: "input" | "output" | "condition" | "choice" | "branch"
    label?: string
    isConnected?: boolean
    nodeColor?: string,
    positionX?: number,
    positionY?: number
}

export function NodeHandle({
    variant = "output",
    label,
    isConnected = false,
    nodeColor = "#6366f1",
    className,
    style,
    positionX,
    positionY,
    ...props
}: NodeHandleProps) {
    const setDialogProps = useFlowStore(state => state.setDialogProps)
    const setIsFormDialogOpen = useFlowStore(state => state.setIsFormDialogOpen)
    const setFormDialogStatus = useFlowStore(state => state.setFormDialogStatus)
    const edges = useFlowStore(state => state.edges)
    const source = useNodeId()
    // Check if this node has any outgoing connections
    const hasOutgoingConnection = edges.some((connection) => connection.source === source && props.id===connection.sourceHandle)
    console.log({hasOutgoingConnection});
    
    const handleShowAddNodeDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setDialogProps({ source, sourceHandle: props.id })
        setIsFormDialogOpen(true)
        setFormDialogStatus("addNode")
    }
    const getHandleStyles = () => {
        const baseStyles = {
            width: "20px",
            height: "20px",
            border: "2px solid white",
            borderRadius: "50%",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease-in-out",
            zIndex: 10,
        }

        switch (variant) {
            case "input":
                return {
                    ...baseStyles,
                    background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
                    ...(isConnected && {
                        boxShadow: "0 0 0 2px rgba(52, 211, 153, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                }
            case "output":
                return {
                    ...baseStyles,
                    background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
                    ...(isConnected && {
                        boxShadow: "0 0 0 2px rgba(96, 165, 250, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                }
            case "condition":
                return {
                    ...baseStyles,
                    width: "16px",
                    height: "16px",
                    background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                    ...(isConnected && {
                        boxShadow: "0 0 0 2px rgba(251, 191, 36, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                }
            case "choice":
                return {
                    ...baseStyles,
                    width: "16px",
                    height: "16px",
                    background: "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
                    ...(isConnected && {
                        boxShadow: "0 0 0 2px rgba(244, 114, 182, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                }
            case "branch":
                return {
                    ...baseStyles,
                    width: "16px",
                    height: "16px",
                    background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
                    ...(isConnected && {
                        boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                }
            default:
                return {
                    ...baseStyles,
                    background: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                    ...(isConnected && {
                        boxShadow: "0 0 0 2px rgba(156, 163, 175, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                }
        }
    }

    return (
        <>
            {props.type === "source" && !hasOutgoingConnection && (
                <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-start" style={{ left: "100%", ...style }}>
                    {/* Animated connecting line - horizontal */}
                    <div className="h-0.5 w-8 bg-gradient-to-r from-blue-400 to-transparent relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                        <Button
                            size="sm"
                            className="w-10 h-10 p-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg border-2 border-white transition-all duration-300 hover:scale-110 hover:shadow-xl group relative overflow-hidden"
                            onClick={handleShowAddNodeDialog}
                        >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Plus className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-90" />

                            {/* Ripple effect */}
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
                        </Button>
                    </div>
                </div>
            )}
            <Handle
                {...props}
                style={{
                    ...getHandleStyles(),
                    ...style,
                }}
            />
        </>
    )
}
