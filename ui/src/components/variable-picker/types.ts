export interface Variable {
    name: string
    type: "constant" | "output" | "dialogue" | "file" | "dataCollector"
    value?: string | number | boolean | object
    path?: string
    nodeId?: string
    nodeName?: string
}

export interface VariablesPanelProps {
    isOpen: boolean
    onClose: () => void
    right: number
}

export interface VariableTypeConfig {
    icon: any
    label: string
    description: string
    badgeClass: string
}

export type GroupingMode = "type" | "node"
