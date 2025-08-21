"use client"

import { TooltipArrow } from "@radix-ui/react-tooltip"
import { FileText, Key, Loader2, Rocket, Save } from "lucide-react"
import { useState } from "react"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
function hasFalseValue(obj: Record<string, boolean>): boolean {
  return Object.values(obj).includes(false);
}
export function ToolbarActions() {
  const { selectedBot, isLoadingActivate, updateBotUiJson, activateBot, deactivateBot, setIsFormDialogOpen, setFormDialogStatus, setDialogProps, handleFlowZoneCheckIfAllHandlesAreConnected } = useFlowStore()
  const [isUpdatingBot, setIsUpdatingBot] = useState(false)
  const handleVariablesClick = async () => {
    setIsFormDialogOpen(true);
    setFormDialogStatus("variables");
  }

  const handleFilesClick = async () => {
    setIsFormDialogOpen(true);
    setFormDialogStatus("files");
  }
  const handleCredentialsClick = async () => {
    setIsFormDialogOpen(true);
    setFormDialogStatus("manageCred");
  }
  const handleSaveClick = async () => {
    if (selectedBot) {
      setIsUpdatingBot(true)
      await updateBotUiJson()
      setIsUpdatingBot(false)

    } else {
      setFormDialogStatus("save");
      setIsFormDialogOpen(true);
    }
  }
  const handlePublishToggle = async () => {
    const nodesValidation = useFlowStore.getState().nodesValidation
    const warnings = []


    const connected = handleFlowZoneCheckIfAllHandlesAreConnected()
    if (!connected) {
      warnings.push({
        id: "missing-handler",
        title: "Missing Connections",
        description:
          "Please connect all the nodes together.",
        severity: "high",
      })
    }
    if (hasFalseValue(nodesValidation)) {
      warnings.push({
        id: "missing-name",
        title: "Missing Configuration data",
        description: "Please fill all the required fields in all nodes.",
        severity: "high",
      })
    }
    if (warnings.length > 0) {
      setIsFormDialogOpen(true)
      setDialogProps({ warnings })
      setFormDialogStatus("validation")
    }
    else if (!selectedBot) {
      setIsFormDialogOpen(true)
      setFormDialogStatus("save")
    }
    else if (selectedBot.status === "Inactive") {
      activateBot()
    }
    else
      deactivateBot()
  }

  const isPublished = selectedBot?.status === "Active"

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={handleCredentialsClick}>
        <Key className="w-4 h-4 mr-2" />
        Credentials
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleFilesClick} disabled={!selectedBot}>
              <FileText className="w-4 h-4 mr-2" />
              Files
            </Button>
          </TooltipTrigger>
          {!selectedBot && (
            <TooltipContent>
              <TooltipArrow className="fill-white" />
              <p>Save your chatbot first to unlock file features</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <Button variant="outline" size="sm" onClick={handleVariablesClick}>
        <Save className="w-4 h-4 mr-2" />
        Variables
      </Button>

      <Button variant="outline" size="sm" onClick={handleSaveClick}>
        {isUpdatingBot ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        Save
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handlePublishToggle}
              variant={isPublished ? "secondary" : "default"}
              size="sm"
              className={
                isPublished
                  ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              disabled={isLoadingActivate || !selectedBot}
            >
              {isLoadingActivate ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4 mr-2" />
              )}
              {isLoadingActivate
                ? isPublished
                  ? "Unpublishing..."
                  : "Publishing..."
                : isPublished
                  ? "Unpublish"
                  : "Publish Bot"}
            </Button>
          </TooltipTrigger>
          {!selectedBot && (
            <TooltipContent>
              <TooltipArrow className="fill-white" />
              <p>Save your chatbot before publishing</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
