import { Loader2, Play, Settings, Trash2, X } from "lucide-react"
// Import all config components
import { useFlowStore } from "../store/flow-store"
import RightSideBody from "./right-side-body"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { IntegrationElements } from "../elements/integration-elements"

const runnableNodes = [...IntegrationElements.map(elt => elt.type)]
export function PropertiesPanel() {
    const selectedNode = useFlowStore(state => state.clickedElement)
    const setClickedElement = useFlowStore(state => state.setClickedElement)
    const deleteNode = useFlowStore(state => state.deleteNode)
    const testNode = useFlowStore(state => state.testNode)
    const isThisNodeRunning = useFlowStore(state => state.runningNodeIds.has(selectedNode?.id));
    const nodesValidation = useFlowStore(state => state.nodesValidation);


    if (!selectedNode)
        return <></>


    // Add this style tag at the top of the component, after the imports
    const sliderStyles = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .slider::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `
    // Add the style tag in the return statement before the Card
    return (
        <div className="bg-white border-l border-gray-200 flex flex-col">
            <style>{sliderStyles}</style>
            <div className="sticky bg-white top-0 z-10 p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center truncate">
                        <Settings className="w-5 h-5 mr-2 flex-shrink-0" />
                        <Badge variant="secondary" className="text-sm">
                            {selectedNode?.type}
                        </Badge>
                    </h2>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0 ">
                    {runnableNodes.includes(selectedNode.type) &&
                        <Button
                            size="sm"
                            onClick={() => testNode(selectedNode?.id)}
                            disabled={isThisNodeRunning || !nodesValidation[selectedNode.id]}
                            className="h-8 px-3 bg-green-50 text-green-600 hover:bg-green-100 disabled:text-gray-400 disabled:bg-gray-100 flex items-center gap-1"
                        >
                            {isThisNodeRunning && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isThisNodeRunning ? "Testing..." : "Test Node"}
                        </Button>


                    }
                    {selectedNode?.type !== "Handler" && <Button variant="ghost" size="sm" onClick={() => deleteNode(selectedNode?.id)} className="text-red-500 hover:text-red-600 w-8 h-8 p-0">
                        <Trash2 className="w-4 h-4" />
                    </Button>}
                    <Button variant="ghost" size="sm" onClick={() => setClickedElement(null)} className="w-8 h-8 p-0">
                        <X className="w-4 h-4" />
                    </Button>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">


                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">{selectedNode?.type} Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RightSideBody />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
