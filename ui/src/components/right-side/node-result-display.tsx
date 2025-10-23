import { useCallback, useEffect, useMemo, useState } from "react"
import { ResultTabType } from "../../lib/constants/node-types"
import { createFileDisplay, hasFileResult } from "../../lib/utils/node-utils"
import { useFlowStore } from "../../store/root-store"
import { ResponseOutput } from "../custom/response-output"
import BinaryResult from "../file-components/BinaryResult"
import { ResultTabs } from "./results-tabs"

interface NodeResultDisplayProps {
  nodeId: string | null
}

/**
 * Display node execution results with tab switching
 * Handles both binary file results and JSON output
 * Returns null if no result to display
 */
export const NodeResultDisplay = ({ nodeId }: NodeResultDisplayProps) => {
  const [activeTab, setActiveTab] = useState<string>(ResultTabType.JSON)
  const nodeResults = useFlowStore((state) => state.nodeResults)

  // Get node execution result
  const runResult = useMemo(() => {
    if (!nodeId) return null
    const nodeResult = nodeResults[nodeId]
    return nodeResult?.output ?? null
  }, [nodeId, nodeResults])

  const fileDisplay = useMemo(() => (runResult ? createFileDisplay(runResult.file_name) : null), [runResult])
  const hasFile = useMemo(() => (runResult ? hasFileResult(runResult) : false), [runResult])

  useEffect(() => {
    if (hasFile) {
      setActiveTab(ResultTabType.BINARY)
    } else {
      setActiveTab(ResultTabType.JSON)
    }
  }, [hasFile])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleCopy = useCallback((event: any) => {
    navigator.clipboard.writeText(`\${${event.name}}`)
  }, [])

  const handleExport = useCallback((data: any) => {
    console.log("[v0] Exporting data:", data)
    // TODO: Implement export logic
  }, [])

  const handleMaximize = useCallback(() => {
    console.log("[v0] Maximize clicked")
    // TODO: Implement maximize modal
  }, [])

  const handleCreateVariable = useCallback((copyEvent: any) => {
    console.log("[v0] Create variable:", copyEvent)
    // TODO: Implement variable creation logic
  }, [])

  if (!runResult) return null

  return (
    <div className="mt-4">
      {hasFile && <ResultTabs activeTab={activeTab} onTabChange={handleTabChange} />}

      {hasFile && activeTab === ResultTabType.BINARY && fileDisplay && (
        <BinaryResult runResult={runResult} file={fileDisplay} />
      )}

      {activeTab === ResultTabType.JSON && (
        <ResponseOutput
          runResult={runResult}
          onCopy={handleCopy}
          onExport={handleExport}
          onMaximize={handleMaximize}
          onCreateVariable={handleCreateVariable}
          collapsed={1}
        />
      )}
    </div>
  )
}
