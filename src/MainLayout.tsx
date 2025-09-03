import { TooltipArrow } from "@radix-ui/react-tooltip";
import { FilePlus2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ChatbotNotFoundNotice } from "./components/chatbot-not-found-notice";
import { OAuth2AuthenticationFlow } from "./components/dialogs/credential-dialog/credOAuth2";
import DialogManager from "./components/dialogs/dialog-manager";
import { LiveUrlDisplay } from "./components/live-url-display";
import { LoadingOverlay } from "./components/loading-overlay";
import RightSideDrawer from "./components/right-side-drawer";
import { Toolbar } from "./components/toolbar";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import FlowZone from "./flow-zone";
import { useFilesStore } from "./store/files-store";
import { useFlowStore } from "./store/flow-store";
import { useReactFlow } from "@xyflow/react";

export default function MainLayout() {
    // Get state and actions from Zustand stores
    const setNodes = useFlowStore(state => state.setNodes)
    const addNodesValidation = useFlowStore(state => state.addNodesValidation)
    const fetchBots = useFlowStore(state => state.fetchBots)
    const getBotById = useFlowStore(state => state.getBotById)
    const reactFlowInstance = useFlowStore(state => state.reactFlowInstance)
    const failedLoadingBot = useFlowStore(state => state.failedLoadingBot)
    const nodes = useFlowStore(state => state.nodes)
    const selectedBot = useFlowStore(state => state.selectedBot)
    const getFiles = useFilesStore(state => state.getFiles)
    const { botID } = useParams();
    const reactFlow = useReactFlow()
    useEffect(() => {
        if (botID)
            getFiles(botID)
    }, [botID, getFiles])
    useEffect(() => {
        initializeAllDroppedElementsByHandler()
        fetchBots()
        OAuth2AuthenticationFlow()
    }, [])
    useEffect(() => {
        const fetchBot = async () => {
            try {
                if (botID && reactFlowInstance) {
                    await getBotById(botID)
                }
            } catch (error) {
                console.log({ error });
            }
        }
        fetchBot()
    }, [botID, reactFlowInstance, getBotById])


    const initializeAllDroppedElementsByHandler = () => {
        const id = uuidv4()
        setNodes([
            {
                id: id,
                type: "Handler",
                data: {
                    category: "basic",
                    color: "#68b04b",
                    label: "Start Dialog",
                    description: "Begin your Chatbot journey",
                    icon: "PlayArrow",
                    rightSideData: {
                        greet: "",
                        cancel: "",
                        start: false,
                        variableName: ""
                    },
                },
                position: { x: 400, y: 40 },
            },
        ])
        addNodesValidation(id, false)
    }

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
        <div className='min-h-screen flex flex-col' >
            <DialogManager />
            <Toolbar />
            <LiveUrlDisplay />
            <LoadingOverlay />
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 relative overflow-hidden bg-gray-50">
                    {!failedLoadingBot ? <FlowZone /> :
                        <ChatbotNotFoundNotice />}
                </div>
                <RightSideDrawer />

                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`w-10 h-10 absolute ${selectedBot && selectedBot.status === "Active" ? "top-44" : "top-20"} right-8`}
                                onClick={addStickyNote}
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
            </div>
            <Toaster />
        </div>
    )
}
