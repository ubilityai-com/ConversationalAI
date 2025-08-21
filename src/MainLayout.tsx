import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ChatbotNotFoundNotice } from "./components/chatbot-not-found-notice";
import { OAuth2AuthenticationFlow } from "./components/dialogs/credential-dialog/credOAuth2";
import DialogManager from "./components/dialogs/dialog-manager";
import { LoadingOverlay } from "./components/loading-overlay";
import RightSideDrawer from "./components/right-side-drawer";
import { Toolbar } from "./components/toolbarv2";
import { Toaster } from "./components/ui/toaster";
import FlowZone from "./flow-zone";
import { useFlowStore } from "./store/flow-store";
import { LiveUrlDisplay } from "./components/live-url-display";
import { useFilesStore } from "./store/files-store";

export default function MainLayout() {
    // Get state and actions from Zustand stores
    const {
        setNodes,
        addNodesValidation,
        fetchBots,
        getBotById,
        reactFlowInstance,
        failedLoadingBot,
    } = useFlowStore()
    const getFiles=useFilesStore(state=>state.getFiles)
    const { botID } = useParams();

    useEffect(() => {
        initializeAllDroppedElementsByHandler()
        fetchBots()
        OAuth2AuthenticationFlow()
        getFiles()
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
                        restart: "",
                        thankYou: "",
                        cancel: "",
                        start: false,
                        bye: "",
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
            <LiveUrlDisplay/>
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
