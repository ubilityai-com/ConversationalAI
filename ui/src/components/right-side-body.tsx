/// <reference types="webpack-env" />

import { useNodesData } from "@xyflow/react"
import { useCallback } from "react"

import { useComponentLoader } from "../hooks/use-component-loader"
import { NodeCategory } from "../lib/constants/node-types"
import { useFlowStore } from "../store/root-store"
import { DynamicComponentRenderer } from "./right-side/dynamic-component-rendererr"
import { ErrorState } from "./right-side/error-state"
import { LoadingState } from "./right-side/loading-state"
import { NodeResultDisplay } from "./right-side/node-result-display"

export default function RightSideBody() {
  const clickedElement = useFlowStore((state) => state.clickedElement)
  const updateNodesValidationById = useFlowStore((state) => state.updateNodesValidationById)
  const updateNodeRightSideData = useFlowStore((state) => state.updateNodeRightSideData)

  // Load component dynamically
  const { Component, CustomComponent, schema, isLoading, error } = useComponentLoader({
    type: clickedElement?.type || "",
    category: clickedElement?.data?.category || "",
    automationConfig: clickedElement?.data?.automationConfig,
  })

  const selectedNode = useNodesData(clickedElement?.id)

  const validate = useCallback(
    (valid: boolean) => {
      if (selectedNode) {
        updateNodesValidationById(selectedNode.id, valid)
      }
    },
    [selectedNode, updateNodesValidationById],
  )

  const handleRightSideDataUpdate = useCallback(
    (value: any, valid: boolean) => {
      if (clickedElement) {
        updateNodeRightSideData(clickedElement.id, { rightSideData: value })
        validate(valid)
      }
    },
    [clickedElement, updateNodeRightSideData, validate],
  )

  // Early return if no node selected
  if (!selectedNode) return null

  // Show loading state
  if (isLoading) {
    return <LoadingState />
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} />
  }

  const isAiNode = selectedNode?.data.category === NodeCategory.AI

  return (
    <div>
      {Component && (
        <DynamicComponentRenderer
          Component={Component}
          schema={schema}
          selectedNodeId={selectedNode.id}
          content={selectedNode.data.rightSideData}
          onContentUpdate={handleRightSideDataUpdate}
          validate={validate}
          ai={isAiNode}
          CustomComponent={CustomComponent}
        />
      )}

      <NodeResultDisplay
        nodeId={selectedNode.id}
      />
    </div>
  )
}
