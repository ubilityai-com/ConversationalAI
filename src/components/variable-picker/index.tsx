
import { useEffect, useRef, useState } from "react"
import { useFlowStore } from "../../store/root-store"
import { CardContent } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { EmptyState } from "./empty-state"
import { MinimizedView } from "./minimized-view"
import { PanelHeader } from "./panel-header"
import type { VariablesPanelProps } from "./types"
import { useVariablesData } from "./use-variables-data"
import { VariableTypeSection } from "./variable-type-section"


export function VariablesPanel({ isOpen, onClose, right }: VariablesPanelProps) {
    const varPickerProps = useFlowStore((state) => state.varPickerProps);
    const setIsPopoverInteracting = useFlowStore(
        (state) => state.setIsPopoverInteracting
    );
    const setVarPicker = useFlowStore((state) => state.setVarPicker);
    const {
        fieldRefs,
        focusedField,
        constantVariables,
        outputVariables,
        dialogueVariables,
        clickedElement,
        setClickedElement,
        setIsRightOpen,
        nodes,
    } = useFlowStore();
    const files = useFlowStore((state) => state.files);



    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
    const [searchTerm, setSearchTerm] = useState("")
    const timeoutRef = useRef<NodeJS.Timeout>(null)
    const popoverContentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isOpen && popoverContentRef.current) {
            const content = popoverContentRef.current
            const parent = content.parentElement
            if (parent) {
                parent.style.transform = parent.style.transform
            }
        }
    }, [right, isOpen])
    const isRightSideOpen = !!clickedElement

    // Close variable panel when right side closes
    useEffect(() => {
        if (!isRightSideOpen) {
            setVarPicker(false)
        }
    }, [isRightSideOpen, setVarPicker])

    const nodeNameMap: Record<string, string> = Object.fromEntries(nodes.map((n) => [n.id, (n.data?.label as string) ?? n.id]))

    const allowedNodeIds = varPickerProps?.allowedNodeIds ?? []

    const { allVariables, filteredVariables } = useVariablesData({
        constantVariables,
        outputVariables,
        dialogueVariables,
        files,
        nodeNameMap,
        allowedNodeIds,
        searchTerm,
        selectedType,
    })

    const onVariableSelect = (varName: string) => {
        varPickerProps?.insertVariable(varName)
        fieldRefs[focusedField || ""]?.focus()
    }

    const handleNavigateToNode = (nodeId: string) => {
        const node = nodes.find((n) => n.id === nodeId)
        if (node) {
            setClickedElement(null)
            setTimeout(() => setClickedElement(node), 300)
            setIsRightOpen(true)
        }
    }

    const handlePopoverInteraction = (interacting: boolean) => {
        console.log({ interacting });

        setIsPopoverInteracting(interacting)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (!interacting) {
            timeoutRef.current = setTimeout(() => {
                if (!document.activeElement || !fieldRefs[focusedField || ""]?.contains(document.activeElement)) {
                    setVarPicker(false)
                }
            }, 100)
        }
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])
    const toggleMinimize = () => {
        // setVariablesPickerVisibleMinimized(prev => {
        //     console.log({ prev });

        //     return !prev
        // });
    };
    if (!isOpen) return null

    return (
        <div
            className={`fixed bg-background border rounded-lg shadow-lg transition-all duration-300 ease-out z-50 ${false ? "bottom-3 w-80" : "top-1/2 -translate-y-1/2 w-80"
                }`}
            style={{ right: `${right + 15}px` }}
            onMouseEnter={() => handlePopoverInteraction(true)}
            onFocus={() => handlePopoverInteraction(true)}
            onBlur={() => handlePopoverInteraction(false)}
            tabIndex={0}
        >
            {false ? (
                <MinimizedView onToggleMinimize={toggleMinimize} />
            ) : (
                <div className="flex flex-col h-[calc(100vh-160px)]">
                    <PanelHeader
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onClose={onClose}
                        onToggleMinimize={toggleMinimize}
                    />

                    <CardContent className="flex-1 p-4 flex flex-col overflow-y-scroll">
                        {Object.keys(filteredVariables).length === 0 ? (
                            <EmptyState hasVariables={allVariables.length > 0} />
                        ) : (
                            <div className="space-y-2 flex-1 flex flex-col">
                                <ScrollArea className="flex-1 overflow-hidden">
                                    <div className="space-y-6">
                                        {Object.entries(filteredVariables).map(([type, variables], index, array) => (
                                            <VariableTypeSection
                                                key={type}
                                                type={type}
                                                variables={variables}
                                                isOpen={openSections[type] ?? false}
                                                onToggle={(open) =>
                                                    setOpenSections((prev) => ({
                                                        ...prev,
                                                        [type]: open,
                                                    }))
                                                }
                                                onVariableSelect={onVariableSelect}
                                                onNavigate={handleNavigateToNode}
                                                showSeparator={index < array.length - 1}
                                            />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </CardContent>
                </div>
            )}
        </div>
    )
}

export * from "./types"
