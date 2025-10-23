import { Handle, HandleProps } from "@xyflow/react"

interface NodeHandleProps extends HandleProps {
    variant?: "input" | "output" | "condition" | "choice" | "branch"
    label?: string
    isConnected?: boolean
    nodeColor?: string
}

export function NodeHandle({
    variant = "output",
    label,
    isConnected = false,
    nodeColor = "#6366f1",
    className,
    style,
    ...props
}: NodeHandleProps) {
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
            <Handle
                {...props}
                style={{
                    ...getHandleStyles(),
                    ...style,
                }}
            />
    )
}
