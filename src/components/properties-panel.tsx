import { useState } from "react"

import { Settings, Trash2, X } from "lucide-react"

// Import all config components
import { useFlowStore } from "../store/flow-store"
import { AttacheConfig } from "./properties/configs/attache-config"
// import { ConditionConfig } from "./properties/configs/condition-config"
import { DefaultConfig } from "./properties/configs/default-config"
import { EndConfig } from "./properties/configs/end-config"
// import { LLMConfig } from "./properties/configs/llm-config"
import { MessageConfig } from "./properties/configs/message-config"
// import { RouterConfig } from "./properties/configs/router-config"
import { ToolConfig } from "./properties/configs/tool-config"
import RightSideBody from "./right-side-body"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


export function PropertiesPanel() {
    // const { selectedNode, nodes, updateNode } = useWorkflow()
    const nodes = useFlowStore(state => state.nodes)
    const selectedNode = useFlowStore(state => state.clickedElement)
    const setClickedElement = useFlowStore(state => state.setClickedElement)
    const deleteNode = useFlowStore(state => state.deleteNode)


    const [activeTab, setActiveTab] = useState("config")
    const [isCollapsed, setIsCollapsed] = useState(false)
    if (!selectedNode)
        return <></>
    const selectedNodeData = selectedNode ? nodes.find((n) => n.id === selectedNode.id) : null

    const handleConfigUpdate = (key: string, value: any) => {
        // updateNode(selectedNodeData.id, {
        //     data: {
        //         ...selectedNodeData.data,
        //         config: {
        //             ...selectedNodeData.data.config,
        //             [key]: value,
        //         },
        //     },
        // })
    }

    const handleLabelUpdate = (label: string) => {
        // updateNode(selectedNodeData.id, {
        //     data: {
        //         ...selectedNodeData.data,
        //         label,
        //     },
        // })
    }

    const handleDataUpdate = (updates: any) => {
        // updateNode(selectedNodeData.id, {
        //     data: {
        //         ...selectedNodeData.data,
        //         ...updates,
        //     },
        // })
    }

    const renderConfigForm = () => {
        const commonProps = {
            data: selectedNodeData.data,
            onLabelUpdate: handleLabelUpdate,
            onConfigUpdate: handleConfigUpdate,
            onDataUpdate: handleDataUpdate,
        }

        switch (selectedNodeData.type) {
            // case "llm":
            //     return <LLMConfig {...commonProps} />
            // case "router":
            //     return <RouterConfig {...commonProps} />
            case "message":
                return <MessageConfig {...commonProps} />
            case "tool":
                return <ToolConfig {...commonProps} />
            // case "condition":
            //     return <ConditionConfig {...commonProps} />
            case "attache":
                return <AttacheConfig {...commonProps} />
            // case "choice":
            // return <ChoiceConfig {...commonProps} />
            default:
                return <DefaultConfig {...commonProps} />
            case "end":
                return <EndConfig {...commonProps} />
        }
    }

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
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center truncate">
                        <Settings className="w-5 h-5 mr-2 flex-shrink-0" />
                        <Badge variant="secondary" className="text-sm">
                            {selectedNodeData.type}
                        </Badge>
                    </h2>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    {selectedNode.type !== "Handler" && <Button variant="ghost" size="sm" onClick={() => deleteNode(selectedNode.id)} className="text-red-500 hover:text-red-600 w-8 h-8 p-0">
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
                        <CardTitle className="text-sm">{selectedNodeData.type} Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RightSideBody />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
