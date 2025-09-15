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
import { Toaster } from "./components/ui/toaster";
import FlowZone from "./flow-zone";
import { useFilesStore } from "./store/files-store";
import { useFlowStore } from "./store/flow-store";

export default function MainLayout() {
    // Get state and actions from Zustand stores
    const setNodes = useFlowStore(state => state.setNodes)
    const addNodesValidation = useFlowStore(state => state.addNodesValidation)
    const fetchBots = useFlowStore(state => state.fetchBots)
    const getBotById = useFlowStore(state => state.getBotById)
    const reactFlowInstance = useFlowStore(state => state.reactFlowInstance)
    const failedLoadingBot = useFlowStore(state => state.failedLoadingBot)
    const getFiles = useFilesStore(state => state.getFiles)
    const { botID } = useParams();
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
                        save: false,
                        variableName: ""
                    },
                },
                position: { x: 400, y: 40 },
            },
        ])
        addNodesValidation(id, false)
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
            </div>
            <Toaster />
        </div>
    )
}
