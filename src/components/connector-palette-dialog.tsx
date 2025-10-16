import { useCallback } from "react"
import { AIElements } from "../elements/ai-elements"
import { AutomationToolsElements } from "../elements/automation-tools-elements"
import { basicElements } from "../elements/basic-elements"
import { IntegrationElements } from "../elements/integration-elements"
import { useConnectorFilter } from "../hooks/use-connector-filter"
import { useNodeCreation } from "../hooks/use-node-creation"
import { ConnectorCategory } from "../lib/constants/connector-constants"
import { useFlowStore } from "../store/root-store"
import type { ConnectorPaletteDialogProps, ConnectorType } from "../types/connector-types"
import { ConnectorCard } from "./connector-palette/connector-card"
import { CategoryFilter } from "./connector-palette/connector-filter"
import { EmptyState } from "./connector-palette/empty-state"
import { SearchBar } from "./connector-palette/search-bar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
const connectorTypes: ConnectorType[] = [
  ...AIElements,
  ...basicElements,
  ...AutomationToolsElements,
  ...IntegrationElements,
]
export function ConnectorPaletteDialog({
  open,
  onOpenChange,
  x,
  y,
  source,
  sourceHandle,
}: ConnectorPaletteDialogProps) {
  const { reactFlowInstance, setIsFormDialogOpen, addNodesValidation, setClickedElement } = useFlowStore()

  const { filteredConnectors, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } =
    useConnectorFilter(connectorTypes)
  
  const { addNodeToFlow } = useNodeCreation({
    reactFlowInstance,
    source,
    sourceHandle,
    addNodesValidation,
    setClickedElement,
    setIsFormDialogOpen,
  })

  const handleConnectorSelect = useCallback(
    (connector: any) => {
      addNodeToFlow(connector, x, y)
      setSearchTerm("")
      setSelectedCategory(ConnectorCategory.ALL)
    },
    [addNodeToFlow, x, y, setSearchTerm, setSelectedCategory],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select a Node</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          <div className="sticky top-0 z-10 bg-white pt-2 pb-4 space-y-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3 p-1">
              {filteredConnectors.map((connector) => (
                <ConnectorCard
                  key={connector.type}
                  connector={connector}
                  onClick={() => handleConnectorSelect(connector)}
                />
              ))}
            </div>

            {filteredConnectors.length === 0 && <EmptyState />}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
