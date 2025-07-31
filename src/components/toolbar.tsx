import { Download, Key, Play, Save, Square, Upload, Variable } from "lucide-react"
import { createFlowObject } from "../lib/build-json"
import { useCredentialStore } from "../store/credentials-store"
import { useFlowStore } from "../store/flow-store"
import { Button } from "./ui/button"


export function Toolbar() {
  const isRunning = false

  const { nodesValidation, setFormDialogStatus, setIsFormDialogOpen, setDialogProps, setShowSnackBarMessage, nodes, edges, handleFlowZoneCheckIfAllHandlesAreConnected } = useFlowStore()
  const { activate, loading, error, success } = useCredentialStore()
  function hasFalseValue(obj: Record<string, boolean>): boolean {
    return Object.values(obj).includes(false);
  }
  const handleRun = () => {
    const connected = handleFlowZoneCheckIfAllHandlesAreConnected()
    if (!connected) {
      setShowSnackBarMessage({ open: true, message: "Please make sure all nodes are connected!", color: "destructive", duration: 3000 })
    }
    else if (hasFalseValue(nodesValidation)) {
      setShowSnackBarMessage({ open: true, message: "Please make sure all nodes are valid!", color: "destructive", duration: 3000 })
    }
    else {
      const data = createFlowObject()
      activate({
        param: data
      })
    }
  }
  return (
    <>
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img src="./ubility-logo.png" alt="Ubility" width={150} height={52} className="h-10 w-auto" />
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-lg font-medium text-gray-900">AI Agent Workflow Builder</h1>
          </div>

        </div>

        <div className="flex items-center space-x-2">

          {/* <Button variant="outline" size="sm" onClick={() => {
            setFormDialogStatus("ManageCred")
            setIsFormDialogOpen(true)
          }
          }>
            <Key className="w-4 h-4" />
            Credentials
          </Button> */}
          <Button variant="outline" size="sm" onClick={() => { }}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>

          <Button variant="outline" size="sm" onClick={() => { }}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button variant="outline" size="sm" onClick={() => { }}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>


          <Button variant="outline" size="sm" onClick={() => {
            setIsFormDialogOpen(true);
            setFormDialogStatus("variables");
          }}>
            <Variable className="w-4 h-4 mr-2" />
            Variables
          </Button>

          <Button
            onClick={handleRun}
            variant={isRunning ? "destructive" : "default"}
            size="sm"
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Workflow
              </>
            )}
          </Button>

        </div>
      </div >
    </>
  )
}
