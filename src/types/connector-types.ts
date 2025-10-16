import type { LucideIcon } from "lucide-react"

export interface ConnectorType {
  type: string
  label: string
  description: string
  category: string
  color: string
  icon?: LucideIcon
  name?: string
  defaultValid?: boolean
  defaults: Record<string, any>
  automated?: string
  automationConfig?: string
  notTestable?: boolean
}

export interface ElementType {
  id: string
  type: string
  position: { x: number; y: number }
  data: {
    label: string
    description: string
    category: string
    automationConfig?: string
    rightSideData: any
    color: string
    notTestable?: boolean
  }
}

export interface ConnectorPaletteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  x: number
  y: number
  source: string
  sourceHandle: string
}
