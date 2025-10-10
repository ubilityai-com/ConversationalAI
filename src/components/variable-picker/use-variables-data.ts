"use client"

import { useMemo } from "react"
import type { Variable } from "./types"

interface UseVariablesDataProps {
  constantVariables: Record<string, any>
  outputVariables: Record<string, Record<string, string>>
  dialogueVariables: Record<string, string>
  dataCollectorVariables: Record<string, string[]>
  files: Array<{ file_name: string }>
  nodeNameMap: Record<string, string>
  allowedNodeIds: string[]
  searchTerm: string
  selectedType: string | null
}

export function useVariablesData({
  constantVariables,
  outputVariables,
  dialogueVariables,
  dataCollectorVariables,
  files,
  nodeNameMap,
  allowedNodeIds,
  searchTerm,
  selectedType,
}: UseVariablesDataProps) {

  // ✅ Step 8: Convert allowed IDs array to Set (O(1) lookups instead of O(n))
  const allowedNodeIdsSet = useMemo(() => new Set(allowedNodeIds), [allowedNodeIds])

  // ✅ Step 2: Pre-lowercase search term once
  const searchLower = useMemo(() => searchTerm.toLowerCase(), [searchTerm])

  // ✅ Step 1: Filter each variable group separately (avoids re-created objects)
  const filteredOutputVars = useMemo(
    () =>
      Object.entries(outputVariables).filter(([nodeId]) =>
        allowedNodeIdsSet.has(nodeId)
      ),
    [outputVariables, allowedNodeIdsSet]
  )

  const filteredDialogueVars = useMemo(
    () =>
      Object.entries(dialogueVariables).filter(([nodeId]) =>
        allowedNodeIdsSet.has(nodeId)
      ),
    [dialogueVariables, allowedNodeIdsSet]
  )

  const filteredDataCollectorVars = useMemo(
    () =>
      Object.entries(dataCollectorVariables).filter(([nodeId]) =>
        allowedNodeIdsSet.has(nodeId)
      ),
    [dataCollectorVariables, allowedNodeIdsSet]
  )

  // ✅ Step 3 + 4 + 6: Single pass to build all variables + grouped data
  const { allVariables, groupedVariables } = useMemo(() => {
    const variables: Variable[] = []
    const groups = new Map<string, Variable[]>()

    // Helper to add variable & group simultaneously (avoids second traversal)
    const addVariable = (variable: Variable) => {
      variables.push(variable)
      const group = groups.get(variable.type) || []
      group.push(variable)
      groups.set(variable.type, group)
    }

    // Constant variables
    for (const [name, type] of Object.entries(constantVariables)) {
      addVariable({ name, type: "constant", value: type })
    }

    // Files
    for (const { file_name } of files) {
      addVariable({ name: file_name, type: "file", value: file_name })
    }

    // Output variables
    for (const [nodeId, varsObj] of filteredOutputVars) {
      const nodeName = nodeNameMap[nodeId]
      for (const [name, path] of Object.entries(varsObj)) {
        addVariable({ name, type: "output", path, nodeId, nodeName })
      }
    }

    // Dialogue variables
    for (const [nodeId, name] of filteredDialogueVars) {
      const nodeName = nodeNameMap[nodeId]
      addVariable({ name, type: "dialogue", nodeId, nodeName })
    }

    // Data collector variables
    for (const [nodeId, values] of filteredDataCollectorVars) {
      const nodeName = nodeNameMap[nodeId]
      for (const value of values) {
        addVariable({ name: value, type: "dataCollector", nodeId, nodeName })
      }
    }

    return {
      allVariables: variables,
      groupedVariables: Object.fromEntries(groups),
    }
  }, [
    constantVariables,
    files,
    nodeNameMap,
    filteredOutputVars,
    filteredDialogueVars,
    filteredDataCollectorVars,
  ])

  // ✅ Step 7: Simplified, efficient filtering logic
  const filteredVariables = useMemo(() => {
    if (!searchLower && !selectedType) return groupedVariables

    // Filter only selected type if provided
    if (selectedType) {
      const typeVars = groupedVariables[selectedType] || []
      if (!searchLower) return { [selectedType]: typeVars }

      const filtered = typeVars.filter((v) =>
        v.name.toLowerCase().includes(searchLower)
      )
      return { [selectedType]: filtered }
    }

    // Otherwise, filter all groups
    const result: Record<string, Variable[]> = {}
    for (const [type, vars] of Object.entries(groupedVariables)) {
      const filtered = searchLower
        ? vars.filter((v) => v.name.toLowerCase().includes(searchLower))
        : vars

      if (filtered.length > 0) result[type] = filtered
    }

    return result
  }, [groupedVariables, searchLower, selectedType])

  // ✅ Step 10: Return stable data
  return {
    allVariables,
    filteredVariables,
  }
}
