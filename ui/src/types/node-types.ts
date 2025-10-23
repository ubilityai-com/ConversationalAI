import type { ComponentType } from "react"

/**
 * Component loader result
 */
export interface ComponentLoaderResult {
  Component: ComponentType<any> | null
  CustomComponent: ComponentType<any> | null
  schema: any | null
  isLoading: boolean
  error: Error | null
}

/**
 * Node result data structure
 */
export interface NodeResultData {
  output?: any
  file_name?: string
  [key: string]: any
}

/**
 * Loaded component props
 */
export interface LoadedComponentProps {
  schema: any
  selectedNodeId: string
  content: any
  onContentUpdate: (value: any, valid: boolean) => void
  validate: (valid: boolean) => void
  ai: boolean
  CustomComponent: ComponentType<any> | null
}

/**
 * File display props
 */
export interface FileDisplayProps {
  name: string
  extension: string
  displayName: string
}
