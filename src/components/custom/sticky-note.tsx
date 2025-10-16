import { Tooltip, TooltipArrow } from '@radix-ui/react-tooltip'
import { useReactFlow } from '@xyflow/react'
import { FilePlus2 } from 'lucide-react'
import { v4 as uuidv4 } from "uuid"
import { useFlowStore } from '../../store/root-store'
import { Button } from '../ui/button'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const StickyNote = () => {
    const setNodes = useFlowStore(state => state.setNodes)
    const addNodesValidation = useFlowStore(state => state.addNodesValidation)
    const nodes = useFlowStore(state => state.nodes)
    const selectedBot = useFlowStore(state => state.selectedBot)

    const reactFlow = useReactFlow()
    const addStickyNote = () => {
        const id = uuidv4()
        const { x, y, zoom } = reactFlow.getViewport()
        const flowPosition = {
            x: -x / zoom + window.innerWidth / 2 / zoom,
            y: -y / zoom + window.innerHeight / 2 / zoom,
        };
        setNodes([
            ...nodes,
            {
                id: id,
                type: "StickyNote",
                data: {
                    category: "basic",
                    label: "Sticky Note",
                    rightSideData: {
                        color: "#bfdbfe",
                        content: "",
                    },
                },
                position: flowPosition,
            },
        ])
        addNodesValidation(id, true)
    }
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={`w-10 h-10 absolute  ${selectedBot && selectedBot.status === "Active" ? "top-28" : "top-2"} right-8`}
                        onClick={(e) => {
                            e.stopPropagation()
                            addStickyNote()
                        }
                        }
                    >
                        <FilePlus2 style={{ width: "1.5rem", height: "1.5rem" }} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    className="bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-md"
                    side="left"
                    align="center"
                >
                    Add a Sticky Note
                    <TooltipArrow className="fill-gray-800" />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default StickyNote