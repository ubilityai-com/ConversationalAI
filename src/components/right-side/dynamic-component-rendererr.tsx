import type React from "react"
import { memo } from "react"
import { LoadedComponentProps } from "../../types/node-types"

interface DynamicComponentRendererProps extends LoadedComponentProps {
  Component: React.ComponentType<LoadedComponentProps>
}

/**
 * Renders dynamically loaded node component
 */
export const DynamicComponentRenderer = memo(({ Component, ...props }: DynamicComponentRendererProps) => {
  return <Component {...props} />
})

DynamicComponentRenderer.displayName = "DynamicComponentRenderer"
